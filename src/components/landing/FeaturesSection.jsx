import { Video, Clock, Star, ShieldCheck, Bell, CreditCard, ArrowRight } from "lucide-react";

const features = [
  {
    icon: Video,
    title: "24/7 Telehealth Consultations",
    description: "Connect with licensed doctors from anywhere via HD video calls — available day, night, weekends, and holidays.",
    gradient: "from-blue-500 to-indigo-600",
    lightBg: "from-blue-50 to-indigo-50",
    glow: "shadow-blue-200/60",
    tag: "Most Popular",
    tagColor: "bg-blue-100 text-blue-700",
    size: "lg",
  },
  {
    icon: Clock,
    title: "Real-Time Availability",
    description: "See live appointment slots. No stale calendars, no double bookings — just accurate, up-to-the-minute scheduling.",
    gradient: "from-emerald-500 to-teal-600",
    lightBg: "from-emerald-50 to-teal-50",
    glow: "shadow-emerald-200/60",
    tag: "Always Live",
    tagColor: "bg-emerald-100 text-emerald-700",
    size: "sm",
  },
  {
    icon: Star,
    title: "Verified Patient Reviews",
    description: "100% authentic, moderated reviews — so you can choose with confidence.",
    gradient: "from-amber-400 to-orange-500",
    lightBg: "from-amber-50 to-orange-50",
    glow: "shadow-amber-200/60",
    tag: "100% Authentic",
    tagColor: "bg-amber-100 text-amber-700",
    size: "sm",
  },
  {
    icon: ShieldCheck,
    title: "HIPAA-Compliant Security",
    description: "End-to-end encryption and full HIPAA compliance ensures your medical information stays completely private.",
    gradient: "from-violet-500 to-purple-600",
    lightBg: "from-violet-50 to-purple-50",
    glow: "shadow-violet-200/60",
    tag: "HIPAA Compliant",
    tagColor: "bg-violet-100 text-violet-700",
    size: "sm",
  },
  {
    icon: Bell,
    title: "Smart Appointment Reminders",
    description: "Automated SMS, email, and push reminders with prep tips and directions — never miss a visit again.",
    gradient: "from-sky-500 to-cyan-600",
    lightBg: "from-sky-50 to-cyan-50",
    glow: "shadow-sky-200/60",
    tag: "Auto-Notify",
    tagColor: "bg-sky-100 text-sky-700",
    size: "sm",
  },
  {
    icon: CreditCard,
    title: "Insurance-Friendly Booking",
    description: "Filter by your plan, get transparent upfront pricing, and zero surprise bills.",
    gradient: "from-rose-400 to-pink-600",
    lightBg: "from-rose-50 to-pink-50",
    glow: "shadow-rose-200/60",
    tag: "No Surprises",
    tagColor: "bg-rose-100 text-rose-700",
    size: "sm",
  },
];

export default function FeaturesSection() {
  const [main, ...rest] = features;

  return (
    <section
      id="features"
      className="py-24 px-4"
      style={{ background: "linear-gradient(180deg, #F8FAFF 0%, #ffffff 100%)" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-gradient-to-r from-violet-600 to-purple-600 text-white text-xs font-black px-5 py-2 rounded-full uppercase tracking-widest shadow-md shadow-violet-200/60 mb-5">
            Why MediBook
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
            Everything You Need for{" "}
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
              Better Healthcare Access
            </span>
          </h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto leading-relaxed">
            MediBook is more than booking — it's a complete healthcare platform built around you.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Hero feature — spans 2 rows on md */}
          <div
            className={`group relative md:row-span-2 flex flex-col justify-between p-8 bg-gradient-to-br ${main.lightBg} rounded-3xl border border-white hover:shadow-2xl ${main.glow} hover:border-transparent transition-all duration-400 cursor-default overflow-hidden`}
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.6) 0%, transparent 60%)" }} />

            <div>
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${main.gradient} flex items-center justify-center shadow-xl ${main.glow} mb-6 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-400`}>
                <main.icon className="w-8 h-8 text-white" strokeWidth={1.75} />
              </div>
              <span className={`inline-block text-xs font-black px-3 py-1 rounded-full ${main.tagColor} mb-4`}>
                {main.tag}
              </span>
              <h3 className="text-2xl font-black text-slate-900 leading-tight mb-3">{main.title}</h3>
              <p className="text-slate-500 leading-relaxed">{main.description}</p>
            </div>

            <button className="relative mt-8 flex items-center gap-2 text-sm font-bold text-blue-600 group/btn cursor-pointer w-fit">
              <span className="underline-offset-2 group-hover/btn:underline transition-all">Learn more</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
            </button>
          </div>

          {/* Smaller feature cards */}
          {rest.map(({ icon: Icon, title, description, gradient, lightBg, glow, tag, tagColor }) => (
            <div
              key={title}
              className={`group relative flex flex-col gap-4 p-7 bg-gradient-to-br ${lightBg} rounded-3xl border border-white hover:shadow-xl ${glow} hover:border-transparent transition-all duration-400 cursor-default overflow-hidden`}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.5) 0%, transparent 60%)" }} />

              <div className="relative flex items-start justify-between">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg ${glow} group-hover:scale-110 group-hover:-rotate-3 transition-all duration-400`}>
                  <Icon className="w-6 h-6 text-white" strokeWidth={2} />
                </div>
                <span className={`text-[11px] font-black px-2.5 py-1 rounded-full ${tagColor}`}>{tag}</span>
              </div>

              <div className="relative">
                <h3 className="text-base font-black text-slate-900 mb-2 leading-snug">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
