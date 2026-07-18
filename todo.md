# Add Chinese (zh), Korean (ko), Japanese (ja)

## Phase 23: translations
- [ ] 1. Translate UI strings: create client/src/translations/zh.json, ko.json, ja.json (mirror en.json structure)
- [ ] 2. Translate content collections: add "zh", "ko", "ja" keys to every localized string in rooms.json, devices.json, cats.json, guides.json, faqs.json, history.json, recommendations.json, pending-register.json, media.json (alt texts if localized)
- [ ] 3. Keep MaybePending semantics: pending blocks stay as-is; localized strings get 3 new keys

## Phase 24: infrastructure
- [ ] 4. LanguageContext: add zh/ko/ja to Language type/list with native labels (中文, 한국어, 日本語)
- [ ] 5. types.ts: extend Localized type if it enumerates languages
- [ ] 6. Fonts: add CJK-capable fonts (Noto Serif SC/KR/JP) via Google Fonts with fallbacks for headings/body in CJK
- [ ] 7. Language switcher UI (AppShell + Settings): verify all 7 languages listed and render well
- [ ] 8. Bump SW to v1.6.0

## Phase 25: verify + deploy
- [ ] 9. pnpm check; screenshots of home/guide in zh, ko, ja
- [ ] 10. Build production, deploy gh-pages, push main
- [ ] 11. webdev_save_checkpoint + deliver
