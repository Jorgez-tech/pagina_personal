# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Commands

- Local preview (static server; no build step):

```bash path=null start=null
# Option A: Python 3 built-in server (serves new-portfolio/ at http://localhost:8000)
python -m http.server 8000 -d new-portfolio
```

```bash path=null start=null
# Option B: Node (npx serve). Installs on first run if needed.
npx serve new-portfolio -l 8000
```

- Notes: This repo has no package.json, build, lint, or test tooling configured. Development is done by editing files in `new-portfolio/` and reloading the browser.

## High-level architecture

- Static single-page site in `new-portfolio/`:
  - `new-portfolio/index.html`: Defines all sections (hero, about, skills, projects, experience, contact, footer). Loads Google Fonts, Font Awesome, AOS via CDN, then `css/style.css` and `js/main.js`.
  - `new-portfolio/css/style.css`: Central design system with CSS variables, light/dark themes via `[data-theme]`, component styles (navbar, hero, grids, cards, buttons), animations and responsive layout.
  - `new-portfolio/js/main.js`: Modular init functions wired on `DOMContentLoaded`:
    - Navigation: sticky styling on scroll, smooth section navigation, active link tracking, mobile menu toggle.
    - Theme: light/dark toggle persisted in `localStorage` (`data-theme` attribute, icon swap).
    - UX helpers: scroll-to-top button, typing effect hero text, counters via `IntersectionObserver`, basic throttle/debounce utilities, optional lazy-loading scaffold.
    - Projects: client-side category filter toggling visibility/animation of `.project-card` items.
    - Contact: `initContactForm()` currently simulates submit and success messaging; real submit requires wiring a backend or a service (see README guidance: Formspree/EmailJS/custom endpoint fetch).
    - Effects: AOS initialization (guarded if library present) and simple background particles rendered as DOM nodes.
  - Assets under `new-portfolio/img/` (including `projects/` subfolder) referenced by the HTML.

## Important notes from README

- Personalization: Update personal info, social links, skills, and project cards directly in `index.html`. Tweak theme via CSS variables in `css/style.css`.
- Contact form: Replace the simulated submit with a real integration (Formspree/EmailJS or POST to your backend) inside `initContactForm()` in `js/main.js`.
- Deployment: Suitable for static hosting (GitHub Pages, Netlify, Vercel). No build step required—deploy the contents of `new-portfolio/`.
