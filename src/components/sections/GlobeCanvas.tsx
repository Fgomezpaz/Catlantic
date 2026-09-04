import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { TradeLane } from '../../types';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

const RADIUS = 1;
const CLAY = new THREE.Color('#D97757');
const PAPER = new THREE.Color('#FAF9F5');
const FAINT = new THREE.Color('#4A453D');

function toVector(lat: number, lon: number, radius = RADIUS): THREE.Vector3 {
  const phi = THREE.MathUtils.degToRad(90 - lat);
  const theta = THREE.MathUtils.degToRad(lon + 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

function arcCurve(from: THREE.Vector3, to: THREE.Vector3): THREE.QuadraticBezierCurve3 {
  const mid = from.clone().add(to).multiplyScalar(0.5);
  const distance = from.distanceTo(to);
  const lift = RADIUS + distance * 0.42;
  mid.normalize().multiplyScalar(lift);
  return new THREE.QuadraticBezierCurve3(from, mid, to);
}

function DotSphere() {
  const geometry = useMemo(() => {
    const count = 2400;
    const positions = new Float32Array(count * 3);
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < count; i += 1) {
      const y = 1 - (i / (count - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = golden * i;
      positions[i * 3] = Math.cos(theta) * r * RADIUS;
      positions[i * 3 + 1] = y * RADIUS;
      positions[i * 3 + 2] = Math.sin(theta) * r * RADIUS;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  useEffect(() => () => geometry.dispose(), [geometry]);

  return (
    <points geometry={geometry}>
      <pointsMaterial size={0.012} color={FAINT} sizeAttenuation transparent opacity={0.9} depthWrite={false} />
    </points>
  );
}

interface LaneArcProps {
  lane: TradeLane;
  active: boolean;
  motion: number;
}

function LaneArc({ lane, active, motion }: LaneArcProps) {
  const curve = useMemo(
    () => arcCurve(toVector(lane.from.lat, lane.from.lon), toVector(lane.to.lat, lane.to.lon)),
    [lane],
  );

  const line = useMemo(() => {
    const points = curve.getPoints(72);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const colors = new Float32Array(points.length * 3);
    for (let i = 0; i < points.length; i += 1) {
      const t = i / (points.length - 1);
      const c = FAINT.clone().lerp(CLAY, Math.sin(t * Math.PI));
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    const material = new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.35 });
    return new THREE.Line(geometry, material);
  }, [curve]);

  useEffect(
    () => () => {
      line.geometry.dispose();
      (line.material as THREE.Material).dispose();
    },
    [line],
  );

  const pulse = useRef<THREE.Mesh>(null);
  const offset = useMemo(() => Math.random(), []);

  useFrame(({ clock }) => {
    const material = line.material as THREE.LineBasicMaterial;
    material.opacity += ((active ? 1 : 0.28) - material.opacity) * 0.08;
    if (!pulse.current) return;
    const t = motion === 0 ? 0.5 : (clock.getElapsedTime() * 0.09 + offset) % 1;
    pulse.current.position.copy(curve.getPoint(t));
    const scale = active ? 1.35 : 0.9;
    pulse.current.scale.setScalar(scale);
  });

  const endpoints = useMemo(
    () => [toVector(lane.from.lat, lane.from.lon, RADIUS * 1.003), toVector(lane.to.lat, lane.to.lon, RADIUS * 1.003)],
    [lane],
  );

  return (
    <group>
      <primitive object={line} />
      <mesh ref={pulse}>
        <sphereGeometry args={[0.011, 10, 10]} />
        <meshBasicMaterial color={active ? PAPER : CLAY} />
      </mesh>
      {endpoints.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[i === 0 ? 0.014 : 0.018, 12, 12]} />
          <meshBasicMaterial color={active ? CLAY : FAINT} />
        </mesh>
      ))}
    </group>
  );
}

interface SceneProps {
  lanes: TradeLane[];
  activeId: string | null;
  motion: number;
}

function Scene({ lanes, activeId, motion }: SceneProps) {
  const group = useRef<THREE.Group>(null);
  const drag = useRef({ active: false, lastX: 0, velocity: 0 });

  useEffect(() => {
    const onDown = (e: PointerEvent): void => {
      if ((e.target as HTMLElement | null)?.tagName !== 'CANVAS') return;
      drag.current.active = true;
      drag.current.lastX = e.clientX;
    };
    const onMove = (e: PointerEvent): void => {
      if (!drag.current.active) return;
      const dx = e.clientX - drag.current.lastX;
      drag.current.lastX = e.clientX;
      drag.current.velocity = dx * 0.004;
    };
    const onUp = (): void => {
      drag.current.active = false;
    };
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    return () => {
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
  }, []);

  useFrame((_, delta) => {
    if (!group.current) return;
    const d = drag.current;
    if (d.active) {
      group.current.rotation.y += d.velocity;
    } else {
      d.velocity *= 0.92;
      group.current.rotation.y += d.velocity + delta * 0.06 * motion;
    }
  });

  return (
    <group ref={group} rotation={[0.28, -1.15, 0]}>
      <DotSphere />
      <mesh>
        <sphereGeometry args={[RADIUS * 0.985, 48, 48]} />
        <meshBasicMaterial color="#0B0A09" />
      </mesh>
      {lanes.map((lane) => (
        <LaneArc key={lane.id} lane={lane} active={activeId === null || activeId === lane.id} motion={motion} />
      ))}
    </group>
  );
}

interface GlobeCanvasProps {
  lanes: TradeLane[];
  activeId: string | null;
  className?: string;
}

export function GlobeCanvas({ lanes, activeId, className }: GlobeCanvasProps) {
  const reduced = usePrefersReducedMotion();
  return (
    <div className={className} aria-hidden="true" style={{ cursor: 'grab', touchAction: 'pan-y' }}>
      <Canvas
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, 3.1], fov: 38 }}
        frameloop={reduced ? 'demand' : 'always'}
        style={{ width: '100%', height: '100%' }}
      >
        <Scene lanes={lanes} activeId={activeId} motion={reduced ? 0 : 1} />
      </Canvas>
    </div>
  );
}
