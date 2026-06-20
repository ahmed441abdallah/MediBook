import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStatistics } from "@/store/acrions/adminActions";
import {
  Users,
  CalendarDays,
  Stethoscope,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
  ArrowRight,
} from "lucide-react";

// ── Stat card ──────────────────────────────────────────────────────────────
function StatCard({ icon: Icon, label, value, change, changeType = "up", color }) {
  return (
    <div
      className="bg-[var(--color-bg-pure)] rounded-2xl p-5 border flex flex-col gap-4 hover:shadow-md transition-shadow duration-200"
      style={{ borderColor: "var(--color-border-light)" }}
    >
      <div className="flex items-center justify-between">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center"
          style={{ background: color + "18" }}
        >
          <Icon size={20} style={{ color }} />
        </div>
        <span
          className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-lg ${changeType === "up"
            ? "text-emerald-700 bg-emerald-50"
            : "text-red-600 bg-red-50"
            }`}
        >
          <ArrowUpRight size={12} style={{ transform: changeType === "down" ? "rotate(90deg)" : "none" }} />
          {change}
        </span>
      </div>
      <div>
        <p className="text-2xl font-semibold text-[var(--color-text)] leading-none mb-1">{value}</p>
        <p className="text-sm text-[var(--color-text-muted)] font-light">{label}</p>
      </div>
    </div>
  );
}

// ── Appointment row ────────────────────────────────────────────────────────
function AppointmentRow({ patient, doctor, time, status, avatar }) {
  const statusStyles = {
    completed: "text-emerald-700 bg-emerald-50 border border-emerald-200",
    booked: "text-amber-700 bg-amber-50 border border-amber-200",
    cancelled: "text-red-600 bg-red-50 border border-red-200",
  };
  const StatusIcon = {
    completed: CheckCircle2,
    booked: Clock,
    cancelled: AlertCircle,
  }[status] || Clock;

  return (
    <tr className="border-b last:border-0 hover:bg-[var(--color-bg)] transition-colors" style={{ borderColor: "var(--color-border-light)" }}>
      <td className="py-3.5 px-4">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #1b4332, #40916c)" }}
          >
            {avatar}
          </div>
          <span className="text-sm font-medium text-[var(--color-text)]">{patient}</span>
        </div>
      </td>
      <td className="py-3.5 px-4 text-sm text-[var(--color-text-soft)] font-light">{doctor}</td>
      <td className="py-3.5 px-4 text-sm text-[var(--color-text-muted)] font-light">{time}</td>
      <td className="py-3.5 px-4">
        <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-lg ${statusStyles[status]}`}>
          <StatusIcon size={11} />
          {status}
        </span>
      </td>
      <td className="py-3.5 px-4">
        <button className="text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] text-xs font-medium transition-colors cursor-pointer">
          View
        </button>
      </td>
    </tr>
  );
}

// ── Doctor card ────────────────────────────────────────────────────────────
function DoctorCard({ name, specialty, patients, rating }) {
  return (
    <div
      className="flex items-center gap-3 p-3 rounded-xl border hover:bg-[var(--color-bg)] transition-colors cursor-pointer"
      style={{ borderColor: "var(--color-border-light)" }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-semibold flex-shrink-0"
        style={{ background: "linear-gradient(135deg, #0a2e1f, #2d6a4f)" }}
      >
        {name[0]}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-[var(--color-text)] truncate">{name}</p>
        <p className="text-xs text-[var(--color-text-muted)] font-light">{specialty}</p>
      </div>
      <div className="text-right flex-shrink-0">
        <p className="text-xs font-medium text-[var(--color-text)]">{patients}p</p>
        <p className="text-xs text-amber-500 font-light">★ {rating}</p>
      </div>
    </div>
  );
}

// ── Sample data ────────────────────────────────────────────────────────────
// (Kept DOCTORS static for now as it's not provided by API)
const DOCTORS = [
  { name: "Dr. Ahmed Ali", specialty: "Cardiologist", patients: 142, rating: 4.9 },
  { name: "Dr. Lena Hart", specialty: "Neurologist", patients: 98, rating: 4.8 },
  { name: "Dr. Sara Noor", specialty: "Pediatrician", patients: 201, rating: 4.7 },
  { name: "Dr. Omar Farouk", specialty: "Orthopedist", patients: 76, rating: 4.6 },
];

// ── Dashboard page ─────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const dispatch = useDispatch();
  const { statistics, loading } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getStatistics());
  }, []);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const STATS = statistics ? [
    { icon: Users, label: "Total Patients", value: statistics.users, change: "—", color: "#1b4332" },
    { icon: CalendarDays, label: "Total Appointments", value: statistics.appointments, change: "—", color: "#0369a1" },
    { icon: Stethoscope, label: "Active Doctors", value: statistics.doctors, change: "—", color: "#7c3aed" },
  ] : [];

  const APPOINTMENTS = statistics?.lastAppointments?.map(a => ({
    patient: a.userId?.name || "Unknown",
    doctor: a.doctorId?.name || "Unknown",
    time: a.slotTime || "—",
    status: a.status,
    avatar: a.userId?.name?.charAt(0) || "?",
  })) || [];

  if (loading && !statistics) {
    return <div className="p-8 text-sm text-[var(--color-text-muted)] animate-pulse">Loading dashboard...</div>;
  }

  return (
    <div className="space-y-6" style={{ animation: "fadeUp 0.5s ease-out both" }}>

      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1
            className="text-2xl text-[var(--color-text)] leading-tight"
            style={{ fontFamily: "var(--font-serif)", letterSpacing: "-0.03em", fontWeight: 400 }}
          >
            Good morning, Admin 👋
          </h1>
          <p className="text-sm text-[var(--color-text-muted)] font-light mt-0.5">{today}</p>
        </div>
        <button
          className="flex items-center gap-2 text-sm font-medium text-white px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-sm hover:shadow-md"
          style={{ background: "linear-gradient(135deg, var(--color-accent), var(--color-accent-hover))" }}
        >
          <CalendarDays size={15} />
          New Appointment
        </button>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {STATS.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      {/* Main content row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">

        {/* Appointments table — spans 2 cols */}
        <div
          className="xl:col-span-2 bg-[var(--color-bg-pure)] rounded-2xl border overflow-hidden"
          style={{ borderColor: "var(--color-border-light)" }}
        >
          <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: "var(--color-border-light)" }}>
            <div>
              <h2 className="text-sm font-semibold text-[var(--color-text)]">Recent Appointments</h2>
              <p className="text-xs text-[var(--color-text-muted)] font-light mt-0.5">{APPOINTMENTS.length} scheduled</p>
            </div>
            <button className="flex items-center gap-1.5 text-xs font-medium text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors cursor-pointer">
              View all <ArrowRight size={13} />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: `1px solid var(--color-border-light)` }}>
                  {["Patient", "Doctor", "Time", "Status", ""].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {APPOINTMENTS.map((a, i) => (
                  <AppointmentRow key={i} {...a} />
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Doctors — 1 col */}
        <div
          className="bg-[var(--color-bg-pure)] rounded-2xl border overflow-hidden"
          style={{ borderColor: "var(--color-border-light)" }}
        >
          <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: "var(--color-border-light)" }}>
            <div>
              <h2 className="text-sm font-semibold text-[var(--color-text)]">Top Doctors</h2>
              <p className="text-xs text-[var(--color-text-muted)] font-light mt-0.5">By patient count</p>
            </div>
            <button className="flex items-center gap-1.5 text-xs font-medium text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors cursor-pointer">
              See all <ArrowRight size={13} />
            </button>
          </div>
          <div className="p-4 space-y-2">
            {DOCTORS.map((d) => (
              <DoctorCard key={d.name} {...d} />
            ))}
          </div>
        </div>

      </div>

      {/* Activity bar chart placeholder */}
      <div
        className="bg-[var(--color-bg-pure)] rounded-2xl border p-5"
        style={{ borderColor: "var(--color-border-light)" }}
      >
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-sm font-semibold text-[var(--color-text)]">Appointment Activity</h2>
            <p className="text-xs text-[var(--color-text-muted)] font-light mt-0.5">Last 7 days</p>
          </div>
        </div>
        {/* Mini bar chart */}
        <div className="flex items-end gap-2 h-24">
          {[40, 65, 50, 80, 55, 94, 70].map((h, i) => {
            const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
            const isToday = i === 5;
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                <div
                  className="w-full rounded-lg transition-all duration-300 hover:opacity-80 cursor-pointer"
                  style={{
                    height: `${h}%`,
                    background: isToday
                      ? "linear-gradient(180deg, #40916c, #1b4332)"
                      : "var(--color-accent-light)",
                  }}
                />
                <span className={`text-[10px] font-${isToday ? "semibold" : "light"} ${isToday ? "text-[var(--color-accent)]" : "text-[var(--color-text-muted)]"}`}>
                  {days[i]}
                </span>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
