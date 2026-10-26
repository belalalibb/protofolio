"""Diagram content (EN/AR). Facts verified against the public repos — see MEDIA_PLAN.md."""
CYAN, EMERALD, AMBER, PURPLE, MUTED, TEXT = "#22d3ee", "#34d399", "#fbbf24", "#a78bfa", "#9fb0c7", "#f1f5f9"
CARD2 = "#0e1524"


def qevion_architecture(SVG, lang):
    T = {"en": dict(
        title="QEVION voice runtime — architecture",
        desc="Browser audio streams over WebSocket to a FastAPI runtime whose generic Core imports contracts only; providers are swappable through role ports; business truth is decided by deterministic rules, never by the LLM.",
        client="Browser client", client_sub=["AudioWorklet · PCM16 @ 24 kHz", "Operator Console (Vite + TS)", "playout + stop_playout"],
        ws="WebSocket: binary audio + JSON events",
        runtime="QEVION runtime (FastAPI / Uvicorn)", runtime_sub=["bounded inbound queue · heartbeat ping/pong", "REST: sessions · activities · compositions"],
        core="Generic Core", core_sub=["dialog + activity state machines", "7-step interruption (t0…t4)", "ClaimGovernor · tool pipeline"],
        core_rule="imports contracts only — enforced by import-linter",
        ports="Provider role ports (swappable adapters)",
        p=[("turn", ["Silero VAD", "energy"], CYAN), ("s2s", ["OpenAI Realtime", "mock"], PURPLE), ("decision", ["rules (ADR-0004)", "TypeSafe (layered)"], EMERALD), ("tools / sinks", ["memory backend", "JSONL outcome"], AMBER)],
        truth="Business truth = deterministic rules. The LLM proposes phrasing only.",
        blueprint="Activity Blueprint (data: qevion.activity.v1)", copilot="Configuration Copilot → Blueprint (never in the call path)",
        evidence="Evidence: 160 KB spec · 5 import contracts · ~220 tests · evidence/ P0–P6 · github.com/belalalibb/markting_call_center"),
        "ar": dict(
        title="معمارية منصة QEVION الصوتية",
        desc="يتدفق الصوت من المتصفح عبر WebSocket إلى خادم FastAPI؛ النواة العامة تستورد العقود فقط، والمزوّدون قابلون للتبديل عبر منافذ أدوار، وقرارات الأعمال تُتخذ بقواعد حتمية لا بالنموذج اللغوي.",
        client="عميل المتصفح", client_sub=["AudioWorklet · PCM16 @ 24 kHz", "لوحة المشغّل (Vite + TS)", "تشغيل الصوت وإيقافه"],
        ws="WebSocket: صوت ثنائي + أحداث JSON",
        runtime="خادم التشغيل (FastAPI / Uvicorn)", runtime_sub=["طابور وارد محدود · نبض ping/pong", "REST: الجلسات · الأنشطة · التركيبات"],
        core="النواة العامة (Core)", core_sub=["آلات حالة للحوار والنشاط", "بروتوكول مقاطعة من 7 خطوات (t0…t4)", "حاكم الادعاءات · خط الأدوات"],
        core_rule="تستورد العقود فقط — يفرضه import-linter",
        ports="منافذ أدوار المزوّدين (محوّلات قابلة للتبديل)",
        p=[("turn", ["Silero VAD", "energy"], CYAN), ("s2s", ["OpenAI Realtime", "mock"], PURPLE), ("decision", ["قواعد (ADR-0004)", "TypeSafe (طبقي)"], EMERALD), ("tools / sinks", ["memory backend", "JSONL outcome"], AMBER)],
        truth="حقيقة الأعمال = قواعد حتمية. النموذج يقترح الصياغة فقط.",
        blueprint="مخطط النشاط (بيانات: qevion.activity.v1)", copilot="مساعد التكوين → المخطط (ليس في مسار المكالمة أبداً)",
        evidence="الأدلة: مواصفة 160 KB · 5 عقود استيراد · ~220 اختباراً · evidence/ P0–P6 · github.com/belalalibb/markting_call_center")}[lang]
    s = SVG(1200, 720, lang, T["title"], T["desc"])
    s.text(600, 40, T["title"], size=22, weight=700)
    s.box(60, 80, 300, 120, T["client"], T["client_sub"])
    s.box(450, 80, 690, 120, T["runtime"], T["runtime_sub"])
    s.arrow(362, 140, 448, 140, CYAN, both=True)
    s.text(405, 72, T["ws"], size=11.5, fill=MUTED, weight=400)
    s.box(450, 240, 690, 150, T["core"], T["core_sub"], accent=EMERALD)
    s.text(795, 374, T["core_rule"], size=11.5, fill=EMERALD)
    s.arrow(795, 202, 795, 238)
    s.text(795, 430, T["ports"], size=14, fill=MUTED, weight=600)
    for x, (t, sub, c) in zip([450, 625, 800, 975], T["p"]):
        s.box(x, 445, 165, 95, t, sub, accent=c, title_size=14, sub_size=11.5, fill=CARD2)
        s.arrow(x + 82, 392, x + 82, 443, c)
    s.note(450, 570, 690, T["truth"])
    s.box(60, 240, 300, 95, T["blueprint"], [], accent=AMBER, title_size=13.5)
    s.text(210, 300, T["copilot"], size=11.5, fill=MUTED, weight=400)
    s.arrow(362, 290, 448, 290, AMBER, dash="5 4")
    s.text(600, 690, T["evidence"], size=12, fill=MUTED, weight=400)
    return s.render()


def qevion_interruption(SVG, lang):
    T = {"en": dict(
        title="QEVION barge-in protocol — what happens when the caller interrupts",
        desc="Timeline of a user interruption: speech onset, barge-in detection, cancel to provider and stop_playout to client, confirmation, and reconciliation that truncates the unheard tail so it never persists as context.",
        lanes=["Caller / browser", "Turn plane (VAD)", "Core · Session.interrupt()", "Provider (s2s)"],
        steps=[("t0", "user speech onset", 0), ("t1", "barge-in detected → INTERRUPTION_DETECTED", 1), ("", "dialog: SPEAKING → LISTENING", 2),
               ("t2", "cancel_response(rid) → provider", 2), ("t2", "STOP_PLAYOUT → client", 2), ("t3", "client confirms playout stopped (or forced after timeout)", 0),
               ("t4", "RECONCILE: keep heard text only · truncate_response(played_ms)", 2)],
        foot1="Measured (server clock, mock provider, synthetic ar-EG clips): t1→t3 p50 4 ms · p95 6 ms · 0 forced stops (evidence/P2/CP-0015).",
        foot2="Spec target: detected → playout stopped ≤ 300 ms p95 (QV-ACC-018). Live barge-in against the real provider is still backlog (QEVION_WORK_STATE.md)."),
        "ar": dict(
        title="بروتوكول المقاطعة في QEVION — ماذا يحدث عندما يقاطع المتصل",
        desc="تسلسل زمني للمقاطعة: بداية كلام المستخدم، اكتشاف المقاطعة، إلغاء لدى المزوّد وإيقاف التشغيل لدى العميل، التأكيد، ثم التسوية التي تقطع الجزء غير المسموع حتى لا يبقى في السياق.",
        lanes=["المتصل / المتصفح", "طبقة الدور (VAD)", "النواة · Session.interrupt()", "المزوّد (s2s)"],
        steps=[("t0", "بداية كلام المستخدم", 0), ("t1", "اكتشاف المقاطعة → INTERRUPTION_DETECTED", 1), ("", "الحوار: من SPEAKING إلى LISTENING", 2),
               ("t2", "cancel_response(rid) → إلى المزوّد", 2), ("t2", "STOP_PLAYOUT → إلى العميل", 2), ("t3", "العميل يؤكد توقف التشغيل (أو إجبار بعد مهلة)", 0),
               ("t4", "التسوية: الاحتفاظ بالنص المسموع فقط · truncate_response(played_ms)", 2)],
        foot1="القياس (ساعة الخادم، مزوّد وهمي، مقاطع ar-EG اصطناعية): t1→t3 الوسيط 4 ms · p95 6 ms · 0 إيقاف إجباري (evidence/P2/CP-0015).",
        foot2="هدف المواصفة: من الاكتشاف إلى توقف التشغيل ≤ 300 ms p95 (QV-ACC-018). المقاطعة الحية على المزوّد الحقيقي ما زالت في قائمة المهام.")}[lang]
    s = SVG(1200, 720, lang, T["title"], T["desc"])
    s.text(600, 40, T["title"], size=20, weight=700)
    lx = [150, 450, 750, 1050]
    cols = [CYAN, AMBER, EMERALD, PURPLE]
    for x, name, c in zip(lx, T["lanes"], cols):
        s.rect(x - 130, 70, 260, 44, fill=CARD2, stroke=c, r=10)
        s.text(x, 98, name, size=13.5, weight=600)
        s.parts.append(f'<line x1="{x}" y1="114" x2="{x}" y2="590" stroke="{c}" stroke-opacity="0.35" stroke-width="1.5" stroke-dasharray="4 5"/>')
    y = 150
    for i, (mark, label, lane) in enumerate(T["steps"]):
        x, c = lx[lane], cols[lane]
        s.parts.append(f'<circle cx="{x}" cy="{y}" r="7" fill="#0b1020" stroke="{c}" stroke-width="2.5"/>')
        if mark:
            s.pill(x, y - 24, mark, c)
        # label box placed between lanes on the side with room
        if lane == 2 and i == 3:   # cancel → provider
            s.arrow(x + 10, y, lx[3] - 10, y, PURPLE)
            bx = x + 40
        elif lane == 2 and i == 4:  # stop_playout → client
            s.arrow(x - 10, y, lx[0] + 10, y, CYAN)
            bx = lx[0] + 40
        elif lane == 0:
            bx = x + 30
        elif lane == 1:
            bx = x + 30
        else:
            bx = x - 30 - 380
        s.rect(bx, y + 12, 380, 28, fill="#121a2b", r=8)
        s.text(bx + 190, y + 31, label, size=11.5, weight=500)
        y += 62
    s.note(60, 606, 1080, T["foot1"], size=12.5)
    s.text(600, 684, T["foot2"], size=12, fill=MUTED, weight=400)
    return s.render()


def qevion_latency(SVG, lang):
    T = {"en": dict(
        title="Where the time goes — measured voice turn without a tool call (sandbox, OpenAI Realtime)",
        desc="Breakdown of a no-tool voice turn: 503 ms configured end-of-turn silence, 1.9 ms QEVION commit, 61 ms network to provider, 441 ms provider first audio, 1.1 ms QEVION forward, 0.6 ms WebSocket, 75 ms browser playout. QEVION-owned time is about 3 ms per turn.",
        segs=[("End-of-turn silence window (configured 500 ms)", 503, AMBER, "turn plane"), ("QEVION: commit to provider", 1.9, EMERALD, "QEVION"), ("Network → provider ack", 61, MUTED, "network"),
              ("Provider: first audio", 441, PURPLE, "provider"), ("QEVION: forward audio to client", 1.1, EMERALD, "QEVION"), ("WebSocket to browser", 0.6, MUTED, "transport"), ("Browser render + device output", 75, CYAN, "browser")],
        total="≈ 1.09 s p50 perceived (last speech → first audible agent audio) · p95 ≈ 1.38 s · n = 20 turns",
        note1="QEVION-owned time ≈ 3 ms per turn (spec target p50 < 60 ms). Tool-calling turns: p50 2.6 s — extra time is provider generation cycles, reproduced without QEVION.",
        note2="Source: docs/audit/LATENCY_ROOT_CAUSE_2026-09-24.md (public repo). Single-host clock, Chromium, synthetic clips. Real user devices and networks are unmeasured."),
        "ar": dict(
        title="أين يذهب الوقت — قياس دور صوتي بدون استدعاء أداة (بيئة تجريبية، OpenAI Realtime)",
        desc="تفصيل زمن دور صوتي بدون أدوات: 503 ms نافذة صمت نهاية الدور، 1.9 ms إرسال QEVION، 61 ms شبكة، 441 ms أول صوت من المزوّد، 1.1 ms تمرير، 0.6 ms WebSocket، 75 ms تشغيل المتصفح. الزمن الذي تملكه QEVION نحو 3 ms لكل دور.",
        segs=[("نافذة صمت نهاية الدور (مضبوطة على 500 ms)", 503, AMBER, "طبقة الدور"), ("QEVION: إرسال الالتزام إلى المزوّد", 1.9, EMERALD, "QEVION"), ("الشبكة → تأكيد المزوّد", 61, MUTED, "شبكة"),
              ("المزوّد: أول صوت", 441, PURPLE, "مزوّد"), ("QEVION: تمرير الصوت إلى العميل", 1.1, EMERALD, "QEVION"), ("WebSocket إلى المتصفح", 0.6, MUTED, "نقل"), ("عرض المتصفح + إخراج الجهاز", 75, CYAN, "متصفح")],
        total="≈ 1.09 ث وسيط محسوس (آخر كلام → أول صوت مسموع) · p95 ≈ 1.38 ث · n = 20 دوراً",
        note1="الزمن الذي تملكه QEVION ≈ 3 ms لكل دور (هدف المواصفة p50 < 60 ms). الأدوار التي تستدعي أدوات: وسيط 2.6 ث — الفارق دورات توليد لدى المزوّد، أُعيد إنتاجه بدون QEVION.",
        note2="المصدر: docs/audit/LATENCY_ROOT_CAUSE_2026-09-24.md (مستودع عام). ساعة مضيف واحد، Chromium، مقاطع اصطناعية. أجهزة المستخدمين وشبكاتهم غير مقيسة.")}[lang]
    s = SVG(1200, 720, lang, T["title"], T["desc"])
    s.text(600, 40, T["title"], size=18, weight=700)
    total = sum(v for _, v, _, _ in T["segs"])
    bx, bw, by, bh = 80, 1040, 90, 46
    cur = bx
    for _, v, c, _ in T["segs"]:
        w = max(3, bw * v / total)
        s.parts.append(f'<rect x="{cur:.1f}" y="{by}" width="{w:.1f}" height="{bh}" fill="{c}" fill-opacity="0.85"/>')
        cur += w
    s.rect(bx, by, bw, bh, fill="none", r=6)
    s.text(600, by + bh + 26, T["total"], size=13, weight=600)
    y = 200
    for label, v, c, owner in T["segs"]:
        if s.rtl:
            s.parts.append(f'<rect x="1094" y="{y-13}" width="16" height="16" rx="4" fill="{c}"/>')
            s.text(1080, y, label, size=13.5, weight=500, anchor="start")  # RTL: start = right edge
            s.text(320, y, f"{v:g} ms", size=13.5, weight=600, anchor="start", mono=True)
            s.pill(190, y - 4, owner, c, mono=False)
        else:
            s.parts.append(f'<rect x="90" y="{y-13}" width="16" height="16" rx="4" fill="{c}"/>')
            s.text(120, y, label, size=13.5, weight=500, anchor="start")
            s.text(880, y, f"{v:g} ms", size=13.5, weight=600, anchor="end", mono=True)
            s.pill(1010, y - 4, owner, c, mono=False)
        y += 40
    s.note(60, 500, 1080, T["note1"], size=12)
    s.text(600, 590, T["note2"], size=12, fill=MUTED, weight=400)
    s.text(600, 690, "p50 values · ms · 2026-09-24", size=11, fill=MUTED, weight=400, mono=True)
    return s.render()


def gac_architecture(SVG, lang):
    T = {"en": dict(
        title="AI orchestration platform — general_ai_core + chat_engine",
        desc="Layered modular monolith: framework-free core with Protocol ports, composition layer (FastAPI, admin agent), infrastructure bindings behind ADRs, provider adapters including a remote gateway; chat_engine reuses the core as a SHA-pinned dependency and exposes an OpenAI-compatible API, SSE streaming and a bilingual UI.",
        ui="chat_engine UI (Vite + Lit + TS · ar/en · RTL)", ce="chat_engine API",
        ce_sub=["POST /v1/chat/completions (OpenAI-compatible)", "POST /v1/chat/stream (SSE) · conversations", "catalog · admin · skills · agent profiles"],
        pin="depends on general_ai_core pinned by commit SHA · additive-only",
        apps="apps/ — composition layer", apps_sub=["FastAPI create_app (every collaborator injected)", "admin_agent · observability (OTel / structlog)"],
        core="core/ — framework-free domain (22 packages)", core_sub=["routing · execution · tools · skills · memory", "identity · audit · learning · sourcechange", "every I/O concern is a Protocol port"],
        infra="infrastructure/ — bindings behind ADRs", infra_sub=["PostgreSQL / Alembic", "Redis", "S3 · Vault · Argon2id"],
        prov="providers/ — adapters behind ProviderAdapterPort", prov_sub=["remote gateway (ADR-0008)", "groq · genspark_llm", "local_echo (hermetic)"],
        gw="Remote Provider Gateway (14 providers wired, CE-20)",
        rule="12 import-linter contracts: core imports no web framework, DB driver or telemetry stack",
        evidence="Evidence: ~3,750 pytest tests · mypy --strict · 12/0 import contracts · 12 ADRs · 65 Playwright UI captures"),
        "ar": dict(
        title="منصة تنسيق الذكاء الاصطناعي — general_ai_core + chat_engine",
        desc="بنية طبقية: نواة خالية من أطر العمل بمنافذ Protocol، طبقة تركيب (FastAPI ووكيل الإدارة)، ارتباطات بنية تحتية خلف قرارات ADR، ومحوّلات مزوّدين مع بوابة بعيدة؛ يعيد chat_engine استخدام النواة كاعتمادية مثبّتة بـ SHA ويقدّم واجهة متوافقة مع OpenAI وبثّ SSE وواجهة ثنائية اللغة.",
        ui="واجهة chat_engine (Vite + Lit + TS · عربي/إنجليزي · RTL)", ce="واجهة برمجة chat_engine",
        ce_sub=["POST /v1/chat/completions (متوافق مع OpenAI)", "POST /v1/chat/stream (SSE) · المحادثات", "الكتالوج · الإدارة · المهارات · ملفات الوكلاء"],
        pin="يعتمد على general_ai_core مثبّتاً بـ SHA · إضافات فقط دون تعديل",
        apps="apps/ — طبقة التركيب", apps_sub=["FastAPI create_app (حقن كل التبعيات)", "admin_agent · المراقبة (OTel / structlog)"],
        core="core/ — منطق المجال بلا أطر عمل (22 حزمة)", core_sub=["التوجيه · التنفيذ · الأدوات · المهارات · الذاكرة", "الهوية · التدقيق · التعلّم · تغييرات المصدر", "كل عملية إدخال/إخراج هي منفذ Protocol"],
        infra="infrastructure/ — ارتباطات خلف ADRs", infra_sub=["PostgreSQL / Alembic", "Redis", "S3 · Vault · Argon2id"],
        prov="providers/ — محوّلات خلف ProviderAdapterPort", prov_sub=["بوابة بعيدة (ADR-0008)", "groq · genspark_llm", "local_echo (معزول)"],
        gw="بوابة المزوّدين البعيدة (14 مزوّداً موصولاً، CE-20)",
        rule="12 عقد import-linter: النواة لا تستورد إطار ويب أو مشغّل قاعدة بيانات أو حزمة قياس",
        evidence="الأدلة: ~3,750 اختبار pytest · mypy --strict · 12/0 عقود استيراد · 12 قرار ADR · 65 لقطة Playwright للواجهة")}[lang]
    s = SVG(1200, 720, lang, T["title"], T["desc"])
    s.text(600, 40, T["title"], size=20, weight=700)
    s.box(60, 80, 340, 60, T["ui"], [], title_size=13)
    s.arrow(230, 142, 230, 170)
    s.box(60, 172, 340, 120, T["ce"], T["ce_sub"], title_size=14, sub_size=11.5)
    s.text(230, 318, T["pin"], size=11.5, fill=AMBER)
    s.arrow(402, 232, 478, 232, AMBER, dash="5 4")
    s.box(480, 80, 660, 90, T["apps"], T["apps_sub"], accent=PURPLE)
    s.arrow(810, 172, 810, 200, PURPLE)
    s.box(480, 202, 660, 120, T["core"], T["core_sub"], accent=EMERALD)
    s.text(810, 345, T["rule"], size=11.5, fill=EMERALD)
    s.arrow(650, 324, 650, 362, EMERALD)
    s.arrow(970, 324, 970, 362, EMERALD)
    s.box(480, 364, 320, 110, T["infra"], T["infra_sub"], accent=MUTED, title_size=13.5, sub_size=11.5, fill=CARD2)
    s.box(820, 364, 320, 110, T["prov"], T["prov_sub"], accent=AMBER, title_size=13.5, sub_size=11.5, fill=CARD2)
    s.arrow(980, 476, 980, 510, AMBER)
    s.note(820, 512, 320, T["gw"], color=AMBER, size=12)
    s.note(60, 600, 1080, T["evidence"], size=12.5)
    s.text(600, 690, "github.com/belalalibb/general_ai_core · github.com/belalalibb/chat_engen", size=11.5, fill=MUTED, mono=True)
    return s.render()


def smartcore_architecture(SVG, lang):
    T = {"en": dict(
        title="SmartCore — offline-first edge controller (reported architecture)",
        desc="ESP32 firmware runs local control loops and a Modbus RTU register table; sensors and actuators attach over RS-485 and GPIO; a background task mirrors state to Firebase Realtime Database when connectivity exists; a web dashboard reads the mirror. Cloud is a passive mirror, never in the control path.",
        sensors="Field I/O", sensors_sub=["4× LDR optical array", "soil-moisture probes", "load cell (HX711-class)", "stepper drivers · relays / valves"],
        bus="RS-485 (Modbus RTU) · GPIO / ADC",
        mcu="ESP32 · ESP-IDF v5.3 · C++17 · FreeRTOS", mcu_sub=["local control tasks (irrigation, solar tracking)", "Modbus RTU register table (holding / input)", "fixed-size buffers · never waits for cloud"],
        plc="PLC / SCADA master", plc_sub=["reads / writes registers", "over RS-485"],
        sync="Cloud sync task (Wi-Fi)", sync_sub=["state deltas only", "when the link is healthy"],
        fb="Firebase Realtime DB", fb_sub=["passive state mirror"], dash="Web dashboard", dash_sub=["telemetry + switches"],
        rule="Control decisions never wait for the cloud. Internet loss degrades monitoring, not control.",
        status="STATUS: reported from the owner's local workspace. Firmware, register map and hardware photos are not yet public — treat as prototype until published."),
        "ar": dict(
        title="SmartCore — متحكم طرفي يعمل أولاً دون إنترنت (معمارية حسب التقرير)",
        desc="برمجية ESP32 تنفّذ حلقات تحكم محلية وجدول سجلات Modbus RTU؛ تتصل الحساسات والمشغّلات عبر RS-485 وGPIO؛ مهمة خلفية تعكس الحالة إلى Firebase عند توفر الاتصال؛ لوحة ويب تقرأ المرآة. السحابة مرآة سلبية وليست في مسار التحكم.",
        sensors="المدخلات والمخرجات الميدانية", sensors_sub=["مصفوفة 4 حساسات LDR", "مجسات رطوبة التربة", "خلية وزن (HX711)", "مشغّلات خطوية · مرحّلات / صمامات"],
        bus="RS-485 (Modbus RTU) · GPIO / ADC",
        mcu="ESP32 · ESP-IDF v5.3 · C++17 · FreeRTOS", mcu_sub=["مهام تحكم محلية (ري، تتبع شمسي)", "جدول سجلات Modbus RTU", "مخازن ثابتة الحجم · لا انتظار للسحابة"],
        plc="PLC / SCADA رئيسي", plc_sub=["يقرأ ويكتب السجلات", "عبر RS-485"],
        sync="مهمة المزامنة السحابية (Wi-Fi)", sync_sub=["فروق الحالة فقط", "عند صحة الاتصال"],
        fb="Firebase Realtime DB", fb_sub=["مرآة حالة سلبية"], dash="لوحة ويب", dash_sub=["قياسات ومفاتيح"],
        rule="قرارات التحكم لا تنتظر السحابة أبداً. انقطاع الإنترنت يُضعف المراقبة لا التحكم.",
        status="الحالة: مُبلّغ عنها من مساحة عمل المالك المحلية. البرمجية وخريطة السجلات وصور العتاد غير منشورة بعد — تُعامل كنموذج أولي حتى نشرها.")}[lang]
    s = SVG(1200, 720, lang, T["title"], T["desc"])
    s.text(600, 40, T["title"], size=19, weight=700)
    s.box(60, 90, 300, 140, T["sensors"], T["sensors_sub"], accent=AMBER, title_size=14)
    s.arrow(362, 160, 448, 160, AMBER, both=True)
    s.text(405, 80, T["bus"], size=11.5, fill=MUTED, weight=400)
    s.box(450, 90, 420, 140, T["mcu"], T["mcu_sub"], accent=EMERALD, title_size=14)
    s.box(930, 90, 210, 100, T["plc"], T["plc_sub"], accent=MUTED, title_size=13, sub_size=11.5, fill=CARD2)
    s.arrow(872, 140, 928, 140, MUTED, both=True)
    s.arrow(660, 232, 660, 280, CYAN, dash="5 4")
    s.box(450, 282, 420, 90, T["sync"], T["sync_sub"], title_size=13.5, fill=CARD2)
    s.arrow(660, 374, 660, 420, CYAN, dash="5 4")
    s.box(450, 422, 200, 80, T["fb"], T["fb_sub"], title_size=13, sub_size=11.5)
    s.arrow(652, 462, 688, 462)
    s.box(690, 422, 180, 80, T["dash"], T["dash_sub"], title_size=13, sub_size=11.5)
    s.note(60, 540, 1080, T["rule"])
    s.note(60, 604, 1080, T["status"], color=AMBER, h=56, size=12)
    return s.render()


def concurrency_pattern(SVG, lang):
    T = {"en": dict(
        title="Resilient concurrent workflow — thread-safe pool, backoff, dual-sink logging",
        desc="A ThreadPoolExecutor runs N workers; each takes a unit of work from a mutex-guarded pool so no two workers process the same record; failures return the record to the pool; retries use exponential backoff with jitter; one logger writes operator milestones to console and microsecond traces to a file; notifications go to a chat channel.",
        orch="Orchestrator (ThreadPoolExecutor)", orch_sub=["max workers = min(N, pending records)", "staggered start"],
        pool="Thread-safe pool", pool_sub=["threading.Lock() around take / mark_done", "a record is held by exactly one worker", "failed → returned to pool, never lost"],
        worker="Worker", worker_sub=["take → work → verify → mark_done", "retry: exponential backoff + jitter"],
        log="Dual-sink logger", log_sub=["console: INFO milestones", "file: DEBUG µs trace"],
        notify="Notifier", notify_sub=["chat-bot webhook", "on success / fatal"],
        rule="Invariant: no duplicate processing, no lost records, bounded retry pressure.",
        status="Pattern shown generically. The originating project automated appointment booking for clients; target-specific details are intentionally not published."),
        "ar": dict(
        title="سير عمل متزامن مرن — مخزن آمن للخيوط، تراجع أسي، تسجيل ثنائي المخرج",
        desc="منفّذ خيوط يشغّل N عاملاً؛ يأخذ كل عامل سجلاً من مخزن محمي بقفل بحيث لا يعالج عاملان السجل نفسه؛ تُعاد السجلات الفاشلة إلى المخزن؛ إعادة المحاولة بتراجع أسي مع عشوائية؛ مسجّل واحد يكتب معالم المشغّل إلى الطرفية وتتبعاً دقيقاً إلى ملف؛ والإشعارات إلى قناة دردشة.",
        orch="المنسّق (ThreadPoolExecutor)", orch_sub=["عدد العمال = الأصغر بين N والسجلات المعلّقة", "بدء متدرّج"],
        pool="مخزن آمن للخيوط", pool_sub=["threading.Lock() حول الأخذ / الإنهاء", "كل سجل بيد عامل واحد بالضبط", "الفاشل → يعود للمخزن ولا يُفقد"],
        worker="عامل", worker_sub=["أخذ → تنفيذ → تحقق → إنهاء", "إعادة المحاولة: تراجع أسي + عشوائية"],
        log="مسجّل ثنائي المخرج", log_sub=["الطرفية: معالم INFO", "ملف: تتبع DEBUG دقيق"],
        notify="المُنبّه", notify_sub=["Webhook لبوت دردشة", "عند النجاح / الفشل الحرج"],
        rule="الثابت: لا معالجة مكررة، لا سجلات مفقودة، ضغط إعادة محاولة محدود.",
        status="النمط معروض بشكل عام. المشروع الأصلي أتمت حجز مواعيد لعملاء؛ التفاصيل الخاصة بالجهة المستهدفة غير منشورة عمداً.")}[lang]
    s = SVG(1200, 720, lang, T["title"], T["desc"])
    s.text(600, 40, T["title"], size=19, weight=700)
    s.box(60, 90, 300, 100, T["orch"], T["orch_sub"], title_size=14)
    s.box(450, 90, 300, 130, T["pool"], T["pool_sub"], accent=EMERALD, title_size=14, sub_size=11.5)
    s.arrow(362, 140, 448, 140)
    for i, y in enumerate((260, 350, 440)):
        s.box(60, y, 300, 70, f"{T['worker']} {i+1}", T["worker_sub"], title_size=13, sub_size=11, fill=CARD2)
        s.arrow(362, y + 35, 448, y + 35, EMERALD, both=True)
    s.rect(450, 260, 300, 250, fill="none", stroke=EMERALD, r=12, dash="5 5")
    s.text(600, 290, "take() / mark_done() / release()", size=12.5, fill=EMERALD, mono=True)
    s.text(600, 325, "with self._lock:", size=12, fill=MUTED, mono=True)
    s.text(600, 347, "  avail = [r for r in records", size=11.5, fill=MUTED, mono=True)
    s.text(600, 367, "           if r.id not in done]", size=11.5, fill=MUTED, mono=True)
    s.text(600, 389, "  return choice(avail) if avail else None", size=11.5, fill=MUTED, mono=True)
    s.box(840, 260, 300, 90, T["log"], T["log_sub"], accent=AMBER, title_size=13.5, sub_size=11.5)
    s.box(840, 380, 300, 90, T["notify"], T["notify_sub"], accent=PURPLE, title_size=13.5, sub_size=11.5)
    s.arrow(752, 300, 838, 300, AMBER, dash="5 4")
    s.arrow(752, 420, 838, 420, PURPLE, dash="5 4")
    s.note(60, 550, 1080, T["rule"])
    s.note(60, 614, 1080, T["status"], color=AMBER, h=50, size=12)
    return s.render()


GENERATORS = {
    "qevion-architecture": qevion_architecture,
    "qevion-interruption-sequence": qevion_interruption,
    "qevion-latency-breakdown": qevion_latency,
    "ai-orchestration-platform": gac_architecture,
    "smartcore-edge-controller": smartcore_architecture,
    "concurrent-workflow-pattern": concurrency_pattern,
}
