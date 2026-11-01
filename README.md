# Aashii's Rafiq — Chennai Transit Companion

A responsive, static landing-page prototype inspired by the supplied journey-tracking and timetable screenshots.

## Run locally

No build step or package installation is required.

1. Clone this repository.
2. Open `index.html` in a browser, or serve the folder with any static HTTP server.
3. The page uses plain HTML, CSS and vanilla JavaScript.

## What's included

- Personalized journey header and route controls
- Coach composition and crowd-load visualization
- Diagrammatic route radar
- Stop-by-stop timetable and progress timeline
- Journey tracker, arrival-alarm preference and status-share preview
- Facility alert panels
- Timetable search, transport-mode tabs and filters
- Route headway illustration and destination hub
- Transit infrastructure feature imagery
- Responsive desktop and mobile layouts

## Prototype status

This repository began empty. The current implementation is a **front-end-only prototype**. Values for train numbers, timings, crowd levels, platform assignments, delays, map position, and service frequency are illustrative content based on the supplied screenshots; they are not a verified timetable or live operational feed.

No railway API, GPS service, account system, notification backend, persistent trip storage, or MTC/Metro integration is connected. The map is a diagrammatic visual, not a navigable map. The alarm control stores only an in-memory UI preference for the current page session.

Before real-world use, replace the sample data in `app.js` with an approved source, validate station and service identifiers, and implement backend-backed live position, timetable freshness, service alerts, notification delivery, and safe fallback states.

## Image credits

- **Chennai suburban EMU** — “Chennai local 14003.jpg”, photograph by seeveeaar, via Wikimedia Commons. [Source](https://commons.wikimedia.org/wiki/File:Chennai_local_14003.jpg), [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/). Cropped responsively in the page; no other changes.
- **Chennai Metro at Guindy** — “Alstom Metropolis train-set at Guindy Metro station in Chennai.jpg”, photograph by Arjun1001, via Wikimedia Commons. [Source](https://commons.wikimedia.org/wiki/File:Alstom_Metropolis_train-set_at_Guindy_Metro_station_in_Chennai.jpg), [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). Cropped responsively in the page; no other changes.

Fonts are loaded from Google Fonts (Playfair Display and DM Sans). The page requires an internet connection for the hosted fonts and photographs; local fallbacks are defined for typography.
