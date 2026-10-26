# PROJECT INVENTORY & EVIDENCE REGISTRY
**Engineer:** Belal Ali (بلال علي)  
**Standardized Maturity Scale:** Concept · Prototype · In Development · Functional Demo · Tested · Production-Ready  
**Evidence Level Scale:** Proven (Direct verifiable code & tests) · Plausible (Functional code without automated tests) · Unknown  

> **⚠️ Independent review notice (2026-10-26).** This inventory was compiled by the previous agent from a local workspace (`D:\projects`) that the reviewer could **not** access. Only three projects could be checked against public repositories: **QEVION** (`markting_call_center`), **general_ai_core** and **chat_engen** — all three confirmed. For every other entry the "Evidence: Proven" labels, maturity levels (e.g. "Field Deployed", "Production-Ready") and the §5 scorecard are the previous agent's **self-assessment, not independently verified**. The live site therefore uses the stricter vocabulary from `scripts/data.js` (`status` + `evidence: public|reported`), and `REVIEW_FINDINGS.md` §3 lists each claim that was qualified or removed. Operational details of BMEIA/EzSolver (visa-portal automation, Turnstile solving) are intentionally **not** presented on the site; see `REVIEW_FINDINGS.md` §5.
>
> Mapping to site status: QEVION → `tested / public`; AI_MDULE → supporting, `prototype / reported` (succeeded by general_ai_core + chat_engine → `tested / public`, added as flagship); SmartCore → `prototype / reported`; BMEIA → reframed as "Concurrent Workflow Engine", `demo / reported`; Genspark extension → `demo / reported` (personal tool, not "official").

---

## 1. Tier A — Flagship Projects (Primary Case Studies)

These are the most architecturally profound and practically tested systems built by Belal Ali. They receive prominent placement, comprehensive case studies, and architecture diagrams.

### 1.1 QEVION — Real-Time Voice Agent & Activity Platform
- **Directory:** `AI_markting/JS_AI_CORE/call_center/call_center_v2`
- **Timeframe:** 2025 – 2026
- **Domain:** Real-Time AI Engineering / Voice Orchestration
- **Problem Solved:** Existing voice AI systems suffer from high latency, rigid vendor lock-in, hallucinations on business logic, and inability to handle natural interruptions in Arabic (`ar-EG`).
- **Core Architecture:**
  - Decoupled 3-tier architecture: Copilot (Activity Blueprint generation) vs. Generic Core Runtime.
  - Core imports contracts only; enforced via `import-linter` gate.
  - Deterministic guardrails: LLM output is never business truth; prices, eligibility, and state transitions are hard-governed.
  - Real-time voice pipeline: AudioWorklet PCM16 streaming over WebSockets, OpenAI Realtime API integration, Silero VAD, 7-step interruption recovery.
  - Provider role ports: `s2s`, `llm`, `asr`, `tts`, `turn`, `decision`.
- **Technologies:** Python 3.13, FastAPI, Uvicorn, WebSockets, OpenAI Realtime API, Silero VAD, Pytest, Ruff.
- **Maturity Level:** **Tested / High Architectural Maturity**
- **Evidence Level:** **Proven** (160KB formal specification `QEVION_PLATFORM_SPEC_v3.md`, Architecture Decision Records ADR-0001..0004, recovery protocols, clean pytest suites).
- **Public Suitability:** High (Safe architectural presentation without exposing client keys or proprietary training audio).

---

### 1.2 AI_MDULE — Multi-Provider AI Orchestration & RAG Platform
- **Directory:** `AI_markting/ai_mdule-master`
- **Timeframe:** 2025 – 2026
- **Domain:** AI Engineering & Semantic Search
- **Problem Solved:** High cost of commercial LLM APIs, lack of fallback resiliency when endpoints fail, and lack of domain-aware semantic grounding for enterprise queries.
- **Core Architecture:**
  - Two-stage Domain Classification engine with confidence thresholding.
  - Vector search ingestion pipeline using Qdrant vector database and multilingual embeddings (`paraphrase-multilingual-mpnet-base-v2`).
  - Multi-provider fallback manager (OpenAI, Anthropic, Gemini, Groq, Together).
  - Custom Browser Bridge Provider: Reverse-engineered SeleniumBase headless browser driver to interface with DeepSeek & Gemini web portals with Cloudflare Turnstile bypass and DOM MutationObserver response streaming.
- **Technologies:** Python, FastAPI, Qdrant, Docker, Redis, Celery, SeleniumBase (`uc=True`), BeautifulSoup, Sentence-Transformers.
- **Maturity Level:** **Tested**
- **Evidence Level:** **Proven** (Documented in extensive CHANGELOG, 30+ architectural and debugging lessons, Docker compose configuration, REST API endpoints).
- **Public Suitability:** High (Cleaned of raw tokens).

---

### 1.3 SmartCore Platform — Industrial IoT & Building Operating System
- **Directory:** `smart_tech/SmartCore` & `smart_farm`
- **Timeframe:** 2021 – 2026
- **Domain:** Industrial IoT, Embedded Systems & AgriTech
- **Problem Solved:** Fragility of cloud-dependent smart building / smart farm controllers when network connectivity fails, and lack of standardized industrial fieldbus support.
- **Core Architecture:**
  - Offline-first architecture with asynchronous cloud synchronization.
  - Embedded firmware in C++17 utilizing ESP-IDF v5.3 for ESP32 microcontrollers.
  - Modbus RTU protocol over RS-485 industrial bus as primary fieldbus (`smartcore_modbus_regs.h`).
  - Hardware abstraction layer mirroring device states to Firebase Realtime Database for web monitoring.
  - Integrated sensor subsystems: soil moisture arrays, dual-axis solar trackers, weight load cells, environmental telemetry.
- **Technologies:** C++17, ESP-IDF, FreeRTOS, Modbus RTU / RS-485, Arduino, Firebase RTDB, HTML5/CSS dashboards.
- **Maturity Level:** **Tested / Field Deployed**
- **Evidence Level:** **Proven** (Firmware code, Modbus register map specifications, hardware `.ino` controllers, live dashboard implementations).
- **Public Suitability:** High.

---

### 1.4 BMEIA Auto-Booking Engine & High-Concurrency Resiliency System
- **Directory:** `BEIMA_AUTO` & `cloude_flare_bybass`
- **Timeframe:** 2024 – 2026
- **Domain:** Resilient Automation, Anti-Bot & Reverse Engineering
- **Problem Solved:** Mission-critical visa appointment slots at the Austrian Embassy (Cairo) open unpredictably for seconds, overwhelmed by millions of requests and protected by complex captcha challenges.
- **Core Architecture:**
  - Multi-threaded booking orchestrator with thread-safe `ClientPool` utilizing mutex locks.
  - Automated captcha solving pipeline integrated into the transaction flow.
  - Resilient session recovery, exponential backoff with jitter to evade rate limiting.
  - Real-time multi-sink logging (synchronized console output + debug file tracing).
  - EzSolver integration: Standalone Cloudflare Turnstile automated solver driven by native browser automation without paid 3rd-party solver services.
- **Technologies:** Python 3.12, `concurrent.futures`, `threading`, Requests, SeleniumBase, Telegram Bot API.
- **Maturity Level:** **Production-Ready**
- **Evidence Level:** **Proven** (Fully verified script execution, thread safety locks, debug screenshots, booking run logs).
- **Public Suitability:** High (General architectural and concurrency showcase, sanitized of client passport credentials).

---

## 2. Tier B — Supporting Projects (Ecosystem & Breadth)

These projects demonstrate Belal's versatility across full-stack applications, developer tooling, and specialized workflow automation.

### 2.1 WhatsApp AI Marketing & Anti-Ban Dispatcher
- **Directory:** `whatsapp_ai`
- **Timeframe:** 2023 – 2025
- **Domain:** Workflow Automation & Natural Language Agents
- **Core Features:** Node.js/Express backend with JWT authentication, multi-provider AI prompt responder, rate-limiting dispatch queues, human typing emulation, and anti-ban safeguards.
- **Maturity:** Functional Demo · **Evidence:** Proven (Clean codebase, modular config, database schemas).

### 2.2 WebDev AI Editor
- **Directory:** `my_ai_editor`
- **Timeframe:** 2024 – 2026
- **Domain:** Developer Productivity & Agentic Tooling
- **Core Features:** Intelligent terminal & code-assistant CLI tool inspired by Antigravity IDE, featuring multi-account AI token rotation, project indexing, and code generation hooks.
- **Maturity:** Functional Prototype · **Evidence:** Proven (CLI scripts, YAML configs, documentation).

### 2.3 Real-Time Enterprise ERP System
- **Directory:** `ERP_FLASK`
- **Timeframe:** 2022 – 2024
- **Domain:** Full-Stack Web Development & Real-Time Data
- **Core Features:** Enterprise financial and expense tracking platform built with Flask, Flask-SocketIO WebSockets, SQLite, and dynamic data presentation.
- **Maturity:** Functional Demo · **Evidence:** Proven (Interactive templates, database models, WebSocket events).

### 2.4 Genspark Account Manager Chrome Extension
- **Directory:** `genspark_extintion` (v2.6.1)
- **Timeframe:** 2024 – 2025
- **Domain:** Browser Extensions & Web Standards
- **Core Features:** Chrome Extension Manifest V3 providing automated account switching, session storage synchronization, and localized Arabic user interface.
- **Maturity:** Production-Ready · **Evidence:** Proven (Manifest V3 files, background scripts, changelog).

---

## 3. Tier C — Experimental Work & Innovation Lab

Prototypes, hardware hacks, and exploratory R&D kept in the "Engineering Lab" section:

| Project | Domain | Technologies | Maturity | Evidence |
|---------|--------|--------------|----------|----------|
| **Dual-Axis Solar Tracker** (`solar_tracker`) | CleanTech / Robotics | Arduino, 4x LDR, Stepper Motors | Prototype | Verified `.ino` code & schematic notes |
| **Agricultural Insect Monitoring** (`INSECT_PROGECT`) | Smart Agriculture | Arduino, Sensors, Web Dashboard | Functional Demo | Working web dashboard + controller code |
| **Bio-Signal EEG Exploration** (`eeg_project`) | Bio-Tech / ML | Python, Signal Processing | Concept / Prototype | Analysis scripts |
| **Algorithmic Arbitrage & MT5 Bridge** (`trading_bot`, `forex_bots`) | FinTech / Trading | MetaTrader 5, Python, PyAutoGUI | Prototype | Execution scripts, MT5 connector |
| **Web3 DEX Aggregator** (`dexproject`) | Web3 / Blockchain | Moralis API, React, Express | Functional Demo | Working React front & Express back |
| **Local Speech-to-Text Pipeline** (`audio2txt`) | Audio / NLP | Whisper, Python, SpeechRecognition | Prototype | Audio conversion scripts |

---

## 4. Quarantined & Excluded Projects Registry

To maintain high professional standards, security, and privacy, the following project classes are excluded from public showcase:
- **Credential Validation & Scraping Bots** (`checker`, `carding`, `hack`): Excluded due to security and ethical guidelines.
- **Private Raw Data Dumps & Archives** (`.rar`, `.zip`, temporary log caches): Filtered out from source control.
- **Third-Party Templates & Clones** (`CoolAdmin-master`, `Repeater-master`): Excluded as they represent non-original starter kits.

---

## 5. Summary Evaluation Scorecard

> Self-assigned by the previous agent without a published rubric or external review. Retained for history; **not shown on the site**.

| Project | Architecture & Depth (30) | Execution & Reliability (25) | Problem Clarity (20) | Evidence Strength (15) | Brand Impact (10) | **Total (100)** | Tier |
|---------|---------------------------|------------------------------|----------------------|------------------------|-------------------|------------------|------|
| **QEVION** | 30 | 24 | 20 | 15 | 10 | **99** | **Tier A** |
| **AI_MDULE** | 28 | 24 | 19 | 15 | 10 | **96** | **Tier A** |
| **SmartCore Platform** | 28 | 23 | 20 | 14 | 9 | **94** | **Tier A** |
| **BMEIA Auto-Booking** | 26 | 25 | 20 | 15 | 8 | **94** | **Tier A** |
| **WhatsApp AI System** | 22 | 22 | 18 | 13 | 8 | **83** | **Tier B** |
| **WebDev AI Editor** | 23 | 21 | 18 | 13 | 8 | **83** | **Tier B** |
| **ERP Flask System** | 21 | 21 | 18 | 13 | 7 | **80** | **Tier B** |
| **Genspark Extension** | 20 | 23 | 17 | 14 | 6 | **80** | **Tier B** |
| **Solar Tracker & Lab** | 18 | 19 | 16 | 12 | 7 | **72** | **Tier C** |
| **Web3 DEX Project** | 17 | 18 | 15 | 11 | 6 | **67** | **Tier C** |

---
**Gate 1 & Gate 2 Registry Completed.**
