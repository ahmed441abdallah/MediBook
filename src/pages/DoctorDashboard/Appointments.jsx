import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDoctorAppointments, changeAppointmentStatus } from "@/store/acrions/doctorActions";
import { CalendarDays, Clock, User, FileText, CheckCircle, XCircle, Video, CreditCard, Phone, Mail } from "lucide-react";

export default function Appointments() {
  const dispatch = useDispatch();
  const { appointments, appointmentsLoading } = useSelector((state) => state.doctor);

  useEffect(() => {
    dispatch(getDoctorAppointments());
  }, [dispatch]);

  const allAppointments = appointments || [];

  return (
    <div className="space-y-6" style={{ animation: "fadeUp 0.5s ease-out both" }}>
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="heading-editorial text-3xl text-[var(--color-text)] tracking-tight">Your Schedule</h2>
          <p className="text-[var(--color-text-muted)] text-sm font-light mt-1">Manage and review your patient appointments.</p>
        </div>
        <div className="flex items-center gap-3">
           <span className="inline-flex items-center gap-2 bg-white border px-4 py-2 rounded-xl text-sm font-medium text-[var(--color-text)] shadow-sm" style={{ borderColor: "var(--color-border-light)" }}>
             <CalendarDays size={16} className="text-blue-600" />
             Total: {allAppointments.length}
           </span>
        </div>
      </div>

      {/* Content Area */}
      {appointmentsLoading ? (
         <div className="flex flex-col items-center justify-center py-32 text-[var(--color-text-muted)]">
           <div className="w-10 h-10 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mb-4" />
           <p className="font-medium text-sm tracking-wide uppercase">Loading schedule...</p>
         </div>
      ) : allAppointments.length > 0 ? (
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
           {allAppointments.map((appt, i) => (
             <div 
               key={appt._id} 
               className="group relative bg-white rounded-2xl border shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
               style={{ 
                 borderColor: "var(--color-border-light)", 
                 animation: "fadeUp 0.5s ease-out both",
                 animationDelay: `${i * 100}ms`
               }}
             >
               {/* Decorative Side Strip based on status */}
               <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl ${
                 appt.status === "completed" ? "bg-emerald-500" 
                 : appt.status === "cancelled" ? "bg-red-500" 
                 : "bg-blue-500"
               }`} />

               <div className="p-6 flex-1 flex flex-col pl-7">
                 
                 {/* Card Header: Patient Info & Status */}
                 <div className="flex items-start justify-between mb-6">
                   <div className="flex items-center gap-4">
                     <div className="w-12 h-12 rounded-full bg-[var(--color-bg)] border flex items-center justify-center flex-shrink-0" style={{ borderColor: "var(--color-border-light)" }}>
                       <User size={20} className="text-[var(--color-text-muted)]" />
                     </div>
                     <div>
                       <h3 className="font-semibold text-lg text-[var(--color-text)] leading-tight mb-1">
                          {appt.userId?.name || appt.userId?._id?.substring(0,8) || "Unknown Patient"}
                       </h3>
                       <div className="flex items-center gap-3 text-[11px] font-medium text-[var(--color-text-muted)] uppercase tracking-wider">
                         <span className="flex items-center gap-1.5"><Phone size={10}/> {appt.userId?.phone || "No phone"}</span>
                         <span className="w-1 h-1 rounded-full bg-gray-300" />
                         <span className="flex items-center gap-1.5">Age: {appt.userId?.age || "N/A"}</span>
                       </div>
                     </div>
                   </div>
                   
                   {/* Status Badge */}
                   <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border shadow-sm
                     ${appt.status === "completed" ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
                     : appt.status === "cancelled" ? "bg-red-50 text-red-700 border-red-200" 
                     : "bg-blue-50 text-blue-700 border-blue-200"}`}
                   >
                     {appt.status === "completed" && <CheckCircle size={12} />}
                     {appt.status === "cancelled" && <XCircle size={12} />}
                     {appt.status !== "completed" && appt.status !== "cancelled" && <Clock size={12} />}
                     {appt.status}
                   </span>
                 </div>

                 {/* Appointment Details Grid */}
                 <div className="grid grid-cols-2 gap-4 mb-6 p-4 rounded-xl bg-[var(--color-bg)] border" style={{ borderColor: "var(--color-border-light)" }}>
                   <div>
                     <p className="text-[10px] uppercase tracking-widest text-[var(--color-text-muted)] mb-1">Date & Time</p>
                     <p className="text-sm font-semibold text-[var(--color-text)] flex items-center gap-1.5">
                       <CalendarDays size={14} className="text-blue-600" />
                       {new Date(appt.appointmentDate || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                       <span className="text-gray-400 mx-1">•</span>
                       {appt.slotTime}
                     </p>
                   </div>
                   <div>
                     <p className="text-[10px] uppercase tracking-widest text-[var(--color-text-muted)] mb-1">Payment</p>
                     <p className="text-sm font-semibold text-[var(--color-text)] flex items-center gap-1.5">
                       <CreditCard size={14} className={appt.payment ? "text-emerald-600" : "text-amber-600"} />
                       ${appt.amount || 0}
                       <span className={`text-[10px] px-1.5 py-0.5 rounded uppercase tracking-wider ${appt.payment ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}`}>
                         {appt.payment ? "Paid" : "Unpaid"}
                       </span>
                     </p>
                   </div>
                 </div>

                 {/* Reason for Visit */}
                 <div className="flex-1">
                   <p className="text-[10px] uppercase tracking-widest text-[var(--color-text-muted)] mb-1.5">Reason for Visit</p>
                   <div className="flex items-start gap-2.5">
                     <FileText size={16} className="text-gray-400 mt-0.5 flex-shrink-0" />
                     <p className="text-sm text-[var(--color-text-soft)] font-light leading-relaxed line-clamp-2">
                       {appt.reasonOfVisit || "General consultation"}
                     </p>
                   </div>
                 </div>

               </div>

               {/* Card Footer: Actions */}
               <div className="border-t px-6 py-4 flex items-center justify-between bg-gray-50/50 rounded-b-2xl pl-7" style={{ borderColor: "var(--color-border-light)" }}>
                 <div className="flex items-center gap-2">
                   <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider
                     ${appt.appointmentType === 'online' ? 'bg-indigo-100 text-indigo-800' : 'bg-gray-200 text-gray-800'}`}>
                     {appt.appointmentType || "offline"}
                   </span>
                   {appt.appointmentType === 'online' && appt.meetingUrl && (
                     <a 
                       href={appt.meetingUrl} 
                       target="_blank" 
                       rel="noreferrer" 
                       className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-600 text-white rounded-md text-xs font-semibold hover:bg-blue-700 transition-colors shadow-sm"
                     >
                       <Video size={14} /> Join Meeting
                     </a>
                   )}
                 </div>
                 
                 <div className="flex items-center gap-3">
                   <button className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors uppercase tracking-wider">
                     Details
                   </button>
                   <select 
                     value={appt.status} 
                     onChange={(e) => dispatch(changeAppointmentStatus(appt._id, e.target.value))}
                     className="text-[10px] font-bold uppercase tracking-wider border rounded-md px-2 py-1.5 bg-white focus:outline-none focus:border-blue-500 cursor-pointer transition-colors shadow-sm"
                     style={{ borderColor: "var(--color-border-light)", color: "var(--color-text-soft)" }}
                   >
                     <option value="booked">Booked</option>
                     <option value="completed">Completed</option>
                     <option value="cancelled">Cancelled</option>
                   </select>
                 </div>
               </div>

             </div>
           ))}
         </div>
      ) : (
        <div className="bg-white rounded-3xl border shadow-sm flex flex-col items-center justify-center py-32 text-center text-[var(--color-text-muted)]" style={{ borderColor: "var(--color-border-light)" }}>
          <div className="w-24 h-24 rounded-full bg-[var(--color-bg)] flex items-center justify-center mb-6 shadow-inner">
             <CalendarDays size={40} className="text-blue-300" />
          </div>
          <h3 className="heading-editorial text-2xl text-[var(--color-text)] mb-3">No Appointments Found</h3>
          <p className="text-sm font-light max-w-sm leading-relaxed text-[var(--color-text-soft)]">
            You do not have any appointments scheduled. When patients book with you, they will appear here in your schedule.
          </p>
        </div>
      )}
    </div>
  );
}
