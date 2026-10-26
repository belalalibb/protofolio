# QA REPORT — Browser Verification

**Date:** 2026-10-26 · **Branch:** `genspark_ai_developer` · **Code under test:** `scripts/*`, `styles/*`, `index.html` as of commit `69f7ec9` (unchanged by the later docs-only commits)
**Tool:** `tools/qa_playwright.py` — Playwright, headless Chromium 156 · **Server:** `python3 -m http.server 4173` from the repo root
**Result:** **95 / 95 checks passed** (`node --check` on both scripts also clean)

Re-run: `pip install playwright && python3 -m playwright install chromium && python3 tools/qa_playwright.py [base_url]` → prints PASS/FAIL lines and writes `qa_results.json` (git-ignored).

---

## Matrix

| Viewport | EN | AR | Exercised |
|---|---|---|---|
| Desktop 1366×900 | ✅ | ✅ | full interaction suite below; AR adds RTL-specific checks |
| Tablet 820×1180 | ✅ | — | horizontal overflow |
| Mobile 390×844 (touch, mobile UA) | ✅ | ✅ | overflow, single-row header, CV pill hidden, nav menu `aria-expanded` / Escape / link-close, touch targets ≥ 40 px, modal fits viewport, close button ≥ 44 px, no page errors |

---

## Checks by area (desktop EN unless stated)

### Load, i18n & persistence — 8/8
| Check | ✓ |
|---|---|
| No console / page errors on load | ✅ |
| Toggle → `html[dir=rtl][lang=ar]` | ✅ |
| `<title>` switches to Arabic | ✅ |
| `meta[name=description]` switches | ✅ |
| Hero diagram `src` swaps to `.ar.svg` | ✅ |
| Preference persisted in `localStorage` | ✅ |
| **Gradient spans survive EN→AR→EN** (2 before / 2 after) | ✅ |
| Language button has `aria-label` + `lang` | ✅ |

### Content honesty & responsible disclosure — 21/21
| Check | ✓ |
|---|---|
| Hero metrics contain no `<800ms`, `0%`, `100%` | ✅ |
| 4 hero metrics, each with a source line | ✅ |
| Header button reads "Request CV" → `#contact`; CV note visible in contact | ✅ ✅ |
| 4 flagship cards, 5 supporting cards | ✅ ✅ |
| Status badge **and** evidence badge on every flagship | ✅ |
| None of: CAPTCHA, Turnstile, EzSolver, embassy/Embassy, passport, anti-ban/Anti-Ban, stealth/Stealth, bypass/Bypass, 45-minute, Production Ready, `<800`, `< 800` anywhere in page text (16 checks) | ✅ |

### Media — 4/4
| Check | ✓ |
|---|---|
| 9 `<img>` in media figures all have `alt`, `width`, `height`, `decoding=async` | ✅ |
| All non-hero media `loading="lazy"` | ✅ |
| No broken images after full-page scroll (`naturalWidth > 0`) | ✅ |
| ≥ 9 `<figcaption>` present | ✅ |

### Case-study modal (keyboard & focus) — 15/15
| Check | ✓ |
|---|---|
| Opens on "Read case study" | ✅ |
| **Focus moves to close button** | ✅ |
| `main`, header (and footer) get `inert`; `body.modal-open` scroll lock | ✅ ✅ |
| QEVION modal shows the real `async def interrupt(` excerpt; fabricated `abort_agent_speech_stream` absent | ✅ |
| QEVION modal states the real 86 s soak; no "45-minute" | ✅ |
| ≥ 3 evidence links; ≥ 3 media figures in modal | ✅ ✅ |
| 15 × Tab stays inside dialog; Shift+Tab stays inside | ✅ ✅ |
| Escape closes; focus restored to the trigger button | ✅ ✅ |
| `inert` removed; `aria-hidden="true"` restored on backdrop | ✅ ✅ |
| Backdrop click closes | ✅ |

### Lab filters & icons — 5/5
| Check | ✓ |
|---|---|
| 5 filter buttons rendered with `aria-pressed` | ✅ |
| IoT → 2 cards, button pressed; AI → 2 cards, exactly one pressed; All → 6 cards | ✅ ✅ ✅ |
| 4 distinct pillar SVG icons | ✅ |

### Contact form — 6/6
| Check | ✓ |
|---|---|
| Empty submit → error banner, no success | ✅ |
| Invalid email → error banner, focus moves to email field | ✅ |
| Valid submit → **info** banner ("mail app should be open…"), message text **kept** | ✅ |
| Hint explains "no server" / "mail app" | ✅ |
| "Copy email address" → feedback banner | ✅ |
| Footer year = current year | ✅ |

### Structure, a11y & security — 4/4
| Check | ✓ |
|---|---|
| No heading-level skips; exactly one `<h1>` | ✅ ✅ |
| First Tab lands on the skip link | ✅ |
| **XSS probe:** injecting `<img onerror>` into a data title renders as text, `window.__pwned` unset | ✅ |

### Mobile 390 px — EN 10/10, AR 10/10
No overflow · CV pill hidden & toggle visible · header ≤ 80 px · menu opens with `aria-expanded=true` · Escape closes · nav-link click closes · all visible controls ≥ 40 px · modal fits 390×844 · close button ≥ 44 px · no errors.

### Tablet 820 px — 1/1
No horizontal overflow.

### Arabic / RTL specifics (desktop) — 8/8
Code box LTR · tech tags LTR · email LTR · metric values LTR · no U+FFFD · contact heading "لنبنِ" (typo "لن ابنِ" gone) · timeline tags translated · lab categories translated.

### Wrap-up — 1/1
No console / page errors after the whole interaction sequence.

---

## Defects found during this pass and fixed before sign-off

| # | Symptom | Root cause | Fix | Verified by |
|---|---|---|---|---|
| 1 | Hero gradient spans vanished after EN→AR→EN | `applyLanguage()` wrote `textContent` over nested markup | `data-i18n-html` channel fed only from the internal dictionary | "gradient spans survive" |
| 2 | Focus stayed on `<body>` after opening the modal | `.modal-close` / `.modal-dialog` used `transition: all`, delaying the *inherited* `visibility` change by 250 ms so `focus()` was refused; applying `inert` before focusing also blurred to body | transitions scoped to transform/colour; `.modal-dialog *` transition-property whitelist; focus **before** `inert`; style flush + rAF re-assert | "focus moves to close button", trap/restore |
| 3 | Close button 38 px tall on mobile | 36 px box | 44 px | "[mobile] close button ≥44px" |
| 4 | AR latency-diagram legend rendered off-canvas | `text-anchor` not mirrored under `direction="rtl"` | RTL branch in `tools/diagram_specs.py` | `rsvg-convert` render inspected |
| 5 | Contact banner claimed success and wiped the form | `form.reset()` + "Thank you!" on a `mailto:` hand-off | validation, info banner, no reset, explanatory hint, copy-email fallback | contact-form checks |
| 6 | Lazy images looked empty in full-page captures | expected `loading="lazy"` behaviour, not a bug | — (confirmed `naturalWidth > 0` after scroll) | "no broken images" |

## Visual review (manual, headless screenshots; not committed)

- EN and AR desktop hero: two-column (copy + interruption diagram) with the proof strip beneath; AR mirrored correctly, Latin identifiers remain LTR.
- Flagship cards: real screenshots and diagrams render with captions; 3-item galleries use a 1 + 2 layout on desktop and stack on mobile.
- OG cover renders without text/diagram collision after the second layout pass.

## Not covered (honest limits)

- Real screen-reader (NVDA / VoiceOver) pass — only DOM/ARIA state was asserted.
- Lighthouse / Web Vitals — requires a public URL; none exists yet.
- Firefox / Safari — Chromium only.
- The OS hand-off of `mailto:` to a mail client cannot be observed headlessly; the URL construction and banner were asserted.
- Colour contrast was improved by token choice (`--text-muted` → `#8290a8`) and spot-checked, not audited element-by-element.
