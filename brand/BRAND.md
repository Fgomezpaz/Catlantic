# Catlantic brand

## The mark

An open ring holding a grain kernel, with a single point at the ring's opening.
The ring is the world market; the kernel is what Catlantic originates; the point is the departure —
cargo leaving South America. It works at 14 px (favicon) and at any size above.

- Ring: paper `#FAF9F5` on dark, ink `#0B0A09` on light. Stroke 2 (thicker at small sizes).
- Kernel and point: Atlantic blue `#5A9BD8`, never recoloured (in the light theme of the site the UI token deepens to `#2F6DAE`; artwork always uses `#5A9BD8`).
- Kernel tilt: −22°. Do not rotate or mirror the mark.
- Clear space: half the ring diameter on every side.

## Files

| File | Use |
|---|---|
| `catlantic-mark-on-dark.svg` / `-on-light.svg` | App icons, avatars, favicons, stamps |
| `catlantic-lockup-on-dark.svg` / `-on-light.svg` | Transparent horizontal lockup for headers and documents |
| `catlantic-lockup-dark-bg.svg` / `-light-bg.svg` | Same lockup with a solid background for social profiles |
| `catlantic-mark-1024.png`, `catlantic-mark-512-transparent.png` | Raster mark |
| `catlantic-lockup-dark-1680.png`, `catlantic-lockup-light-1680.png` | Raster lockup |

The lockup SVGs reference *Inter Tight* and *JetBrains Mono*; convert text to outlines before sending
to a printer if the fonts are not installed.

## Naming

- **CATLANTIC** — brand name, everywhere in the interface, set in Inter Tight semibold, tight tracking.
- **Trade & Logistics** — descriptor under the wordmark, JetBrains Mono, wide tracking.
- **Catlantic Trade and Logistics Partners LLC** — legal name, used only in the footer, legal notices,
  contracts, invoices and metadata.

## Palette

The site has two themes. Every token is a CSS variable (`src/styles/index.css`); the same utility
classes render both. "Auto" follows the visitor's clock (light 07:00–19:00, dark at night) and a
manual switch pins either theme.

| Token | Dark theme | Light theme | Role |
|---|---|---|---|
| ink-950 | `#0B0A09` | `#FAF9F5` | Page background |
| ink-900 | `#100F0C` | `#F4F2EC` | Section alternation |
| ink-850 | `#17150F` | `#EEEBE3` | Chart surface |
| ink-800 | `#1D1B16` | `#E6E2D8` | Raised surfaces |
| paper | `#FAF9F5` | `#0B0A09` | Primary text, ring |
| muted | `#A9A296` | `#5B564D` | Secondary text |
| faint | `#6F6960` | `#7A7367` | Captions, eyebrows |
| atlantic | `#5A9BD8` | `#2F6DAE` | Accent — kernel, highlights, active states |
| atlantic-soft | `#8FC3E8` | `#5A9BD8` | Hover on accent, live indicators |
| atlantic-deep | `#3B6FA6` | `#1F4F82` | Pressed states, scrollbar hover |
| slate | `#8FA8B8` | `#5C7A8F` | Secondary accent, used sparingly |

Chart series (validated for colour-vision deficiency on both surfaces): `#3987E5`, `#D95926`, `#199E70`.
Status: good `#3FB27F`, warn `#D9A441`, serious `#DC7633`, critical `#E05C5C` — always with an icon and label.

## Type

- Display: **Inter Tight** 600, tracking −0.045em. Fluid scale from 2.6rem to 6.25rem.
- Body: **Inter** 300–600.
- Data, labels, eyebrows: **JetBrains Mono**, uppercase, tracking 0.12–0.24em.
