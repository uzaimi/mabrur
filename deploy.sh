#!/bin/bash
# Deploy Mabrur to GitHub Pages
set -e

echo "🔨 Building..."
npm run build

echo "🚀 Deploying to gh-pages..."
cd dist
git init
git checkout -b gh-pages
git add -A
git commit -m "🚀 Deploy $(date +'%Y-%m-%d %H:%M:%S')"
git push -f origin gh-pages

cd ..
echo "✅ Done! Live at https://uzaimi.github.io/mabrur/"
