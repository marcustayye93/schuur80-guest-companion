# Schuur 80 Guest Companion — Design Ideas

The user provided a detailed Build Bible v1.1 that acts as the implementation contract, including a fixed design system. This document is the ground-truth spec; the design direction below is therefore not brainstormed but derived directly from the contract and expanded for execution.

## Chosen Approach: "Barn Light" — Warm Architectural Calm

**Design Movement**: Contemporary vernacular architecture editorial — the quiet luxury of restored heritage buildings (think Kinfolk magazine meets Apple Health clarity). Rooted in Flemish barn craftsmanship: timber, lime plaster, terracotta, orchard greens.

**Core Principles**
1. **Calm hierarchy** — one clear focal point per screen; generous vertical rhythm; nothing shouts.
2. **Material honesty** — warm paper-toned surfaces (#F5F1EA background, #FAF8F4 cards), soft grain, hairline borders; no glassy gradients.
3. **Photography-first** — large custom imagery of barn interiors, garden, cats; text sits beneath or on gradient scrims, never fighting the image.
4. **Three taps max** — every piece of content reachable within three taps from Home; bottom navigation always present.

**Color Philosophy** (fixed by contract)
- Background `#F5F1EA` — warm limewash paper; the whole app feels like natural daylight on plaster.
- Cards `#FAF8F4` — a half-step lighter, lifted with soft shadow instead of borders.
- Text `#232321` — warm near-black, softer than pure black.
- Accent `#A95D3A` — terracotta/brick, used sparingly for actions, active nav states, and emphasis. This is the signature brand color: the color of old Flemish brick.
- Nature `#64735A` — sage/olive green for garden, outdoor and status elements.

**Layout Paradigm**
- Mobile-first single column with full-bleed hero imagery; content cards float on the warm background.
- Asymmetric editorial headers: small terracotta eyebrow label + large Cormorant Garamond heading, left-aligned.
- Persistent bottom navigation (Home, House, Garden, Guide, Help) with safe-area padding; top bar with search, language switcher, offline indicator.
- On larger screens, content constrained to a centered ~max-w-md/lg app column to preserve the companion feeling.

**Signature Elements**
1. **Terracotta eyebrow labels** — small uppercase tracked labels above serif headings.
2. **Rounded 24px photo cards** with bottom gradient scrims and serif titles.
3. **Amber "pending" placeholder cards** — a dashed-border card with status badge, explanation and expected update, making unknown content a designed experience.

**Interaction Philosophy**
- Quiet and immediate: taps respond instantly with scale(0.97) press states; no gratuitous motion.
- Skeleton loading in the same warm palette; friendly error and offline states with barn-inspired illustration tones.

**Animation**
- Entrances: 200–300ms ease-out fade + 8px rise, staggered 40ms per card.
- Page transitions: none or minimal fade; instant navigation is prioritized.
- Respect prefers-reduced-motion.

**Typography System** (fixed by contract)
- Headings: Cormorant Garamond (500/600) — elegant, architectural serif.
- Body/UI: Inter (400/500/600).
- Scale: eyebrow 11px uppercase tracking-widest; H1 32–36px serif; H2 24px serif; body 15–16px Inter; captions 13px.

**Brand Essence**: A digital house companion for guests of a restored Flemish barn — as warm and considered as the house itself. Personality: warm, grounded, gracious.

**Brand Voice**: Calm, welcoming, precise. Example lines: "The barn is yours — here's everything you need." / "Before you go, a few small things."

**Wordmark & Logo**: "Schuur 80" set in Cormorant Garamond with a minimal barn-gable line mark (simple pitched roof outline) in terracotta.

## Contract Constraints (must-follow)
- No booking engine, no messaging, no accounts.
- All content JSON-driven (rooms, devices, cats, guides, faqs, history, recommendations, media, translations EN/NL/FR/DE with EN fallback).
- Placeholder policy: unknown info shows status + explanation + expected update; Pending Content Register maintained.
- PWA: installable, offline caching, service worker, manifest, icons.
- WCAG AA, skeleton loading, lazy images, responsive, GitHub Pages-ready.
- No stock imagery — generate custom photography-style assets.
