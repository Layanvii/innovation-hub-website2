 import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  ArrowLeft,
  ArrowUpLeft,
  Check,
  CheckCircle2,
  ChevronLeft,
  Compass,
  Cpu,
  ExternalLink,
  FlaskConical,
  HeartHandshake,
  Layers3,
  Lightbulb,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Megaphone,
  Phone,
  Rocket,
  Send,
  Target,
  WalletCards,
  X,
} from "lucide-react";
import { ErrorBoundary } from "@/components/error-boundary";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { Route, Switch, useLocation, Router as WouterRouter } from "wouter";
import logoPath from "@assets/1_1786717861361.png";

const queryClient = new QueryClient();

// Shared navigation data keeps the header, mobile menu, and footer in sync.
const navItems = [
  { label: "عن النادي", target: "about" },
  { label: "الإنجازات", target: "achievements" },
  { label: "اللجان", target: "committees" },
  { label: "البرامج", target: "programs" },
  { label: "تواصل معنا", target: "contact" },
];

const committees = [
  {
    title: "اللجنة التنفيذية",
    copy: "تقود الإيقاع، وتحوّل الرؤية إلى قرارات وخطوات واضحة.",
    icon: Compass,
    tone: "teal",
  },
  {
    title: "لجنة التقنية",
    copy: "تبني الأدوات والنماذج التي تمنح الأفكار فرصة أن تعمل.",
    icon: Cpu,
    tone: "blue",
  },
  {
    title: "لجنة البرامج",
    copy: "تصمم تجارب التعلم والتحديات التي تترك أثراً عملياً.",
    icon: Layers3,
    tone: "gold",
  },
  {
    title: "لجنة الإعلام",
    copy: "تحكي قصص الأثر وتوصل صوت المبتكرين إلى المجتمع.",
    icon: Megaphone,
    tone: "rose",
  },
  {
    title: "لجنة الموارد",
    copy: "تفتح أبواب الشراكات والدعم والموارد اللازمة للنمو.",
    icon: WalletCards,
    tone: "mint",
  },
  {
    title: "لجنة الـ Fab Lab",
    copy: "تنقل النموذج من الشاشة إلى المادة، ومن الفكرة إلى نموذج أولي.",
    icon: FlaskConical,
    tone: "amber",
  },
];

const programs = [
  {
    date: "١٨ أبريل",
    type: "ورشة تطبيقية",
    title: "من الفكرة إلى النموذج الأولي",
    copy: "يوم مكثف لبناء أول نسخة قابلة للاختبار من فكرتك، مهما كان مستواك التقني.",
    featured: true,
  },
  {
    date: "٢٥ أبريل",
    type: "جلسة حوارية",
    title: "حديث المؤسسين: ما بعد البداية",
    copy: "مساحة صريحة مع مؤسسين محليين عن القرارات التي لا تظهر في قصص النجاح.",
    featured: false,
  },
  {
    date: "٠٢ مايو",
    type: "مختبر مفتوح",
    title: "ليلة التجارب في Fab Lab",
    copy: "احجز طاولتك، أحضر فضولك، واستكشف أدوات التصنيع الرقمي مع فريق النادي.",
    featured: false,
  },
];

const heroSentences = [
  "نصنع في نادي الابتكار وريادة الأعمال بيئة تجعل التجربة أسهل، والسؤال أجرأ، والأثر أقرب.",
  "من أول ملاحظة إلى أول نموذج، نمشي معك.",
];

function scrollToSection(target: string, closeMenu?: () => void) {
  document
    .getElementById(target)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
  closeMenu?.();
}

// Adds one-time reveal animations as sections enter the viewport.
function useScrollReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(
      "[data-scroll-reveal]",
    );
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}

// Starts each statistic only when its number becomes visible.
function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let animationFrame = 0;
    let started = false;
    const element = document.querySelector(`[data-count-up="${value}"]`);

    if (!element) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(value);
      return;
    }

    const start = () => {
      if (started) return;
      started = true;
      const duration = 2200;
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(value * easedProgress));
        if (progress < 1) animationFrame = requestAnimationFrame(animate);
      };

      animationFrame = requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          start();
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrame);
    };
  }, [value]);

  return (
    <>
      {new Intl.NumberFormat("ar").format(count)}
      {suffix}
    </>
  );
}

function Home() {
  useScrollReveal();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(navItems[0].target);
  const [registration, setRegistration] = useState<string | null>(null);
  const [registered, setRegistered] = useState(false);
  const [contactSent, setContactSent] = useState(false);

  useEffect(() => {
    const targets = navItems
      .map((item) => document.getElementById(item.target))
      .filter(Boolean) as HTMLElement[];
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry) {
          setActiveSection(visibleEntry.target.id);
          return;
        }

        const firstVisible = entries.find(
          (entry) => entry.boundingClientRect.top <= 160,
        );
        if (firstVisible) {
          setActiveSection(firstVisible.target.id);
        }
      },
      {
        root: null,
        threshold: [0.2, 0.45, 0.7],
        rootMargin: "-20% 0px -50% 0px",
      },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  const submitRegistration = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setRegistered(true);
  };

  const submitContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setContactSent(true);
    event.currentTarget.reset();
  };

  return (
    <main dir="rtl" className="site-shell min-h-[100dvh]">
      {/* Hero and sticky navigation */}
      <section className="hero" id="top">
        <header className="hero-nav sticky top-0 z-40">
          <div className="hero-nav-row section-wrap flex h-[78px] items-center justify-between gap-6">
            <button
              type="button"
              className="flex items-center gap-3 text-right"
              onClick={() => scrollToSection("top", () => setMenuOpen(false))}
              aria-label="العودة إلى بداية الصفحة"
              data-testid="button-brand-home"
            >
              <img
                src={logoPath}
                alt="شعار نادي الابتكار وريادة الأعمال"
                className="brand-mark"
                data-testid="img-club-logo"
              />
              <span className="hidden whitespace-nowrap text-sm font-semibold leading-6 text-white sm:block">
                نادي الابتكار وريادة الأعمال
              </span>
            </button>

            <nav
              className="hidden items-center gap-2 lg:flex"
              aria-label="التنقل الرئيسي"
            >
              {navItems.map((item) => (
                <button
                  type="button"
                  key={item.target}
                  onClick={() => scrollToSection(item.target)}
                  className={`nav-link text-[.88rem] transition-colors ${activeSection === item.target ? "is-active text-[#6AC7BD]" : "text-white/70 hover:text-[#6AC7BD]"}`}
                  aria-current={
                    activeSection === item.target ? "page" : undefined
                  }
                  data-testid={`button-nav-${item.target}`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <button
              type="button"
              className="primary-btn hidden min-h-[42px] px-5 text-sm lg:inline-flex"
              onClick={() => scrollToSection("contact")}
              data-testid="button-join-header"
            >
              انضم إلى المجتمع <ArrowUpLeft size={16} />
            </button>
            <button
              type="button"
              className="rounded-full p-2 text-white lg:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "إغلاق القائمة" : "فتح القائمة"}
              aria-expanded={menuOpen}
              data-testid="button-mobile-menu"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          {menuOpen && (
            <nav
              className="mobile-menu px-5 pb-5 lg:hidden"
              aria-label="التنقل على الجوال"
            >
              <div className="mobile-menu-inner section-wrap flex flex-col gap-1">
                {navItems.map((item) => (
                  <button
                    type="button"
                    key={item.target}
                    onClick={() =>
                      scrollToSection(item.target, () => setMenuOpen(false))
                    }
                    className={`border-b border-white/10 py-3 text-right text-sm ${activeSection === item.target ? "text-[#6AC7BD]" : "text-white/80"}`}
                    aria-current={
                      activeSection === item.target ? "page" : undefined
                    }
                    data-testid={`button-mobile-nav-${item.target}`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </nav>
          )}
        </header>

        <div className="hero-content section-wrap relative grid min-h-[680px] items-center gap-14 py-20 lg:grid-cols-[1.05fr_.95fr] lg:gap-20">
          <div className="reveal order-2 lg:order-1">
            <div className="eyebrow mb-7">مساحة تُحرّك الأفكار</div>
            <h1 className="hero-title text-balance">
              الفكرة لا تستحق
              <br />
              <em>الانتظار.</em>
            </h1>
            <p className="hero-copy hero-copy-reveal mt-7">
              {heroSentences.map((sentence, sentenceIndex) => (
                <span className="hero-copy-sentence" key={sentence}>
                  {sentence.split(" ").map((word, wordIndex) => (
                    <span
                      className="reveal-word"
                      key={`${sentenceIndex}-${wordIndex}`}
                      style={{
                        animationDelay: `${0.45 + sentenceIndex * 1.05 + wordIndex * 0.08}s`,
                      }}
                    >
                      {word}
                    </span>
                  ))}
                </span>
              ))}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <button
                type="button"
                className="primary-btn"
                onClick={() => scrollToSection("programs")}
                data-testid="button-explore-programs"
              >
                اكتشف برامجنا <ArrowLeft size={17} />
              </button>
              <button
                type="button"
                className="secondary-btn"
                onClick={() => scrollToSection("about")}
                data-testid="button-learn-about"
              >
                لماذا النادي؟
              </button>
            </div>
            <div className="mt-16 flex items-center gap-4 text-sm text-white/55">
              <span className="font-latin text-[#6AC7BD]">01</span>
              <span className="h-px w-16 bg-white/20" />
              <span>فكّر. جرّب. أثّر.</span>
            </div>
          </div>
          <div className="relative order-1 flex justify-center lg:order-2">
            <div className="hero-orbit" aria-hidden="true" />
            <div className="hero-logo-card reveal reveal-delay-2">
              <img
                src={logoPath}
                alt="العلامة البصرية لنادي الابتكار وريادة الأعمال"
                data-testid="img-hero-logo"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Club metrics */}
      <section className="stat-strip" aria-label="أرقام النادي">
        <div className="section-wrap grid grid-cols-3" data-scroll-reveal>
          <div className="stat-item">
            <div
              className="stat-number"
              data-count-up="480"
              data-testid="stat-members"
            >
              <CountUp value={480} suffix="+" />
            </div>
            <div className="stat-caption">عضو في المجتمع</div>
          </div>
          <div className="stat-item">
            <div
              className="stat-number"
              data-count-up="72"
              data-testid="stat-experiments"
            >
              <CountUp value={72} />
            </div>
            <div className="stat-caption">تجربة ونموذج أولي</div>
          </div>
          <div className="stat-item">
            <div
              className="stat-number"
              data-count-up="16"
              data-testid="stat-partners"
            >
              <CountUp value={16} />
            </div>
            <div className="stat-caption">شريكاً في الأثر</div>
          </div>
        </div>
      </section>

      {/* Club mission and values */}
      <section className="section" id="about">
        <div className="section-wrap">
          <div
            className="mb-16 grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end"
            data-scroll-reveal
          >
            <div>
              <div className="section-label mb-5">عن النادي</div>
              <h2 className="section-title">
                نؤمن أن الأثر
                <br />
                يبدأ بسؤال.
              </h2>
            </div>
            <p className="section-intro">
              النادي هو نقطة التقاء لكل من يرى في الفكرة بداية لا نهاية. نخلق
              مساحات للتعلم، وفرقاً للتجربة، وشراكات تحول المعرفة إلى شيء يمكن
              لمسه وقياس أثره.
            </p>
          </div>
          <div className="message-card mb-16" data-scroll-reveal>
            <blockquote>
              «لا نبحث عن الفكرة المثالية؛ نبحث عن الشجاعة الكافية لتجربتها،
              والفضول الكافي لتطويرها»
            </blockquote>
            <cite>رسالة النادي — إلى كل من لديه بداية صغيرة</cite>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            <article
              className="info-card hover-lift"
              data-scroll-reveal
              data-reveal-delay="1"
            >
              <div className="icon-box">
                <Target size={21} />
              </div>
              <h3>رؤيتنا</h3>
              <p>
                مجتمع طلابي ومجتمعي يصنع ابتكارات ذات معنى، ويضع الريادة في خدمة
                الإنسان والمكان.
              </p>
            </article>
            <article
              className="info-card hover-lift"
              data-scroll-reveal
              data-reveal-delay="2"
            >
              <div className="icon-box">
                <Rocket size={21} />
              </div>
              <h3>أهدافنا</h3>
              <p>
                تطوير المهارات، وصل الأفكار بالموارد، وبناء تجارب آمنة تسمح
                بالتعلم من المحاولة.
              </p>
            </article>
            <article
              className="info-card hover-lift"
              data-scroll-reveal
              data-reveal-delay="3"
            >
              <div className="icon-box">
                <HeartHandshake size={21} />
              </div>
              <h3>قيمنا</h3>
              <p>
                فضول مسؤول، تعاون صادق، جرأة محسوبة، وأثر يمكن أن يصل إلى أبعد
                من صاحب الفكرة.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Milestones and achievements timeline */}
      <section className="section bg-[#edf2ed]" id="achievements">
        <div className="section-wrap grid gap-16 lg:grid-cols-[.78fr_1.22fr]">
          <div>
            <div className="section-label mb-5">محطات صنعت الفرق</div>
            <h2 className="section-title">
              نقيس التقدم
              <br />
              بما <span className="text-[#3C7974]">يتحرك.</span>
            </h2>
            <p className="section-intro mt-7">
              كل رقم هنا وراءه سؤال طُرح، ويد امتدت، ونموذج تغيّر. هذه ليست
              واجهة إنجازات؛ إنها آثار مجتمع قرر أن يبدأ.
            </p>
            <button
              type="button"
              onClick={() => scrollToSection("contact")}
              className="mt-8 inline-flex items-center gap-2 font-semibold text-[#3C7974] hover:text-[#173d3b]"
              data-testid="button-partner-achievements"
            >
              كن جزءاً من المحطة القادمة <ArrowLeft size={17} />
            </button>
          </div>
          <div>
            <article className="achievement">
              <div className="achievement-year">٢٠٢٤</div>
              <div>
                <h3>إطلاق برنامج «مختبر الفكرة»</h3>
                <p>
                  أربع دورات تدريبية رافقت ٣٢ فريقاً من صياغة المشكلة حتى اختبار
                  النموذج مع مستخدمين حقيقيين.
                </p>
              </div>
            </article>
            <article className="achievement">
              <div className="achievement-year">٢٠٢٣</div>
              <div>
                <h3>توسيع مجتمع التجربة</h3>
                <p>
                  ملتقى مفتوح جمع طلاباً ومبتكرين ومهنيين لصناعة وصلات جديدة بين
                  الحرم الجامعي والمدينة.
                </p>
              </div>
            </article>
            <article className="achievement">
              <div className="achievement-year">٢٠٢٢</div>
              <div>
                <h3>أول نسخة من تحدي روّاد</h3>
                <p>
                  مسابقة أسبوعية بدأت بسؤال شجاع، وتحولت إلى موعد ينتظره من يريد
                  أن يتعلم من فشل الآخرين.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Committees and their areas of responsibility */}
      <section className="section committee-section" id="committees">
        <div className="section-wrap">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <div className="section-label mb-5">فريق يحرك الفكرة</div>
              <h2 className="section-title">
                ست لجان.
                <br />
                إيقاع واحد.
              </h2>
            </div>
            <p className="section-intro md:max-w-sm">
              كل لجنة نافذة مختلفة على التجربة. اختر المساحة التي تشبه فضولك، أو
              اصنع مساحة جديدة معنا.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {committees.map((committee, index) => {
              const Icon = committee.icon;
              return (
                <article
                  className={`committee-card committee-${committee.tone} hover-lift`}
                  key={committee.title}
                  data-scroll-reveal
                  data-reveal-delay={String((index % 3) + 1)}
                  data-testid={`card-committee-${index}`}
                >
                  <div className="committee-index">٠{index + 1}</div>
                  <Icon
                    className="committee-icon"
                    size={21}
                    strokeWidth={1.6}
                  />
                  <h3>{committee.title}</h3>
                  <p>{committee.copy}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Weekly challenge callout */}
      <section className="challenge section" id="challenge">
        <div className="section-wrap">
          <div
            className="challenge-card grid gap-12 lg:grid-cols-[1fr_.85fr] lg:items-center"
            data-scroll-reveal
          >
            <div>
              <div className="section-label mb-5">تحدي روّاد</div>
              <h2 className="section-title text-balance">
                ماذا لو بدأنا
                <br />
                <span className="text-[#6AC7BD]">من الفشل؟</span>
              </h2>
              <p className="challenge-copy mt-7">
                كل يوم ثلاثاء، نفتح ملف شركة لم تنجح. يقدّم المشاركون حلولاً
                للمشكلات التي ساهمت في فشلها، ثم يتعلمون أن الابتكار لا يبدأ
                دائماً من صفحة بيضاء.
              </p>
              <div className="challenge-points">
                <div className="challenge-point">
                  <CheckCircle2 size={19} />
                  <span>مساحة عرض قصيرة ومركّزة لكل مشارك</span>
                </div>
                <div className="challenge-point">
                  <CheckCircle2 size={19} />
                  <span>نقاش جماعي يصقل الحل قبل الحكم عليه</span>
                </div>
                <div className="challenge-point">
                  <CheckCircle2 size={19} />
                  <span>كل ثلاثاء — حضور مفتوح لكل صاحب سؤال</span>
                </div>
              </div>
              <button
                type="button"
                className="primary-btn mt-9"
                onClick={() => setRegistration("تحدي روّاد")}
                data-testid="button-register-challenge"
              >
                احجز مقعدك في التحدي <ArrowLeft size={17} />
              </button>
            </div>
            <div className="relative flex min-h-[280px] items-center justify-center rounded-2xl border border-[#6AC7BD]/20 bg-[#6AC7BD]/[.06] p-8 text-center">
              <div>
                <div className="mb-5 flex justify-center">
                  <div className="challenge-badge">
                    <Lightbulb size={36} strokeWidth={1.3} />
                  </div>
                </div>
                <div className="font-latin text-5xl font-bold text-white">
                  TUE<span className="text-[#ef9c74]">.</span>
                </div>
                <div className="mt-2 text-sm text-white/55">
                  موعد أسبوعي مع سؤال مختلف
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming programs and registration actions */}
      <section className="section" id="programs">
        <div className="section-wrap">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <div className="section-label mb-5">على أجندة النادي</div>
              <h2 className="section-title">
                تجارب قادمة
                <br />
                تستحق الحضور.
              </h2>
            </div>
            <p className="section-intro md:max-w-sm">
              لا تحتاج أن تكون خبيراً. تحتاج فقط أن تحضر مستعداً للتجربة.
            </p>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {programs.map((program, index) => (
              <article
                className={`program-card ${program.featured ? "program-card-featured" : ""}`}
                key={program.title}
                data-scroll-reveal
                data-reveal-delay={String(index + 1)}
                data-testid={`card-program-${index}`}
              >
                <div className="program-meta">
                  <span>{program.type}</span>
                  <span className="program-date">{program.date}</span>
                </div>
                <h3>{program.title}</h3>
                <p>{program.copy}</p>
                <div className="card-action">
                  <button
                    type="button"
                    className={program.featured ? "filled-btn" : "outline-btn"}
                    onClick={() => setRegistration(program.title)}
                    data-testid={`button-register-program-${index}`}
                  >
                    سجّل اهتمامك{" "}
                    <ChevronLeft className="mr-1 inline-block" size={16} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Contact details and message form */}
      <section className="contact-section section" id="contact">
        <div className="section-wrap">
          <div
            className="contact-panel grid gap-14 lg:grid-cols-[.8fr_1.2fr]"
            data-scroll-reveal
          >
            <div>
              <div className="section-label mb-5">لنبدأ محادثة</div>
              <h2 className="section-title">
                فكرة، سؤال،
                <br />
                أو حتى <span className="text-[#3C7974]">فضول.</span>
              </h2>
              <p className="section-intro mt-6">
                اكتب لنا. قد تكون رسالتك هي أول خيط في مشروعك القادم.
              </p>
              <div className="mt-8">
                <a
                  href="mailto:hello@innovationclub.sa"
                  className="contact-link"
                  data-testid="link-email"
                >
                  <Mail size={19} />
                  <span>hello@innovationclub.sa</span>
                </a>
                <a
                  href="tel:+966500000000"
                  className="contact-link"
                  data-testid="link-phone"
                >
                  <Phone size={19} />
                  <span>+966 50 000 0000</span>
                </a>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="contact-link"
                  data-testid="link-location"
                >
                  <MapPin size={19} />
                  <span>مساحة الابتكار — الحرم الجامعي</span>
                  <ExternalLink className="mr-auto" size={14} />
                </a>
              </div>
              <div className="mt-7 flex gap-3">
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="grid h-10 w-10 place-items-center rounded-full border border-[#b6d3ca] text-[#3C7974] hover:bg-[#3C7974] hover:text-white"
                  data-testid="link-linkedin"
                >
                  <Linkedin size={17} />
                </a>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="grid h-10 w-10 place-items-center rounded-full border border-[#b6d3ca] text-[#3C7974] hover:bg-[#3C7974] hover:text-white"
                  data-testid="link-instagram"
                >
                  <MessageCircle size={17} />
                </a>
              </div>
            </div>
            <div>
              {contactSent ? (
                <div className="flex min-h-[390px] flex-col items-center justify-center text-center">
                  <div className="mb-6 grid h-16 w-16 place-items-center rounded-full bg-[#d7efeb] text-[#3C7974]">
                    <Check size={30} />
                  </div>
                  <h3 className="text-2xl font-bold text-[#173d3b]">
                    وصلت رسالتك.
                  </h3>
                  <p className="mt-3 max-w-sm leading-8 text-[#69817e]">
                    شكراً لأنك بدأت المحادثة. سيعود إليك فريق النادي قريباً.
                  </p>
                  <button
                    type="button"
                    className="outline-btn mt-7 max-w-[220px]"
                    onClick={() => setContactSent(false)}
                    data-testid="button-send-another"
                  >
                    إرسال رسالة أخرى
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={submitContact}
                  className="grid gap-5"
                  aria-label="نموذج التواصل"
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="contact-name" className="form-label">
                        الاسم
                      </label>
                      <input
                        required
                        id="contact-name"
                        className="field"
                        placeholder="كيف نناديك؟"
                        data-testid="input-contact-name"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="form-label">
                        البريد الإلكتروني
                      </label>
                      <input
                        required
                        type="email"
                        id="contact-email"
                        className="field"
                        placeholder="name@example.com"
                        dir="ltr"
                        data-testid="input-contact-email"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="contact-topic" className="form-label">
                      ما الذي يدور في بالك؟
                    </label>
                    <select
                      id="contact-topic"
                      className="field"
                      defaultValue=""
                      data-testid="select-contact-topic"
                    >
                      <option value="" disabled>
                        اختر موضوعاً
                      </option>
                      <option>الانضمام إلى النادي</option>
                      <option>شراكة أو تعاون</option>
                      <option>برنامج أو فعالية</option>
                      <option>فكرة أخرى</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="contact-message" className="form-label">
                      رسالتك
                    </label>
                    <textarea
                      required
                      id="contact-message"
                      className="field min-h-[125px] resize-y"
                      placeholder="اكتب على راحتك..."
                      data-testid="textarea-contact-message"
                    />
                  </div>
                  <button
                    type="submit"
                    className="primary-btn w-full sm:w-fit"
                    data-testid="button-submit-contact"
                  >
                    إرسال الرسالة <Send size={17} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer navigation and social links */}
      <footer className="footer py-8">
        <div className="section-wrap flex flex-col items-center justify-between gap-5 text-center text-sm sm:flex-row sm:text-right">
          <div className="flex items-center gap-3">
            <img
              src={logoPath}
              alt=""
              className="h-10 w-10 rounded-lg bg-[#f6f3ec] object-contain p-1"
            />
            <span>نادي الابتكار وريادة الأعمال</span>
          </div>
          <div className="footer-links">
            {navItems.map((item) => (
              <button
                key={item.target}
                type="button"
                onClick={() => scrollToSection(item.target)}
                className="footer-link"
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3 text-white/70">
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="footer-social"
              data-testid="footer-link-linkedin"
            >
              <Linkedin size={16} />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="footer-social"
              data-testid="footer-link-instagram"
            >
              <MessageCircle size={16} />
            </a>
            <button
              type="button"
              className="flex items-center gap-2 text-white/70 hover:text-[#6AC7BD]"
              onClick={() => scrollToSection("top")}
              data-testid="button-back-to-top"
            >
              إلى الأعلى <ArrowUpLeft size={16} />
            </button>
          </div>
        </div>
      </footer>

      {registration && (
        <div
          className="modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setRegistration(null);
          }}
        >
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="registration-title"
          >
            <div className="flex items-start justify-between gap-6">
              <div>
                <div className="section-label mb-3">تسجيل اهتمام</div>
                <h2
                  id="registration-title"
                  className="text-2xl font-bold text-[#173d3b]"
                >
                  {registration}
                </h2>
              </div>
              <button
                type="button"
                className="modal-close"
                onClick={() => setRegistration(null)}
                aria-label="إغلاق نافذة التسجيل"
                data-testid="button-close-registration"
              >
                <X size={20} />
              </button>
            </div>
            {registered ? (
              <div className="py-12 text-center">
                <CheckCircle2
                  className="mx-auto mb-5 text-[#3C7974]"
                  size={48}
                />
                <h3 className="text-xl font-bold text-[#173d3b]">
                  تم استلام تسجيلك.
                </h3>
                <p className="mt-3 leading-8 text-[#69817e]">
                  سنرسل لك التفاصيل على بريدك الإلكتروني عند اكتمال الموعد.
                </p>
                <button
                  type="button"
                  className="primary-btn mt-7 w-full"
                  onClick={() => {
                    setRegistration(null);
                    setRegistered(false);
                  }}
                  data-testid="button-close-success"
                >
                  حسناً
                </button>
              </div>
            ) : (
              <form onSubmit={submitRegistration} className="mt-7 grid gap-4">
                <div>
                  <label htmlFor="registration-name" className="form-label">
                    الاسم
                  </label>
                  <input
                    required
                    id="registration-name"
                    className="field"
                    placeholder="الاسم الكامل"
                    data-testid="input-registration-name"
                  />
                </div>
                <div>
                  <label htmlFor="registration-email" className="form-label">
                    البريد الإلكتروني
                  </label>
                  <input
                    required
                    type="email"
                    id="registration-email"
                    className="field"
                    placeholder="name@example.com"
                    dir="ltr"
                    data-testid="input-registration-email"
                  />
                </div>
                <button
                  type="submit"
                  className="primary-btn mt-2 w-full"
                  data-testid="button-submit-registration"
                >
                  تأكيد التسجيل <ArrowLeft size={17} />
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </main>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
