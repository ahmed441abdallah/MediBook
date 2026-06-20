import { ArrowRight, Stethoscope, Heart, Sparkles, Baby, Brain, Activity } from "lucide-react";

const specialties = [
  { name: "General physician", count: "420+ Doctors", gradient: "from-blue-50 to-indigo-50", iconGrad: "from-blue-400 to-indigo-600", shadow: "shadow-blue-200/70", Icon: Stethoscope },
  { name: "Gynecologist", count: "310+ Doctors", gradient: "from-pink-50 to-rose-50", iconGrad: "from-pink-400 to-rose-600", shadow: "shadow-pink-200/70", Icon: Heart },
  { name: "Dermatologist", count: "280+ Doctors", gradient: "from-purple-50 to-violet-50", iconGrad: "from-purple-400 to-purple-600", shadow: "shadow-purple-200/70", Icon: Sparkles },
  { name: "Pediatricians", count: "410+ Doctors", gradient: "from-amber-50 to-yellow-50", iconGrad: "from-amber-400 to-amber-600", shadow: "shadow-amber-200/70", Icon: Baby },
  { name: "Neurologist", count: "195+ Doctors", gradient: "from-indigo-50 to-blue-50", iconGrad: "from-indigo-400 to-indigo-600", shadow: "shadow-indigo-200/70", Icon: Brain },
  { name: "Gastroenterologist", count: "245+ Doctors", gradient: "from-teal-50 to-emerald-50", iconGrad: "from-teal-400 to-teal-600", shadow: "shadow-teal-200/70", Icon: Activity },
];

export default function TopSpecialties() {
  return (
    <section id="specialties" className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <span className="inline-block bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs font-black px-5 py-2 rounded-full uppercase tracking-widest shadow-md shadow-emerald-200/60 mb-4">
              Find by Speciality
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Find by{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Speciality
              </span>
            </h2>
            <p className="text-slate-500 mt-3 text-base max-w-sm">
              Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.
            </p>
          </div>
          <button className="group flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors duration-200 cursor-pointer whitespace-nowrap">
            View All Specialties
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {specialties.map(({ name, count, gradient, iconGrad, shadow, Icon }) => (
            <button
              key={name}
              className={`group relative flex flex-col items-center text-center p-7 bg-gradient-to-br ${gradient} rounded-3xl border border-white hover:border-transparent hover:shadow-xl transition-all duration-400 hover:-translate-y-1.5 cursor-pointer overflow-hidden`}
            >
              {/* Shimmer on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.5) 0%, transparent 50%)" }} />

              {/* Icon */}
              <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${iconGrad} flex items-center justify-center mb-4 shadow-lg ${shadow} group-hover:scale-110 group-hover:rotate-3 transition-all duration-400`}>
                <Icon className="w-8 h-8 text-white" />
              </div>

              <p className="font-black text-slate-900 text-sm mb-1">{name}</p>
              <p className="text-xs font-semibold text-slate-500">{count}</p>

              {/* Arrow appears on hover */}
              <div className="mt-3 flex items-center gap-1 text-[11px] font-bold text-blue-600 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                Browse <ArrowRight className="w-3 h-3" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}


