# Catlantic — Trade & Logistics Partners

Landing page and client dashboard for **Catlantic Trade and Logistics Partners LLC**.
Single-page marketing site with a WebGL hero, live-feeling market board, interactive trade-lane globe,
and a gated demo dashboard — all static, no backend.

| Stack | |
|---|---|
| React 18 + TypeScript 5 | UI |
| Vite 5 | Build & dev server |
| Tailwind CSS 3 | Styling — tokens in `tailwind.config.ts` |
| Framer Motion 11 | Reveals, layout transitions, page transitions |
| GSAP 3 + ScrollTrigger | Hero headline choreography, pinned horizontal Process section |
| Three.js + @react-three/fiber | GLSL grain-field hero, trade-lane globe |
| react-router-dom 6 (BrowserRouter) | `/` landing · `/access` client & supplier gateway · `/api` developer reference · `/dashboard` demo — `404.html` fallback makes deep links work on GitHub Pages |
| Custom i18n | English, Spanish and Chinese for every string, including the onboarding forms (`src/i18n/`) |

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + production build → dist/
npm run preview    # serve dist/ locally
npm run lint
```

Node 20+ recommended.

## Project layout

```
index.html                 entry, fonts, meta
public/favicon.svg         favicon (the Catlantic mark)
brand/                     logo files (SVG + PNG) and BRAND.md
src/
  main.tsx                 router + root
  App.tsx                  routes + page transition
  styles/index.css         Tailwind layers, base tokens, utilities
  types/                   shared interfaces
  lib/                     cn(), formatters, motion variants, live-data simulation
  hooks/                   reduced-motion, live tick, count-up, magnetic pointer
  data/                    ALL site content — edit these, not the components
    site.ts                company name, address, emails, navigation
    commodities.ts         product lines
    market.ts              indicative quotes + freight indicators (with drift volatility)
    lanes.ts               trade lanes with coordinates (drives the globe)
    services.ts            logistics services
    compliance.ts          certifications + process stages
    team.ts                team profiles (PLACEHOLDERS — replace)
    metrics.ts             headline counters
    dashboard.ts           demo dashboard data
  components/
    icons/                 Logo, UI icons, commodity glyphs (custom SVG, no icon library)
    ui/                    Button, Reveal/Stagger, SectionHeader, Marquee, Counter
    layout/                Navbar, Footer
    hero/                  Hero + GrainFieldCanvas (GLSL)
    sections/              Origination, MarketBoard, TradeLanes (+GlobeCanvas), Logistics,
                           Compliance, Process, Metrics, Team, CallToAction, LiveTicker
    dashboard/             Gate (login), Shell, StatTile, PriceChart, VolumeBars, ShipmentTable
  pages/                   Landing, Dashboard
.github/workflows/deploy.yml   CI: lint → typecheck → build → GitHub Pages
```

## Languages

`src/i18n/messages.ts` holds the UI dictionary (EN is the source of truth; ES and ZH are typed against it,
so a missing key fails the build). Content in `src/data/` carries tri-lingual strings built with `l(en, es, zh)`.
The language is detected from `?lang=`, then the saved preference, then the browser; the switcher lives in
the navbar, footer, gateway, API page and dashboard. Chinese falls back to Noto Sans SC.

## Client & supplier gateway (`/access`)

Visitors choose **client** or **supplier**, and any sign-in attempt returns *User not registered* — there is
no account system on the static site. From there they can **Register your company**, pick a profile and
complete a multi-step due-diligence application:

| Side | Profile | Steps |
|---|---|---|
| Client | Trading counterparty | company & UBO · contacts · products, specs & volumes · financial capacity · documents |
| Client | Logistics services client | company & UBO · contacts · services, corridors & cargo (incl. API integration) · financial capacity · documents |
| Client | Independent trader | identity & residency · track record & pipeline · documents |
| Supplier | Producer / processor / exporter | company & UBO · contacts · products, capacity & quality · financial capacity · documents |
| Supplier | Logistics partner | company & UBO · contacts · services, coverage & assets · financial capacity · documents |

Field definitions live in `src/data/onboarding.ts`. Submissions post JSON to FormSubmit's AJAX endpoint for
`onboarding@catlanticpartners.com` (`APPLICATION_ENDPOINT`); the first submission triggers a one-time
activation email to that mailbox. File inputs record file names only — the wizard tells applicants that
originals are requested through a data room after screening. If the post fails, the applicant gets a
pre-filled `mailto:` fallback. Deep links: `/access?side=client&profile=solo`.

## API reference (`/api`)

A static developer page describing the (planned) Catlantic Logistics API: bookings, tracking events,
port inspections, parcels, webhooks, errors, rate limits and sandbox. It is documentation only — there is
no live API behind it yet; the closing note on the page says so.

## How the "live" data works

The site is fully static. `src/lib/simulation.ts` derives a deterministic drift from a seed plus a
20-second time bucket, so quotes and freight indicators move while the page is open, two visitors in
the same minute see the same numbers, and nothing needs a server. Base levels and volatility live in
`src/data/market.ts`. The disclaimer in the footer and market board marks them as indicative.

## Dashboard demo access

The dashboard is a demo behind a client-side gate. Credentials are in
`src/components/dashboard/DashboardGate.tsx` (`DEMO_CREDENTIALS`) and shown on the sign-in screen:

```
demo@catlanticpartners.com / catlantic-2026
```

Any other login shows "Access denied — accounts are provisioned by the control desk". This is
presentation only; for real client access wire the gate to an auth provider.

## Editing content

Everything a non-developer would change lives in `src/data/`. Components read from those files and
never hard-code copy, except section headlines. To change:

- **Company name / address / emails** → `data/site.ts`
- **Products** → `data/commodities.ts` (+ a glyph in `icons/CommodityGlyphs.tsx` and `icons/glyphMap.ts`)
- **Quotes** → `data/market.ts` (`price` is the base level, `volatility` the drift amplitude)
- **Lanes on the globe** → `data/lanes.ts` (lat/lon in decimal degrees)
- **Team** → `data/team.ts` — the shipped profiles are placeholders
- **Brand colours / type scale** → `tailwind.config.ts` (utility names) and `src/styles/index.css` (the RGB values for each theme)

## Themes (dark / light)

The site ships both themes. **Auto** (default) follows the visitor's local clock — light from
07:00 to 19:00, dark at night — and re-checks every minute, so a tab left open changes with the day.
The sun/moon button in the navbar pins the opposite theme; the *Appearance* control in the footer
offers Auto · Light · Dark. The choice is stored in `localStorage` (`catlantic.theme`) and an inline
script in `index.html` applies it before the first paint, so there is no flash.

Implementation: every colour token is a CSS variable on `:root` / `:root[data-theme="light"]`
(`src/styles/index.css`), consumed by Tailwind through `rgb(var(--c-…) / <alpha-value>)`.
The WebGL hero cross-fades between palettes with a `uLight` uniform; the globe swaps its palette;
charts use `fill-*` / `stroke-*` utilities. Provider and hook: `src/theme/`.

## Deploying

See [DEPLOY.md](./DEPLOY.md) for the GitHub Pages walkthrough. The workflow in
`.github/workflows/deploy.yml` builds on every push to `main` and publishes `dist/`.

## Accessibility & motion

- Every animation respects `prefers-reduced-motion` (WebGL renders a single frame, GSAP is skipped,
  the Process section stacks vertically).
- Charts ship a table view, a legend, direct labels and a hover tooltip; the series palette was
  validated for colour-vision deficiency on both the dark and the light surface.
- Status pills carry an icon + label, never colour alone.
