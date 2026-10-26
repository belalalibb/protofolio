# ENGINEERING CASE STUDIES

**Version:** 2 (2026-10-26, independent review pass) · Previous version archived at `docs/archive/CASE_STUDIES_v1_unverified.md`.
**Rule:** every statement is tagged by evidence level — **[verified]** = checked in a public repository by the reviewer, with the file named; **[reported]** = owner's/previous agent's description, source not accessible to the reviewer. Where a figure was found to be wrong or unsupported, the correct figure (or the absence of one) is stated.

Each study answers the ten questions a reader needs: problem · who it's for · constraints · what was built · architecture · key decisions · what was measured · what wasn't · maturity · what's next.

---

## Case Study 1 — QEVION: Real-Time Voice Agent Runtime

**Repo:** `github.com/belalalibb/markting_call_center` (public) · **Status on site:** `tested` / `public` · **Timeframe:** 2025–2026

### 1. Problem
Generic conversational-AI wrappers add seconds of latency, lock the product to a single vendor, and allow the model to improvise business facts (prices, eligibility, confirmations). In Egyptian Arabic, natural turn-taking and barge-in are additionally fragile. **[verified: spec §1–§3]**

### 2. Who it is for
Businesses that want a voice agent for inbound/outbound calls where the *conversation* may be generative but the *decisions* must be deterministic and auditable. **[verified: spec, activity blueprint examples]**

### 3. Constraints
- Provider-neutral: OpenAI Realtime today, others via role ports (`s2s`, `llm`, `asr`, `tts`, `turn`, `decision`). **[verified]**
- Core must contain no domain vocabulary; domain behaviour is data (`qevion.activity.v1` blueprints). Enforced by 5 `import-linter` contracts. **[verified: `.importlinter`]**
- Latency criteria pre-registered in spec §41: E2E p50 ≤ 1200 ms (stretch ≤ 800), barge-in stop ≤ 60 ms. **[verified]**

### 4. What was built
- 160,984-byte normative spec `QEVION_PLATFORM_SPEC_v3.md` (1,544 lines) with QV-* rule IDs and ADR-0001…0004. **[verified]**
- FastAPI/WebSocket gateway, `Session` core with turn plane, `FieldStore` facts store, provider adapters (OpenAI Realtime + mock), browser client with AudioWorklet PCM16 capture, Silero VAD turn-taking. **[verified: `qevion/` tree]**
- Operator Console (desktop + mobile) — see screenshots. **[verified: `evidence/P4/CP-0017`]**
- ~222 tests across 26 files. **[verified]**

### 5. Architecture
See `assets/diagrams/qevion-architecture.{en,ar}.svg` (original, drawn from the spec). Browser → WS → gateway → Session (turn plane · interruption · facts) → role ports → providers; blueprints are loaded as data.

### 6. Key decisions
- **ADR-0004 — LLM output is never business truth.** Prices/claims/transitions are produced by deterministic code from `FieldStore`; the model only proposes phrasing. **[verified]**
- **Interruption as a first-class protocol.** `Session.interrupt()` runs DETECT → CANCEL → RECONCILE with watermarks t0..t4; cancel sends `provider.cancel_response` + `STOP_PLAYOUT` with a 300 ms forced path; reconcile keeps only the text the user plausibly heard and truncates the provider's context to match. **[verified: `qevion/core/session.py` L616–668]**
- **Evidence culture.** Pre-registered criteria, "NOT PROVEN → REVERTED" notes, UNVERIFIED tags in the owner's own audits. **[verified: `docs/audit/`]**

### 7. What was measured
| Metric | Value | Conditions | Source |
|---|---|---|---|
| QEVION-owned overhead per turn | ≈ 3–4 ms | sandbox, n = 20 | `docs/audit/LATENCY_ROOT_CAUSE_2026-09-24.md` **[verified]** |
| E2E p50 / p95, no-tool turns | 1011 / 1308 ms | sandbox, Chromium, synthetic ar-EG clips, n = 20 | same **[verified]** |
| E2E p50, tool turns | 2614 ms | same | same **[verified]** |
| Barge-in t1→t3 (detect → playout stopped) p50 / p95 | 4 / 6 ms | **mock provider** | `evidence/P4/CP-0015` **[verified]** |
| Live TTFA (text → first audio) | 453 / 968 / 965 ms | OpenAI Realtime, 3 samples | `evidence/live/` **[verified]** |
| Eval CP-0009 | 22/22 scenarios, 232/232 graders incl. `facts_not_invented` | mock | `evidence/P2/CP-0009` **[verified]** |
| WebSocket soak | **86 s** (target 75 s), 7 heartbeats, close 1000 | live OpenAI, browser | `evidence/live/browser_voice_smoke_openai.json` **[verified]** |
| WS keep-alive tests | 8 s and 22 s | pytest | `tests/test_ws_keepalive.py` **[verified]** |

### 8. What was *not* measured / corrected claims
- **"< 800 ms speech-to-speech" — not supported.** 800 ms is the spec's *stretch* target; measured E2E p50 is ≈ 1.0 s and ≈ 95 % of it is the provider. Removed from the site.
- **"0 % hallucination rate" — not a measured rate.** What exists is a design rule (ADR-0004) plus a passing eval (232/232). Reworded accordingly.
- **"45-minute zero-drop soak" — does not exist in the repo.** The longest soak is 86 s. Removed.
- The code snippet previously shown (`abort_agent_speech_stream`, `record_interruption_metric`) **does not exist**; replaced with a trimmed excerpt of the real `interrupt()`.
- Barge-in numbers are from a **mock** provider; live-provider barge-in has not been characterised.

### 9. Maturity
`tested` — automated tests and evidence artefacts exist; no production traffic is documented. Authorship in the repo is predominantly AI-agent accounts with the owner as director/approver, i.e. AI-assisted engineering directed by the owner.

### 10. Next
Live-provider barge-in characterisation; longer soak (≥ 10 min) with a documented harness; second provider adapter to prove neutrality in practice.

---

## Case Study 2 — general_ai_core + chat_engine: Multi-Provider AI Platform

**Repos:** `github.com/belalalibb/general_ai_core`, `github.com/belalalibb/chat_engen` (public) · **Status:** `tested` / `public` · **Timeframe:** 2025–2026

### 1. Problem
Use many LLM providers behind one API without rewriting clients, keep the architecture modular as capabilities grow, and ship a UI that is Arabic-first rather than translated as an afterthought. **[verified: README / MASTER_VISION doc]**

### 2. Who it is for
Developers and small teams needing an OpenAI-compatible endpoint with provider fallback, plus an operator/admin surface.

### 3. Constraints
Contract-first core; architectural boundaries enforced by tooling; evidence screenshots per release.

### 4. What was built
- `general_ai_core`: 22 core packages, 12 ADRs, **12 import-linter contracts**, ≈ **3,758** tests in 284 files, 65 Playwright evidence screenshots (Workbench, Command Center, Admin). **[verified]**
- `chat_engine`: OpenAI-compatible `/v1` API with SSE streaming over a **14-provider** gateway (gateway, groq, genspark_llm, …); Lit web UI with RTL Arabic, dark/light themes; admin providers panel; evidence sets ce13b / ce20 / ce24 with a state ledger. **[verified]**

### 5. Architecture
`assets/diagrams/ai-orchestration-platform.{en,ar}.svg`: clients → gateway (SSE) → core (contracts · routing · capabilities) → provider adapters → observability.

### 6. Key decisions
Contract-first packages with linter-enforced boundaries; OpenAI-compatible surface so existing SDKs work unchanged; Arabic as the default UI language.

### 7. What was measured
Test counts and contract counts above; UI states captured by Playwright per release (r185, r199, completion_v2). No latency or throughput benchmarks are published. **[verified]**

### 8. Not measured
Provider failover timing, cost per request, concurrency limits.

### 9. Maturity
`tested`. Public, documented, actively evolving.

### 10. Next
Publish a benchmark table (TTFT per provider), a hosted demo, and an architecture doc index linking ADRs to packages.

---

## Case Study 3 — SmartCore: Offline-First Building & Greenhouse Controller

**Source:** private (`smart_tech/SmartCore`, `smart_farm` per inventory) · **Status:** `prototype` / `reported` · **Timeframe:** 2021–2026

### 1. Problem
Greenhouses and small buildings with unstable power/connectivity cannot depend on cloud round-trips for irrigation, ventilation or lighting. **[reported]**

### 2. Who it is for
Small agricultural operators and building owners in low-connectivity environments. **[reported]**

### 3. Constraints
Local control loop must keep running offline; industrial fieldbus compatibility (Modbus RTU / RS-485); low-cost hardware (ESP32). **[reported]**

### 4. What was built
ESP32 firmware in C++17 on ESP-IDF with FreeRTOS tasks; Modbus RTU register map for PLC interoperability; HAL mirroring telemetry to Firebase RTDB for a web dashboard. Grew out of Arduino experiments (dual-axis LDR solar tracker, soil-moisture irrigation, IR pest-trap counter) shown in the Lab. **[reported]**

### 5. Architecture
`assets/diagrams/smartcore-edge-controller.{en,ar}.svg`, explicitly labelled *reported architecture*.

### 6. Key decisions
Cloud as mirror, not dependency; standard fieldbus over proprietary links; register map as the integration contract. **[reported]**

### 7. What was measured
**Nothing the reviewer could verify.** The previous version claimed "100 % uptime during simulated outages", "< 50 ms cycle times" and "Field Deployed"; no firmware, logs, photos or register map were accessible. These figures are **not** on the site.

### 8. Not measured / open
Uptime, cycle time, power consumption, deployment count.

### 9. Maturity
`prototype` — prototype firmware and lab hardware, by the owner's account.

### 10. Next
Commit a redacted firmware excerpt and the register-map header; add photos of the hardware (see `MEDIA_PLAN.md` G-1/G-2). Either step would move the status from *reported* to *demonstrated*.

---

## Case Study 4 — Concurrent Workflow Engine: Resilient Browser Automation

**Source:** private · **Status:** `demo` / `reported` · **Timeframe:** 2024–2026

> **Scope note.** The previous version presented this as an embassy visa-appointment booking tool with a Cloudflare Turnstile solver. Automating a government portal, defeating anti-bot controls and processing third-party passport data raise legal, privacy and professional-credibility concerns and do not belong in a public portfolio. This case study therefore presents **only the reusable engineering pattern**. No target system, solving time, booking outcome or client count is stated.

### 1. Problem
Long-running browser/form workflows that process many records in parallel fail predictably: two workers pick the same record, upstream rate limits cause cascading errors, and failures at 3 a.m. leave no trace to debug from. **[reported]**

### 2. Who it is for
Operators running batch form workflows against slow or rate-limited upstreams.

### 3. Constraints
Exactly-once processing per record; respect upstream rate limits; operator must not be tied to a terminal.

### 4. What was built
Thread-safe `ClientPool` leasing each record to exactly one worker under a lock; bounded `ThreadPoolExecutor`; idempotent retries with exponential backoff + Gaussian jitter; dual-sink logging (console milestones + microsecond traces on disk); Telegram notifications. **[reported]**

### 5. Architecture
`assets/diagrams/concurrent-workflow-pattern.{en,ar}.svg`.

### 6. Key decisions
Lease-not-queue to make double-processing structurally impossible; jittered backoff to avoid thundering herds; two log sinks with different audiences.

### 7. What was measured
Nothing verifiable. No logs or source were accessible.

### 8. Not measured / removed
Solving times, success rates, "hundreds of clients" — all removed.

### 9. Maturity
`demo`.

### 10. Next
A redacted log excerpt demonstrating the dual-sink pattern would be the single most useful artefact (`MEDIA_PLAN.md` G-5).

---

## Supporting projects (brief)

| Project | Status | Evidence | Note |
|---|---|---|---|
| AI_MDULE — multi-provider RAG gateway | `prototype` | reported | Precursor to general_ai_core; browser-bridge/Cloudflare framing removed. |
| WhatsApp AI campaign dispatcher | `demo` | reported | "Anti-ban" wording removed; described as rate-aware scheduling. |
| WebDev AI Editor CLI | `prototype` | reported | — |
| Real-time expense/asset ERP (Flask + SocketIO) | `demo` | reported | — |
| Account session manager — Chrome MV3 extension | `demo` | reported | Personal tool; previously labelled "official / Production Ready". |

---

## How this document relates to the site

`scripts/data.js` → card content, metrics, badges, media. `scripts/app.js` → `DETAILED_CASE_STUDIES` (modal text, source excerpts, evidence links). This file is the long-form companion and must be updated together with them. Statements must keep their **[verified]/[reported]** tags; upgrading a tag requires naming the public artefact that supports it.
