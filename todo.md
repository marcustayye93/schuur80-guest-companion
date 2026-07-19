# Task: Room layout correction + ChatGPT/Grok report implementation (v1.15.0)

## Confirmed owner facts (apply first, Phase 1)
- 3 bedrooms upstairs; one fits 2 people; one has ensuite toilet + shower
- Downstairs room with 3 beds, sleeps 6
- Additional toilet + shower upstairs (shared)
- Separate toilet and separate shower downstairs
- Total: 3 showers and 3 toilets
- [ ] Update rooms.json bedrooms + bathrooms entries in 7 languages
- [ ] Resolve/adjust "bed configurations" pending item in pending-register.json
- [ ] Update any FAQ mentioning sleeping capacity (max guests ~12 → check: 3 upstairs rooms + 6 downstairs; keep capacity wording consistent; downstairs 6 + upstairs unknown per-room count except one room = 2. Do NOT invent totals — keep "sleeps up to 12" only if consistent, else soften)
- [ ] Update owner questions doc: bed config partially answered (remaining: bed sizes/types per upstairs room)

## Phase 2 — Triage (decide + record in notes)
- [ ] Triage Grok Task A gaps: hair dryer, iron, baby cot/high chair, luggage, early check-in, transport, medical details
- [ ] Triage Grok Task B: waste guide, hot tub child/pet safety, quiet hours/animal noise
- [ ] Triage ChatGPT HIGH list: photographic arrival (needs owner photos → pending), context-aware home (skip/partial), interactive map (needs floor plans → pending), rural living guide (implement), family hub (partial via FAQs), cleaning preferences (skip — owners next door), symptom-first troubleshooting (implement)
- [ ] Record skip reasons for vendor-style/over-engineered items

## Phase 3 — Quick-win content (7 languages)
- [ ] FAQ/device: hair dryer + iron (mark availability "to be confirmed" — NOT invented)
- [ ] FAQ: baby cot/high chair (to be confirmed by host → also owner question)
- [ ] FAQ: early check-in + luggage storage (ask the hosts next door — honest wording)
- [ ] FAQ/guide: transport — taxi, bus/train to Antwerp/Ghent, bike rental (verified generic info only)
- [ ] Hot tub + fire pit: add child supervision + pet safety + quiet enjoyment notes
- [ ] Waste sorting: OWNER CONFIRMED — round bin with lid = old bread only (feeds the chickens); two rectangular bins = other rubbish. Write waste-guide around this, plus general Flanders sorting context (PMD/glass to be confirmed); resolve/reword waste pending item

## Phase 4 — Feature gaps
- [ ] Symptom-first troubleshooting section on Help page (Wi-Fi weak, room cold, projector, hot tub, power outage)
- [ ] Rural living guide (insects, mud, animal sounds, seasonal expectations)
- [ ] Local essentials in recommendations (pharmacy, fuel, supermarket already there — add taxi/transport)
- [ ] Add new owner questions from reports to owner-questions doc

## Phase 5 — Verify + deploy
- [ ] tsc, JSON validate, screenshots
- [ ] Bump sw.js VERSION → v1.15.0
- [ ] bash deploy.sh, git push github main, verify live
- [ ] webdev_save_checkpoint

## Phase 6 — Deliver
- [ ] Result message: what was implemented, what was skipped and why, updated owner questions
