/**
 * BELAL ALI PROFESSIONAL PORTFOLIO — APPLICATION CONTROLLER
 * Bilingual state (EN/AR), accessible case-study modal, lab filters,
 * honest mailto contact flow, lazy-loaded media component.
 *
 * Security note: every data string that reaches innerHTML passes through
 * esc(). The only trusted-HTML path is `data-i18n-html`, whose values come
 * from the internal UI_STRINGS dictionary (not from user input).
 */

(function () {
  'use strict';

  const LANG_KEY = 'belal_portfolio_lang';
  const SUPPORTED = ['en', 'ar'];

  // --- State ---
  let currentLang = (function () {
    try {
      const saved = localStorage.getItem(LANG_KEY);
      if (SUPPORTED.includes(saved)) return saved;
    } catch (_) { /* storage blocked */ }
    const nav = (navigator.language || '').toLowerCase();
    return nav.startsWith('ar') ? 'ar' : 'en';
  })();
  let activeLabCategory = 'all';
  let lastFocusedBeforeModal = null;

  // --- Escaping ---
  const ESC_MAP = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  const esc = (v) => String(v == null ? '' : v).replace(/[&<>"']/g, (c) => ESC_MAP[c]);
  const t = (obj, lang) => (obj && typeof obj === 'object') ? (obj[lang] ?? obj.en ?? '') : (obj ?? '');

  // --- Translation Dictionary for Static UI Labels ---
  const UI_STRINGS = {
    en: {
      siteTitle: "Belal Ali | AI Systems & Automation Engineer",
      metaDescription: "Portfolio of Belal Ali — AI systems and automation engineer: real-time voice runtimes, multi-provider LLM orchestration, resilient concurrent automation, embedded & IoT. Evidence-linked case studies.",
      roleSubtitle: "AI Systems & Automation Engineer",
      navWork: "Selected Work",
      navExpertise: "Expertise",
      navApproach: "Approach",
      navJourney: "Journey",
      navLab: "Lab",
      navContact: "Contact",
      btnResume: "Request CV",
      langSwitch: "العربية",
      langSwitchAria: "Switch language to Arabic",
      menuAria: "Toggle navigation menu",
      skipLink: "Skip to main content",
      heroBadge: "Open to senior engineering roles & technical consulting",
      heroTitleHtml: 'Resilient systems from the <span class="gradient-text">physical edge</span> to <span class="gradient-text">real-time AI</span>.',
      heroLead: "I'm Belal Ali — an AI systems and automation engineer building since 2021. I design low-latency voice runtimes, multi-provider LLM platforms, resilient concurrent automation and embedded controllers — and I publish the tests and evidence alongside the code.",
      btnExplore: "Explore selected work",
      btnContact: "Get in touch",
      heroProofTitle: "Measured, not marketed",
      heroProofNote: "Figures link to public evidence files. Private-source work is labelled “reported”.",
      heroVisualCaption: "QEVION interruption path: detect → cancel → reconcile (original diagram).",
      workTag: "SELECTED WORK",
      workTitle: "Systems built with evidence attached",
      workSubtitle: "Four flagship systems and supporting projects. Each card states its maturity and whether its source is public and verified, or reported from private work.",
      viewCaseStudy: "Read case study",
      viewRepo: "View repository",
      highlightsTitle: "Key technical highlights",
      mediaTitle: "Media",
      supportingTitle: "Supporting projects",
      expertiseTag: "CAPABILITIES",
      expertiseTitle: "Four engineering pillars",
      expertiseSubtitle: "From bare-metal microcontrollers to distributed, real-time voice systems.",
      approachTag: "METHODOLOGY",
      approachTitle: "How I work",
      approachSubtitle: "Failure modes first, contracts enforced by tooling, and claims backed by artefacts.",
      approachSteps: [
        { num: "01", title: "Failure modes before features", desc: "Map network drops, provider outages, rate limits and model hallucination paths before writing code; design the recovery path first." },
        { num: "02", title: "Contracts enforced by tooling", desc: "Core packages import contracts only. import-linter gates (5 in QEVION, 12 in general_ai_core) fail the build on boundary violations. Business truth lives in deterministic code, never in the LLM." },
        { num: "03", title: "Local-first, degrade gracefully", desc: "Edge controllers keep running offline; cloud is a mirror. Automation workflows back off and retry instead of failing hard." },
        { num: "04", title: "Evidence over adjectives", desc: "Pre-registered latency criteria, soak and smoke tests, screenshots and eval reports committed to the repo — including results that were reverted when they did not hold." }
      ],
      journeyTag: "TIMELINE",
      journeyTitle: "Trajectory 2021 → 2026",
      journeySubtitle: "From Arduino sensor sketches to a spec-driven real-time voice runtime.",
      labTag: "R&D",
      labTitle: "Engineering lab & experiments",
      labSubtitle: "Smaller explorations in hardware, signal processing, trading connectors and Web3. Experimental by nature.",
      labEmpty: "No experiments in this category yet.",
      contactTag: "CONTACT",
      contactTitle: "Let's build something resilient",
      contactSubtitle: "Real-time voice agents, multi-provider AI platforms, concurrent automation or embedded controllers — happy to talk.",
      contactDirect: "Direct channels",
      contactCvNote: "A PDF CV is available on request — mention it in your message or email me directly.",
      formName: "Your name",
      formEmail: "Your email",
      formSubject: "Project or role",
      formMessage: "Message",
      formSend: "Open in my mail app",
      formHint: "This form has no server. Submitting opens your default mail app with the message pre-filled, addressed to ba1593@gmail.com. Nothing is sent until you press Send there.",
      formOpened: "Your mail app should now be open with the message pre-filled. If nothing happened, copy the address below and send it manually — your text has been kept.",
      formInvalid: "Please fill in your name, a valid email and a message.",
      copyEmail: "Copy email address",
      copied: "Copied: ba1593@gmail.com",
      copyFailed: "Could not copy — the address is ba1593@gmail.com",
      modalClose: "Close",
      modalCloseAria: "Close case study",
      modalCode: "From the source",
      modalCodeNote: "Trimmed excerpt; see repository for full context.",
      modalEvidence: "Evidence",
      rights: "All rights reserved.",
      footerNote: "Static site · no tracking · content and figures audited against public repositories (see REVIEW_FINDINGS.md)."
    },
    ar: {
      siteTitle: "بلال علي | مهندس أنظمة ذكاء اصطناعي وأتمتة",
      metaDescription: "معرض أعمال بلال علي — مهندس أنظمة ذكاء اصطناعي وأتمتة: أنظمة صوت لحظية، تنسيق نماذج لغوية متعددة المزوّدين، أتمتة متزامنة مرنة، وأنظمة مدمجة. دراسات حالة مرتبطة بالأدلة.",
      roleSubtitle: "مهندس أنظمة ذكاء اصطناعي وأتمتة",
      navWork: "أبرز الأعمال",
      navExpertise: "الخبرات",
      navApproach: "المنهجية",
      navJourney: "المسار",
      navLab: "المختبر",
      navContact: "تواصل",
      btnResume: "طلب السيرة الذاتية",
      langSwitch: "English",
      langSwitchAria: "تبديل اللغة إلى الإنجليزية",
      menuAria: "فتح/إغلاق قائمة التنقل",
      skipLink: "الانتقال إلى المحتوى الرئيسي",
      heroBadge: "متاح لأدوار هندسية متقدمة واستشارات تقنية",
      heroTitleHtml: 'أنظمة مرنة من <span class="gradient-text">الحافة الفيزيائية</span> إلى <span class="gradient-text">الذكاء الاصطناعي اللحظي</span>.',
      heroLead: "أنا بلال علي — مهندس أنظمة ذكاء اصطناعي وأتمتة أبني منذ 2021. أصمّم أنظمة تشغيل صوتية منخفضة الكمون، ومنصات نماذج لغوية متعددة المزوّدين، وأتمتة متزامنة مرنة، ومتحكمات مدمجة — وأنشر الاختبارات والأدلة مع الكود.",
      btnExplore: "استكشف الأعمال",
      btnContact: "تواصل معي",
      heroProofTitle: "مُقاس، لا مُسوَّق",
      heroProofNote: "الأرقام مرتبطة بملفات أدلة عامة. الأعمال ذات المصدر الخاص موسومة بـ «مُبلَّغ عنه».",
      heroVisualCaption: "مسار المقاطعة في QEVION: كشف → إلغاء → تسوية (مخطط أصلي).",
      workTag: "أبرز الأعمال",
      workTitle: "أنظمة مبنية مع أدلتها",
      workSubtitle: "أربعة أنظمة رئيسية ومشاريع داعمة. تُصرّح كل بطاقة بمستوى نضجها وما إذا كان مصدرها عاماً ومتحققاً منه أو مُبلَّغاً عنه من عمل خاص.",
      viewCaseStudy: "اقرأ دراسة الحالة",
      viewRepo: "عرض المستودع",
      highlightsTitle: "أبرز النقاط التقنية",
      mediaTitle: "الوسائط",
      supportingTitle: "مشاريع داعمة",
      expertiseTag: "القدرات",
      expertiseTitle: "أربع ركائز هندسية",
      expertiseSubtitle: "من المتحكمات الدقيقة حتى أنظمة الصوت اللحظية الموزعة.",
      approachTag: "المنهجية",
      approachTitle: "كيف أعمل",
      approachSubtitle: "أنماط الفشل أولاً، عقود تفرضها الأدوات، وادعاءات مدعومة بمخرجات ملموسة.",
      approachSteps: [
        { num: "01", title: "أنماط الفشل قبل الميزات", desc: "رسم مسارات انقطاع الشبكة وتعطّل المزوّد وحدود المعدل وهلوسة النموذج قبل كتابة الكود؛ وتصميم مسار التعافي أولاً." },
        { num: "02", title: "عقود تفرضها الأدوات", desc: "حزم النواة تستورد العقود فقط. بوابات import-linter (5 في QEVION و12 في general_ai_core) تُفشل البناء عند خرق الحدود. حقيقة الأعمال في كود حتمي، لا في النموذج." },
        { num: "03", title: "محلي أولاً، وتدهور رشيق", desc: "متحكمات الحافة تستمر دون اتصال؛ السحابة مرآة. سير عمل الأتمتة يتراجع ويعيد المحاولة بدلاً من الفشل الحاد." },
        { num: "04", title: "أدلة لا صفات", desc: "معايير كمون مسجّلة مسبقاً، اختبارات تحمّل ودخان، لقطات شاشة وتقارير تقييم في المستودع — بما فيها نتائج تم التراجع عنها حين لم تصمد." }
      ],
      journeyTag: "المسار الزمني",
      journeyTitle: "المسار 2021 ← 2026",
      journeySubtitle: "من برامج حساسات Arduino إلى نظام تشغيل صوتي لحظي مدفوع بالمواصفة.",
      labTag: "بحث وتطوير",
      labTitle: "المختبر والتجارب",
      labSubtitle: "استكشافات أصغر في العتاد ومعالجة الإشارات وموصّلات التداول وWeb3. تجريبية بطبيعتها.",
      labEmpty: "لا توجد تجارب في هذه الفئة بعد.",
      contactTag: "تواصل",
      contactTitle: "لنبنِ معاً شيئاً مرناً",
      contactSubtitle: "وكلاء صوت لحظيون، منصات ذكاء اصطناعي متعددة المزوّدين، أتمتة متزامنة أو متحكمات مدمجة — يسعدني الحديث.",
      contactDirect: "قنوات مباشرة",
      contactCvNote: "السيرة الذاتية بصيغة PDF متاحة عند الطلب — اذكر ذلك في رسالتك أو راسلني مباشرة.",
      formName: "اسمك",
      formEmail: "بريدك الإلكتروني",
      formSubject: "المشروع أو الدور",
      formMessage: "الرسالة",
      formSend: "فتح في تطبيق البريد",
      formHint: "هذا النموذج بلا خادم. عند الإرسال يُفتح تطبيق البريد الافتراضي لديك والرسالة معبّأة مسبقاً وموجّهة إلى ba1593@gmail.com. لا يُرسل شيء حتى تضغط «إرسال» هناك.",
      formOpened: "من المفترض أن يكون تطبيق البريد قد فُتح والرسالة معبّأة. إن لم يحدث شيء، انسخ العنوان أدناه وأرسل يدوياً — نصك محفوظ.",
      formInvalid: "يرجى إدخال الاسم وبريد إلكتروني صالح ورسالة.",
      copyEmail: "نسخ عنوان البريد",
      copied: "تم النسخ: ba1593@gmail.com",
      copyFailed: "تعذّر النسخ — العنوان هو ba1593@gmail.com",
      modalClose: "إغلاق",
      modalCloseAria: "إغلاق دراسة الحالة",
      modalCode: "من المصدر",
      modalCodeNote: "مقتطف مختصر؛ راجع المستودع للسياق الكامل.",
      modalEvidence: "الأدلة",
      rights: "جميع الحقوق محفوظة.",
      footerNote: "موقع ثابت · بلا تتبّع · المحتوى والأرقام مُدقّقة مقابل مستودعات عامة (راجع REVIEW_FINDINGS.md)."
    }
  };

  // --- Detailed Case Studies (EN & AR) ---
  // Content verified against public repositories where `evidence: "public"`.
  const DETAILED_CASE_STUDIES = {
    qevion: {
      sections: {
        en: [
          { title: "Problem & context",
            content: "Generic conversational-AI wrappers add seconds of latency, lock you into one vendor, and let the model improvise prices, eligibility or confirmations. For Egyptian Arabic, natural turn-taking and barge-in are additionally fragile." },
          { title: "Architecture & decisions",
            content: "QEVION separates a generic Core (sessions, turn plane, interruption, facts store) from declarative Activity Blueprints (qevion.activity.v1) authored for each business. Browser audio is captured by an AudioWorklet as PCM16 frames and streamed over WebSockets; Silero VAD drives turn-taking; providers (OpenAI Realtime, mock) sit behind role ports. Five import-linter contracts keep the Core free of domain vocabulary." },
          { title: "Deterministic guardrails (ADR-0004)",
            content: "The LLM proposes phrasing only. Prices, claims and state transitions are produced by deterministic code from the FieldStore. Eval CP-0009 ran 22 scenarios with 232 graders (including facts_not_invented) — all passed. This is a design safeguard verified by evals, not a measured production hallucination rate." },
          { title: "Interruption path",
            content: "Session.interrupt() runs DETECT → CANCEL → RECONCILE with watermarks t0..t4. Cancel sends provider.cancel_response and STOP_PLAYOUT, with a 300 ms forced path. Reconcile keeps only the text the user plausibly heard and truncates the provider's context to match. Measured (CP-0015, mock provider): t1→t3 p50 4 ms, p95 6 ms." },
          { title: "What the latency numbers actually say",
            content: "Spec §41 targets E2E p50 ≤ 1200 ms (stretch ≤ 800). The 2026-09-24 root-cause audit measured no-tool turns at p50 1011 ms / p95 1308 ms (n=20, sandbox), tool turns p50 2614 ms; ≈95 % of that is the provider. QEVION-owned overhead is ≈3–4 ms per turn. Separate live TTFA samples: 453 / 968 / 965 ms. The site therefore does not claim “<800 ms”." },
          { title: "Verification evidence",
            content: "160,984-byte QEVION_PLATFORM_SPEC_v3.md with normative QV-* rules and ADRs; ~222 tests; browser voice smoke on OpenAI with an 86 s WebSocket soak (target 75 s, 7 heartbeats, clean close 1000); WS keep-alive tests of 8 s and 22 s; evidence tree P0–P6 committed to the repo." }
        ],
        ar: [
          { title: "المشكلة والسياق",
            content: "أغلفة الذكاء الاصطناعي الحواري العامة تضيف ثوانيَ من الكمون، وتقيّدك بمزوّد واحد، وتترك النموذج يرتجل الأسعار أو الأهلية أو التأكيدات. وفي اللهجة المصرية يزداد هشاشةً كلٌّ من تبادل الأدوار الطبيعي والمقاطعة." },
          { title: "المعمارية والقرارات",
            content: "تفصل QEVION نواةً عامة (الجلسات، طبقة الدور، المقاطعة، مخزن الحقائق) عن مخططات نشاط تعريفية (qevion.activity.v1) تُكتب لكل عمل. يُلتقط صوت المتصفح عبر AudioWorklet كإطارات PCM16 ويُبث عبر WebSockets؛ يقود Silero VAD تبادل الأدوار؛ ويقف المزوّدون (OpenAI Realtime، وهمي) خلف منافذ أدوار. خمسة عقود import-linter تُبقي النواة خالية من مفردات المجال." },
          { title: "حواجز حتمية (ADR-0004)",
            content: "النموذج يقترح الصياغة فقط. الأسعار والادعاءات والانتقالات تنتجها شيفرة حتمية من FieldStore. شغّل تقييم CP-0009 اثنين وعشرين سيناريو بـ 232 معياراً (منها facts_not_invented) — اجتازها جميعاً. هذه ضمانة تصميمية متحقَّق منها بالتقييم، لا نسبة هلوسة إنتاجية مُقاسة." },
          { title: "مسار المقاطعة",
            content: "تنفّذ Session.interrupt()‎ كشف → إلغاء → تسوية مع علامات t0..t4. يرسل الإلغاء provider.cancel_response وSTOP_PLAYOUT مع مسار إجباري بعد 300 ms. تحتفظ التسوية فقط بالنص الذي سمعه المستخدم فعلاً وتقتطع سياق المزوّد ليطابقه. المقاس (CP-0015، مزوّد وهمي): t1→t3 وسيط 4 ms و p95 = 6 ms." },
          { title: "ما تقوله أرقام الكمون فعلاً",
            content: "تستهدف المواصفة §41 وسيطاً طرف-إلى-طرف ≤ 1200 ms (الطموح ≤ 800). قاس تدقيق 2026-09-24 الأدوار بدون أدوات عند وسيط 1011 ms و p95 = 1308 ms (n=20، بيئة تجريبية)، والأدوار بأدوات وسيط 2614 ms؛ ≈95 % منها يعود للمزوّد. عبء QEVION ≈3–4 ms لكل دور. عينات TTFA حية منفصلة: 453 / 968 / 965 ms. لذلك لا يدّعي الموقع «أقل من 800 ms»." },
          { title: "أدلة التحقق",
            content: "مواصفة QEVION_PLATFORM_SPEC_v3.md بحجم 160,984 بايت بقواعد QV-* وسجلات ADR؛ نحو 222 اختباراً؛ اختبار صوت متصفح على OpenAI مع تحمّل WebSocket لمدة 86 ث (الهدف 75 ث، 7 نبضات، إغلاق نظيف 1000)؛ اختبارات keep-alive لمدة 8 ث و22 ث؛ شجرة أدلة P0–P6 في المستودع." }
        ]
      },
      evidence: [
        { label: "QEVION_PLATFORM_SPEC_v3.md §41 — latency criteria", href: "https://github.com/belalalibb/markting_call_center" },
        { label: "docs/audit/LATENCY_ROOT_CAUSE_2026-09-24.md", href: "https://github.com/belalalibb/markting_call_center" },
        { label: "evidence/P2/CP-0009 — eval report (22 cases, 232 graders)", href: "https://github.com/belalalibb/markting_call_center" },
        { label: "evidence/P4/CP-0015 — interruption timings", href: "https://github.com/belalalibb/markting_call_center" }
      ],
      codeLang: "python",
      codeFile: "qevion/core/session.py — Session.interrupt() (trimmed)",
      codeSnippet: `async def interrupt(self, *, onset_ms: int, detected_ms: int | None = None) -> InterruptionRecord | None:
    rid = self._current_response
    ...
    rec = InterruptionRecord(
        response_id=rid, t0_user_speech_onset=onset_ms, t1_barge_in_detected=detected_ms or self.clock()
    )
    # 1 DETECT
    await self.emit(EventType.INTERRUPTION_DETECTED, {"response_id": rid, "audio_ms_sent": tr.audio_ms_sent, ...})
    # 2 CANCEL (provider generation only if still running; client playout always)
    self._playout_stopped.clear()
    if not tr.done:
        await self._provider.cancel_response(rid)
    await self._send(ServerMessageType.STOP_PLAYOUT, response_id=rid)
    rec.t2_cancel_sent = self.clock()
    try:
        await asyncio.wait_for(self._playout_stopped.wait(), timeout=_CANCEL_FORCE_MS / 1000)  # 300 ms
    except TimeoutError:
        rec.forced = True
    rec.t3_playout_stopped = self.clock()
    # 3 RECONCILE — keep only what the user plausibly heard; the unheard tail never persists as context.
    played = max(0, min(tr.audio_ms_sent, rec.t1_barge_in_detected - start))
    tr.text = tr.text[:heard_len]
    if tr.audio_ms_sent:
        await self._provider.truncate_response(rid, played)
    rec.t4_state_reconciled = self.clock()`
    },

    "ai-core": {
      sections: {
        en: [
          { title: "Problem & context",
            content: "Teams want to use many LLM providers without rewriting clients for each one, need a UI that works for Arabic speakers, and need the architecture to stay modular as capabilities grow." },
          { title: "Architecture",
            content: "general_ai_core is a contract-first core of 22 packages governed by 12 ADRs and 12 import-linter contracts. chat_engine builds on it: an OpenAI-compatible /v1 API with SSE streaming over a 14-provider gateway (gateway, groq, genspark_llm and others), with an admin surface for provider keys and health." },
          { title: "Arabic-first UI",
            content: "The Lit web UI ships right-to-left layout, dark and light themes and Arabic copy as the default, not an afterthought. Screenshots on this page are Playwright captures from the repos' evidence folders." },
          { title: "Verification evidence",
            content: "≈3,758 automated tests in general_ai_core; 65 Playwright evidence screenshots recorded per release (r185, r199, completion_v2); chat_engine evidence sets ce13b / ce20 / ce24 with a state ledger. Both repositories are public." }
        ],
        ar: [
          { title: "المشكلة والسياق",
            content: "تريد الفرق استخدام مزوّدي نماذج كثيرين دون إعادة كتابة العملاء لكل واحد، وتحتاج واجهة تعمل للناطقين بالعربية، وتحتاج أن تبقى المعمارية معيارية مع نمو القدرات." },
          { title: "المعمارية",
            content: "general_ai_core نواة قائمة على العقود من 22 حزمة تحكمها 12 سجل ADR و12 عقد import-linter. تبني عليها chat_engine واجهة ‎/v1 متوافقة مع OpenAI مع بث SSE عبر بوابة من 14 مزوّداً (gateway وgroq وgenspark_llm وغيرها)، مع لوحة إدارة لمفاتيح المزوّدين والصحة." },
          { title: "واجهة عربية أولاً",
            content: "واجهة Lit تأتي بتخطيط من اليمين إلى اليسار وسمتين داكنة وفاتحة ونصوص عربية افتراضياً، لا كإضافة لاحقة. لقطات الشاشة في هذه الصفحة هي التقاطات Playwright من مجلدات الأدلة في المستودعات." },
          { title: "أدلة التحقق",
            content: "≈3,758 اختباراً آلياً في general_ai_core؛ 65 لقطة أدلة Playwright مسجلة لكل إصدار (r185، r199، completion_v2)؛ مجموعات أدلة chat_engine ce13b / ce20 / ce24 مع سجل حالة. كلا المستودعين عام." }
        ]
      },
      evidence: [
        { label: "github.com/belalalibb/general_ai_core", href: "https://github.com/belalalibb/general_ai_core" },
        { label: "github.com/belalalibb/chat_engen", href: "https://github.com/belalalibb/chat_engen" }
      ]
    },

    smartcore: {
      sections: {
        en: [
          { title: "Problem & context",
            content: "Greenhouses and small buildings in areas with unstable power and connectivity cannot depend on cloud round-trips for irrigation, ventilation or lighting decisions." },
          { title: "Design",
            content: "An ESP32 controller (C++17 on ESP-IDF, FreeRTOS tasks) owns the control loop locally. Sensors and actuators communicate over Modbus RTU on an RS-485 bus using a register map intended for PLC interoperability. Telemetry is mirrored to Firebase Realtime Database for a web dashboard; the mirror is optional and the loop continues without it." },
          { title: "Lineage",
            content: "The design grew out of earlier Arduino experiments shown in the Lab: a dual-axis LDR solar tracker, soil-moisture irrigation and an IR-beam pest-trap counter." },
          { title: "Verification status",
            content: "Reported — prototype firmware and lab hardware. The source, register map and hardware photos were not available to this review, so no uptime, cycle-time or deployment figures are claimed. The diagram is drawn from the reported architecture." }
        ],
        ar: [
          { title: "المشكلة والسياق",
            content: "البيوت المحمية والمباني الصغيرة في مناطق الكهرباء والاتصال غير المستقرين لا يمكنها الاعتماد على رحلات ذهاب وإياب سحابية لقرارات الري أو التهوية أو الإضاءة." },
          { title: "التصميم",
            content: "متحكم ESP32 (C++17 على ESP-IDF ومهام FreeRTOS) يملك حلقة التحكم محلياً. تتواصل الحساسات والمشغّلات عبر Modbus RTU على ناقل RS-485 بخريطة سجلات مصممة للتوافق مع PLC. تُعكس القياسات إلى Firebase Realtime Database للوحة ويب؛ المرآة اختيارية وتستمر الحلقة بدونها." },
          { title: "النسب",
            content: "نشأ التصميم من تجارب Arduino سابقة معروضة في المختبر: متتبع شمسي ثنائي المحور بحساسات LDR، وري بحسب رطوبة التربة، وعدّاد مصيدة آفات بشعاع أشعة تحت حمراء." },
          { title: "حالة التحقق",
            content: "مُبلَّغ عنه — برنامج ثابت أولي وعتاد مختبري. لم يكن المصدر ولا خريطة السجلات ولا صور العتاد متاحة لهذه المراجعة، لذا لا تُدّعى أرقام جاهزية أو زمن دورة أو نشر. المخطط مرسوم من المعمارية المُبلَّغ عنها." }
        ]
      },
      codeLang: "c",
      codeFile: "Illustrative register layout (reported design — not from a verified source file)",
      codeSnippet: `// Modbus RTU holding registers (illustrative)
#define REG_SYSTEM_HEALTH_FLAGS   0x0001
#define REG_SOLAR_AZIMUTH_POS     0x0100
#define REG_SOLAR_ELEVATION_POS   0x0101
#define REG_SOIL_MOISTURE_ZONE1   0x0200
#define REG_IRRIGATION_VALVE1     0x0210`
    },

    "concurrent-workflow": {
      sections: {
        en: [
          { title: "Problem & context",
            content: "Long-running browser and form workflows that run many records in parallel fail in predictable ways: two workers pick the same record, upstream rate limits trigger cascading errors, and when something breaks at 3 a.m. there is no trace to debug from." },
          { title: "Design",
            content: "A thread-safe ClientPool leases each record to exactly one worker under a lock. Workers run in a bounded ThreadPoolExecutor, retry idempotently with exponential backoff plus Gaussian jitter, and publish milestones to a Telegram bot so the operator is not tied to a terminal." },
          { title: "Observability",
            content: "Dual-sink logging: concise, human-readable milestones on the console and microsecond-resolution structured traces on disk for post-mortems." },
          { title: "Verification status & scope",
            content: "Reported — private source; demo-level maturity. This page presents the engineering pattern only. Operational details of the specific target systems, and any claims about outcomes, are intentionally omitted." }
        ],
        ar: [
          { title: "المشكلة والسياق",
            content: "سير عمل المتصفح والنماذج الطويل الذي يعالج سجلات كثيرة بالتوازي يفشل بطرق متوقعة: يلتقط عاملان السجل نفسه، وتُطلق حدود المعدل العلوية أخطاء متتالية، وحين يتعطل شيء في الثالثة فجراً لا يوجد أثر للتصحيح." },
          { title: "التصميم",
            content: "مجمّع ClientPool آمن للخيوط يؤجّر كل سجل لعامل واحد تحت قفل. يعمل العمّال في ThreadPoolExecutor محدود، ويعيدون المحاولة بشكل متكرّر مع تراجع أسّي وتشويش غاوسي، وينشرون المعالم إلى بوت Telegram كي لا يبقى المشغّل مقيداً بالطرفية." },
          { title: "الرصد",
            content: "تسجيل مزدوج المخرجات: معالم موجزة مقروءة على الطرفية، وتتبّع منظم بدقة الميكروثانية على القرص للتحليل اللاحق." },
          { title: "حالة التحقق والنطاق",
            content: "مُبلَّغ عنه — مصدر خاص؛ نضج على مستوى العرض. تعرض هذه الصفحة النمط الهندسي فقط. التفاصيل التشغيلية للأنظمة المستهدفة وأي ادعاءات حول النتائج محذوفة عمداً." }
        ]
      },
      codeLang: "python",
      codeFile: "Pattern sketch (reported design)",
      codeSnippet: `class ClientPool:
    def __init__(self, records):
        self._records = list(records)
        self._leased = set()
        self._lock = threading.Lock()

    def lease(self):
        with self._lock:
            free = [r for r in self._records if r.id not in self._leased]
            if not free:
                return None
            rec = random.choice(free)
            self._leased.add(rec.id)
            return rec

def backoff(attempt, base=1.5, cap=60.0):
    return min(cap, base * 2 ** attempt) + abs(random.gauss(0, 0.4))`
    }
  };

  // --- Icons (inline SVG, Feather-style) ---
  const ICONS = {
    mic: '<path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>',
    cpu: '<rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3"/>',
    activity: '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',
    layers: '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>',
    external: '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>'
  };
  const icon = (name, size = 24) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${ICONS[name] || ICONS.layers}</svg>`;

  // --- Media component ---
  // Renders <figure> for image | diagram. Diagrams are bilingual SVG pairs
  // (`${src}.en.svg` / `${src}.ar.svg`), swapped on language change.
  function renderMedia(item, lang, opts = {}) {
    const isDiagram = item.type === 'diagram';
    const src = isDiagram ? `${item.src}.${lang}.svg` : item.src;
    const alt = t(item.alt, lang);
    const cap = t(item.caption, lang);
    const w = item.width || 1200, h = item.height || 720;
    const cls = ['media-figure', isDiagram ? 'media-diagram' : 'media-image', opts.className || ''].join(' ').trim();
    const sizes = opts.sizes || '(min-width: 900px) 560px, 100vw';
    return `
      <figure class="${cls}">
        <div class="media-frame" style="aspect-ratio:${w}/${h}">
          <img src="${esc(src)}" alt="${esc(alt)}" width="${w}" height="${h}"
               loading="${opts.eager ? 'eager' : 'lazy'}" decoding="async" sizes="${esc(sizes)}"
               ${isDiagram ? `data-diagram-base="${esc(item.src)}"` : ''}>
        </div>
        ${cap ? `<figcaption>${esc(cap)}</figcaption>` : ''}
      </figure>`;
  }

  function renderGallery(media, lang, opts = {}) {
    if (!media || !media.length) return '';
    const max = opts.max || media.length;
    const items = media.slice(0, max);
    return `<div class="media-gallery media-count-${items.length}">${items.map((m) => renderMedia(m, lang, opts)).join('')}</div>`;
  }

  // --- Core Application Object ---
  const App = {
    init() {
      this.bindDOM();
      this.attachEvents();
      this.applyLanguage(currentLang);
      this.renderAll();
      this.initScrollSpy();
    },

    bindDOM() {
      const $ = (id) => document.getElementById(id);
      this.el = {
        html: document.documentElement,
        btnLang: $('btn-lang'),
        mobileToggle: $('mobile-toggle'),
        navMenu: $('nav-menu'),
        header: document.querySelector('.site-header'),
        main: document.querySelector('main'),
        heroMetrics: $('hero-metrics'),
        heroVisual: $('hero-visual'),
        projectsContainer: $('projects-container'),
        supportingContainer: $('supporting-container'),
        pillarsContainer: $('pillars-container'),
        approachContainer: $('approach-container'),
        timelineContainer: $('timeline-container'),
        labFilters: $('lab-filters'),
        labContainer: $('lab-container'),
        modalBackdrop: $('case-study-modal'),
        modalDialog: document.querySelector('#case-study-modal .modal-dialog'),
        modalTitle: $('modal-case-title'),
        modalBody: $('modal-case-body'),
        modalClose: $('modal-case-close'),
        contactForm: $('contact-form'),
        contactAlert: $('contact-alert'),
        copyEmailBtn: $('btn-copy-email'),
        footerYear: $('footer-year'),
        metaDesc: document.querySelector('meta[name="description"]')
      };
    },

    attachEvents() {
      const el = this.el;

      el.btnLang.addEventListener('click', () => this.toggleLanguage());

      // Mobile menu
      el.mobileToggle.addEventListener('click', () => this.setMenu(!el.navMenu.classList.contains('open')));
      el.navMenu.addEventListener('click', (e) => { if (e.target.closest('.nav-link')) this.setMenu(false); });
      document.addEventListener('click', (e) => {
        if (!el.navMenu.classList.contains('open')) return;
        if (!e.target.closest('#nav-menu') && !e.target.closest('#mobile-toggle')) this.setMenu(false);
      });

      // Header shadow
      const onScroll = () => el.header.classList.toggle('scrolled', window.scrollY > 40);
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();

      // Lab filters (delegated)
      el.labFilters.addEventListener('click', (e) => {
        const btn = e.target.closest('.filter-btn');
        if (!btn) return;
        activeLabCategory = btn.dataset.category || 'all';
        this.renderLabFilters();
        this.renderLab();
      });

      // Case-study buttons (delegated)
      const onCardClick = (e) => {
        const btn = e.target.closest('.view-case-btn');
        if (btn) this.openCaseStudy(btn.dataset.caseId, btn);
      };
      el.projectsContainer.addEventListener('click', onCardClick);
      if (el.supportingContainer) el.supportingContainer.addEventListener('click', onCardClick);

      // Modal
      el.modalClose.addEventListener('click', () => this.closeModal());
      el.modalBackdrop.addEventListener('click', (e) => { if (e.target === el.modalBackdrop) this.closeModal(); });
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          if (this.modalOpen()) { e.preventDefault(); this.closeModal(); }
          else if (el.navMenu.classList.contains('open')) { this.setMenu(false); el.mobileToggle.focus(); }
          return;
        }
        if (e.key === 'Tab' && this.modalOpen()) this.trapFocus(e);
      });

      // Contact
      if (el.contactForm) {
        el.contactForm.addEventListener('submit', (e) => { e.preventDefault(); this.handleContactSubmit(); });
      }
      if (el.copyEmailBtn) {
        el.copyEmailBtn.addEventListener('click', () => this.copyEmail());
      }
    },

    setMenu(open) {
      this.el.navMenu.classList.toggle('open', open);
      this.el.mobileToggle.setAttribute('aria-expanded', String(open));
    },

    initScrollSpy() {
      if (!('IntersectionObserver' in window)) return;
      const links = Array.from(document.querySelectorAll('.nav-link[href^="#"]'));
      const byId = new Map(links.map((l) => [l.getAttribute('href').slice(1), l]));
      const sections = Array.from(byId.keys()).map((id) => document.getElementById(id)).filter(Boolean);
      const obs = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          links.forEach((l) => { l.classList.remove('active'); l.removeAttribute('aria-current'); });
          const link = byId.get(en.target.id);
          if (link) { link.classList.add('active'); link.setAttribute('aria-current', 'true'); }
        });
      }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });
      sections.forEach((s) => obs.observe(s));
    },

    toggleLanguage() {
      currentLang = currentLang === 'en' ? 'ar' : 'en';
      try { localStorage.setItem(LANG_KEY, currentLang); } catch (_) { /* ignore */ }
      this.applyLanguage(currentLang);
      this.renderAll();
    },

    applyLanguage(lang) {
      const s = UI_STRINGS[lang];
      const el = this.el;
      el.html.lang = lang;
      el.html.dir = lang === 'ar' ? 'rtl' : 'ltr';

      document.title = s.siteTitle;
      if (el.metaDesc) el.metaDesc.setAttribute('content', s.metaDescription);
      el.btnLang.textContent = s.langSwitch;
      el.btnLang.setAttribute('aria-label', s.langSwitchAria);
      el.btnLang.setAttribute('lang', lang === 'en' ? 'ar' : 'en');
      el.mobileToggle.setAttribute('aria-label', s.menuAria);
      el.modalClose.setAttribute('aria-label', s.modalCloseAria);

      // Plain text translations (safe: textContent)
      document.querySelectorAll('[data-i18n]').forEach((node) => {
        const key = node.getAttribute('data-i18n');
        if (typeof s[key] === 'string') node.textContent = s[key];
      });
      // Trusted-HTML translations from the internal dictionary only (preserves nested markup)
      document.querySelectorAll('[data-i18n-html]').forEach((node) => {
        const key = node.getAttribute('data-i18n-html');
        if (typeof s[key] === 'string') node.innerHTML = s[key];
      });
      // Attribute translations: data-i18n-attr="placeholder:formName,aria-label:menuAria"
      document.querySelectorAll('[data-i18n-attr]').forEach((node) => {
        node.getAttribute('data-i18n-attr').split(',').forEach((pair) => {
          const [attr, key] = pair.split(':').map((x) => x.trim());
          if (attr && typeof s[key] === 'string') node.setAttribute(attr, s[key]);
        });
      });

      // Swap bilingual diagrams already in the DOM
      document.querySelectorAll('img[data-diagram-base]').forEach((img) => {
        img.src = `${img.dataset.diagramBase}.${lang}.svg`;
      });

      if (el.footerYear) el.footerYear.textContent = String(new Date().getFullYear());
    },

    renderAll() {
      this.renderHero();
      this.renderProjects();
      this.renderPillars();
      this.renderApproach();
      this.renderTimeline();
      this.renderLabFilters();
      this.renderLab();
      if (this.modalOpen() && this.currentCaseId) this.fillModal(this.currentCaseId);
    },

    // --- Hero ---
    renderHero() {
      const lang = currentLang;
      const el = this.el;
      if (el.heroMetrics) {
        el.heroMetrics.innerHTML = PORTFOLIO_DATA.metrics.map((m) => `
          <li class="hero-metric">
            <span class="hero-metric-value" dir="ltr">${esc(m.value)}</span>
            <span class="hero-metric-label">${esc(t(m.label, lang))}</span>
            <span class="hero-metric-detail">${esc(t(m.detail, lang))}</span>
            ${m.source ? `<span class="hero-metric-source" dir="ltr">${esc(m.source)}</span>` : ''}
          </li>`).join('');
      }
      if (el.heroVisual) {
        el.heroVisual.innerHTML = renderMedia({
          type: 'diagram',
          src: 'assets/diagrams/qevion-interruption-sequence',
          width: 1200, height: 720,
          alt: { en: 'Sequence diagram of QEVION interruption handling: user speech detected, provider cancel and playout stop, state reconciled.', ar: 'مخطط تسلسلي لمعالجة المقاطعة في QEVION: كشف كلام المستخدم، إلغاء المزوّد وإيقاف التشغيل، تسوية الحالة.' },
          caption: { en: UI_STRINGS.en.heroVisualCaption, ar: UI_STRINGS.ar.heroVisualCaption }
        }, lang, { eager: true, sizes: '(min-width: 1100px) 620px, 100vw', className: 'hero-figure' });
      }
    },

    // --- Projects ---
    statusBadge(proj, lang) {
      const st = PORTFOLIO_DATA.statusLabels[proj.status] || { en: proj.status, ar: proj.status };
      const ev = PORTFOLIO_DATA.evidenceLabels[proj.evidence] || null;
      return `
        <span class="status-badge status-${esc(proj.status)}">${esc(t(st, lang))}</span>
        ${ev ? `<span class="evidence-badge evidence-${esc(proj.evidence)}">${esc(t(ev, lang))}</span>` : ''}`;
    },

    renderProjects() {
      const lang = currentLang;
      const s = UI_STRINGS[lang];
      const flagship = PORTFOLIO_DATA.projects.filter((p) => p.tier === 'flagship');
      const supporting = PORTFOLIO_DATA.projects.filter((p) => p.tier !== 'flagship');

      this.el.projectsContainer.innerHTML = flagship.map((proj) => {
        const highlights = proj.highlights ? t(proj.highlights, lang) : [];
        const metricsHTML = proj.metrics ? `
          <dl class="project-metrics-row">
            ${proj.metrics.map((m) => `
              <div class="project-metric-item">
                <dt class="project-metric-lbl">${esc(t(m.label, lang))}</dt>
                <dd class="project-metric-val" dir="ltr">${esc(m.value)}${m.note ? `<small class="project-metric-note">${esc(t(m.note, lang))}</small>` : ''}</dd>
              </div>`).join('')}
          </dl>` : '';
        const highlightsHTML = highlights.length ? `
          <h4 class="project-highlights-title">${esc(s.highlightsTitle)}</h4>
          <ul class="project-highlights-list">
            ${highlights.map((h) => `<li class="project-highlight-item">${esc(h)}</li>`).join('')}
          </ul>` : '';
        const tagsHTML = proj.tags.map((tag) => `<li class="tech-tag" dir="ltr">${esc(tag)}</li>`).join('');
        const media = proj.media || [];
        const gallery = renderGallery(media, lang, { max: 3 });

        return `
          <article class="project-card ${media.length ? 'has-media' : ''}" data-project-id="${esc(proj.id)}" aria-labelledby="proj-${esc(proj.id)}-title">
            <div class="project-card-body">
              <div class="project-card-header">
                <span class="project-domain-pill">${esc(t(proj.domain, lang))}</span>
                <div class="project-badges">${this.statusBadge(proj, lang)}</div>
              </div>
              <h3 class="project-title" id="proj-${esc(proj.id)}-title">${esc(t(proj.title, lang))}</h3>
              <p class="project-tagline">${esc(t(proj.tagline, lang))}</p>
              <p class="project-timeframe" dir="ltr">${esc(proj.timeframe || '')}</p>
              ${metricsHTML}
              ${highlightsHTML}
              <ul class="project-tags" aria-label="Technologies">${tagsHTML}</ul>
              <div class="project-actions">
                ${proj.caseStudyAvailable && DETAILED_CASE_STUDIES[proj.id] ? `<button type="button" class="btn-cta view-case-btn" data-case-id="${esc(proj.id)}">${esc(s.viewCaseStudy)}</button>` : ''}
                ${proj.repoUrl ? `<a class="btn-ghost" href="${esc(proj.repoUrl)}" target="_blank" rel="noopener noreferrer">${icon('external', 16)} ${esc(s.viewRepo)}</a>` : ''}
              </div>
            </div>
            ${gallery ? `<div class="project-card-media">${gallery}</div>` : ''}
          </article>`;
      }).join('');

      if (this.el.supportingContainer) {
        this.el.supportingContainer.innerHTML = supporting.map((proj) => `
          <article class="supporting-card" data-project-id="${esc(proj.id)}">
            <div class="project-card-header">
              <span class="project-domain-pill">${esc(t(proj.domain, lang))}</span>
              <div class="project-badges">${this.statusBadge(proj, lang)}</div>
            </div>
            <h4 class="supporting-title">${esc(t(proj.title, lang))}</h4>
            <p class="supporting-tagline">${esc(t(proj.tagline, lang))}</p>
            <ul class="project-tags" aria-label="Technologies">${proj.tags.map((tag) => `<li class="tech-tag" dir="ltr">${esc(tag)}</li>`).join('')}</ul>
          </article>`).join('');
      }
    },

    renderPillars() {
      const lang = currentLang;
      this.el.pillarsContainer.innerHTML = PORTFOLIO_DATA.pillars.map((p) => `
        <article class="pillar-card">
          <div class="pillar-icon-box">${icon(p.icon)}</div>
          <h3 class="pillar-title">${esc(t(p.title, lang))}</h3>
          <p class="pillar-desc">${esc(t(p.description, lang))}</p>
          <ul class="pillar-skills" aria-label="Skills">
            ${p.skills.map((sk) => `<li class="skill-pill" dir="ltr">${esc(sk)}</li>`).join('')}
          </ul>
        </article>`).join('');
    },

    renderApproach() {
      const steps = UI_STRINGS[currentLang].approachSteps;
      this.el.approachContainer.innerHTML = steps.map((st) => `
        <article class="approach-card">
          <div class="approach-step-num" dir="ltr">${esc(st.num)}</div>
          <h3 class="approach-title">${esc(st.title)}</h3>
          <p class="approach-desc">${esc(st.desc)}</p>
        </article>`).join('');
    },

    renderTimeline() {
      const lang = currentLang;
      this.el.timelineContainer.innerHTML = PORTFOLIO_DATA.journey.map((item) => `
        <li class="timeline-item">
          <div class="timeline-dot" aria-hidden="true"></div>
          <div class="timeline-year"><span dir="ltr">${esc(item.year)}</span> · ${esc(t(item.tag, lang))}</div>
          <div class="timeline-card">
            <h3 class="timeline-card-title">${esc(t(item.title, lang))}</h3>
            <p class="timeline-card-desc">${esc(t(item.description, lang))}</p>
          </div>
        </li>`).join('');
    },

    renderLabFilters() {
      const lang = currentLang;
      const cats = PORTFOLIO_DATA.labCategories;
      this.el.labFilters.innerHTML = Object.keys(cats).map((key) => {
        const active = key === activeLabCategory;
        return `<button type="button" class="filter-btn ${active ? 'active' : ''}" data-category="${esc(key)}" aria-pressed="${active}">${esc(t(cats[key], lang))}</button>`;
      }).join('');
    },

    renderLab() {
      const lang = currentLang;
      const cats = PORTFOLIO_DATA.labCategories;
      const lab = PORTFOLIO_DATA.labProjects;
      const filtered = activeLabCategory === 'all' ? lab : lab.filter((i) => i.category === activeLabCategory);
      if (!filtered.length) {
        this.el.labContainer.innerHTML = `<p class="lab-empty">${esc(UI_STRINGS[lang].labEmpty)}</p>`;
        return;
      }
      this.el.labContainer.innerHTML = filtered.map((item) => `
        <article class="lab-card">
          <span class="lab-category">${esc(t(cats[item.category], lang) || item.category)}</span>
          <h3 class="lab-title">${esc(t(item.title, lang))}</h3>
          <div class="lab-tech" dir="ltr">${esc(item.tech)}</div>
          <p class="lab-desc">${esc(t(item.description, lang))}</p>
        </article>`).join('');
    },

    // --- Modal ---
    modalOpen() { return this.el.modalBackdrop.classList.contains('open'); },

    fillModal(caseId) {
      const lang = currentLang;
      const s = UI_STRINGS[lang];
      const study = DETAILED_CASE_STUDIES[caseId];
      const proj = PORTFOLIO_DATA.projects.find((p) => p.id === caseId);
      if (!study || !proj) return false;

      this.el.modalTitle.textContent = t(proj.title, lang);

      let body = `<div class="modal-meta">${this.statusBadge(proj, lang)}<span class="modal-timeframe" dir="ltr">${esc(proj.timeframe || '')}</span></div>`;
      if (proj.media && proj.media.length) {
        body += `<div class="modal-media">${renderGallery(proj.media, lang, { sizes: '(min-width: 900px) 800px, 100vw' })}</div>`;
      }
      body += t(study.sections, lang).map((sec) => `
        <section class="modal-section-block">
          <h3 class="modal-section-h3">${esc(sec.title)}</h3>
          <p>${esc(sec.content)}</p>
        </section>`).join('');

      if (study.codeSnippet) {
        body += `
          <section class="modal-section-block">
            <h3 class="modal-section-h3">${esc(s.modalCode)}</h3>
            ${study.codeFile ? `<p class="modal-code-file" dir="ltr">${esc(study.codeFile)}</p>` : ''}
            <pre class="modal-code-box" dir="ltr" tabindex="0"><code class="language-${esc(study.codeLang || 'text')}">${esc(study.codeSnippet)}</code></pre>
            <p class="modal-code-note">${esc(s.modalCodeNote)}</p>
          </section>`;
      }
      if (study.evidence && study.evidence.length) {
        body += `
          <section class="modal-section-block">
            <h3 class="modal-section-h3">${esc(s.modalEvidence)}</h3>
            <ul class="modal-evidence-list">
              ${study.evidence.map((e) => `<li dir="ltr"><a href="${esc(e.href)}" target="_blank" rel="noopener noreferrer">${esc(e.label)}</a></li>`).join('')}
            </ul>
          </section>`;
      }
      this.el.modalBody.innerHTML = body;
      return true;
    },

    openCaseStudy(caseId, trigger) {
      if (!this.fillModal(caseId)) return;
      this.currentCaseId = caseId;
      lastFocusedBeforeModal = trigger || document.activeElement;

      const el = this.el;
      el.modalBackdrop.classList.add('open');
      el.modalBackdrop.removeAttribute('aria-hidden');
      document.body.classList.add('modal-open');
      el.modalDialog.scrollTop = 0;
      // Order matters: move focus into the dialog FIRST (synchronously, while the
      // trigger is still focusable), THEN make the background inert. Otherwise the
      // browser blurs the now-inert trigger to <body> after our focus() call.
      // CSS must not transition `visibility` on anything inside the dialog.
      const focusClose = () => { if (this.modalOpen() && document.activeElement !== el.modalClose) el.modalClose.focus({ preventScroll: true }); };
      void el.modalDialog.offsetHeight; // style flush
      el.modalClose.focus({ preventScroll: true });
      [el.main, el.header, document.querySelector('.site-footer')].forEach((n) => { if (n) n.setAttribute('inert', ''); });
      requestAnimationFrame(() => requestAnimationFrame(focusClose));
      setTimeout(focusClose, 120);
    },

    closeModal() {
      const el = this.el;
      if (!this.modalOpen()) return;
      el.modalBackdrop.classList.remove('open');
      el.modalBackdrop.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('modal-open');
      [el.main, el.header, document.querySelector('.site-footer')].forEach((n) => { if (n) n.removeAttribute('inert'); });
      this.currentCaseId = null;
      const target = lastFocusedBeforeModal;
      lastFocusedBeforeModal = null;
      if (target && document.contains(target)) target.focus();
    },

    trapFocus(e) {
      const focusables = this.el.modalDialog.querySelectorAll(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables.length) { e.preventDefault(); this.el.modalClose.focus(); return; }
      const first = focusables[0], last = focusables[focusables.length - 1];
      if (e.shiftKey && (document.activeElement === first || !this.el.modalDialog.contains(document.activeElement))) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    },

    // --- Contact (mailto only — no server) ---
    showAlert(msg, kind) {
      const a = this.el.contactAlert;
      if (!a) return;
      a.textContent = msg;
      a.className = `contact-alert is-${kind}`;
      a.hidden = false;
    },

    handleContactSubmit() {
      const s = UI_STRINGS[currentLang];
      const f = this.el.contactForm;
      const name = f.elements['form-name'].value.trim();
      const email = f.elements['form-email'].value.trim();
      const subject = f.elements['form-subject'].value.trim();
      const message = f.elements['form-message'].value.trim();
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (!name || !emailOk || !message) {
        this.showAlert(s.formInvalid, 'error');
        const bad = !name ? f.elements['form-name'] : !emailOk ? f.elements['form-email'] : f.elements['form-message'];
        bad.focus();
        return;
      }
      const subj = subject || `Portfolio inquiry from ${name}`;
      const body = `Sender: ${name}\nEmail: ${email}\n\n${message}`;
      const url = `mailto:${PORTFOLIO_DATA.profile.email}?subject=${encodeURIComponent(subj)}&body=${encodeURIComponent(body)}`;
      window.location.href = url;
      // Intentionally no form.reset(): the visitor keeps their text if no mail client opens.
      this.showAlert(s.formOpened, 'info');
    },

    async copyEmail() {
      const s = UI_STRINGS[currentLang];
      const email = PORTFOLIO_DATA.profile.email;
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(email);
        } else {
          const ta = document.createElement('textarea');
          ta.value = email; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
          document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove();
        }
        this.showAlert(s.copied, 'success');
      } catch (_) {
        this.showAlert(s.copyFailed, 'error');
      }
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => App.init());
  } else {
    App.init();
  }
})();
