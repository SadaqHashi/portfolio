# Sadaq — persoonlijke website

Simpele "over mij" site. Enkel frontend, geen backend, geen Docker.

## Stack
- Vite + React + TypeScript
- Plain CSS (`src/index.css` = tokens/basis, `src/App.css` = layout/componenten)
- Deploy: Vercel/Netlify (of GitHub Pages)

## Commando's
- `npm run dev` — dev server
- `npm run build` — productiebuild (moet foutloos zijn vóór commit)
- `npm run lint` — lint

## Secties
Hero → Over mij → Skills → Projecten → Contact → Footer

## Stijl
- Clean, modern, veel witruimte, paarse accentkleur
- Dark mode via `prefers-color-scheme`
- Mobile-first, moet goed werken op telefoon
- Subtiele animaties (hover, scroll-reveal), niets overdreven

## Regels
- Houd het simpel: geen extra libraries zonder reden
- Content (teksten, projecten, skills) staat bovenaan `src/App.tsx` als arrays, makkelijk aan te passen
- Contactgegevens in `App.tsx` zijn placeholders (zoek naar `TODO`)
- Taal van de site: Nederlands
- Commit na elke afgeronde stap

## Ideeën om te verfijnen
- Mooiere hero (animatie of gradient)
- Dark/light toggle
- Scroll-reveal animaties
- Projectkaarten met screenshots en links
- Eigen favicon + Open Graph preview
