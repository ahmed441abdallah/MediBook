const SERVICES = [
  {
    title: "Private Telehealth",
    desc: "Secure, HIPAA-compliant video consultations from anywhere in the world. Connect with your specialist without leaving the comfort of your private space.",
    icon: TelehealthIcon,
  },
  {
    title: "Priority Booking",
    desc: "Same-day and next-day appointments guaranteed for our members. Your time is valuable — we ensure it is never wasted waiting.",
    icon: PriorityIcon,
  },
  {
    title: "Personal Health Concierge",
    desc: "A dedicated coordinator manages your entire care journey — from scheduling across multiple specialists to prescription coordination.",
    icon: ConciergeIcon,
  },
  {
    title: "Verified Medical Records",
    desc: "Access your complete medical history, lab results, and treatment plans through our secure, encrypted patient portal — anytime, anywhere.",
    icon: RecordsIcon,
  },
  {
    title: "Second Opinion Network",
    desc: "Uncertain about a diagnosis? Our network connects you with leading specialists for confidential second opinions within 48 hours.",
    icon: OpinionIcon,
  },
  {
    title: "Post-Care Follow-Up",
    desc: "Every treatment concludes with a personalized follow-up plan. Proactive check-ins ensure your recovery stays precisely on track.",
    icon: FollowUpIcon,
  },
];

export default function ConciergeServices() {
  return (
    <section
      id="services"
      className="py-24 lg:py-40"
      style={{ backgroundColor: "var(--color-bg-pure)" }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">

        {/* Header — centered */}
        <div className="text-center mb-20 lg:mb-28">
          <p
            className="text-[12px] uppercase tracking-[0.25em] font-semibold mb-4"
            style={{ color: "var(--color-text-muted)" }}
          >
            Concierge Services
          </p>
          <h2
            className="heading-editorial text-[clamp(2.5rem,5vw,4.5rem)] mb-6"
            style={{ color: "var(--color-text)" }}
          >
            Healthcare, <em style={{ color: "var(--color-accent)" }}>Redefined</em>
          </h2>
          <p
            className="text-[16px] leading-[1.8] max-w-2xl mx-auto font-light"
            style={{ color: "var(--color-text-soft)" }}
          >
            Beyond appointments — a complete suite of services designed
            around the premise that exceptional care extends far beyond the
            consultation room.
          </p>
        </div>

        {/* Services grid — 3×2 */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ backgroundColor: "var(--color-border)" }}>
          {SERVICES.map(({ title, desc, icon: Icon }) => (
            <div
              key={title}
              className="group flex flex-col p-10 lg:p-14 cursor-default transition-colors duration-300"
              style={{ backgroundColor: "var(--color-bg-pure)" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--color-bg)")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--color-bg-pure)")}
            >
              {/* Icon */}
              <div className="mb-8">
                <Icon />
              </div>

              {/* Title */}
              <h3
                className="text-[14px] uppercase tracking-[0.15em] font-semibold mb-4"
                style={{ color: "var(--color-text)" }}
              >
                {title}
              </h3>

              {/* Desc */}
              <p
                className="text-[15px] leading-[1.8] font-light"
                style={{ color: "var(--color-text-soft)" }}
              >
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   Line-art SVG icons — ultra-minimal
═══════════════════════════════════════════════ */
function TelehealthIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="var(--color-accent)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="6" width="28" height="20" rx="2" />
      <line x1="4" y1="30" x2="32" y2="30" />
      <circle cx="18" cy="16" r="4" />
      <line x1="18" y1="26" x2="18" y2="30" />
    </svg>
  );
}

function PriorityIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="var(--color-accent)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="18" r="13" />
      <polyline points="18 10 18 18 24 22" />
      <path d="M26 6l3-3M10 6L7 3" />
    </svg>
  );
}

function ConciergeIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="var(--color-accent)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="12" r="5" />
      <path d="M8 30c0-5.523 4.477-10 10-10s10 4.477 10 10" />
      <path d="M26 14l4 4-4 4" />
    </svg>
  );
}

function RecordsIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="var(--color-accent)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="7" y="4" width="22" height="28" rx="2" />
      <line x1="12" y1="12" x2="24" y2="12" />
      <line x1="12" y1="17" x2="24" y2="17" />
      <line x1="12" y1="22" x2="19" y2="22" />
      <path d="M22 26l2 2 4-4" />
    </svg>
  );
}

function OpinionIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="var(--color-accent)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="13" cy="14" r="6" />
      <circle cx="23" cy="14" r="6" />
      <path d="M13 20c-4.418 0-8 3.134-8 7h16" />
      <path d="M23 20c4.418 0 8 3.134 8 7H19" />
    </svg>
  );
}

function FollowUpIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="var(--color-accent)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 18a14 14 0 0 1 28 0" />
      <path d="M32 18a14 14 0 0 1-28 0" />
      <polyline points="14 16 18 20 26 12" />
    </svg>
  );
}
