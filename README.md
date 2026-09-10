# Mabrur (مَبْرُور)

> *"Semoga ibadah kita diterima."*

**Mabrur** is a location-aware spiritual companion for Hajj & Umrah pilgrims. It suggests surah, doa, and adhkar based on where you are in the Holy Land.

## ✨ Features

- 📍 **10+ Holy Sites** — Masjid al-Haram, Arafat, Mina, Muzdalifah, Safa & Marwa, Maqam Ibrahim, Multazam, Raudhah & more
- 📖 **Curated Recommendations** — Arabic text with transliteration, English & Bahasa Malaysia translations
- 🌙 **Dark Mode** — Easy on the eyes, especially in the bright Haram sun
- 📱 **Web app manifest** — Includes an app icon; offline reload is not yet supported (no service worker).
- 📚 **Source notes** — References are included, but detailed citation and religious-content review remain outstanding. Incomplete readings are labeled as excerpts.

## 🚀 Tech Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS
- Deployed on GitHub Pages

## 🏃 Run Locally

```bash
# Node.js 24.15 or newer within the 24.x release line
npm ci
npm run dev
```

## 📦 Build

```bash
npm run build
# Output in dist/
```

Run `npm test` and `npm run lint` before submitting changes. Pull requests run tests, lint, and a production build without deploying.

GPS is requested only on demand over HTTPS (or localhost). It is a snapshot: use **Kemas kini lokasi** after moving. Coordinates stay in memory on this device, are not saved, and are used only to calculate straight-line distances. Approximate GPS cannot distinguish nearby indoor areas or establish ritual boundaries. Manual search works without location permission.

See [ENHANCEMENTS.md](ENHANCEMENTS.md) for the prioritized review and roadmap.

## 📍 Holy Sites Covered

| Category | Sites |
|----------|-------|
| **Masjid al-Haram** | Kaabah (first sight), Tawaf area, Maqam Ibrahim, Multazam, Safa, Marwa, Green Light |
| **Masyair** | Arafat (Wukuf), Muzdalifah, Mina (Jamarat) |
| **Miqat** | Zul Hulaifah / Bir Ali |
| **Other** | Raudhah (Masjid Nabawi) |

## 🙏 About the Name

*Mabrur* (مَبْرُور) means "accepted" — as in *Hajj Mabrur*, an accepted and blessed pilgrimage. May this app help make your ibadah more meaningful and accepted by Allah.
