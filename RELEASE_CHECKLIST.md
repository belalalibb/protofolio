# PRE-RELEASE & DEPLOYMENT CHECKLIST
**Platform:** Belal Ali Engineering Portfolio (static site)
**Target host options:** GitHub Pages · Cloudflare Pages · Netlify · Vercel
**Last review:** 2026-10-26 (independent audit pass, branch `genspark_ai_developer`)

---

## 1. Pre-flight verification (done in this pass)

- [x] **No secrets in client files** — `index.html`, `scripts/*`, `styles/*`, `assets/*` contain no tokens, keys or credentials. The GitHub token used for pushing lives only in `~/.git-credentials` on the sandbox, never in the repo.
- [x] **Syntax** — `node --check scripts/app.js scripts/data.js` passes.
- [x] **Browser QA** — `python3 tools/qa_playwright.py`: 95/95 checks (EN/AR × 1366/820/390; modal keyboard; filters; mobile nav; form; media; XSS escaping). See `QA_REPORT.md`.
- [x] **No horizontal overflow** at 390 / 820 / 1366 px in both languages.
- [x] **No console errors / failed requests / 4xx** on load or interaction.
- [x] **Claims audited** — every number on the page is cited or marked "reported" (`REVIEW_FINDINGS.md` §3).
- [x] **Responsible disclosure** — no CAPTCHA/Turnstile/stealth/anti-ban/visa-portal content on the site (`REVIEW_FINDINGS.md` §5).
- [x] **Media** — 8 real screenshots (public-repo provenance) + 12 original SVG diagrams, all with alt/caption/width/height/lazy (`MEDIA_PLAN.md`).
- [x] **SEO/social** — `theme-color`, favicon, OG/Twitter tags with an original 1200×630 image, JSON-LD `Person`. **No canonical URL** (no confirmed domain yet).
- [x] **Fonts** — `<link rel="preconnect">` + single stylesheet with `display=swap`; no CSS `@import`.

---

## 2. Owner decisions & assets still needed

| # | Item | Current state | Action |
|---|---|---|---|
| 1 | **CV PDF** | Button reads **"Request CV"** → contact section with an explanatory note. | Add `assets/cv/Belal_Ali_CV.pdf`, change `#btn-resume-header` href and `btnResume` strings to "Download CV". |
| 2 | **Public domain** | None. OG image paths are relative; no `<link rel="canonical">`. | Once a domain exists: add canonical, make `og:image`/`twitter:image` absolute, add to JSON-LD `url`. |
| 3 | **LinkedIn / other profiles** | Only GitHub in `sameAs`. | Add to contact links and JSON-LD if desired. |
| 4 | **LICENSE** | None (README badge removed). | Choose a licence or state "all rights reserved" explicitly. |
| 5 | **Hardware photos / firmware excerpt** | SmartCore is "Reported — private source". | See `MEDIA_PLAN.md` G-1/G-2. |
| 6 | **Voice demo clip** | None. | See `MEDIA_PLAN.md` G-3. |
| 7 | **Profile photo** | Monogram "BA" used. | Optional. |
| 8 | **Contact backend** | `mailto:` only, and the form says so. | Optional: Formspree/Cloudflare Worker if real delivery is wanted; then update `formHint`/`formOpened` strings. |

---

## 3. Deploy

The site is plain static files; any host that serves `index.html` works.

```bash
# GitHub Pages (from main after merging the PR)
# Settings → Pages → Deploy from branch → main → / (root)

# Cloudflare Pages (no build step)
#   Build command: (none)   Output directory: /
```

After deploying, run the QA suite against the live URL:

```bash
python3 tools/qa_playwright.py https://<your-host>/
```

---

## 4. Not done / out of scope for this pass

- Lighthouse run on a public URL (no public URL yet; README badge removed).
- Translating `og:*` tags per language (crawlers read the static EN tags; page `<title>`/description do switch).
- Any publishing or DNS action — requires owner authorisation.
