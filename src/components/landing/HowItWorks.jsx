import { Search, LayoutGrid, CalendarCheck } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: Search,
    title: "Search",
    desc: "Enter your condition, specialty, or doctor's name. Filter by location, insurance, gender, and availability.",
    gradient: "from-blue-500 to-indigo-600",
    glow: "shadow-blue-300/50",
    ringColor: "ring-blue-100",
    badgeBg: "bg-blue-50 text-blue-700 border-blue-100",
  },
  {
    num: "02",
    icon: LayoutGrid,
    title: "Compare",
    desc: "Browse verified profiles, read real patient reviews, check credentials, and compare availability side by side.",
    gradient: "from-violet-500 to-purple-600",
    glow: "shadow-violet-300/50",
    ringColor: "ring-violet-100",
    badgeBg: "bg-violet-50 text-violet-700 border-violet-100",
  },
  {
    num: "03",
    icon: CalendarCheck,
    title: "Book Instantly",
    desc: "Select your slot and confirm in seconds. Get instant SMS & email confirmation, reminders, and directions.",
    gradient: "from-emerald-500 to-teal-600",
    glow: "shadow-emerald-300/50",
    ringColor: "ring-emerald-100",
    badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-100",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-24 px-4 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #ffffff 0%, #F8FAFF 100%)" }}
    >
      {/* Decorative blob */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-20 pointer-events-none -z-0" style={{ background: "radial-gradient(ellipse, rgba(99,102,241,0.2) 0%, transparent 70%)", filter: "blur(60px)" }} />

      <div className="max-w-7xl mx-auto relative">
        {/* Section label */}
        <div className="text-center mb-16">
          <span className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-black px-5 py-2 rounded-full uppercase tracking-widest shadow-md shadow-blue-200/60 mb-5">
            Simple Process
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
            From Search to Appointment
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              in 3 Steps
            </span>
          </h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto leading-relaxed">
            No more long phone queues. Get the care you need, when you need it.
          </p>
        </div>

        {/* Steps grid */}
        <div className="grid md:grid-cols-3 gap-6 relative">
          {/* Connector dashes (desktop) */}
          <div className="hidden md:flex absolute top-10 left-[calc(33.33%-2rem)] right-[calc(33.33%-2rem)] justify-center items-center gap-1.5 pointer-events-none">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="h-0.5 flex-1 bg-gradient-to-r from-blue-200 to-violet-200 rounded-full" />
            ))}
          </div>

          {steps.map(({ num, icon: Icon, title, desc, gradient, glow, ringColor, badgeBg }) => (
            <div
              key={num}
              className={`group relative flex flex-col p-8 bg-white rounded-3xl border border-slate-100 hover:border-transparent hover:shadow-2xl hover:shadow-slate-200/60 transition-all duration-500 cursor-default ring-4 ring-transparent hover:${ringColor} overflow-hidden`}
            >
              {/* BG gradient on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500 pointer-events-none rounded-3xl`} />

              {/* Icon + number row */}
              <div className="flex items-start justify-between mb-7">
                <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-xl ${glow} group-hover:scale-110 group-hover:-rotate-3 transition-all duration-400`}>
                  <Icon className="w-8 h-8 text-white" strokeWidth={1.75} />
                </div>
                <span className={`text-5xl font-black ${badgeBg.includes("blue") ? "text-blue-100" : badgeBg.includes("violet") ? "text-violet-100" : "text-emerald-100"}`}>
                  {num}
                </span>
              </div>

              {/* Text */}
              <h3 className="text-xl font-black text-slate-900 mb-3">{title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>

              {/* Step pill */}
              <div className="mt-6">
                <span className={`inline-block text-xs font-black px-3 py-1 rounded-full border ${badgeBg}`}>
                  Step {num}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
