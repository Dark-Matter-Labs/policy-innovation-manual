# Design & Content Spec — Mission Policy Innovation Navigation Kit

_Public website · NetZeroCities Task 6.5 · built from the D6.7 report_

## What this is
The **public** deliverable of three products your colleague described:
1. **This website** — public: what Mission-Driven Policy Innovation is, the formats, examples, and reflections on impact. ← built here
2. Partner repository (documents & templates) — NZC partners — *recommended: Notion, not built here*
3. DML internal archive — *separate internal decision, not built here*

## Audience & access
Public. The source report's dissemination level is **PU – Public**, so named delivery teams and case detail are fine to show. Candid *grey learnings* and the Playbook are practitioner-facing but kept public in **clearly-labelled panels** (agreed content policy). Genuinely internal material — editorial ⚑ flags, unresolved to-dos, internal file URLs — is stripped or shown as labelled placeholders.

## The organising idea: two axes
Your colleague's core IA ambition was a tree under **Integrated / Light / Deep** that could *also* be read across **Studio / Lab / Sprint / Sandbox**. Delivered as:
- an interactive **Navigator** toggle on the homepage (read by level ↔ by method), and
- a **methods matrix** (methods × support level × timescale × example) on the Methods page.
- Practice cases are tagged on **both** axes (`data-tier`, `data-method`) and filterable by each.

Mapping used throughout:

| Method | Level | Timescale |
|---|---|---|
| Policy Studio | Deep | 6 months+ |
| Policy Lab | Deep | 2–3 months |
| Policy Lab Sprint | Light | 4–6 weeks |
| Regulatory Sandbox | Deep · national | multi-year |
| (Integrated is the connective layer, not a single method) | Integrated | continuous |

## Information architecture
`00` Introduction · `01` Support Model · `02` Methods · `03` Practice Cases · `04` Lessons & Direction · `05` EU Policy Labs Playbook (practitioners) · `06` Tools & the Navigation Kit.

## Visual direction
"Clean editorial knowledge-base." Warm paper background, near-black ink, evergreen accent; functional tier colours (clay / teal / evergreen). Fraunces + Newsreader + IBM Plex Mono. Generous whitespace, hairlines, small-caps mono labels — a considered knowledge atlas, not a generic landing page.

## Tech
Static HTML/CSS/JS, no build step, deployable anywhere. Shared nav injected from a single `NAV` array in `app.js`; design tokens are CSS variables. Progressive enhancement: works without JS; never white-screens. See `README.md` for run/deploy/edit.

## Deliberately deferred
Partner repository and internal archive (products 2 & 3). Site copy is condensed and adapted from D6.7 for the web; the report remains the source of record.
