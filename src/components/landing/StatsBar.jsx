import { Users, UserCheck, Star, Calendar } from "lucide-react";

const stats = [
  { icon: UserCheck, value: "10,000+", label: "Verified Doctors", gradient: "from-blue-500 to-indigo-600", glow: "shadow-blue-200" },
  { icon: Users, value: "1M+", label: "Happy Patients", gradient: "from-emerald-500 to-teal-600", glow: "shadow-emerald-200" },
  { icon: Star, value: "4.9 / 5", label: "Average Rating", gradient: "from-amber-400 to-orange-500", glow: "shadow-amber-200" },
  { icon: Calendar, value: "500K+", label: "Appointments Booked", gradient: "from-violet-500 to-purple-600", glow: "shadow-violet-200" },
];

export default function StatsBar() {
  return (
    <section className="py-14 px-4 bg-white relative overflow-hidden">
      {/* Subtle top rule */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ icon: Icon, value, label, gradient, glow }, idx) => (
          <div
            key={label}
            className="group relative flex flex-col items-center lg:flex-row lg:items-center gap-4 p-6 rounded-2xl border border-slate-100 hover:border-transparent hover:shadow-xl transition-all duration-300 cursor-default overflow-hidden"
            style={{ "--idx": idx }}
          >
            {/* Hover gradient fill */}
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`} />

            {/* Icon */}
            <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center flex-shrink-0 shadow-lg ${glow} group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300`}>
              <Icon className="w-7 h-7 text-white" strokeWidth={1.75} />
            </div>

            {/* Text */}
            <div className="text-center lg:text-left">
              <p className={`text-2xl lg:text-3xl font-black bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
                {value}
              </p>
              <p className="text-sm text-slate-500 font-semibold mt-0.5">{label}</p>
            </div>

            {/* Divider (except last) */}
            {idx < stats.length - 1 && (
              <div className="hidden lg:block absolute right-0 top-1/4 bottom-1/4 w-px bg-slate-100" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
