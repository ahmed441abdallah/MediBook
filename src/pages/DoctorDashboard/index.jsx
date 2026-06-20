import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Users, CalendarDays, Clock, TrendingUp, CheckCircle, XCircle, ArrowRight } from "lucide-react";
import { getDoctorAppointments } from "@/store/acrions/doctorActions";
import { Link } from "react-router-dom";

function StatCard({ title, value, icon: Icon, trend }) {
  return (
    <div className="bg-white rounded-2xl p-6 border shadow-sm hover:shadow-md transition-all duration-300 group" style={{ borderColor: "var(--color-border-light)" }}>
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-full bg-[var(--color-bg)] border flex items-center justify-center group-hover:scale-110 transition-transform duration-300" style={{ borderColor: "var(--color-border-light)" }}>
          <Icon size={20} className="text-[var(--color-text-muted)]" />
        </div>
        <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full flex items-center gap-1">
          <TrendingUp size={10} /> {trend}
        </span>
      </div>
      <div>
        <h3 className="text-[11px] uppercase tracking-widest text-[var(--color-text-muted)] mb-1 font-semibold">{title}</h3>
        <p className="heading-editorial text-4xl text-[var(--color-text)]">{value}</p>
      </div>
    </div>
  );
}

export default function DoctorDashboard() {
  const dispatch = useDispatch();
  const { appointments, appointmentsLoading } = useSelector((state) => state.doctor);

  useEffect(() => {
    dispatch(getDoctorAppointments());
  }, [dispatch]);

  const todayAppointments = appointments || []; // In a real app, filter for today's date

  return (
    <div className="space-y-8" style={{ animation: "fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both" }}>
      
      {/* ── Welcome Editorial Banner ──────────────────────────────────────────────── */}
      <div 
        className="relative overflow-hidden rounded-3xl p-10 md:p-14 border shadow-sm"
        style={{ 
          background: "linear-gradient(120deg, #ffffff 0%, var(--color-bg) 100%)",
          borderColor: "var(--color-border-light)"
        }}
      >
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-20 pointer-events-none" style={{ background: "radial-gradient(circle at right, var(--color-accent) 0%, transparent 70%)" }} />
        
        <div className="relative z-10 max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-accent)] mb-4">
            Physician Overview
          </p>
          <h1 className="heading-editorial text-4xl md:text-5xl leading-tight text-[var(--color-text)] mb-6">
            Good morning, <br />
            <span className="italic text-[var(--color-text-muted)]">Dr. Smith.</span>
          </h1>
          <p className="text-[var(--color-text-soft)] font-light leading-relaxed text-lg mb-8 max-w-lg">
            Your schedule is looking steady. You have <strong className="font-semibold text-[var(--color-text)]">{todayAppointments.length} appointments</strong> booked today. Take a moment to review patient records before your first consultation.
          </p>
        </div>
      </div>

      {/* ── Stats Grid ──────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Patients" value="348" icon={Users} trend="+12%" />
        <StatCard title="Today's Bookings" value={todayAppointments.length} icon={CalendarDays} trend="+2" />
        <StatCard title="Hours Logged" value="1,204" icon={Clock} trend="+5%" />
      </div>

      {/* ── Upcoming Appointments Panel ──────────────────────────────────────────────── */}
      <div className="bg-white rounded-3xl border shadow-sm overflow-hidden" style={{ borderColor: "var(--color-border-light)" }}>
        <div className="px-8 py-6 flex items-center justify-between bg-[var(--color-bg)] border-b" style={{ borderColor: "var(--color-border-light)" }}>
          <h3 className="heading-editorial text-2xl text-[var(--color-text)]">Upcoming Today</h3>
          <Link 
            to="/doctor-dashboard/appointments"
            className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--color-accent)] hover:text-[var(--color-text)] transition-colors"
          >
            View Full Schedule
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        <div className="p-0">
          {appointmentsLoading ? (
             <div className="flex flex-col items-center justify-center py-20 text-[var(--color-text-muted)]">
               <div className="w-8 h-8 border-2 border-[var(--color-border)] border-t-[var(--color-accent)] rounded-full animate-spin mb-4" />
               <p className="font-medium text-xs uppercase tracking-widest">Loading...</p>
             </div>
          ) : todayAppointments.length > 0 ? (
             <div className="divide-y" style={{ borderColor: "var(--color-border-light)" }}>
               {todayAppointments.slice(0, 5).map((appt) => (
                 <div key={appt._id} className="flex flex-col md:flex-row md:items-center justify-between p-6 hover:bg-gray-50/50 transition-colors">
                   <div className="flex items-center gap-4 mb-4 md:mb-0">
                     <div className="w-12 h-12 rounded-full bg-[var(--color-bg)] border flex items-center justify-center flex-shrink-0" style={{ borderColor: "var(--color-border-light)" }}>
                        <span className="font-bold text-lg text-[var(--color-text-muted)] heading-editorial">
                          {appt.userId?.name ? appt.userId.name.charAt(0) : "U"}
                        </span>
                     </div>
                     <div>
                        <p className="font-semibold text-[var(--color-text)] text-lg leading-tight mb-1">
                          {appt.userId?.name || "Unknown Patient"}
                        </p>
                        <p className="text-sm text-[var(--color-text-soft)] font-light truncate max-w-md">
                          {appt.reasonOfVisit || "General Checkup"}
                        </p>
                     </div>
                   </div>
                   
                   <div className="flex items-center gap-6 ml-16 md:ml-0">
                     <div className="text-left md:text-right">
                        <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-1">Time</p>
                        <p className="font-medium text-[var(--color-text)] flex items-center justify-end gap-1.5">
                          <Clock size={14} className="text-[var(--color-accent)]" /> {appt.slotTime}
                        </p>
                     </div>
                     
                     <div className="text-left md:text-right w-24">
                        <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-1">Status</p>
                        <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider
                          ${appt.status === "completed" ? "text-emerald-600" 
                          : appt.status === "cancelled" ? "text-red-600" 
                          : "text-blue-600"}`}
                        >
                          {appt.status === "completed" && <CheckCircle size={12} />}
                          {appt.status === "cancelled" && <XCircle size={12} />}
                          {appt.status !== "completed" && appt.status !== "cancelled" && <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />}
                          {appt.status}
                        </span>
                     </div>
                   </div>
                 </div>
               ))}
             </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 rounded-full bg-[var(--color-bg)] flex items-center justify-center mb-4 border" style={{ borderColor: "var(--color-border-light)" }}>
                <CalendarDays size={24} className="text-[var(--color-text-muted)]" />
              </div>
              <h4 className="heading-editorial text-xl text-[var(--color-text)] mb-2">No Appointments</h4>
              <p className="text-sm font-light text-[var(--color-text-soft)] max-w-sm leading-relaxed">
                You do not have any appointments scheduled for today. Take a break!
              </p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
