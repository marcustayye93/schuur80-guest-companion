# Task: Triage ChatGPT audit report and fix verified findings

## Phase 1 — Verify findings
- [ ] C1 Wi-Fi credentials in public repo (devices.json wifi-router, faqs.json faq-wifi) — check actual strings
- [ ] C2 ja.json emergency.address placeholder — check
- [ ] H1 Wi-Fi coverage claim — check
- [ ] H2 ko/ja "12:00 noon" untranslated — check guides.json + faqs.json
- [ ] H3 missing playbooks (power cut, cat trapped) — confirm not present
- [ ] H4 emergency numbers 112/101/poison — check Emergency page implementation
- [ ] H5 offline claims — check sw.js precache scope
- [ ] M1 nl gastvrouw/gastheer inconsistency, de Gastgeberin — check
- [ ] M2 ja verbose nav labels — check
- [ ] M3 nl tagline "Je gastencompagnon" — check
- [ ] M4 "gemaakt voor trage avonden" — check
- [ ] M5 15 min Antwerp claim — verify wording
- [ ] M6 unconfirmed amenity claims (linen, rain showers) — check
- [ ] M7 checkout vs daily cleaning coherence — check
- [ ] M8 night arrival section — check
- [ ] L1 zh/ko "Belgium" not localized — check
- [ ] L2 "host workshop" wording in guest-facing pending defaults — check
- [ ] L3 "Expected before your stay" — check
- [ ] L4 checkout cats line placement — assess
- [ ] L5 cats.json naming — internal only, assess (likely wontfix)

## Phase 2 — Critical/High fixes
- [ ] Replace Wi-Fi credentials with "on the welcome card / from your host" wording (7 langs); add pending item for credential delivery method
- [ ] Fix ja emergency.address with real address; make address consistent across all langs
- [ ] Fix ko/ja noon → 정오 12시 / 正午12時; scan all non-en files for stray English tokens
- [ ] Ensure emergency page has 112, 101, poison centre 070 245 245 tap-to-call + address copy
- [ ] Soften Wi-Fi coverage claim; add pending confirmation
- [ ] Add "Something went wrong" playbook entries (power cut, no hot water, lockout, cat indoors) — as pending or with generic-safe guidance

## Phase 3 — Medium/Low fixes
- [ ] Standardize nl host terminology (de gastheren→eigenaars/hosts consistent), de Gastgeber
- [ ] Compact ja nav/action labels
- [ ] nl tagline → natural Flemish
- [ ] Fix "trage avonden" phrasing
- [ ] Soften Antwerp/Ghent times to ranges
- [ ] Downgrade unconfirmed amenity claims or add to pending
- [ ] Clarify checkout tasks vs daily cleaning
- [ ] zh/ko localize "Belgium" (比利时 / 벨기에)
- [ ] Remove "host workshop" from guest-facing copy → "The owners are confirming this"
- [ ] "Expected before your stay" → "Will appear here once confirmed"

## Phase 4 — Verify & deploy
- [ ] SW bump v1.11.0; JSON validate; tsc; screenshots (emergency, arrival, checkout, ja pages)
- [ ] Deploy gh-pages + push main; verify live; checkpoint

## Phase 5 — Deliver
- [ ] Triage table (valid / partial / false positive / deferred) + what was fixed
