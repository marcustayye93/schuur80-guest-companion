# Wi-Fi + real photos update

## Phase 10 — Wi-Fi
- [ ] devices.json: wifi-router → network Schuur80 / password Schuur80, remove pending, all 4 languages
- [ ] faqs.json: faq-wifi answer with real credentials
- [ ] pending-register.json: remove wifi item (now confirmed)
- [ ] Cat names remain pending (user confirmed still TBC)

## Phase 11 — find real photos
- [ ] Search Airbnb/Booking/host site for Schuur 80 Perstraat 80 Haasdonk listing photos
- [ ] Download professional listing photos (exterior, living, kitchen, bedrooms, bathroom, garden, hot tub, cinema, bar if available)
- [ ] Save findings + URLs to notes file

## Phase 12 — replace imagery
- [ ] Map real photos to media.json slots (hero, living, kitchen, garden, cinema, bedroom, bathroom, bar, cats, arrival, orchard, story)
- [ ] For missing subjects: generate images modeled on the real building (reference real photos)
- [ ] Optimize (resize/compress) into assets-images/ with same filenames or update media.json
- [ ] Upload via manus-upload-file --webdev for dev preview parity

## Phase 13 — deploy
- [ ] pnpm check + production build (NODE_ENV=production, base=/schuur80-guest-companion/)
- [ ] 404.html + manus-storage images -> gh-pages force push
- [ ] Push source to github main
- [ ] Bump SW version to invalidate cached images
- [ ] Checkpoint + deliver
