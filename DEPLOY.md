# Guía: publicar Catlantic en GitHub Pages

El sitio es 100 % estático. GitHub lo compila y lo publica solo cada vez que hacés `push` a `main`.
No hay servidor, base de datos ni costos de hosting.

## 1. Crear el repositorio

1. En GitHub: **New repository** → nombre `Catlantic` → **Public** → *Create*.
   No marques "Add a README"; ya viene uno.
2. En tu computadora, dentro de la carpeta descomprimida del proyecto:

```bash
git init
git add .
git commit -m "Catlantic landing + dashboard"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/Catlantic.git
git push -u origin main
```

## 2. Activar GitHub Pages (una sola vez)

1. En el repo: **Settings → Pages**.
2. En **Build and deployment → Source** elegí **GitHub Actions** (no "Deploy from a branch").
3. Listo. El workflow `.github/workflows/deploy.yml` ya está en el repo y se dispara con el push.

Podés seguir el progreso en la pestaña **Actions**. La primera compilación tarda ~2 minutos.
Hasta que configures el dominio (paso 3), GitHub muestra el sitio en `https://TU-USUARIO.github.io/Catlantic/`,
pero como el build está fijado a `BASE_PATH="/"` las rutas y los assets solo cargan bien bajo el dominio
propio. Con el dominio activo: portal en `https://catlanticpartners.com/access`, API en `/api`, dashboard demo en `/dashboard`.

## 3. Dominio propio (catlanticpartners.com)

1. En tu proveedor de DNS creá:
   - `A` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `CNAME` `www` → `TU-USUARIO.github.io`
2. En **Settings → Pages → Custom domain** escribí `catlanticpartners.com` y guardá.
   Marcá **Enforce HTTPS** cuando GitHub termine de emitir el certificado (minutos a horas).
3. El archivo `public/CNAME` ya contiene `catlanticpartners.com` y el workflow ya compila con
   `BASE_PATH="/"`, que es lo correcto para un dominio propio (el sitio vive en la raíz).
   Si alguna vez lo publicaras como sitio de proyecto en `usuario.github.io/repo/`, ahí sí habría
   que cambiar el build a `BASE_PATH="/repo/"`.

## 4. Trabajar en local

```bash
npm install      # solo la primera vez
npm run dev      # abre http://localhost:5173 con recarga en vivo
```

Antes de subir cambios, `npm run build` te avisa si hay errores de TypeScript.

## 5. Cambiar contenido sin tocar componentes

Todo el texto y los datos están en `src/data/`:

| Quiero cambiar… | Archivo |
|---|---|
| Nombre, dirección, emails, menú | `src/data/site.ts` |
| Productos y orígenes | `src/data/commodities.ts` |
| Cotizaciones del tablero y ticker | `src/data/market.ts` |
| Rutas del globo (lat/lon) | `src/data/lanes.ts` |
| Servicios logísticos | `src/data/services.ts` |
| Certificaciones y proceso | `src/data/compliance.ts` |
| Equipo (nombres, cargos, emails) | `src/data/team.ts` |
| Datos del dashboard demo | `src/data/dashboard.ts` |
| Colores y tipografía | `tailwind.config.ts` (nombres) y `src/styles/index.css` (valores de cada tema) |
| Horario del modo claro/oscuro automático | `src/theme/types.ts` (`DAYLIGHT`) y el script inline de `index.html` |

Después de editar: `git add . && git commit -m "Actualizo X" && git push`. GitHub republica solo.

## 6. Cómo funciona lo "dinámico" en un sitio estático

- **Cotizaciones y fletes** se mueven cada ~20 s con una deriva determinística (`src/lib/simulation.ts`).
  No hay API: dos visitantes en el mismo minuto ven lo mismo. El pie de página aclara que son niveles indicativos.
- **Reloj UTC**, contadores animados y el feed del hero corren en el navegador.
- **Modo claro / oscuro**: automático según la hora local del visitante (claro 07:00–19:00), con botón manual
  en la barra y control Auto · Claro · Oscuro en el pie. La elección se guarda en el navegador.
- **Dashboard**: acceso demo con `demo@catlanticpartners.com / catlantic-2026`. Cualquier otro usuario ve
  "Access denied". Para clientes reales hay que conectar un proveedor de autenticación (Auth0, Clerk, Supabase).

## 7. Portal de acceso, formularios y API

- `/access` — portal de clientes y proveedores. Cualquier login devuelve **"Usuario no registrado"**;
  el botón *Registrar mi empresa* abre el formulario de due diligence según perfil (trading, logística,
  trader independiente, productor, partner logístico).
- Las solicitudes se envían por FormSubmit a `onboarding@catlanticpartners.com`. **La primera vez** que
  alguien envíe una solicitud, FormSubmit manda un mail de activación a esa casilla: hay que confirmarlo
  una sola vez. Si el envío falla, el solicitante recibe un botón "Enviar por email" con el resumen.
- `/api` — documentación de la API logística (referencia estática; todavía no hay API real detrás).
- Idiomas: `?lang=en`, `?lang=es`, `?lang=zh` fuerzan el idioma; el selector guarda la preferencia.
- Con `BrowserRouter`, el workflow copia `index.html` a `404.html` para que `/access` y `/api` funcionen
  al recargar en GitHub Pages.

## 8. Antes de salir a producción

- [ ] Reemplazar los perfiles de `src/data/team.ts` por el equipo real (son marcadores de posición).
- [ ] Revisar los niveles base de `src/data/market.ts` con la mesa.
- [ ] Crear las casillas `trade@`, `logistics@`, `info@`, `onboarding@` y las personales `@catlanticpartners.com`.
- [ ] Activar FormSubmit enviando una solicitud de prueba desde `/access` y confirmando el mail.
- [ ] Logos de surveyors: el sitio los nombra como texto (SGS, Bureau Veritas, Intertek, Control Union, Cotecna, QIMA). Sus logotipos son marcas registradas de cada empresa — agregarlos en `public/surveyors/` solo con autorización escrita de cada una.
- [ ] Reemplazar los enlaces legales del footer (`Footer.tsx`, `legalLinks`) por páginas reales.
- [ ] Opcional: subir una foto o video propio en `public/media/` y usarlo como capa sobre el hero.

## Problemas frecuentes

- **Página en blanco tras el deploy** → el `BASE_PATH` no coincide con la URL. Con dominio propio debe ser `/`
  (así está). Si lo ves en `usuario.github.io/repo/` sin dominio, es esperable: activá el dominio en Settings → Pages.
- **404 al recargar `/access` o `/api`** → falta `404.html` en el deploy. El workflow lo genera solo
  (`cp dist/index.html dist/404.html`); si deployás a mano, copiá ese archivo.
- **El workflow falla en "Lint" o "Typecheck"** → corré `npm run lint` y `npm run build` en local para ver el error.
