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

## Arrival detection

Tap **Aktifkan pengesanan ketibaan**, allow location, and keep the app visible. The separate **Cari lokasi** control still provides a one-time distance snapshot. Arrival detection uses `watchPosition` on the device; it does not save or send coordinates, request notifications, or run as a background service.

An arrival hint requires GPS accuracy of 50 m or better, a fix no more than 15 seconds old, and 8 seconds near the same candidate group. At least one site's 100 m entry radius must contain the reported accuracy circle. These are conservative product defaults, not surveyed boundaries. The app automatically displays the reading for a single candidate; overlapping areas such as Tawaf/Multazam offer choices. Detection is independent of search/category filters.

Repeated fixes do not reopen a dismissed hint. A site rearms only after a reliable fix places the user outside a 180 m exit radius, allowing for reported accuracy. Stopping detection clears the watch; hiding the app pauses it and resuming requires a fresh fix. Do not rely on arrival alerts while the phone is locked or the app is closed. Coordinate/source review and field testing in the Holy Land remain required; a proximity hint cannot establish a ritual boundary or exact indoor location.

## 📍 Holy Sites Covered

| Category | Sites |
|----------|-------|
| **Masjid al-Haram** | Kaabah (first sight), Tawaf area, Maqam Ibrahim, Multazam, Safa, Marwa, Green Light |
| **Masyair** | Arafat (Wukuf), Muzdalifah, Mina (Jamarat) |
| **Miqat** | Zul Hulaifah / Bir Ali |
| **Other** | Raudhah (Masjid Nabawi) |

## 🙏 About the Name

*Mabrur* (مَبْرُور) means "accepted" — as in *Hajj Mabrur*, an accepted and blessed pilgrimage. May this app help make your ibadah more meaningful and accepted by Allah.
