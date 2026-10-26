/**
 * BELAL ALI PROFESSIONAL PORTFOLIO — APPLICATION CONTROLLER
 * Reactive Bilingual State, Interactive Case Studies, Dynamic Filtering
 */

(function () {
  'use strict';

  // --- State ---
  let currentLang = localStorage.getItem('belal_portfolio_lang') || 'en';
  let activeLabCategory = 'all';

  // --- Translation Dictionary for Static UI Labels ---
  const UI_STRINGS = {
    en: {
      siteTitle: "Belal Ali | Senior AI Systems & Autonomous Automation Engineer",
      roleSubtitle: "Senior Systems & AI Engineer",
      navWork: "Selected Work",
      navExpertise: "Expertise",
      navApproach: "Approach",
      navJourney: "Journey",
      navLab: "Engineering Lab",
      navContact: "Contact",
      btnResume: "Resume / CV",
      langSwitch: "العربية",
      heroBadge: "Available for High-Impact Engineering Roles & Autonomous Systems Consulting",
      heroTitle: "Architecting Resilient Systems from Physical Edge to Real-Time AI.",
      heroLead: "I am Belal Ali — an AI Systems & Automation Engineer with 5 years of proven hands-on execution. I design low-latency voice agents, anti-fragile concurrency pipelines, and industrial IoT platforms that solve mission-critical problems under extreme real-world constraints.",
      btnExplore: "Explore Flagship Systems",
      btnContact: "Get in Touch",
      workTag: "FLAGSHIP SYSTEMS",
      workTitle: "Engineered for Extreme Reliability",
      workSubtitle: "A curated selection of mission-critical systems designed, implemented, and verified across real-world deployment constraints.",
      viewCaseStudy: "View Case Study",
      highlightsTitle: "Key Technical Highlights:",
      expertiseTag: "CAPABILITIES",
      expertiseTitle: "Four Core Engineering Pillars",
      expertiseSubtitle: "Bridging the complete stack from bare-metal microcontrollers to distributed, real-time voice intelligence.",
      approachTag: "METHODOLOGY",
      approachTitle: "Engineering Approach & Mental Models",
      approachSubtitle: "How I systematically analyze failure modes, enforce contract boundaries, and guarantee operational truth.",
      approachSteps: [
        { num: "01", title: "Threat Modeling & Failure Analysis", desc: "Isolating network drops, anti-bot firewalls, and model hallucinations before writing single lines of code." },
        { num: "02", title: "Strict Contract Isolation", desc: "Core engines import contracts only. Business truth is hard-governed by deterministic state machines, never delegated to LLMs." },
        { num: "03", title: "Local Autonomy & Zero Dependencies", desc: "Building offline-first capabilities (Modbus RTU) and in-house solvers (EzSolver) to eliminate single points of failure." },
        { num: "04", title: "Evidence-Driven Verification", desc: "Continuous protocol soak tests, import-linter gates, and verified execution logs rather than theoretical claims." }
      ],
      journeyTag: "TIMELINE",
      journeyTitle: "5-Year Engineering Trajectory",
      journeySubtitle: "Traced from physical hardware prototypes in 2021 to production real-time voice architectures in 2026.",
      labTag: "R&D EXPLORATION",
      labTitle: "Engineering Lab & Prototypes",
      labSubtitle: "Exploratory hardware hacks, algorithmic trading bridges, bio-signal classifiers, and developer tooling.",
      filterAll: "All Experiments",
      filterIoT: "IoT & Hardware",
      filterTrading: "Algorithmic Trading",
      filterWeb3: "Web3 & Blockchain",
      filterAI: "AI & Signal Processing",
      contactTag: "COLLABORATION",
      contactTitle: "Let's Build Something Resilient",
      contactSubtitle: "Whether you need an architect for a real-time voice agent, a high-concurrency automation pipeline, or an industrial IoT edge system — let's connect.",
      contactDirect: "Direct Channels",
      formName: "Your Name",
      formEmail: "Email Address",
      formSubject: "Project or Role Type",
      formMessage: "Message / Overview",
      formSend: "Send Message",
      formSuccess: "Thank you! Your message has been prepared.",
      rights: "All rights reserved. Built with precision and evidence-driven engineering."
    },
    ar: {
      siteTitle: "بلال علي | مهندس أنظمة الذكاء الاصطناعي والأتمتة المتقدمة",
      roleSubtitle: "مهندس أنظمة وذكاء اصطناعي",
      navWork: "أبرز الأعمال",
      navExpertise: "الخبرات التقنية",
      navApproach: "المنهجية الهندسية",
      navJourney: "المسار الزمني",
      navLab: "المختبر التجريبي",
      navContact: "تواصل معي",
      btnResume: "السيرة الذاتية",
      langSwitch: "English",
      heroBadge: "متاح للفرص الهندسية المتقدمة واستشارات الأنظمة الذكية المستقلة",
      heroTitle: "بناء أنظمة برمجية وهندسية فائقة الاعتمادية — من أجهزة IoT إلى الذكاء الاصطناعي اللحظي.",
      heroLead: "أنا بلال علي — مهندس أنظمة وأتمتة متقدمة بخبرة عملية مثبتة تمتد على مدار 5 سنوات. أبتكر وكلاء ذكاء اصطناعي صوتية فائقة السرعة، ومحركات متزامنة لا تتأثر بالقيود، ومنصات تشغيل أجهزة ذكية تربط العالم الفيزيائي بالسحاب.",
      btnExplore: "استكشف المشاريع الكبرى",
      btnContact: "تواصل للعمل معاً",
      workTag: "الأنظمة الرئيسية المعتمدة",
      workTitle: "مشاريع مصممة لأقصى درجات الاعتمادية",
      workSubtitle: "مجموعة مختارة من الأنظمة الحقيقية التي تم تصميمها واختبارها وتوثيقها وفق بيئات تشغيل واقعية صارمة.",
      viewCaseStudy: "دراسة الحالة الهندسية",
      highlightsTitle: "أبرز المميزات والقرارات الهندسية:",
      expertiseTag: "القدرات الهندسية",
      expertiseTitle: "أربعة ركائز تقنية موحدة",
      expertiseSubtitle: "تغطية هندسية شاملة من المتحكمات الدقيقة حتى أنظمة الذكاء الاصطناعي الصوتية الموزعة.",
      approachTag: "أسلوب التفكير",
      approachTitle: "المنهجية الهندسية ونماذج العمل",
      approachSubtitle: "كيف أحلل نقاط الفشل، وأعزل المعمارية البرمجية، وأضمن صحة قرارات الأعمال بدقة حتمية.",
      approachSteps: [
        { num: "01", title: "تحليل التهديدات ونقاط الفشل", desc: "عزل انقطاع الشبكات، وجدران الحماية ضد البوتات، وهلوسات النماذج قبل كتابة أي سطر برمجي." },
        { num: "02", title: "عزل المعمارية البرمجية عبر العقود", desc: "النواة لا تستورد سوى العقود؛ قرارات الأعمال حتمية تحكمها آلة حالات، ولا تُترك أبداً للنماذج التوليدية." },
        { num: "03", title: "الاستقلالية الذاتية وبناء الحلول محلياً", desc: "بناء أنظمة تعمل دون إنترنت (Modbus RTU) وتطوير خوارزميات محلية (EzSolver) لمنع نقاط الفشل الفردية." },
        { num: "04", title: "التحقق المعتمد على الأدلة الواقعية", desc: "اختبارات تحمل للبروتوكولات، وفحص لعزل الطبقات، وسجلات تشغيل موثقة بدلاً من الادعاءات النظرية." }
      ],
      journeyTag: "المسار المهني",
      journeyTitle: "خمس سنوات من التطور الهندسي (2021 – 2026)",
      journeySubtitle: "مسار متدرج وموثق من النماذج العتادية الأولى في 2021 وصولاً إلى منصات الذكاء الاصطناعي اللحظية في 2026.",
      labTag: "مختبر التطوير والابتكار",
      labTitle: "المختبر التجريبي والنماذج الأولية",
      labSubtitle: "تجارب في إنترنت الأشياء، وبوابات التداول الخوارزمي، ومعالجة الإشارات الحيوية، وأدوات المطورين.",
      filterAll: "جميع التجارب",
      filterIoT: "أجهزة وإنترنت الأشياء",
      filterTrading: "التداول الخوارزمي",
      filterWeb3: "الويب 3 والبلوكشين",
      filterAI: "الذكاء ومعالجة الإشارات",
      contactTag: "بناء الشراكات",
      contactTitle: "لن ابنِ معاً أنظمة تقنية حقيقية",
      contactSubtitle: "سواء كنت تبحث عن مهندس لتصميم وكيل ذكاء اصطناعي صوتي لحظي، أو محرك أتمتة عالي التزامن، أو نظام تشغيل مدمج لأجهزة IoT — تفضل بالتواصل مباشرة.",
      contactDirect: "قنوات التواصل المباشر",
      formName: "الاسم الكريم",
      formEmail: "البريد الإلكتروني",
      formSubject: "طبيعة المشروع أو الفرصة المهنية",
      formMessage: "تفاصيل الرسالة أو ملخص المشروع",
      formSend: "إرسال الرسالة",
      formSuccess: "شكراً لك! تم تجهيز رسالتك بنجاح.",
      rights: "جميع الحقوق محفوظة. بُنيت هذه المنصة بدقة هندسية تستند إلى الأدلة الحقيقية."
    }
  };

  // --- Detailed Case Studies Dictionary (EN & AR) ---
  const DETAILED_CASE_STUDIES = {
    qevion: {
      title: { en: "QEVION — Real-Time Voice Agent & Activity Platform", ar: "منصة كفيون (QEVION) — وكيل الذكاء الاصطناعي الصوتي اللحظي" },
      sections: {
        en: [
          {
            title: "Problem & Context",
            content: "Standard conversational AI wrappers suffer from high latency (2-3 seconds), fragile third-party vendor lock-in, and unpredictable hallucinations regarding prices, eligibility, and state transitions. In the Egyptian Arabic market, standard models consistently fail natural turn-taking and conversational barge-in."
          },
          {
            title: "Architecture & Technical Decisions",
            content: "QEVION enforces a strict 3-tier boundary: the Copilot designs declarative Activity Blueprints (qevion.activity.v1), while a generic Core executes sessions without domain vocabulary. AudioWorklet PCM16 chunks stream directly to WebSockets. Silero VAD monitors turn-taking. Interruption triggers an immediate 7-step teardown cancelling downstream synthesis within 120ms."
          },
          {
            title: "Deterministic Guardrails (ADR-0004)",
            content: "The LLM is explicitly barred from making business truth decisions. Claims, prices, and state transitions are strictly governed by deterministic QEVION logic. The LLM only proposes conversational phrasing."
          },
          {
            title: "Verification Evidence",
            content: "Authoritative 160KB specification (QEVION_PLATFORM_SPEC_v3.md) with normative QV-* IDs. Validated by scripts/recovery/verify.sh, soak tests proving 45-minute zero-drop WebSockets, and headless browser voice smoke tests via Chromium."
          }
        ],
        ar: [
          {
            title: "المشكلة والسياق الهندسي",
            content: "تعاني واجهات الذكاء الاصطناعي الصوتية التقليدية من بطء الاستجابة (2-3 ثوانٍ)، والاعتماد الكامل على مزود واحد، وهلوسة النماذج في تفاصيل الأسعار وتأكيد الحجوزات. وفي اللهجة المصرية تحديداً، تفشل الأنظمة الشائعة في فهم المقاطعة الطبيعية أثناء الكلام."
          },
          {
            title: "المعمارية والقرارات التقنية",
            content: "تعتمد منصة QEVION فصلاً صارماً: مساعد التكوين يصنع المخططات (Blueprints)، بينما تنفذ النواة المحادثة عبر AudioWorklet بتدفق PCM16 عبر WebSockets. يراقب Silero VAD فترات التوقف، وعند حدوث مقاطعة تُنفذ دورة إلغاء فورية بـ 7 خطوات في أقل من 120 مللي ثانية."
          },
          {
            title: "حواجز الأمان الحتمية (ADR-0004)",
            content: "النموذج التوليدي ممنوع تماماً من اتخاذ قرارات الأعمال أو تأكيد المبالغ أو تغيير الحالات. النموذج يقترح الصياغة الحوارية فقط، بينما المنطق البرمجي الحتمي هو الذي يتحقق ويثبت الحالات."
          },
          {
            title: "الأدلة والتحقق العملي",
            content: "مواصفات قياسية رسمية بحجم 160 كيلوبايت تشمل 56 قسماً معيارياً. تم التحقق عبر اختبارات بروتوكولية مستمرة لمدة 45 دقيقة دون انقطاع، واختبارات متصفح خفية تحاكي الميكروفون الحقيقي."
          }
        ]
      },
      codeSnippet: `# QEVION Core State Guard
from qevion.contracts.session import VoiceSessionState
from qevion.contracts.vad import VADEvent, VADEventType

async def handle_turn_event(event: VADEvent, session: VoiceSessionState) -> None:
    if event.type == VADEventType.USER_SPEECH_STARTED:
        if session.is_agent_speaking:
            # Sub-second 7-step interruption recovery
            await session.abort_agent_speech_stream(cancel_downstream=True)
            session.record_interruption_metric()`
    },

    "ai-mdule": {
      title: { en: "AI_MDULE — Multi-Provider Orchestration & Browser Bridge RAG", ar: "نظام AI_MDULE — تنسيق الذكاء الاصطناعي والبحث الدلالي مع جسر المتصفح" },
      sections: {
        en: [
          {
            title: "Problem & Context",
            content: "Commercial LLM APIs incur steep costs at scale and suffer from unannounced outages. Simultaneously, free cutting-edge web interfaces (such as DeepSeek) provide no public API endpoints for developers."
          },
          {
            title: "Solution & Reverse Engineering",
            content: "Built a FastAPI gateway combining Qdrant vector retrieval (paraphrase-multilingual-mpnet-base-v2) and a custom headless browser bridge. The bridge utilizes SeleniumBase (uc=True) to bypass Cloudflare Turnstile, injects human-typed queries, and streams output via DOM MutationObservers."
          },
          {
            title: "Key Innovations",
            content: "Engineered Button Counting heuristics on DeepSeek action containers (db183363) to detect generation completion deterministically. Developed startswith re-render guards to maintain stream coherence across React hydration cycles."
          }
        ],
        ar: [
          {
            title: "المشكلة والسياق الهندسي",
            content: "التكلفة العالية لاستهلاك واجهات API التجارية وخطر توقفها المفاجئ. وفي الوقت ذاته، تتوفر واجهات ذكاء اصطناعي متطورة ومجانية عبر الويب (مثل DeepSeek) دون توفير مفاتيح برمجة مباشرة."
          },
          {
            title: "الحل والهندسة العكسية",
            content: "بناء بوابة FastAPI تجمع بين البحث المتجهي في Qdrant ونظام أتمتة خفي للمتصفح. يستخدم النظام SeleniumBase uc=True لتجاوز حماية Cloudflare، ومحاكاة الكتابة البشرية، وبث الرد عبر مراقبة تغيرات DOM."
          },
          {
            title: "الابتكارات الهندسية",
            content: "ابتكار خوارزمية عد الأزرار (Button Counting) لمعرفة اكتمال الرد بدقة قطعية دون الاعتماد على استقرار النص، مع حماية خاصة لمنع تكرار أو دمج الكلمات أثناء البث اللحظي."
          }
        ]
      },
      codeSnippet: `# AI_MDULE Completion Heuristic
def wait_for_reply_complete(driver, timeout=60):
    start = time.time()
    while time.time() - start < timeout:
        # Check action buttons container unique to response completion
        buttons = driver.find_elements(By.CSS_SELECTOR, "div.db183363")
        if len(buttons) >= 5:
            return True
        time.sleep(0.5)
    return False`
    },

    smartcore: {
      title: { en: "SmartCore Platform — Industrial IoT & Building OS", ar: "منصة SmartCore — نظام تشغيل الأبنية الذكية وإنترنت الأشياء الصناعي" },
      sections: {
        en: [
          {
            title: "Problem & Context",
            content: "Agricultural and commercial building systems frequently suffer power flickers and complete internet loss. Commercial smart home solutions freeze or drop telemetry when detached from the cloud."
          },
          {
            title: "Architecture & Protocols",
            content: "Built with C++17 on ESP-IDF v5.3 for dual-core ESP32 chips. Uses Modbus RTU over RS-485 differential signaling as the primary industrial fieldbus, mapped via smartcore_modbus_regs.h. Telemetry is mirrored to Firebase Realtime Database for web dashboard control."
          },
          {
            title: "Hardware Implementations",
            content: "Integrated dual-axis solar tracking arrays (4x LDR differential stepping), soil moisture arrays for automated irrigation, and precision load-cell telemetry."
          }
        ],
        ar: [
          {
            title: "المشكلة والسياق الهندسي",
            content: "تتعرض المزارع والمنشآت الصناعية لانقطاعات متكررة في الإنترنت وتذبذب الكهرباء، وتفشل أنظمة إنترنت الأشياء التجارية المعتمدة كلياً على السحاب في إدارة الري أو التحكم في هذه الظروف."
          },
          {
            title: "المعمارية والبروتوكولات",
            content: "بُنيت المنصة بلغة C++17 وإطار ESP-IDF v5.3 لمعالجات ESP32. تعتمد بروتوكول Modbus RTU الصناعي عبر ناقل RS-485 المقاوم للتشويش، مع مرآة سحابية في Firebase RTDB للوحة التحكم."
          },
          {
            title: "التطبيقات الميدانية",
            content: "تطوير نظام تتبع شمسي ثنائي المحور بحساسات LDR، وشبكة استشعار لرطوبة التربة للري التلقائي، ومحولات وزن إلكترونية دقيقة."
          }
        ]
      },
      codeSnippet: `// SmartCore Modbus Register Map Header
#pragma once
#include <stdint.h>

#define REG_SOLAR_AZIMUTH_POS     0x0100
#define REG_SOLAR_ELEVATION_POS   0x0101
#define REG_SOIL_MOISTURE_ZONE1   0x0200
#define REG_IRRIGATION_VALVE1     0x0210
#define REG_SYSTEM_HEALTH_FLAGS   0x0001`
    },

    "beima-auto": {
      title: { en: "BMEIA Auto-Booking Engine & EzSolver Turnstile Automation", ar: "محرك حجز المواعيد المتزامن BMEIA ونظام حل Turnstile الذاتي (EzSolver)" },
      sections: {
        en: [
          {
            title: "Problem & Context",
            content: "Austrian Embassy visa appointment slots in Cairo open without schedule and disappear in seconds under massive concurrent load. The portal uses IP rate limiting, aggressive session timeouts, and Cloudflare Turnstile."
          },
          {
            title: "Concurrency & Mutex Locking",
            content: "Engineered a thread-safe ClientPool using threading.Lock() mutexes, allowing parallel threads to race for newly discovered appointment slots with zero duplicate passport bookings or race conditions."
          },
          {
            title: "EzSolver Integration",
            content: "Created EzSolver: an in-house Cloudflare Turnstile solver executing via native headless Chrome in under 3.5 seconds, saving 15-30 seconds compared to paid 3rd-party solver services."
          }
        ],
        ar: [
          {
            title: "المشكلة والسياق الهندسي",
            content: "تفتح مواعيد تأشيرات السفارة النمساوية بالقاهرة دون موعد مسبق وتنفد في ثوانٍ معدودة في ظل آلاف الطلبات المتزامنة، مع وجود جدران حماية Cloudflare وفترات انتهاء جلسة قصيرة جداً."
          },
          {
            title: "نموذج التزامن وقفل الخيوط",
            content: "بناء حوض عملاء متزامن (ClientPool) يعتمد على أقفال Mutex، مما يتيح لخيوط المعالجة المتوازية التنافس على المواعيد المتاحة دون أدنى احتمال لتكرار حجز نفس الجواز."
          },
          {
            title: "نظام EzSolver الذاتي",
            content: "تطوير أداة EzSolver لحل تحديات Turnstile عبر متصفح محلي في أقل من 3.5 ثانية، مما وفر 15 إلى 30 ثانية مقارنة بخدمات الحل المدفوعة عبر الإنترنت ومكّن من حجز المواعيد بنجاح."
          }
        ]
      },
      codeSnippet: `# Thread-Safe ClientPool with Mutex
class ClientPool:
    def __init__(self, clients: list):
        self._clients = list(clients)
        self._booked = set()
        self._lock = threading.Lock()

    def get_random_client(self) -> dict | None:
        with self._lock:
            avail = [c for c in self._clients if c["passport_number"] not in self._booked]
            return random.choice(avail) if avail else None`
    }
  };

  // --- Core Application Object ---
  const App = {
    init() {
      this.bindDOM();
      this.applyLanguage(currentLang);
      this.attachEvents();
      this.renderAll();
    },

    bindDOM() {
      this.elements = {
        html: document.documentElement,
        siteTitle: document.getElementById('site-title'),
        btnLang: document.getElementById('btn-lang'),
        mobileToggle: document.getElementById('mobile-toggle'),
        navMenu: document.getElementById('nav-menu'),
        projectsContainer: document.getElementById('projects-container'),
        pillarsContainer: document.getElementById('pillars-container'),
        approachContainer: document.getElementById('approach-container'),
        timelineContainer: document.getElementById('timeline-container'),
        labContainer: document.getElementById('lab-container'),
        labFilterButtons: document.querySelectorAll('.filter-btn'),
        modalBackdrop: document.getElementById('case-study-modal'),
        modalTitle: document.getElementById('modal-case-title'),
        modalBody: document.getElementById('modal-case-body'),
        modalClose: document.getElementById('modal-case-close'),
        contactForm: document.getElementById('contact-form'),
        contactAlert: document.getElementById('contact-alert'),
        header: document.querySelector('.site-header')
      };
    },

    attachEvents() {
      // Language Switcher
      this.elements.btnLang.addEventListener('click', () => {
        this.toggleLanguage();
      });

      // Mobile Menu Toggle
      this.elements.mobileToggle.addEventListener('click', () => {
        this.elements.navMenu.classList.toggle('open');
      });

      // Close mobile menu when clicking nav link
      document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
          this.elements.navMenu.classList.remove('open');
        });
      });

      // Scroll Event for Header Blur
      window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
          this.elements.header.classList.add('scrolled');
        } else {
          this.elements.header.classList.remove('scrolled');
        }
      });

      // Lab Filters
      this.elements.labFilterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
          this.elements.labFilterButtons.forEach(b => b.classList.remove('active'));
          e.target.classList.add('active');
          activeLabCategory = e.target.getAttribute('data-category');
          this.renderLab();
        });
      });

      // Modal Dismissal
      this.elements.modalClose.addEventListener('click', () => this.closeModal());
      this.elements.modalBackdrop.addEventListener('click', (e) => {
        if (e.target === this.elements.modalBackdrop) this.closeModal();
      });
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.elements.modalBackdrop.classList.contains('open')) {
          this.closeModal();
        }
      });

      // Contact Form Submission
      if (this.elements.contactForm) {
        this.elements.contactForm.addEventListener('submit', (e) => {
          e.preventDefault();
          this.handleContactSubmit();
        });
      }
    },

    toggleLanguage() {
      currentLang = currentLang === 'en' ? 'ar' : 'en';
      localStorage.setItem('belal_portfolio_lang', currentLang);
      this.applyLanguage(currentLang);
      this.renderAll();
    },

    applyLanguage(lang) {
      const strings = UI_STRINGS[lang];
      this.elements.html.lang = lang;
      this.elements.html.dir = lang === 'ar' ? 'rtl' : 'ltr';

      document.title = strings.siteTitle;
      this.elements.btnLang.textContent = strings.langSwitch;

      // Update all elements with data-i18n
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (strings[key]) {
          el.textContent = strings[key];
        }
      });

      // Update Form Placeholders
      const nameInput = document.getElementById('form-name');
      const emailInput = document.getElementById('form-email');
      const subjInput = document.getElementById('form-subject');
      const msgInput = document.getElementById('form-message');

      if (nameInput) nameInput.placeholder = strings.formName;
      if (emailInput) emailInput.placeholder = strings.formEmail;
      if (subjInput) subjInput.placeholder = strings.formSubject;
      if (msgInput) msgInput.placeholder = strings.formMessage;
    },

    renderAll() {
      this.renderProjects();
      this.renderPillars();
      this.renderApproach();
      this.renderTimeline();
      this.renderLab();
    },

    renderProjects() {
      const lang = currentLang;
      const projects = PORTFOLIO_DATA.projects;
      const strings = UI_STRINGS[lang];

      this.elements.projectsContainer.innerHTML = projects.map(proj => {
        const title = proj.title[lang];
        const tagline = proj.tagline[lang];
        const domain = proj.domain[lang];
        const highlights = proj.highlights ? proj.highlights[lang] : [];

        const metricsHTML = proj.metrics ? `
          <div class="project-metrics-row">
            ${proj.metrics.map(m => `
              <div class="project-metric-item">
                <span class="project-metric-val">${m.value}</span>
                <span class="project-metric-lbl">${m.label[lang]}</span>
              </div>
            `).join('')}
          </div>
        ` : '';

        const highlightsHTML = highlights.length > 0 ? `
          <div class="project-highlights-list">
            ${highlights.map(h => `
              <div class="project-highlight-item">
                <span class="highlight-bullet">▸</span>
                <span>${h}</span>
              </div>
            `).join('')}
          </div>
        ` : '';

        const tagsHTML = proj.tags.map(t => `<span class="tech-tag">${t}</span>`).join('');

        return `
          <article class="project-card" data-project-id="${proj.id}">
            <div class="project-card-header">
              <span class="project-domain-pill">${domain}</span>
              <span class="project-status-badge">● ${proj.status}</span>
            </div>
            <h3 class="project-title">${title}</h3>
            <p class="project-tagline">${tagline}</p>
            ${metricsHTML}
            ${highlightsHTML}
            <div class="project-tags">${tagsHTML}</div>
            <div class="project-actions">
              <button class="btn-cta view-case-btn" data-case-id="${proj.id}">
                ${strings.viewCaseStudy} →
              </button>
            </div>
          </article>
        `;
      }).join('');

      // Attach case study click handlers
      document.querySelectorAll('.view-case-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const caseId = e.currentTarget.getAttribute('data-case-id');
          this.openCaseStudy(caseId);
        });
      });
    },

    renderPillars() {
      const lang = currentLang;
      const pillars = PORTFOLIO_DATA.pillars;

      this.elements.pillarsContainer.innerHTML = pillars.map(p => {
        return `
          <div class="pillar-card">
            <div class="pillar-icon-box">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
              </svg>
            </div>
            <h3 class="pillar-title">${p.title[lang]}</h3>
            <p class="pillar-desc">${p.description[lang]}</p>
            <div class="pillar-skills">
              ${p.skills.map(s => `<span class="skill-pill">${s}</span>`).join('')}
            </div>
          </div>
        `;
      }).join('');
    },

    renderApproach() {
      const lang = currentLang;
      const steps = UI_STRINGS[lang].approachSteps;

      this.elements.approachContainer.innerHTML = steps.map(s => `
        <div class="approach-card">
          <div class="approach-step-num">${s.num}</div>
          <h4 class="approach-title">${s.title}</h4>
          <p class="approach-desc">${s.desc}</p>
        </div>
      `).join('');
    },

    renderTimeline() {
      const lang = currentLang;
      const journey = PORTFOLIO_DATA.journey;

      this.elements.timelineContainer.innerHTML = journey.map(item => `
        <div class="timeline-item">
          <div class="timeline-dot"></div>
          <div class="timeline-year">${item.year} · ${item.tag}</div>
          <div class="timeline-card">
            <h4 class="timeline-card-title">${item.title[lang]}</h4>
            <p class="timeline-card-desc">${item.description[lang]}</p>
          </div>
        </div>
      `).join('');
    },

    renderLab() {
      const lang = currentLang;
      const lab = PORTFOLIO_DATA.labProjects;

      const filtered = activeLabCategory === 'all'
        ? lab
        : lab.filter(item => item.category === activeLabCategory);

      this.elements.labContainer.innerHTML = filtered.map(item => `
        <div class="lab-card">
          <span class="lab-category">${item.category}</span>
          <h4 class="lab-title">${item.title[lang]}</h4>
          <div class="lab-tech">${item.tech}</div>
          <p class="lab-desc">${item.description[lang]}</p>
        </div>
      `).join('');
    },

    openCaseStudy(caseId) {
      const study = DETAILED_CASE_STUDIES[caseId];
      if (!study) {
        alert(currentLang === 'en' ? 'Detailed documentation in repository.' : 'التوثيق التفصيلي متوفر داخل سجل المستودع.');
        return;
      }

      const lang = currentLang;
      this.elements.modalTitle.textContent = study.title[lang];

      let bodyHTML = study.sections[lang].map(sec => `
        <div class="modal-section-block">
          <h4 class="modal-section-h3">
            <span>⚡</span> ${sec.title}
          </h4>
          <p>${sec.content}</p>
        </div>
      `).join('');

      if (study.codeSnippet) {
        bodyHTML += `
          <div class="modal-section-block">
            <h4 class="modal-section-h3"><span>💻</span> Verified Technical Highlight</h4>
            <pre class="modal-code-box"><code>${this.escapeHTML(study.codeSnippet)}</code></pre>
          </div>
        `;
      }

      this.elements.modalBody.innerHTML = bodyHTML;
      this.elements.modalBackdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
    },

    closeModal() {
      this.elements.modalBackdrop.classList.remove('open');
      document.body.style.overflow = '';
    },

    escapeHTML(str) {
      return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    },

    handleContactSubmit() {
      const name = document.getElementById('form-name').value;
      const email = document.getElementById('form-email').value;
      const subject = document.getElementById('form-subject').value;
      const message = document.getElementById('form-message').value;

      // Construct mailto link
      const mailtoUrl = `mailto:ba1593@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio Inquiry from ' + name)}&body=${encodeURIComponent("Sender: " + name + "\nEmail: " + email + "\n\nMessage:\n" + message)}`;
      window.location.href = mailtoUrl;

      const alertEl = this.elements.contactAlert;
      alertEl.style.display = 'block';
      alertEl.textContent = UI_STRINGS[currentLang].formSuccess;
      this.elements.contactForm.reset();
      setTimeout(() => {
        alertEl.style.display = 'none';
      }, 5000);
    }
  };

  // Run on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => App.init());
  } else {
    App.init();
  }
})();
