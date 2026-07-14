# Mission Policy Innovation Navigation Kit

A public knowledge-base website for **NetZeroCities Task 6.5 — Policy & Regulatory Innovation**, built from the D6.7 *Policy, Governance and Labs* report (SGA1). Lead: Dark Matter Labs, with Demos Helsinki and the NetZeroCities consortium.

It describes what Mission-Driven Policy Innovation is, the **Integrated / Light / Deep** support model, the four methods (**Studio · Lab · Sprint · Sandbox**), the practice cases behind them, the cross-cutting lessons, and the EU Policy Labs practitioner playbook.

---

## Run it locally

It's a plain static site — no build step, no dependencies. Any static server works:

```bash
cd policy-innovation-manual
python3 -m http.server 8137
# then open http://localhost:8137
```

Or just open `index.html` in a browser (the shared navigation is injected by `assets/js/app.js`, which works from `file://` too).

## Deploy it

Drag the whole folder onto **Netlify Drop** (app.netlify.com/drop), or connect the repo to **Vercel** / **GitHub Pages**. No configuration needed — it's static HTML/CSS/JS. Nothing is published until you choose to deploy.

---

## Structure

```
index.html          00 · Introduction — what MDPI is + the two-axis Navigator
support-model.html  01 · Integrated / Light / Deep
methods.html        02 · Studio · Lab · Sprint · Sandbox (+ the methods matrix)
cases.html          03 · Practice cases, filterable by level & method
lessons.html        04 · Cross-cutting lessons + the five shifts
playbook.html       05 · EU Policy Labs Playbook (for practitioners)
resources.html      06 · The Navigation Kit — tools & templates
assets/css/styles.css   the whole design system (one file)
assets/js/app.js        shared nav, the Navigator toggle, case filters, mobile menu
assets/img/             NetZeroCities logo + icon mark (official brand assets)
```

### Sources fed in
Built from the D6.7 delivery report **and** the wider User Manual set: the MDPI Navigation Kit deck (the five-practice methodology on `resources.html`), the Architecture Information workbook (the folder/README information architecture), and the EU Labs README template. The delivery report remains the source of record for support tiers; the Navigation Kit is the source for the five practices.

### Branding
NetZeroCities logo sits in the sidebar (and mobile bar); the accent colour is the NZC petrol teal (`#0d5364`, sampled from the logo). The EU emblem and Horizon 2020 funding statement are in every footer. Assets live in `assets/img/`.

### The two-axis idea
The core navigation concept — read the work by **support level** *or* by **method** — lives in two places:
- the **Navigator** toggle on the homepage (`index.html`), and
- the **methods matrix** on `methods.html`.

The practice cases (`cases.html`) carry `data-tier` and `data-method` attributes so they can be filtered along both axes at once.

### "For practitioners" content
Per the agreed content policy, the candid *grey learnings* and the full Playbook are kept on the public site but in clearly-labelled **"For practitioners"** panels (the collapsible clay-edged `<details>` blocks and the Playbook page). Internal editorial ⚑ flags from the source report were removed; internal file links (SharePoint / Miro) appear as labelled placeholders.

---

## Editing

- **Content** lives directly in the HTML — edit the relevant page.
- **Navigation** is defined once, in the `NAV` array at the top of `assets/js/app.js`. Add or reorder pages there.
- **Design tokens** (colours, fonts, spacing) are CSS variables at the top of `assets/css/styles.css`. The three tier colours — clay (Integrated), teal (Light), evergreen (Deep) — are `--tier-integrated`, `--tier-light`, `--tier-deep`.

## Design notes

- **Type:** Fraunces (display), Newsreader (body), IBM Plex Mono (labels), loaded from Google Fonts with serif fallbacks. For a fully offline/self-contained deploy, self-host the fonts and drop the `<link>` tags.
- **Robustness:** content is always visible even if `app.js` fails to load or JavaScript is off — the navigation has a `<noscript>` fallback and the entrance animation is transform-only (never hides content).
- **Accessibility:** skip link, semantic landmarks, `aria-current` on the active nav item, keyboard-operable toggles, and `prefers-reduced-motion` support.

## Not included (by design)

- **Partner repository** (documents, editable templates, partial outputs) — intended to live in an access-controlled space (e.g. Notion) for NZC partners.
- **DML internal archive** — a separate internal decision.

Both are the natural next step beyond this public site.

---

_This site reflects only the authors' view. The European Commission is not responsible for any use that may be made of the information it contains. Grant Agreement No 101121530. Dissemination level: Public._
