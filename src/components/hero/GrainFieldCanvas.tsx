import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

/**
 * Wind over a grain field, seen from above at dusk.
 * Layered simplex-style noise is advected along a slow flow field; ridges are
 * lit from the upper-left so the surface reads as rows of standing crop rather
 * than abstract smoke. Palette is the brand: ink, clay, wheat, paper.
 */
const fragmentShader = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform vec2  uResolution;
  uniform vec2  uPointer;
  uniform float uMotion;

  varying vec2 vUv;

  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
    m = m * m; m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.55;
    mat2 rot = mat2(0.86, 0.5, -0.5, 0.86);
    for (int i = 0; i < 5; i++) {
      value += amplitude * snoise(p);
      p = rot * p * 2.03 + 11.7;
      amplitude *= 0.48;
    }
    return value;
  }

  float field(vec2 p, float t) {
    vec2 flow = vec2(fbm(p * 0.6 + t * 0.04), fbm(p * 0.6 - t * 0.03 + 5.2));
    vec2 q = p + flow * 0.55;
    float rows = sin(q.y * 9.0 + fbm(q * 1.8 + t * 0.06) * 2.4) * 0.5 + 0.5;
    float body = fbm(q * 1.4 + vec2(t * 0.05, 0.0));
    return mix(body, rows * body, 0.55);
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / uResolution.y;
    vec2 p = (uv - 0.5) * vec2(aspect, 1.0);

    float t = uTime * uMotion;
    vec2 pointer = (uPointer - 0.5) * vec2(aspect, 1.0);
    p += pointer * 0.06 * uMotion;

    float h = field(p * 1.6, t);
    float e = 0.012;
    float hx = field((p + vec2(e, 0.0)) * 1.6, t);
    float hy = field((p + vec2(0.0, e)) * 1.6, t);
    vec3 normal = normalize(vec3(h - hx, h - hy, e * 4.0));
    vec3 lightDir = normalize(vec3(-0.55, 0.65, 0.5));
    float diffuse = clamp(dot(normal, lightDir), 0.0, 1.0);
    float rim = pow(1.0 - clamp(normal.z, 0.0, 1.0), 2.0);

    vec3 ink   = vec3(0.043, 0.039, 0.035);
    vec3 soil  = vec3(0.16, 0.12, 0.09);
    vec3 clay  = vec3(0.851, 0.467, 0.341);
    vec3 wheat = vec3(0.788, 0.663, 0.380);
    vec3 paper = vec3(0.98, 0.976, 0.96);

    float height = smoothstep(-0.55, 0.75, h);
    vec3 color = mix(ink, soil, height);
    color = mix(color, clay * 0.85, smoothstep(0.35, 0.95, height) * diffuse * 0.9);
    color += wheat * rim * 0.28 * smoothstep(0.4, 1.0, height);
    color += paper * pow(diffuse, 8.0) * 0.06;

    // horizon haze toward the top and a floor of ink at the bottom edge
    float haze = smoothstep(0.45, 1.05, uv.y);
    color = mix(color, ink * 1.4, haze * 0.85);
    color = mix(color, ink, smoothstep(0.18, 0.0, uv.y));

    // vignette + film grain
    float vig = smoothstep(1.35, 0.35, length((uv - 0.5) * vec2(1.2, 1.0)));
    color *= mix(0.55, 1.0, vig);
    float grain = fract(sin(dot(gl_FragCoord.xy + t * 60.0, vec2(12.9898, 78.233))) * 43758.5453);
    color += (grain - 0.5) * 0.035;

    gl_FragColor = vec4(color, 1.0);
  }
`;

interface FieldUniforms {
  uTime: { value: number };
  uResolution: { value: THREE.Vector2 };
  uPointer: { value: THREE.Vector2 };
  uMotion: { value: number };
}

function FieldPlane({ motion }: { motion: number }) {
  const material = useRef<THREE.ShaderMaterial>(null);
  const { size, gl } = useThree();
  const pointer = useRef(new THREE.Vector2(0.5, 0.5));
  const target = useRef(new THREE.Vector2(0.5, 0.5));

  const uniforms = useMemo<FieldUniforms>(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uPointer: { value: new THREE.Vector2(0.5, 0.5) },
      uMotion: { value: motion },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useEffect(() => {
    uniforms.uMotion.value = motion;
  }, [motion, uniforms]);

  useEffect(() => {
    const canvas = gl.domElement;
    const onMove = (event: PointerEvent): void => {
      const rect = canvas.getBoundingClientRect();
      target.current.set(
        (event.clientX - rect.left) / rect.width,
        1 - (event.clientY - rect.top) / rect.height,
      );
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [gl]);

  useFrame((_, delta) => {
    if (!material.current) return;
    const u = material.current.uniforms as unknown as FieldUniforms;
    u.uTime.value += delta;
    u.uResolution.value.set(size.width, size.height);
    pointer.current.lerp(target.current, 0.04);
    u.uPointer.value.copy(pointer.current);
  });

  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={material}
        uniforms={uniforms as unknown as Record<string, THREE.IUniform>}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
}

interface GrainFieldCanvasProps {
  className?: string;
}

export function GrainFieldCanvas({ className }: GrainFieldCanvasProps) {
  const reduced = usePrefersReducedMotion();

  return (
    <div className={className} aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: false, powerPreference: 'high-performance', alpha: false }}
        frameloop={reduced ? 'demand' : 'always'}
        camera={{ position: [0, 0, 1] }}
        style={{ width: '100%', height: '100%' }}
      >
        <FieldPlane motion={reduced ? 0 : 1} />
      </Canvas>
    </div>
  );
}
