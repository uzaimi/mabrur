# Mabrur review and enhancement roadmap

Reviewed 10 September 2026 against main commit d3af0da. This is a comprehensive practical backlog, not a claim that every possible enhancement is listed. Proposed features below are not implemented by this repair.

## Repairs included

Arrival detection is now included in the draft: opt-in foreground location watch, accuracy/freshness checks, dwell time, overlapping-site choices, and exit-based rearming. The proposed foreground updates row below is implemented for arrival hints; physical-device field testing and site-coordinate review remain outstanding.

- Ignore GPS callbacks after cancellation, replacement, or unmount; clear stale coordinates after a failed refresh.
- Handle valid zero latitude/longitude; request fresh coordinates, display accuracy, and offer refresh/cancel actions.
- Explain snapshot GPS and straight-line distance; calculate location locally without saving coordinates.
- Handle unavailable/denied clipboard access, discard stale copy results, and clean up feedback timers.
- Keep reading cards mounted during parent updates so copy feedback does not recreate the card and lose focus.
- Add keyboard-operable expand buttons, expanded states, accessible icon-button names, category selection states, Arabic language metadata, and allow browser zoom.
- Trim search input so surrounding spaces do not hide valid results.
- Correct manifest/favicon paths for the GitHub Pages subdirectory and replace nonexistent PNG references with the supplied SVG.
- Mark three truncated readings as excerpts; correct the README's unsupported offline claim.
- Add regression tests and pull-request validation; run tests and lint before deployment.

## Priority 1 — content accuracy and travel reliability

| Enhancement | Why / acceptance criteria |
| --- | --- |
| Qualified religious-content review | Review every Arabic text, transliteration, translation, and location-specific practice with a qualified reviewer. Record reviewer and review date. |
| Precise source citations | Replace generic “Hadith”/“Sunnah” notes with collection, reference, link, and supported grading where relevant. Distinguish Quran, narrated practice, and general personal supplication. Avoid promising acceptance of a prayer. |
| Complete reading texts | Replace the Al-Hasyr, Sayyidul Istighfar, and Al-Fatihah excerpts with reviewed complete texts and matching translations. Keep excerpt labels until done. |
| Coordinate and site-boundary audit | Check every coordinate against reliable maps. Several different Haram sites share coordinates; show them as nearby choices, not an exact detected ritual location. GPS must not certify entry into miqat/Arafat boundaries. |
| Genuine offline reading | Precache app assets and reviewed readings with versioned service-worker updates. Verify cold reload offline, upgrade behavior, failed downloads, and cache recovery. |
| GPS freshness and uncertainty | Show time of last fix and an uncertainty range. Group nearby sites when device accuracy cannot distinguish them. Add a clearly labeled state for users far from the Holy Land. |
| Optional foreground location updates | Offer opt-in updates with an explicit stop button, battery-conscious frequency, cleanup, and pause when hidden. Retain manual selection. |
| Dependency maintenance | Review the dependency audit, update compatible packages, remove unused router/assets, and test changes. The initial npm audit reported six advisories; severity counts alone do not establish exploitability in the published app. |

## Priority 2 — core pilgrim experience

| Enhancement | Why / acceptance criteria |
| --- | --- |
| Umrah and Hajj journey modes | Separate step-by-step flows with saved progress, reviewed instructions, and a way to resume or reset. Avoid implying every listed doa is obligatory. |
| Manual Tawaf and Sa'i counters | Large controls, undo, explicit confirmation before reset, and local persistence; do not infer completed rounds from unreliable GPS. |
| Bookmarks and recently read | Save favorites and the last reading locally; support clear/export without requiring an account. |
| Audio recitation | Licensed, reviewed recordings with playback speed, repeat, progress, captions/text, and optional offline downloads with size estimates. The current audioUrl field has no playback UI. |
| Reading preferences | Arabic font size, line spacing, BM/English toggles, transliteration visibility, high contrast, and persisted settings. |
| Better search | Search doa titles and translations as well as sites; support common aliases and Arabic diacritic normalization; show result counts and reset filters. |
| Share and copy options | Copy Arabic, translation, or all text with source; support native share with a copy fallback. Preserve warnings for excerpts. |
| Direct reading links | Bookmarkable site/reading URLs that work after refresh on GitHub Pages. |
| Accessible mobile layout | Test keyboard focus, screen readers, 200–400% zoom, large touch targets, long Arabic/BM text, small screens, sticky-header overlap, and reduced motion. |
| Install and update experience | Add tested PNG/maskable icons and Apple touch icon, install guidance, a visible version, and a safe “update ready” prompt once offline support exists. |

## Priority 3 — optional expansion

| Enhancement | Why / acceptance criteria |
| --- | --- |
| Map and walking guidance | User-initiated links to a map with reviewed destinations; clearly distinguish straight-line distance from an accessible walking route. |
| Trip planning | Personal packing checklist, itinerary, group meeting points, and locally saved notes. |
| Emergency information | Country/site-specific verified contacts with source and last-checked date; personal hotel/group contact card available offline. |
| Prayer times | Reliable Saudi-local times, explicit calculation/source, local-date handling, and offline fallback if this fits the product. |
| Reminders | Opt-in reminders with quiet hours and clear browser limitations; no promise that a closed browser will deliver alarms without suitable infrastructure. |
| Additional languages | Professionally reviewed translations and right-to-left layout where needed. |
| Optional device sync | Add accounts only if needed; privacy controls, export/delete, and conflict handling before syncing personal notes or trip details. |

## Engineering follow-up

- Add browser tests for real mobile layouts, location allow/deny, clipboard failures, keyboard navigation, and deployed asset paths.
- Add content checks for unique IDs, coordinate ranges, missing translations, complete Quran passages, and valid reference links.
- Add an error boundary and visible recovery state; report errors without collecting precise coordinates or personal notes.
- Generate build/version metadata so users can identify whether the latest GitHub change is deployed.
- Add bundle-size budgets, lazy loading when content grows, and self-hosted Arabic fonts if required for offline use.
- Protect main with required validation and use preview builds before production deployment.

Recommended sequence: content/source and coordinate review → offline support → reading controls/bookmarks → guided journeys and counters → audio → optional maps and trip tools.
