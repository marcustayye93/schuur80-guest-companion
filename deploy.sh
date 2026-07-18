#!/usr/bin/env bash
# Deploy Schuur 80 Guest Companion to GitHub Pages (gh-pages branch).
# Usage: ./deploy.sh
set -euo pipefail

REPO="https://github.com/marcustayye93/schuur80-guest-companion.git"
BASE="/schuur80-guest-companion/"

NODE_ENV=production pnpm exec vite build --mode production --base="$BASE"
cp dist/public/index.html dist/public/404.html

# Bundle photographic assets so they resolve on GitHub Pages
if [ -d "assets-images" ]; then
  mkdir -p dist/public/manus-storage
  cp assets-images/* dist/public/manus-storage/
fi

cd dist/public
git init -q -b gh-pages
git add -A
git -c user.email="deploy@schuur80.local" -c user.name="Schuur 80 Deploy" commit -m "Deploy $(date -u +%Y-%m-%dT%H:%M:%SZ)" -q
git push -f "$REPO" gh-pages
cd ../..
rm -rf dist/public/.git
echo "Deployed to https://marcustayye93.github.io/schuur80-guest-companion/"
