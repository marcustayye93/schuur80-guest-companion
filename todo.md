# Task: Owner questions page in-app (7 languages, Dutch priority)

## Phase 1 — Content + page
- [ ] Re-read /home/ubuntu/schuur80-owner-questions.md for current open questions (answered ones marked — exclude those)
- [ ] Create client/src/content/owner-questions.json: grouped questions (7 groups approx), each with id, priority (high/medium/low), question in 7 languages, whereItLands note
- [ ] Create OwnerQuestions page: grouped list, priority badges, intro for owners (written to the owners, Dutch-first mindset), count summary
- [ ] Add route /owner-questions in App.tsx
- [ ] Add entry point: Help page row (visible; "Vragen voor de eigenaars") — not in main guest nav bottom tabs (guests don't need it) but easy for owners to find; ALSO add it in Help near pending register
- [ ] Translation keys for page title/intro/labels in 7 files
- [ ] tsc + JSON validate

## Phase 2 — Verify + deploy
- [ ] Screenshots (NL + EN)
- [ ] Bump sw.js VERSION → v1.16.0
- [ ] bash deploy.sh + git push https://github.com/marcustayye93/schuur80-guest-companion.git main
- [ ] Verify live v1.16.0
- [ ] webdev_save_checkpoint

## Phase 3 — Deliver
- [ ] Result with link to /owner-questions page
