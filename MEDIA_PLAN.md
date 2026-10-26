# MEDIA PLAN — Portfolio Visual Evidence

**Scope:** every image, diagram and icon shipped under `assets/`, where it came from, what it proves, and what is still missing.
**Policy:** no stock imagery, no AI-generated "product shots", no fabricated demos. Screenshots are captures committed in the owner's **public** repositories; diagrams are **original** SVGs generated from a Python spec (`tools/gen_diagrams.py` + `tools/diagram_specs.py`) so they can be regenerated and are bilingual.

---

## 1. Directory layout

```
assets/
├── screenshots/   8 × .webp   real UI captures from public repos (quality 82, PIL method 6)
├── diagrams/     12 × .svg    6 original diagrams × {en, ar}
├── icons/         favicon.svg, apple-touch-icon.png
└── og/            og-cover.png (1200×630, original composition)
```

Media component: `renderMedia()` / `renderGallery()` in `scripts/app.js` → `<figure class="media-figure"><div class="media-frame" style="aspect-ratio"><img loading="lazy" decoding="async" width height alt></div><figcaption></figure>`. Diagrams are declared once with a base path and the component appends `.en.svg` / `.ar.svg`; `applyLanguage()` swaps `src` on language change. The hero diagram is `loading="eager"`; everything below the fold is lazy.

---

## 2. Screenshots (real, public-repo provenance)

| File | Project | Source (public repo path) | Native size | Shown where | Purpose |
|---|---|---|---|---|---|
| `qevion-operator-console-desktop.webp` | QEVION | `belalalibb/markting_call_center` → `evidence/P4/CP-0017/ui_smoke.desktop.png` | 1280×900 | Card + modal | Proves a working operator UI (session controls, live transcript, handoff queue). |
| `qevion-operator-console-mobile.webp` | QEVION | `…/evidence/P4/CP-0017/ui_smoke.mobile.png` | 390×844 | Card + modal | Same build at phone width — responsive claim. |
| `gac-command-center-topology.webp` | general_ai_core | `belalalibb/general_ai_core` → `evidence/r185/command_center_r185_desktop.png` (cropped to 1280×900) | 1280×900 | Card + modal | Service topology / health surface exists and is tested with Playwright. |
| `gac-workbench-models.webp` | general_ai_core | `…/evidence/r199/workbench_models_truth.png` | 1280×900 | Card + modal | Provider/model registry UI. |
| `gac-capability-catalog.webp` | general_ai_core | `…/evidence/completion_v2/browser/F_capabilities.png` | 1360×936 | Modal | Capability catalog grid. |
| `chat-engine-welcome-ar-dark.webp` | chat_engine | `belalalibb/chat_engen` → `evidence/ce13b/*.png` | 1360×860 | Modal | Arabic-first RTL UI, dark theme. |
| `chat-engine-live-gateway-ar.webp` | chat_engine | `…/evidence/ce20/chat_live_gateway.png` | 1360×860 | Modal | Live conversation through the multi-provider gateway. |
| `chat-engine-admin-providers.webp` | chat_engine | `…/evidence/ce13b/*.png` | 1360×860 | Modal | Admin surface for provider keys/health. |

All eight have bilingual `alt` and `caption` fields in `scripts/data.js` (`projects[].media[]`). Captions state the evidence ID (e.g. "CP-0017", "r185") so a reader can locate the original.

---

## 3. Original diagrams (generated, bilingual)

| Base name (`assets/diagrams/<name>.{en,ar}.svg`) | Project | Shown where | What it depicts | Source of truth |
|---|---|---|---|---|
| `qevion-interruption-sequence` | QEVION | **Hero visual**, OG cover | Sequence: user speech onset (t0) → barge-in detected (t1) → cancel sent (t2) → playout stopped (t3) → state reconciled (t4); measured p50 4 ms / p95 6 ms (mock provider). | `qevion/core/session.py` `Session.interrupt()`; `evidence/P4/CP-0015`. |
| `qevion-architecture` | QEVION | Card + modal | Browser AudioWorklet → WebSocket → FastAPI gateway → Session core / turn plane / facts store → role ports → provider adapters; blueprints as data. | `QEVION_PLATFORM_SPEC_v3.md`, `.importlinter`. |
| `qevion-latency-breakdown` | QEVION | Available (not on a card yet; linked from case study text) | Where ≈1.09 s of a no-tool turn goes: 503 ms end-of-turn silence window, 441 ms provider first audio, 61 ms network, 75 ms browser; QEVION-owned ≈3 ms. | `docs/audit/LATENCY_ROOT_CAUSE_2026-09-24.md`. |
| `ai-orchestration-platform` | general_ai_core + chat_engine | Card + modal | Clients → OpenAI-compatible gateway (SSE) → core packages (contracts, routing, capabilities) → provider adapters → observability. | Repo structure, ADR index, `.importlinter`. |
| `smartcore-edge-controller` | SmartCore | Card + modal | Field I/O on RS-485 Modbus bus → ESP32 controller with local rules → optional cloud mirror (Firebase RTDB) → dashboard. **Labelled "reported architecture".** | Previous agent's documentation only (source private). |
| `concurrent-workflow-pattern` | Concurrent Workflow Engine | Card + modal | Scheduler → thread-safe ClientPool → bounded worker pool with backoff/jitter → dual-sink logging → operator notifications. **Pattern only; no target-system details.** | Previous agent's documentation only (source private). |

RTL variants mirror text anchors and use `direction="rtl" unicode-bidi="plaintext"`; Latin identifiers stay LTR. Regenerate with `python3 tools/gen_diagrams.py`; verify with `rsvg-convert`.

---

## 4. Brand assets

| File | Notes |
|---|---|
| `icons/favicon.svg` | "BA" monogram on the site gradient, 64×64 viewBox, referenced with `type="image/svg+xml"`. |
| `icons/apple-touch-icon.png` | 180×180 raster of the favicon. |
| `og/og-cover.png` | 1200×630. Composed in Python/PIL from the site identity plus a dimmed render of the interruption-sequence diagram. Text: name, title, headline, four verifiable proof pills, GitHub handle. No photo. |

---

## 5. Gaps — media the owner should supply

Nothing below has been faked or substituted. Each item is a clear slot the owner can fill; until then the site states the limitation in text.

| # | Asset | Project | Why it matters | Where it would go |
|---|---|---|---|---|
| G-1 | Photos of real hardware (ESP32 board, RS-485 wiring, sensors, greenhouse/panel installation) | SmartCore / solar tracker / pest trap | The only flagship with **zero** first-party visual evidence; status is "Reported". A single phone photo would move it from reported to demonstrated. | `assets/photos/smartcore-*.webp`, card gallery + modal. |
| G-2 | Firmware excerpt or register-map header | SmartCore | The modal currently shows an *illustrative* register layout, explicitly labelled as such. | `DETAILED_CASE_STUDIES.smartcore.codeSnippet`. |
| G-3 | Short voice recording or screen capture (10–20 s) of a QEVION turn with a barge-in | QEVION | Voice is the headline capability and currently only shown via UI stills and diagrams. Must be a real session (mock or live), with consent if a real caller. | `assets/media/qevion-barge-in.webm` + poster; media component `type: "video"` (not yet implemented — add when an asset exists). |
| G-4 | PDF CV | Profile | Button now reads "Request CV" and the contact section explains availability on request. | `assets/cv/Belal_Ali_CV.pdf`; relabel button back to "Download CV". |
| G-5 | Redacted log excerpt / console screenshot | Concurrent Workflow Engine | Would demonstrate the dual-sink logging claim without exposing targets or personal data. | Modal media. |
| G-6 | AI_MDULE screenshot (if any exists) | AI_MDULE | Supporting tier only; low priority. | Supporting card (would need a small media slot). |
| G-7 | Profile photo | Profile | Optional; many engineering portfolios omit it. If added, use in hero and OG. | `assets/profile/`. |
| G-8 | LinkedIn / public domain | Profile / SEO | No canonical URL or `sameAs` beyond GitHub can be set truthfully yet. | `index.html` head, JSON-LD. |
| G-9 | LICENSE file | Repo | README previously claimed MIT with no LICENSE; badge removed. Owner's decision. | repo root. |

---

## 6. Rules for adding media later

1. Put the file under `assets/<kind>/`, kebab-case, WebP for raster (≤ 200 KB, quality 80–85), SVG for diagrams.
2. Add an entry to the project's `media[]` in `scripts/data.js` with `type`, `src`, `width`, `height`, bilingual `alt` and `caption`. The caption should name the evidence source (file, CP id, date).
3. Never upscale, retouch content, or crop away context that changes meaning. Redact personal data before committing.
4. For diagrams, edit `tools/diagram_specs.py` and regenerate — do not hand-edit SVGs.
5. Run `python3 tools/qa_playwright.py` — it checks `alt`/`width`/`height`/`decoding`, lazy loading and broken images.
