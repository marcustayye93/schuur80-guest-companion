# Audit fixes (from Grok report)

- [x] 1. HIGH: Verified — /help/pending route exists in App.tsx, Help page has prominent "Pending information" card, and the live deep link renders the full register via the 404.html SPA fallback (HTTP 404 status is expected GH Pages behavior; content renders fine). No fix needed.
- [x] 2. MED: NL translation polish: "FAQ's" → "veelgestelde vragen", "Contacteer gastheer" → "Neem contact op met de gastheer", "Open gids" → "Gids openen". Spot-check fr.json/de.json for similar stiffness.
- [x] 3. MED: devices.json wifi-router tip → present-tense pending phrasing.
- [x] 4. MED: Added 4 new pending-register items (quiet-hours, hot-tub-safety, first-aid, outage): quiet hours, hot tub child safety, first-aid kit/defibrillator location, power/water outage steps (multilingual).
- [x] 5. MED: README.md + deploy.sh: add "bump VERSION in sw.js before every content change" step.
- [x] 6. LOW: manifest.webmanifest — added screenshots array (home.jpg, wifi.jpg, 390x844 narrow): add screenshots array (capture 2 portrait shots from live app, bundle them).
- [x] 7. LOW: Checked rooms.json — all pending microcopy already uses the consistent "will be confirmed by the host" phrasing in all languages; no change needed.
- [ ] 8. Bump SW VERSION to v1.3.0, pnpm check, screenshots verify.
- [ ] 9. Deploy: production build with base path, copy assets-images + 404.html, push gh-pages, push main, verify live.
- [ ] 10. Checkpoint + deliver.
