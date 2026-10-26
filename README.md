# Belal Ali — Engineering Portfolio

> **AI Systems & Automation Engineer** — real-time voice runtimes, multi-provider LLM orchestration, resilient concurrent automation, embedded & IoT.
> *Resilient systems from the physical edge to real-time AI.*

A static, dependency-free, bilingual (English / Arabic) portfolio. Every figure shown on the site is either measured in one of the owner's **public** repositories and cited to its evidence file, or explicitly labelled **"reported"** when the source is private and could not be inspected. See `REVIEW_FINDINGS.md` for the audit that established this.

---

## What's in the site

- **Hero** with an honest proof strip (runtime overhead per voice turn, barge-in stop latency, eval graders, test counts) and an original interruption-sequence diagram.
- **Selected work:** four flagship systems (QEVION, general_ai_core + chat_engine, SmartCore, Concurrent Workflow Engine) with maturity badges (`prototype` / `demo` / `tested` / …) and evidence badges (`Public repo — verified` / `Reported — private source`), real screenshots, original diagrams and case-study modals with source excerpts and evidence links. Five supporting projects in a compact grid.
- **Expertise, approach, timeline, lab** (filterable experiments) and a **contact** section whose form openly explains it is a `mailto:` handoff (no server).
- **Bilingual** EN/AR with persisted preference, RTL layout, LTR islands for code/numbers/emails, and bilingual SVG diagrams swapped on language change.
- **Accessibility:** skip link, focus-managed modal (`inert`, focus trap, Escape, focus restore), `aria-pressed` filters, `aria-expanded` mobile menu, ≥ 40 px touch targets, reduced-motion support.

---

## Run locally

```bash
python3 -m http.server 4173 --bind 0.0.0.0
# open http://localhost:4173
```

No build step. No framework. No tracking.

---

## Quality gates

```bash
node --check scripts/app.js scripts/data.js          # syntax
pip install playwright && python3 -m playwright install chromium
python3 tools/qa_playwright.py                       # 95 browser checks (EN/AR × desktop/mobile/tablet)
python3 tools/gen_diagrams.py                        # regenerate assets/diagrams/*.svg
```

Latest run: see `QA_REPORT.md`.

---

## Repository structure

```
index.html                 semantic document, meta/OG/JSON-LD, section shells
styles/main.css            design tokens, layout, media component, badges, modal
styles/rtl.css             Arabic RTL overrides and LTR islands
scripts/data.js            PORTFOLIO_DATA — all bilingual content, media entries, status vocabulary
scripts/app.js             UI_STRINGS, DETAILED_CASE_STUDIES, App (i18n, render, modal, form)
assets/screenshots/        8 real UI captures (WebP) from public repos
assets/diagrams/           6 original diagrams × {en,ar} (SVG, generated)
assets/icons/, assets/og/  favicon, touch icon, OG cover
tools/gen_diagrams.py      SVG helper + runner
tools/diagram_specs.py     diagram content (EN/AR)
tools/qa_playwright.py     headless QA suite

REVIEW_FINDINGS.md         independent audit: bugs, claims, media gaps, UX, decisions
MEDIA_PLAN.md              provenance of every asset + what is still missing
QA_REPORT.md               latest browser test results
CASE_STUDIES.md            long-form case studies (aligned with the site)
PROJECT_INVENTORY.md       maturity/evidence registry (with review disclaimer)
PORTFOLIO_DISCOVERY.md, PERSONAL_BRAND_STRATEGY.md, PORTFOLIO_CONTENT.md,
DESIGN_SYSTEM.md, ARCHITECTURE.md, RELEASE_CHECKLIST.md
```

---

## Adding or changing content

1. Edit `scripts/data.js`. Use the fixed `status` vocabulary (`concept | prototype | demo | tested | field-tested | deployed | production`) and set `evidence` to `public` only when the claim can be checked in a public repo.
2. For media, follow `MEDIA_PLAN.md` §6 (WebP/SVG, bilingual `alt` + `caption`, cite the source).
3. For a new case study, add an entry to `DETAILED_CASE_STUDIES` in `scripts/app.js`; code snippets must be real excerpts (say so in `codeFile`) or clearly labelled as illustrative.
4. Run the QA suite before committing.

---

## Status and licence

No LICENSE file is included yet; choosing one is the owner's decision (see `MEDIA_PLAN.md` G-9). The site is not yet published to a public domain, so no canonical URL is set.

Designed and engineered by **Belal Ali (بلال علي)**; independent review pass October 2026.
