# Task: Wi-Fi auto-connect + printable QR card + install onboarding

## New inputs from owner
- [ ] Set real credentials in wifiConfig.ts: SSID "Schuur80", password "Schuur80", confirmed=true
- [ ] Update Wi-Fi device steps/FAQ wording: credentials now confirmed (welcome card wording → also in app)
- [ ] Remove/resolve pending-wifi item in pending-register.json (keep coverage question only if needed — remove entirely, coverage stays in owner questions doc)
- [ ] Restyle printable QR card with signature green (brand green from index.css palette)

## Phase 1 — Wi-Fi connect card
- [ ] Add qrcode generation (client-side lib, e.g. `qrcode` npm package)
- [ ] Central wifi config file (client/src/lib/wifiConfig.ts) — single place to set SSID/password; placeholder flag until owners confirm
- [ ] WifiConnectCard component: Wi-Fi QR (WIFI:T:WPA;S:...;P:...;;), copy SSID, copy password buttons
- [ ] Platform detection: iOS → instructions to scan QR with Camera; Android → scan QR or tap-to-copy + settings hint
- [ ] Integrate card into Wi-Fi device page (top, above steps)
- [ ] Placeholder mode: when credentials unconfirmed, show pending note instead of QR
- [ ] 7-language strings for all new UI text

## Phase 2 — Onboarding + printable QR card
- [ ] First-visit onboarding screen: welcome + "add to home screen" instructions per device (iOS Safari, Android Chrome, desktop) + "continue in browser"
- [ ] Persist dismissal in localStorage; reachable later from Help page
- [ ] Printable QR card route (/print/qr-card): A6 print CSS, arched-window emblem, app QR (GitHub Pages URL), Wi-Fi QR slot, print button
- [ ] 7-language strings

## Phase 3 — Verify & deploy
- [ ] Screenshots: wifi page, onboarding, print card
- [ ] tsc + JSON validation, bump SW to v1.12.0
- [ ] deploy.sh, push main, verify live v1.12.0
- [ ] webdev_save_checkpoint

## Phase 4 — Deliver
- [ ] Result message with QR card printing instructions
