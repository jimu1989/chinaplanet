"use client";

import { FormEvent, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Factory,
  GraduationCap,
  Languages,
  Mail,
  MessageCircle,
  PhoneCall,
  Plane,
  Send,
  Ship,
  UserRound,
} from "lucide-react";
import { siteConfig } from "../lib/site";
import {
  customerGoals,
  CustomerGoalId,
  getCustomerGoal,
} from "../lib/journey/customerJourney";

type Language = "ar" | "en" | "zh";

type ContactProps = {
  language: Language;
};

const goalIcons = {
  travel: Plane,
  study: GraduationCap,
  language: Languages,
  trade: Ship,
  factory: Factory,
} as const;

const copy = {
  ar: {
    label: "ابدأ من هنا",
    title: "وش تبي من الصين؟",
    intro: "اختر هدفك، وبعدها نوصلك مباشرةً للسؤال والخطوة المناسبة.",
    step1: "هدفك",
    step2: "التفاصيل",
    step3: "بياناتك",
    next: "التالي",
    back: "رجوع",
    chooseGoal: "اختر المسار الأقرب لاحتياجك",
    chooseDetail: "وش تحتاج تحديدًا؟",
    detailsHint: "اختر الخيار الأقرب لاحتياجك",
    yourDetails: "خلّنا نعرف كيف نتواصل معك",
    name: "الاسم",
    namePlaceholder: "اكتب اسمك",
    email: "البريد الإلكتروني",
    emailPlaceholder: "name@example.com",
    phone: "رقم الجوال",
    phonePlaceholder: "+966",
    notes: "ملاحظات إضافية",
    notesPlaceholder: "اكتب أي تفاصيل تساعدنا نفهم طلبك...",
    send: "إرسال الطلب",
    whatsapp: "تواصل عبر واتساب",
    selected: "تم الاختيار",
    requestReady: "طلبك جاهز للإرسال",
    requestNote: "سنستخدم هذه المعلومات لفهم احتياجك والتواصل معك.",
    required: "فضلاً أكمل الاختيارات والبيانات الأساسية.",
    success: "وصلنا طلبك. سنتواصل معك قريبًا.",
    error: "تعذر إرسال الطلب الآن. حاول مرة أخرى.",
    phoneLabel: "اتصال",
    emailLabel: "إيميل",
    whatsappLabel: "واتساب",
  },
  en: {
    label: "START HERE",
    title: "What do you need from China?",
    intro: "Choose your goal first. Then we’ll take you directly to the right next step.",
    step1: "GOAL",
    step2: "DETAIL",
    step3: "YOUR DETAILS",
    next: "Continue",
    back: "Back",
    chooseGoal: "Choose the path closest to what you need",
    chooseDetail: "What exactly do you need?",
    detailsHint: "Choose the option closest to your request",
    yourDetails: "Tell us how to reach you",
    name: "Name",
    namePlaceholder: "Your name",
    email: "Email",
    emailPlaceholder: "name@example.com",
    phone: "Phone",
    phonePlaceholder: "+966",
    notes: "Additional details",
    notesPlaceholder: "Anything that would help us understand your request...",
    send: "Send request",
    whatsapp: "Continue on WhatsApp",
    selected: "SELECTED",
    requestReady: "Your request is ready",
    requestNote: "We’ll use these details to understand your request and contact you.",
    required: "Please complete the required choices and details.",
    success: "Your request has been received. We’ll be in touch soon.",
    error: "We couldn’t send the request right now. Please try again.",
    phoneLabel: "CALL",
    emailLabel: "EMAIL",
    whatsappLabel: "WHATSAPP",
  },
  zh: {
    label: "从这里开始",
    title: "您需要什么？",
    intro: "先选择您的目标，我们会带您进入最合适的下一步。",
    step1: "目标",
    step2: "需求",
    step3: "您的信息",
    next: "继续",
    back: "返回",
    chooseGoal: "请选择最符合您需求的方向",
    chooseDetail: "您具体需要什么？",
    detailsHint: "请选择最符合您需求的选项",
    yourDetails: "告诉我们如何联系您",
    name: "姓名",
    namePlaceholder: "请输入姓名",
    email: "电子邮箱",
    emailPlaceholder: "name@example.com",
    phone: "手机号码",
    phonePlaceholder: "+966",
    notes: "补充说明",
    notesPlaceholder: "请告诉我们更多需求...",
    send: "提交需求",
    whatsapp: "通过 WhatsApp 联系",
    selected: "已选择",
    requestReady: "您的需求已准备好",
    requestNote: "我们会根据这些信息了解您的需求并与您联系。",
    required: "请完成必要的选择和信息。",
    success: "我们已收到您的需求，很快会与您联系。",
    error: "暂时无法提交，请稍后再试。",
    phoneLabel: "电话",
    emailLabel: "邮箱",
    whatsappLabel: "WhatsApp",
  },
} as const;

export default function Contact({ language }: ContactProps) {
  const t = copy[language];
  const isRTL = language === "ar";

  const [goalId, setGoalId] = useState<CustomerGoalId | null>(null);
  const [nextChoice, setNextChoice] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [details, setDetails] = useState("");
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const selectedGoal = useMemo(
    () => (goalId ? getCustomerGoal(goalId) : undefined),
    [goalId],
  );

  const GoalIcon = goalId ? goalIcons[goalId] : UserRound;
  const BackIcon = isRTL ? ArrowRight : ArrowLeft;

  const selectGoal = (id: CustomerGoalId) => {
    setGoalId(id);
    setNextChoice("");
    setError("");
    setStep(2);
  };

  const selectNextChoice = (choice: string) => {
    setNextChoice(choice);
    setError("");
    setStep(3);
  };

  const submitRequest = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!selectedGoal || !nextChoice || !name.trim() || !phone.trim()) {
      setError(t.required);
      return;
    }

    try {
      const response = await fetch("/api/service-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          service: selectedGoal[language].title,
          details: `${selectedGoal[language].title} — ${nextChoice}${details.trim() ? `\n${details.trim()}` : ""}`,
          language,
        }),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setSubmitted(true);
    } catch {
      setError(t.error);
    }
  };

  const openWhatsApp = () => {
    if (!selectedGoal) {
      setError(t.required);
      setStep(1);
      return;
    }

    const safeName =
      name.trim() ||
      (language === "ar"
        ? "عميل جديد"
        : language === "zh"
          ? "新客户"
          : "New customer");

    const message =
      language === "ar"
        ? `السلام عليكم، أنا ${safeName}.\nأحتاج: ${selectedGoal.ar.title}\nالتحديد: ${nextChoice || "غير محدد"}${details.trim() ? `\nالتفاصيل: ${details.trim()}` : ""}`
        : language === "zh"
          ? `您好，我是${safeName}。\n需求：${selectedGoal.zh.title}\n具体需求：${nextChoice || "未选择"}${details.trim() ? `\n补充：${details.trim()}` : ""}`
          : `Hello, I’m ${safeName}.\nI need: ${selectedGoal.en.title}\nSpecific need: ${nextChoice || "Not selected"}${details.trim() ? `\nDetails: ${details.trim()}` : ""}`;

    const phoneNumber = siteConfig.contact.whatsapp.replace(/\D/g, "");
    const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

    window.open(url, "_blank", "noopener,noreferrer");
  };

  if (submitted) {
    return (
      <section
        id="contact"
        dir={isRTL ? "rtl" : "ltr"}
        className="cp-contact"
      >
        <div className="cp-contact-shell cp-contact-success">
          <div className="cp-success-mark">
            <Check size={30} strokeWidth={1.7} />
          </div>

          <p className="cp-contact-kicker">{t.label}</p>
          <h2>{t.success}</h2>

          <button
            type="button"
            className="cp-contact-secondary"
            onClick={() => {
              setSubmitted(false);
              setStep(1);
              setGoalId(null);
              setNextChoice("");
              setName("");
              setEmail("");
              setPhone("");
              setDetails("");
            }}
          >
            {t.next}
          </button>
        </div>

        <style jsx>{styles}</style>
      </section>
    );
  }

  return (
    <section
      id="contact"
      dir={isRTL ? "rtl" : "ltr"}
      className="cp-contact"
    >
      <div className="cp-contact-shell">
        <div className="cp-contact-top">
          <div>
            <p className="cp-contact-kicker">{t.label}</p>
            <h2>{t.title}</h2>
          </div>

          <p className="cp-contact-intro">{t.intro}</p>
        </div>

        <div className="cp-contact-grid">
          <aside className="cp-contact-aside">
            <div className="cp-aside-icon">
              <GoalIcon size={28} strokeWidth={1.6} />
            </div>

            {selectedGoal ? (
              <>
                <span className="cp-aside-label">{t.selected}</span>
                <h3>{selectedGoal[language].title}</h3>
                <p>{selectedGoal[language].description}</p>

                <div className="cp-aside-route">
                  <span>{selectedGoal[language].short}</span>
                  <span>→</span>
                  <span>{nextChoice || "..."}</span>
                </div>
              </>
            ) : (
              <>
                <span className="cp-aside-label">{t.step1}</span>
                <h3>{t.title}</h3>
                <p>{t.intro}</p>
              </>
            )}

            <div className="cp-contact-links">
              <a href={`tel:${siteConfig.contact.phone}`}>
                <PhoneCall size={17} />
                <span>{t.phoneLabel}</span>
              </a>

              <a href={`mailto:${siteConfig.contact.email}`}>
                <Mail size={17} />
                <span>{t.emailLabel}</span>
              </a>

              <button type="button" onClick={openWhatsApp}>
                <MessageCircle size={17} />
                <span>{t.whatsappLabel}</span>
              </button>
            </div>
          </aside>

          <form className="cp-contact-form" onSubmit={submitRequest}>
            <div className="cp-steps">
              <span className={step >= 1 ? "active" : ""}>01 {t.step1}</span>
              <span className={step >= 2 ? "active" : ""}>02 {t.step2}</span>
              <span className={step >= 3 ? "active" : ""}>03 {t.step3}</span>
            </div>

            {step === 1 && (
              <div className="cp-flow-panel">
                <div className="cp-panel-head">
                  <span>01</span>
                  <div>
                    <h3>{t.chooseGoal}</h3>
                    <p>{t.intro}</p>
                  </div>
                </div>

                <div className="cp-goals">
                  {customerGoals.map((goal) => {
                    const Icon = goal.icon;
                    const active = goal.id === goalId;

                    return (
                      <button
                        key={goal.id}
                        type="button"
                        className={`cp-goal ${active ? "active" : ""}`}
                        onClick={() => selectGoal(goal.id)}
                      >
                        <span className="cp-goal-icon">
                          <Icon size={23} strokeWidth={1.6} />
                        </span>

                        <span className="cp-goal-copy">
                          <strong>{goal[language].title}</strong>
                          <small>{goal[language].description}</small>
                        </span>

                        <span className="cp-goal-arrow">
                          {isRTL ? <ArrowLeft size={17} /> : <ArrowRight size={17} />}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {step === 2 && selectedGoal && (
              <div className="cp-flow-panel">
                <div className="cp-panel-head">
                  <span>02</span>
                  <div>
                    <h3>{t.chooseDetail}</h3>
                    <p>{selectedGoal[language].description}</p>
                  </div>
                </div>

                <div className="cp-choice-grid">
                  {selectedGoal.next[language].map((choice) => {
                    const active = choice === nextChoice;

                    return (
                      <button
                        key={choice}
                        type="button"
                        className={`cp-choice ${active ? "active" : ""}`}
                        onClick={() => selectNextChoice(choice)}
                      >
                        <span>{choice}</span>
                        {active ? (
                          <Check size={17} />
                        ) : isRTL ? (
                          <ArrowLeft size={17} />
                        ) : (
                          <ArrowRight size={17} />
                        )}
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  className="cp-back-button"
                  onClick={() => setStep(1)}
                >
                  <BackIcon size={17} />
                  {t.back}
                </button>
              </div>
            )}

            {step === 3 && selectedGoal && (
              <div className="cp-flow-panel">
                <div className="cp-panel-head">
                  <span>03</span>
                  <div>
                    <h3>{t.yourDetails}</h3>
                    <p>{t.requestNote}</p>
                  </div>
                </div>

                <div className="cp-selection-summary">
                  <span>{selectedGoal[language].title}</span>
                  <span>·</span>
                  <strong>{nextChoice}</strong>
                </div>

                <div className="cp-fields">
                  <label>
                    <span>{t.name}</span>
                    <input
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      placeholder={t.namePlaceholder}
                      autoComplete="name"
                    />
                  </label>

                  <label>
                    <span>{t.email}</span>
                    <input
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder={t.emailPlaceholder}
                      type="email"
                      autoComplete="email"
                    />
                  </label>

                  <label>
                    <span>{t.phone}</span>
                    <input
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      placeholder={t.phonePlaceholder}
                      type="tel"
                      autoComplete="tel"
                      required
                    />
                  </label>

                  <label className="wide">
                    <span>{t.notes}</span>
                    <textarea
                      value={details}
                      onChange={(event) => setDetails(event.target.value)}
                      placeholder={t.notesPlaceholder}
                      rows={5}
                    />
                  </label>
                </div>

                {error && <p className="cp-error">{error}</p>}

                <div className="cp-actions">
                  <button
                    type="button"
                    className="cp-back-button"
                    onClick={() => setStep(2)}
                  >
                    <BackIcon size={17} />
                    {t.back}
                  </button>

                  <button type="button" className="cp-whatsapp" onClick={openWhatsApp}>
                    <MessageCircle size={18} />
                    {t.whatsapp}
                  </button>

                  <button type="submit" className="cp-submit">
                    <span>{t.send}</span>
                    <Send size={17} />
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>

      <style jsx>{styles}</style>
    </section>
  );
}

const styles = `
.cp-contact {
  position: relative;
  padding: 8rem 1.5rem 7rem;
  background:
    radial-gradient(circle at 12% 18%, rgba(201, 74, 61, 0.07), transparent 24rem),
    radial-gradient(circle at 88% 78%, rgba(181, 150, 108, 0.12), transparent 24rem),
    #f7f4ee;
  color: #332d28;
}

.cp-contact-shell {
  width: min(1180px, 100%);
  margin: 0 auto;
}

.cp-contact-top {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(280px, 0.8fr);
  gap: 4rem;
  align-items: end;
  margin-bottom: 4rem;
}

.cp-contact-kicker {
  margin: 0 0 1rem;
  color: #c94a3d;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.cp-contact-top h2 {
  margin: 0;
  max-width: 760px;
  font-size: clamp(3rem, 7vw, 6.7rem);
  line-height: 0.94;
  letter-spacing: -0.055em;
  font-weight: 500;
}

.cp-contact-intro {
  margin: 0;
  max-width: 420px;
  color: #786e65;
  font-size: 1.05rem;
  line-height: 1.9;
}

.cp-contact-grid {
  display: grid;
  grid-template-columns: 0.34fr 0.66fr;
  gap: 1px;
  background: #d5ccc2;
  border: 1px solid #d5ccc2;
}

.cp-contact-aside,
.cp-contact-form {
  background: #fffdf9;
}

.cp-contact-aside {
  min-height: 620px;
  padding: 2.25rem;
  display: flex;
  flex-direction: column;
}

.cp-aside-icon {
  width: 58px;
  height: 58px;
  display: grid;
  place-items: center;
  margin-bottom: 4rem;
  border: 1px solid #e4ddd4;
  border-radius: 50%;
  color: #c94a3d;
}

.cp-aside-label {
  color: #9a9087;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.16em;
}

.cp-contact-aside h3 {
  margin: 0.8rem 0 0;
  font-size: clamp(2rem, 3.2vw, 3.4rem);
  line-height: 1;
  font-weight: 500;
  letter-spacing: -0.04em;
}

.cp-contact-aside p {
  max-width: 290px;
  margin: 1.25rem 0 0;
  color: #786e65;
  line-height: 1.8;
}

.cp-aside-route {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
  align-items: center;
  margin-top: 2rem;
  padding-top: 1.4rem;
  border-top: 1px solid #e4ddd4;
  color: #40372f;
  font-size: 0.82rem;
}

.cp-aside-route span:last-child {
  color: #c94a3d;
  font-weight: 700;
}

.cp-contact-links {
  margin-top: auto;
  padding-top: 3rem;
  display: flex;
  gap: 0.6rem;
}

.cp-contact-links a,
.cp-contact-links button {
  width: 42px;
  height: 42px;
  padding: 0;
  display: grid;
  place-items: center;
  border: 1px solid #e4ddd4;
  border-radius: 50%;
  background: transparent;
  color: #40372f;
  cursor: pointer;
  transition: all 180ms var(--cp-ease, cubic-bezier(0.22, 1, 0.36, 1));
}

.cp-contact-links span {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.cp-contact-links a:hover,
.cp-contact-links button:hover {
  background: #c94a3d;
  border-color: #c94a3d;
  color: #fffdf9;
  transform: translateY(-2px);
}

.cp-contact-form {
  min-height: 620px;
  padding: 2.25rem;
}

.cp-steps {
  display: flex;
  gap: 1rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e4ddd4;
}

.cp-steps span {
  color: #b1a79e;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.12em;
}

.cp-steps span.active {
  color: #40372f;
}

.cp-flow-panel {
  padding-top: 2rem;
}

.cp-panel-head {
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
  margin-bottom: 2rem;
}

.cp-panel-head > span {
  color: #c94a3d;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.12em;
}

.cp-panel-head h3 {
  margin: 0;
  font-size: clamp(1.7rem, 3vw, 2.8rem);
  line-height: 1;
  font-weight: 500;
  letter-spacing: -0.035em;
}

.cp-panel-head p {
  margin: 0.8rem 0 0;
  color: #786e65;
  line-height: 1.7;
}

.cp-goals {
  display: grid;
  gap: 0;
  border-top: 1px solid #e4ddd4;
}

.cp-goal {
  display: grid;
  grid-template-columns: 52px 1fr 28px;
  gap: 1rem;
  align-items: center;
  padding: 1.15rem 0;
  border: 0;
  border-bottom: 1px solid #e4ddd4;
  background: transparent;
  color: #40372f;
  text-align: start;
  cursor: pointer;
  transition: padding 180ms var(--cp-ease, cubic-bezier(0.22, 1, 0.36, 1));
}

.cp-goal:hover,
.cp-goal.active {
  padding-inline: 0.8rem;
  background: #fbf9f5;
}

.cp-goal.active {
  color: #c94a3d;
}

.cp-goal-icon {
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
  border: 1px solid #e4ddd4;
  border-radius: 50%;
}

.cp-goal-copy {
  display: grid;
  gap: 0.3rem;
}

.cp-goal-copy strong {
  font-size: 1rem;
  font-weight: 600;
}

.cp-goal-copy small {
  max-width: 560px;
  color: #9a9087;
  font-size: 0.82rem;
  line-height: 1.55;
}

.cp-goal-arrow,
.cp-choice svg {
  color: #9a9087;
}

.cp-choice-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.8rem;
}

.cp-choice {
  min-height: 92px;
  padding: 1rem 1.1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  border: 1px solid #e4ddd4;
  border-radius: 12px;
  background:
    linear-gradient(135deg, rgba(201, 74, 61, 0.035), rgba(181, 150, 108, 0.05)),
    #fffdf9;
  color: #40372f;
  text-align: start;
  cursor: pointer;
  transition: all 180ms var(--cp-ease, cubic-bezier(0.22, 1, 0.36, 1));
}

.cp-choice:hover,
.cp-choice.active {
  border-color: #c94a3d;
  transform: translateY(-2px);
}

.cp-choice.active {
  background: #40372f;
  color: #fffdf9;
}

.cp-choice.active svg {
  color: #d6bd94;
}

.cp-selection-summary {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 1.7rem;
  padding: 0.9rem 1rem;
  background: #f7f4ee;
  border-inline-start: 3px solid #c94a3d;
  color: #786e65;
  font-size: 0.88rem;
}

.cp-selection-summary strong {
  color: #40372f;
}

.cp-fields {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.cp-fields label {
  display: grid;
  gap: 0.55rem;
}

.cp-fields label.wide {
  grid-column: 1 / -1;
}

.cp-fields label > span {
  color: #786e65;
  font-size: 0.75rem;
  font-weight: 700;
}

.cp-fields input,
.cp-fields textarea {
  width: 100%;
  border: 1px solid #e4ddd4;
  border-radius: 10px;
  background: #fbf9f5;
  color: #332d28;
  padding: 0.95rem 1rem;
  outline: 0;
  font: inherit;
  transition: border-color 180ms ease, background 180ms ease;
  box-sizing: border-box;
}

.cp-fields textarea {
  resize: vertical;
  min-height: 140px;
}

.cp-fields input:focus,
.cp-fields textarea:focus {
  border-color: #c94a3d;
  background: #fffdf9;
}

.cp-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
  align-items: center;
  margin-top: 1.25rem;
}

.cp-back-button,
.cp-whatsapp,
.cp-submit,
.cp-contact-secondary {
  min-height: 46px;
  border-radius: 999px;
  padding: 0 1.1rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
  border: 1px solid #e4ddd4;
  font: inherit;
  font-size: 0.84rem;
  cursor: pointer;
  transition: all 180ms var(--cp-ease, cubic-bezier(0.22, 1, 0.36, 1));
}

.cp-back-button {
  background: transparent;
  color: #786e65;
}

.cp-back-button:hover {
  color: #40372f;
  border-color: #d5ccc2;
}

.cp-whatsapp {
  margin-inline-start: auto;
  background: #fffdf9;
  color: #40372f;
}

.cp-whatsapp:hover {
  background: #c94a3d;
  border-color: #c94a3d;
  color: #fffdf9;
}

.cp-submit,
.cp-contact-secondary {
  border-color: #40372f;
  background: #40372f;
  color: #fffdf9;
}

.cp-submit:hover,
.cp-contact-secondary:hover {
  border-color: #c94a3d;
  background: #c94a3d;
}

.cp-error {
  margin: 1rem 0 0;
  color: #a93c32;
  font-size: 0.82rem;
}

.cp-contact-success {
  min-height: 500px;
  display: grid;
  place-items: center;
  align-content: center;
  text-align: center;
  padding: 5rem 2rem;
  border: 1px solid #e4ddd4;
  background:
    radial-gradient(circle at 50% 20%, rgba(201, 74, 61, 0.09), transparent 22rem),
    #fffdf9;
}

.cp-success-mark {
  width: 70px;
  height: 70px;
  margin-bottom: 2rem;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: #c94a3d;
  color: #fffdf9;
}

.cp-contact-success h2 {
  max-width: 700px;
  margin: 0 0 2rem;
  font-size: clamp(2.2rem, 5vw, 5rem);
  line-height: 0.98;
  font-weight: 500;
  letter-spacing: -0.045em;
}

@media (max-width: 900px) {
  .cp-contact {
    padding: 6rem 1rem;
  }

  .cp-contact-top,
  .cp-contact-grid {
    grid-template-columns: 1fr;
  }

  .cp-contact-top {
    gap: 1.5rem;
    margin-bottom: 2.5rem;
  }

  .cp-contact-aside {
    min-height: auto;
    padding: 1.5rem;
  }

  .cp-aside-icon {
    margin-bottom: 2rem;
  }

  .cp-contact-links {
    margin-top: 2rem;
  }

  .cp-contact-form {
    min-height: auto;
    padding: 1.5rem;
  }
}

@media (max-width: 620px) {
  .cp-contact-top h2 {
    font-size: clamp(2.7rem, 14vw, 4.5rem);
  }

  .cp-steps {
    gap: 0.7rem;
    overflow-x: auto;
  }

  .cp-choice-grid,
  .cp-fields {
    grid-template-columns: 1fr;
  }

  .cp-fields label.wide {
    grid-column: auto;
  }

  .cp-goal {
    grid-template-columns: 44px 1fr 20px;
  }

  .cp-goal-copy small {
    display: none;
  }

  .cp-actions {
    align-items: stretch;
  }

  .cp-back-button,
  .cp-whatsapp,
  .cp-submit {
    width: 100%;
    margin-inline-start: 0;
  }
}
`;
