# Schuur 80 — Guest Companion

The digital guest companion for **Schuur 80**, a restored heritage barn in Haasdonk (Waasland), Belgium. A premium, mobile-first Progressive Web App that gives guests everything they need for their stay: the house manual, room and appliance guides, the garden, the resident cats, arrival and checkout guides, local recommendations, the story of the barn, and emergency information — in four languages, even offline.

**Live app:** https://marcustayye93.github.io/schuur80-guest-companion/

## Highlights

| Capability | Implementation |
| --- | --- |
| Multilingual | English, Nederlands, Français, Deutsch — full UI and content translations with English fallback, persisted per device |
| Offline-first PWA | Service worker with app-shell precache and stale-while-revalidate runtime caching; installable via web app manifest |
| JSON-driven content | All content lives in `client/src/content/*.json` — no copy is hard-coded in components |
| Placeholder policy | Unconfirmed host information (Wi-Fi, alarm, cat names, appliance models…) is rendered as designed "to be confirmed" pending cards, with a transparency register at `/help/pending` |
| Design system | "Barn Light" — warm limewash palette, terracotta accents, Cormorant Garamond + Inter typography, photography-led cards |
| Search | Client-side full-text search across rooms, appliances, guides, FAQs and recommendations |

## Architecture

The app is a static single-page application built with **React 19**, **TypeScript**, **Vite 7**, **Tailwind CSS 4**, and **wouter** for routing. There is no backend: all content ships as bundled JSON, which is what makes complete offline operation possible.

```
client/
  public/
    manifest.webmanifest   ← PWA manifest
    sw.js                  ← service worker (offline caching)
    icons/                 ← PWA icons (192, 512)
  src/
    content/               ← JSON content model (rooms, devices, cats, guides,
                             faqs, history, recommendations, media, pending register)
    translations/          ← UI strings: en.json, nl.json, fr.json, de.json
    contexts/              ← LanguageContext (i18n), ThemeContext
    components/companion/  ← AppShell, cards, primitives, device components
    pages/                 ← One component per screen
    lib/content.ts         ← Typed content loader
```

### Content model

Every piece of guest-facing copy is a `LocalizedString` (`{ en, nl, fr, de }`). Information not yet confirmed by the host is a `PendingContent` object carrying a localized status, explanation, and expected-update note. Components render these automatically as amber dashed "to be confirmed" cards, so updating content later is purely a JSON edit — no component changes required.

### Updating content

1. Edit the relevant file in `client/src/content/` (for example, fill in the real Wi-Fi details in `devices.json`).
2. Replace the `PendingContent` object with a `LocalizedString` (or plain string for non-translatable values like a network name).
3. Remove the corresponding entry from `pending-register.json`.
4. Commit and push — the site redeploys automatically.

## Development

```bash
pnpm install
pnpm dev        # dev server on :3000
pnpm check      # TypeScript
pnpm exec vite build   # production build (dist/public)
```

## Deployment

The site is published to **GitHub Pages** from the `gh-pages` branch. To redeploy after making changes, run:

```bash
./deploy.sh
```

The script builds the app with the project-site base path (`/schuur80-guest-companion/`), adds a SPA fallback `404.html`, bundles the photographic assets under `manus-storage/`, and force-pushes the result to the `gh-pages` branch. Routing and media resolution are base-path aware (via Vite's `BASE_URL`), so the same code also works when hosted at a domain root.

## Languages

The app detects the browser language on first visit (EN/NL/FR/DE) and remembers the guest's choice in `localStorage`. All screens, content, and pending-state messaging are fully translated; English is the fallback for any missing key.
