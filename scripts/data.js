/**
 * BELAL ALI PROFESSIONAL PORTFOLIO — DATA STORE
 * Complete Bilingual Data Dictionary (EN / AR)
 * Evidence-Driven Registry of Flagship & Supporting Systems
 */

const PORTFOLIO_DATA = {
  profile: {
    name: {
      en: "Belal Ali",
      ar: "بلال علي"
    },
    title: {
      en: "Senior AI Systems & Autonomous Automation Engineer",
      ar: "مهندس أنظمة الذكاء الاصطناعي والأتمتة المتقدمة"
    },
    subtitle: {
      en: "Real-Time Voice Agents · Multi-Provider Orchestration · Anti-Fragile Automation · Industrial IoT",
      ar: "وكلاء الذكاء الاصطناعي الصوتية اللحظية · أتمتة الأنظمة المعقدة · أجهزة وإنترنت الأشياء (IoT)"
    },
    location: {
      en: "Egypt (Available Globally / Remote)",
      ar: "مصر (متاح عالمياً / عن بُعد)"
    },
    email: "ba1593@gmail.com",
    github: "https://github.com/belalalibb",
    experienceYears: "5+",
    status: {
      en: "Available for Senior Roles & High-Impact Consulting",
      ar: "متاح للفرص الهندسية المتقدمة والاستشارات التقنية"
    }
  },

  metrics: [
    {
      value: "5+",
      label: { en: "Years Engineering Depth", ar: "سنوات من العمق الهندسي" },
      detail: { en: "From hardware sensors (2021) to real-time voice AI (2026)", ar: "من أجهزة الاستشعار (2021) إلى الذكاء الاصطناعي اللحظي (2026)" }
    },
    {
      value: "<800ms",
      label: { en: "Real-Time Voice Latency", ar: "زمن استجابة الصوت اللحظي" },
      detail: { en: "Sub-second speech-to-speech with Egyptian Arabic VAD", ar: "استجابة دون ثانية باللهجة المصرية مع كشف التوقف والحديث" }
    },
    {
      value: "100%",
      label: { en: "Local Autonomy & Solvers", ar: "حلول وخوارزميات محلية ذاتية" },
      detail: { en: "Zero paid 3rd-party solver dependencies in core engines", ar: "دون أي اعتمادية على خدمات حل مدفوعة خارجية" }
    },
    {
      value: "0%",
      label: { en: "Business Hallucination Rate", ar: "نسبة هلوسة قرارات الأعمال" },
      detail: { en: "Deterministic state machines separating LLM from truth", ar: "حواجز منطقية حتمية تفصل النماذج عن قرارات وحالات العمل" }
    }
  ],

  pillars: [
    {
      id: "voice-ai",
      icon: "mic",
      title: {
        en: "Real-Time Voice & Agentic Systems",
        ar: "وكلاء الذكاء الاصطناعي الصوتية اللحظية"
      },
      description: {
        en: "Provider-neutral voice runtimes with AudioWorklet PCM16 streaming, Silero VAD turn-taking, sub-second barge-in interruption, and strict deterministic business guardrails.",
        ar: "معماريات تشغيل صوتية مستقلة عن المزودين، تدفق صوتي عبر WebSockets بأقل زمن تأخير، استرجاع دلالي باللغات المتعددة، وحواجز أمان تمنع هلوسة النماذج."
      },
      skills: ["OpenAI Realtime API", "WebSockets", "Silero VAD", "AudioWorklet", "FastAPI", "Prompt Blueprints"]
    },
    {
      id: "automation",
      icon: "cpu",
      title: {
        en: "Resilient Automation & Reverse Engineering",
        ar: "الأتمتة المقاومة والأنظمة المتزامنة"
      },
      description: {
        en: "High-concurrency thread-safe booking orchestrators, local Cloudflare Turnstile solvers (EzSolver), DOM streaming via MutationObservers, and stealth browser engineering.",
        ar: "محركات حجز متزامنة فائقة السرعة، تخطي تحديات Cloudflare وحماية البوتات بدون خدمات خارجية، استخراج البيانات عبر مراقبة DOM، وإدارة الجلسات الحساسة."
      },
      skills: ["ThreadPoolExecutor", "SeleniumBase (uc=True)", "Playwright Stealth", "Cloudflare Turnstile", "DOM Observers", "Mutex Locks"]
    },
    {
      id: "iot",
      icon: "activity",
      title: {
        en: "Industrial IoT & Smart Agriculture",
        ar: "إنترنت الأشياء الصناعي والزراعة الذكية"
      },
      description: {
        en: "Offline-first building & greenhouse operating systems running C++17 on ESP-IDF v5.3, Modbus RTU / RS-485 fieldbus integration, and dual-axis solar tracking arrays.",
        ar: "برمجيات C++17 / ESP-IDF للأنظمة المدمجة، بروتوكول Modbus RTU الصناعي عبر RS-485، أجهزة تتبع شمسية ثنائية المحور، وأنظمة زراعية ذكية تعمل بدون إنترنت."
      },
      skills: ["C++17 / ESP-IDF", "Modbus RTU / RS-485", "FreeRTOS", "Dual-Axis Solar", "Firebase RTDB", "Soil Telemetry"]
    },
    {
      id: "backend",
      icon: "layers",
      title: {
        en: "Reliable Full-Stack & Microservices",
        ar: "تطوير الويب المتكامل والأنظمة الخلفية"
      },
      description: {
        en: "Contract-driven microservices, real-time WebSocket state distribution, import-linter architectural gates, thread-safe memory stores, and responsive engineering consoles.",
        ar: "خدمات دقيقة باستخدام FastAPI و Node.js، مزامنة لحظية بالـ WebSockets، عزل المعماريات البرمجية، ومعالجة متزامنة آمنة للخيوط (Thread-safe)."
      },
      skills: ["FastAPI", "Node.js / Express", "Flask-SocketIO", "Qdrant Vector DB", "Docker Compose", "PostgreSQL / SQLite"]
    }
  ],

  projects: [
    {
      id: "qevion",
      tier: "flagship",
      title: {
        en: "QEVION — Real-Time Voice Agent & Activity Platform",
        ar: "منصة كفيون (QEVION) — وكيل الذكاء الاصطناعي الصوتي اللحظي"
      },
      tagline: {
        en: "Sub-second real-time voice runtime in Egyptian Arabic with deterministic business guardrails and provider-neutral role ports.",
        ar: "نظام تشغيل صوتي لحظي بزمن استجابة دون ثانية باللهجة المصرية، مع حواجز أمان حتمية تمنع الهلوسة ومعمارية مستقلة عن المزودين."
      },
      domain: { en: "AI & Voice Engineering", ar: "هندسة الذكاء الاصطناعي والصوت" },
      status: "Tested / Operational Architecture",
      timeframe: "2025 – 2026",
      metrics: [
        { label: { en: "Voice Turnaround", ar: "زمن معالجة الصوت" }, value: "< 800ms" },
        { label: { en: "Language Target", ar: "اللغة المستهدفة" }, value: "Arabic (ar-EG)" },
        { label: { en: "Contract Enforce", ar: "عزل المعمارية" }, value: "100% Contract Gate" }
      ],
      tags: ["Python 3.13", "FastAPI", "WebSockets", "Silero VAD", "OpenAI Realtime", "AudioWorklet", "ADR Architecture"],
      caseStudyAvailable: true,
      githubUrl: null, // Private proprietary specification
      highlights: {
        en: [
          "160KB formal specification (QEVION_PLATFORM_SPEC_v3.md) with normative QV-* rules and ADR records.",
          "Core imports contracts only; domain specifics are declared as data Blueprints (qevion.activity.v1).",
          "LLM output is never business truth: prices, confirmations, and state transitions are hard-governed.",
          "Real-time voice stream using AudioWorklet PCM16 chunks over WebSockets with 7-step interruption recovery."
        ],
        ar: [
          "توثيق معماري ومواصفات قياسية رسمية بحجم 160 كيلوبايت تشمل سجلات قرارات هندسية (ADRs) وقواعد معيارية.",
          "النواة لا تستورد سوى العقود والواجهات؛ جميع منطق الأعمال يُعرّف كمخططات بيانات مستقلة.",
          "مخرجات الذكاء الاصطناعي لا تمثل حقيقة تجارية مطلقة: الأسعار والتأكيدات محكومة بمنطق برمجي حتمي.",
          "معالجة صوتية حية عبر AudioWorklet بتدفق PCM16 عبر WebSockets مع آلية مقاطعة ذكية بـ 7 خطوات."
        ]
      }
    },

    {
      id: "ai-mdule",
      tier: "flagship",
      title: {
        en: "AI_MDULE — Multi-Provider Orchestration & Browser Bridge RAG",
        ar: "نظام AI_MDULE — تنسيق الذكاء الاصطناعي والبحث الدلالي مع جسر المتصفح"
      },
      tagline: {
        en: "Enterprise AI gateway combining Qdrant vector retrieval, multilingual embeddings, and headless browser automation bridges with Cloudflare bypass.",
        ar: "بوابة ذكاء اصطناعي موحدة تجمع بين البحث الدلالي في Qdrant، ونماذج التضمين متعددة اللغات، وجسر أتمتة متصفح لتخطي Cloudflare."
      },
      domain: { en: "AI Orchestration & RAG", ar: "تنسيق الذكاء الاصطناعي واسترجاع البيانات" },
      status: "Tested / Production Ready",
      timeframe: "2025 – 2026",
      metrics: [
        { label: { en: "Vector Store", ar: "قاعدة المتجهات" }, value: "Qdrant Vector DB" },
        { label: { en: "Providers Supported", ar: "مزودو الذكاء الاصطناعي" }, value: "6 Providers" },
        { label: { en: "API Cost Saved", ar: "توفير تكاليف API" }, value: "100% via Bridge" }
      ],
      tags: ["Python", "FastAPI", "Qdrant", "SeleniumBase (uc=True)", "Docker", "Sentence-Transformers", "Celery", "Redis"],
      caseStudyAvailable: true,
      highlights: {
        en: [
          "2-stage domain classification engine with confidence thresholding for intelligent query routing.",
          "Multilingual RAG pipeline using Qdrant vector store and paraphrase-multilingual-mpnet-base-v2.",
          "Headless browser bridge provider automating DeepSeek and Gemini web interfaces via SeleniumBase uc=True.",
          "DOM MutationObserver streaming with startswith re-render guards and button-counting completion heuristics."
        ],
        ar: [
          "محرك تصنيف نية ثنائي المراحل مع عتبة ثقة لتوجيه الاستعلامات بدقة عالية.",
          "خط معالجة RAG متعدد اللغات باستخدام قاعدة Qdrant ونموذج تضمين mpnet متعدد اللغات.",
          "مزود جسر متصفح خفي لأتمتة واجهات DeepSeek و Gemini عبر SeleniumBase uc=True وتخطي Cloudflare.",
          "بث حي للردود عبر مراقبة تغيرات DOM مع حماية خاصة لمنع تكرار النصوص وتقطيع الكلمات."
        ]
      }
    },

    {
      id: "smartcore",
      tier: "flagship",
      title: {
        en: "SmartCore Platform — Industrial IoT & Building Operating System",
        ar: "منصة SmartCore — نظام تشغيل الأبنية الذكية وإنترنت الأشياء الصناعي"
      },
      tagline: {
        en: "An offline-first, C++17 intelligent building and agriculture platform using Modbus RTU over RS-485 and ESP-IDF firmware.",
        ar: "نظام تشغيل للمباني والبيوت المحمية الذكية يعمل دون اتصال، مبني بلغة C++17 على ESP-IDF ويدعم بروتوكول Modbus RTU الصناعي."
      },
      domain: { en: "Industrial IoT & AgriTech", ar: "إنترنت الأشياء الصناعي والزراعة الذكية" },
      status: "Tested / Field Hardware Prototypes",
      timeframe: "2021 – 2026",
      metrics: [
        { label: { en: "Fieldbus Protocol", ar: "بروتوكول الشبكة" }, value: "Modbus RTU / RS-485" },
        { label: { en: "Firmware Core", ar: "النواة البرمجية" }, value: "C++17 / ESP-IDF" },
        { label: { en: "Offline Reliability", ar: "الاعتمادية دون إنترنت" }, value: "100% Local Logic" }
      ],
      tags: ["C++17", "ESP-IDF v5.3", "FreeRTOS", "Modbus RTU", "RS-485", "Dual-Axis Solar", "Firebase RTDB"],
      caseStudyAvailable: true,
      highlights: {
        en: [
          "Offline-first architecture: local control loops execute deterministically without cloud latency or dependency.",
          "Comprehensive Modbus RTU register mapping specification (smartcore_modbus_regs.h) for industrial PLC integration.",
          "Hardware abstraction layer mirroring telemetry to Firebase Realtime Database for web dashboard control.",
          "Field implementations: dual-axis solar tracking with LDR optical arrays, soil moisture monitoring, and weight sensing."
        ],
        ar: [
          "معمارية تعمل دون إنترنت (Offline-first): دوائر التحكم المحلية تنفذ دون أي تأخير أو اعتمادية على السحاب.",
          "خريطة سجلات Modbus RTU متكاملة متوافقة مع أجهزة التحكم الصناعية (PLCs).",
          "طبقة تجريد عتادي تعكس الحالة إلى Firebase Realtime Database للمراقبة والتحكم عبر لوحة الويب.",
          "تطبيقات ميدانية حقيقية: تتبع شمسي ثنائي المحور، استشعار رطوبة التربة الزراعية، وقياس الأوزان الدقيق."
        ]
      }
    },

    {
      id: "beima-auto",
      tier: "flagship",
      title: {
        en: "BMEIA Auto-Booking Engine & EzSolver Turnstile Automation",
        ar: "محرك حجز المواعيد المتزامن BMEIA ونظام حل Turnstile الذاتي (EzSolver)"
      },
      tagline: {
        en: "High-concurrency, thread-safe appointment booking engine for embassy visa portals featuring local Cloudflare Turnstile solving.",
        ar: "محرك حجز متزامن آمن للخيوط لبوابات التأشيرات الدبلوماسية، مدعوم بنظام ذاتي لتخطي تحديات Cloudflare دون خدمات مدفوعة."
      },
      domain: { en: "Resilient Concurrency & Anti-Bot", ar: "الأنظمة المتزامنة ومقاومة الحظر" },
      status: "Production Ready / Operational Tool",
      timeframe: "2024 – 2026",
      metrics: [
        { label: { en: "Concurrency Model", ar: "نموذج التزامن" }, value: "Thread-Safe Mutex Pool" },
        { label: { en: "Solving Overhead", ar: "زمن حل Turnstile" }, value: "< 3.5s Local" },
        { label: { en: "External Solver Cost", ar: "تكلفة الخدمات الخارجية" }, value: "$0 (Pure In-House)" }
      ],
      tags: ["Python 3.12", "concurrent.futures", "Threading", "EzSolver", "SeleniumBase", "Telegram API", "Mutex Locks"],
      caseStudyAvailable: true,
      highlights: {
        en: [
          "Thread-safe ClientPool orchestrating parallel worker threads with zero passport number collision or race conditions.",
          "EzSolver integration: Cross-platform Cloudflare Turnstile solver powered by native browser automation without paid APIs.",
          "Exponential backoff with randomized gaussian jitter to navigate aggressive embassy rate-limiting firewalls.",
          "Real-time dual-sink logging architecture: user-facing console milestones plus microsecond-level debug file tracing."
        ],
        ar: [
          "حوض عملاء آمن متزامن (Thread-safe ClientPool) يدير الخيوط المتوازية ويمنع أي تصادم في بيانات الجوازات.",
          "دمج EzSolver: حل تحديات Cloudflare Turnstile عبر متصفح محلي في أقل من 3.5 ثانية دون أي تكلفة اشتراكات.",
          "استراتيجية تراجع أسي وتأخير عشوائي مدروس لتفادي حظر الجدران النارية لبوابات السفارات.",
          "بنية تسجيل أحداث مزدوجة: واجهة تحكم واضحة للمشغل مع سجلات تدقيق دقيقة على القرص للتحليل الهندسي."
        ]
      }
    },

    // Tier B Supporting Projects
    {
      id: "whatsapp-ai",
      tier: "supporting",
      title: {
        en: "WhatsApp AI Marketing & Anti-Ban Campaign Dispatcher",
        ar: "نظام التسويق الذكي عبر WhatsApp وحماية الحسابات من الحظر"
      },
      tagline: {
        en: "Enterprise WhatsApp campaign platform with multi-provider AI prompt routing and human typing emulation.",
        ar: "منصة لإدارة حملات المراسلة الذكية عبر WhatsApp مع توجيه ذكي للردود ومحاكاة دقيقة للسلوك البشري."
      },
      domain: { en: "Workflow Automation & AI", ar: "أتمتة العمليات والذكاء الاصطناعي" },
      status: "Functional Demo",
      timeframe: "2023 – 2025",
      tags: ["Node.js", "Express", "JWT", "WhatsApp Automation", "Anti-Ban Heuristics", "AI Routing"],
      caseStudyAvailable: true
    },

    {
      id: "my-ai-editor",
      tier: "supporting",
      title: {
        en: "WebDev AI Editor — Autonomous Coding Assistant CLI",
        ar: "محرر WebDev AI — مساعد البرمجة الذكي عبر سطر الأوامر"
      },
      tagline: {
        en: "Developer productivity tool featuring multi-account AI token rotation, workspace indexing, and code generation.",
        ar: "أداة إنتاجية للمطورين تدير حسابات ونماذج ذكاء اصطناعي متعددة، مع فهرسة تلقائية للمشاريع وتوليد الكود."
      },
      domain: { en: "Developer Tooling", ar: "أدوات المطورين والإنتاجية" },
      status: "Functional Prototype",
      timeframe: "2024 – 2026",
      tags: ["Python CLI", "YAML Configs", "Multi-Token Rotation", "Project Indexer", "Agentic Prompts"],
      caseStudyAvailable: true
    },

    {
      id: "erp-flask",
      tier: "supporting",
      title: {
        en: "Real-Time Enterprise Financial & Expense ERP",
        ar: "نظام ERP مالي لإدارة المصروفات والأصول لحظياً"
      },
      tagline: {
        en: "Full-stack enterprise expense and asset tracking platform built with Flask, Flask-SocketIO WebSockets, and SQLite.",
        ar: "منصة ويب متكاملة لتتبع النفقات التشغيلية وإدارة الأصول تدعم التحديث اللحظي عبر WebSockets."
      },
      domain: { en: "Full-Stack Web & Real-Time Data", ar: "تطوير الويب المتكامل والبيانات اللحظية" },
      status: "Functional Demo",
      timeframe: "2022 – 2024",
      tags: ["Python / Flask", "Flask-SocketIO", "SQLite", "DataTables", "Real-Time Events"],
      caseStudyAvailable: false
    },

    {
      id: "genspark-extension",
      tier: "supporting",
      title: {
        en: "Genspark Account & Session Manager Chrome Extension",
        ar: "إضافة متصفح Genspark Account Manager (Manifest V3)"
      },
      tagline: {
        en: "Chrome Extension (MV3) providing automated session switching, background service worker sync, and Arabic UI localization.",
        ar: "إضافة متصفح كروم رسمية بمعيار Manifest V3 لإدارة الجلسات وتبديل الحسابات مع واجهة عربية كاملة."
      },
      domain: { en: "Browser Extensions & Tooling", ar: "إضافات المتصفح وأدوات الويب" },
      status: "Production Ready (v2.6.1)",
      timeframe: "2024 – 2025",
      tags: ["Chrome Extensions MV3", "JavaScript", "Service Workers", "Storage API", "Arabic UI"],
      caseStudyAvailable: true
    }
  ],

  labProjects: [
    {
      id: "solar-tracker",
      category: "iot",
      title: { en: "Dual-Axis Solar Tracker Array", ar: "متتبع شمسي ثنائي المحور بالأردوينو" },
      tech: "Arduino C++, 4x LDR Sensors, Dual Stepper Motors, PID Logic",
      description: {
        en: "Calculates differential light intensity between 4 LDR sensors to orient solar photovoltaic cells along azimuth and elevation axes.",
        ar: "حساب فارق شدة الإضاءة بين 4 حساسات LDR لتوجيه الخلايا الشمسية تلقائياً على محوري الارتفاع والأفق لزيادة كفاءة التوليد."
      }
    },
    {
      id: "insect-tracker",
      category: "iot",
      title: { en: "Agricultural Pest Telemetry Monitor", ar: "نظام استشعار ومراقبة الآفات الزراعية" },
      tech: "Arduino, IR Beam Array, Firebase RTDB, HTML5 Monitor",
      description: {
        en: "IoT trap monitor detecting pest entry counts and broadcasting real-time density alerts to farmers over Firebase RTDB.",
        ar: "مصيدة ذكية تستشعر حركة ودخول الآفات الزراعية وترسل تنبيهات الكثافة الميدانية للمزارع لحظياً عبر السحاب."
      }
    },
    {
      id: "mt5-arbitrage",
      category: "trading",
      title: { en: "MetaTrader 5 Arbitrage & Execution Engine", ar: "محرك كشف الفروقات السعرية والتنفيذ في MT5" },
      tech: "MetaTrader 5 API, Python, PyAutoGUI, Node.js",
      description: {
        en: "Monitors cross-exchange latency arbitrage and executes automated hedging orders via MT5 Python connectors and screen telemetry.",
        ar: "مراقبة فروقات الأسعار بين المنصات وتنفيذ الصفقات التحوطية المؤتمتة عبر واجهة MT5 ومحاكاة واجهة التداول."
      }
    },
    {
      id: "web3-dex",
      category: "web3",
      title: { en: "Web3 Decentralized Exchange Aggregator", ar: "واجهة تداول لامركزية Web3 DEX" },
      tech: "React, Express.js, Moralis SDK, MetaMask API",
      description: {
        en: "Decentralized token swap interface querying on-chain DEX liquidity pools and executing token allowances and swaps.",
        ar: "واجهة تداول عملات رقمية لامركزية تتصل بمجمعات السيولة عبر Moralis SDK وتنفذ مبادلة التوكنات مباشرة."
      }
    },
    {
      id: "audio2text",
      category: "ai",
      title: { en: "Local Whisper Audio Transcriber Pipeline", ar: "خط معالجة وتحويل الصوت إلى نصوص محلياً" },
      tech: "Python, OpenAI Whisper, SoundDevice, FFMPEG",
      description: {
        en: "Offline voice transcription pipeline converting audio streams into structured transcripts with zero cloud transmission.",
        ar: "نظام تحويل صوتي محلي بالكامل يعتمد على موديل Whisper لمعالجة التسجيلات والملفات دون إرسال البيانات خارج الجهاز."
      }
    },
    {
      id: "eeg-brain",
      category: "ai",
      title: { en: "Bio-Signal EEG Pattern Classifier", ar: "استكشاف وتصنيف إشارات الدماغ الحيوية (EEG)" },
      tech: "Python, NumPy, SciPy, Signal Bandpass Filtering",
      description: {
        en: "Signal processing pipeline analyzing brainwave frequency bands (Alpha, Beta, Theta) for cognitive state classification.",
        ar: "خط معالجة رقمية للإشارات لتحليل ترددات موجات الدماغ واستخراج الأنماط الحيوية للدراسات الإدراكية."
      }
    }
  ],

  journey: [
    {
      year: "2021",
      period: "Foundations",
      title: {
        en: "Embedded Hardware & Physical Computing",
        ar: "الأنظمة المدمجة والحوسبة الفيزيائية"
      },
      description: {
        en: "Deep dive into microcontrollers (Arduino, ESP8266), electrical circuit design, serial communication protocols, and initial automated control scripts.",
        ar: "بداية الرحلة في هندسة الأنظمة المدمجة والمتحكمات الدقيقة (Arduino و ESP8266)، وتصميم الدوائر، واستشعار البيئة الفيزيائية وبرمجة دوائر التحكم."
      },
      tag: "Hardware / IoT"
    },
    {
      year: "2022",
      period: "Expansion",
      title: {
        en: "Full-Stack Web & Real-Time Data Pipelines",
        ar: "تطوير الويب المتكامل والبيانات اللحظية"
      },
      description: {
        en: "Transitioned to building robust web platforms using Python (Flask, Django), database design (SQLite/PostgreSQL), and real-time WebSockets for telemetry dashboards.",
        ar: "الانتقال إلى هندسة برمجيات الويب المتكاملة باستخدام Flask و Django، وبناء قواعد البيانات، وتدفق الأحداث اللحظية عبر WebSockets."
      },
      tag: "Full-Stack Backend"
    },
    {
      year: "2023",
      period: "Mastery",
      title: {
        en: "Resilient Automation & Anti-Bot Engineering",
        ar: "هندسة الأتمتة المتقدمة ومقاومة الحظر"
      },
      description: {
        en: "Engineered high-concurrency automated booking systems, reverse-engineered appointment portals, integrated Telegram bot control centers, and built proxy rotation networks.",
        ar: "تطوير محركات أتمتة عالية التزامن لحجز المواعيد الصعبة، وتجاوز القيود الأمنية، وإدارة شبكات البروكسي، وربط أنظمة التنبيهات الذكية عبر Telegram."
      },
      tag: "Reverse Engineering"
    },
    {
      year: "2024",
      period: "Tooling & CV",
      title: {
        en: "Browser Engineering & Developer Tooling",
        ar: "هندسة المتصفح وأدوات الإنتاجية"
      },
      description: {
        en: "Mastered Playwright Stealth and SeleniumBase uc=True. Developed Chrome Extensions (MV3) with localized UI and engineered computer vision pipelines with OpenCV.",
        ar: "التعمق في هندسة المتصفحات المتقدمة بـ Playwright و SeleniumBase، وبناء إضافات متصفح بمعيار Manifest V3، ودمج خوارزميات الرؤية الحاسوبية OpenCV."
      },
      tag: "Browser / CV"
    },
    {
      year: "2025",
      period: "Intelligence",
      title: {
        en: "AI Orchestration, RAG & Industrial OS",
        ar: "تنسيق الذكاء الاصطناعي ونظام الأبنية الصناعي"
      },
      description: {
        en: "Architected AI_MDULE (multi-provider RAG with Qdrant vector retrieval and browser bridges). Engineered SmartCore Building OS with Modbus RTU / RS-485 in C++17.",
        ar: "ابتكار نظام AI_MDULE لتنسيق نماذج الذكاء الاصطناعي مع البحث المتجهي في Qdrant، وهندسة نظام SmartCore للأبنية الذكية ببروتوكول Modbus RTU ولغة C++17."
      },
      tag: "AI / Industrial IoT"
    },
    {
      year: "2026",
      period: "Frontier",
      title: {
        en: "Real-Time Voice Agents & Anti-Fragile Systems",
        ar: "وكلاء الصوت اللحظية والأنظمة فائقة المقاومة"
      },
      description: {
        en: "Architected QEVION (sub-second voice platform in Egyptian Arabic with Silero VAD and deterministic truth guardrails) and BMEIA multi-threaded booking engine with EzSolver.",
        ar: "تطوير منصة QEVION للمحادثات الصوتية اللحظية باللهجة المصرية دون ثانية مع حواجز أمان حتمية، وبناء محرك BMEIA عالي التزامن بحلول Turnstile الذاتية."
      },
      tag: "Voice AI / Concurrency"
    }
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = PORTFOLIO_DATA;
}
