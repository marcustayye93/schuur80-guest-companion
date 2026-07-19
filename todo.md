# Task: Language auto-detection + flag icons on pills (v1.14.0)

## Phase 1 — Implementation
- [ ] LanguageContext: on first visit (no stored language), map navigator.languages to supported lang (en/nl/fr/de/zh/ko/ja), fallback en
- [ ] Add flag emoji to LANGUAGES entries (🇬🇧 🇳🇱 🇫🇷 🇩🇪 🇨🇳 🇰🇷 🇯🇵) and render in onboarding pills + language switcher
- [ ] tsc + screenshot verify

## Phase 2 — Deploy
- [ ] Bump sw.js VERSION to v1.14.0
- [ ] bash deploy.sh, git push github main, verify live version
- [ ] webdev_save_checkpoint

## Phase 3 — Deliver
- [ ] Result message with checkpoint attachment
