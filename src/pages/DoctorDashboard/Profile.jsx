import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDoctorById } from "@/store/acrions/doctorActions";
import { User, Phone, MapPin, BriefcaseMedical, GraduationCap, Clock, CheckCircle } from "lucide-react";

// Safe JWT decoder
function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
}

export default function DoctorProfile() {
  const dispatch = useDispatch();
  const { selectedDoctor, detailLoading, doctorToken } = useSelector((state) => state.doctor);
  const [doctorId, setDoctorId] = useState(null);

  useEffect(() => {
    if (doctorToken) {
      const decoded = parseJwt(doctorToken);
      if (decoded && decoded.id) {
        setDoctorId(decoded.id);
        dispatch(getDoctorById(decoded.id));
      }
    }
  }, [doctorToken, dispatch]);

  if (detailLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-[var(--color-text-muted)]">
        <div className="w-10 h-10 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mb-4" />
        <p className="font-medium text-sm tracking-wide uppercase">Loading profile...</p>
      </div>
    );
  }

  if (!selectedDoctor) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center text-[var(--color-text-muted)]">
        <User size={48} className="mb-4 opacity-20" />
        <h3 className="text-xl font-semibold mb-2">Profile Not Found</h3>
        <p className="text-sm font-light">We couldn't load your profile details.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8" style={{ animation: "fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both" }}>

      {/* ── Header Card ──────────────────────────────────────────────── */}
      <div className="bg-white rounded-3xl border shadow-sm overflow-hidden" style={{ borderColor: "var(--color-border-light)" }}>
        {/* Cover Graphic */}
        <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-700 relative">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none" />
        </div>

        <div className="px-8 pb-8 relative">
          <div className="flex flex-col md:flex-row md:items-end gap-6 -mt-12">
            {/* Profile Avatar */}
            <div className="relative">
              <div className="w-32 h-32 rounded-2xl bg-white p-1.5 shadow-lg border" style={{ borderColor: "var(--color-border-light)" }}>
                {selectedDoctor.profile_picture ? (
                  <img src={selectedDoctor.profile_picture} alt={selectedDoctor.name} className="w-full h-full object-cover rounded-xl" />
                ) : (
                  <div className="w-full h-full bg-blue-50 rounded-xl flex items-center justify-center">
                    <User size={40} className="text-blue-300" />
                  </div>
                )}
              </div>
              {selectedDoctor.available && (
                <div className="absolute bottom-2 right-2 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full shadow-sm" title="Available" />
              )}
            </div>

            {/* Name & Title */}
            <div className="flex-1 pb-2">
              <div className="flex items-center gap-3 mb-1">
                <h1 className="heading-editorial text-3xl md:text-4xl text-[var(--color-text)] leading-none">{selectedDoctor.name}</h1>
                <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border border-blue-200">
                  {selectedDoctor.specialization}
                </span>
              </div>
              <p className="text-[var(--color-text-soft)] text-sm font-medium flex items-center gap-1.5">
                <GraduationCap size={16} /> {selectedDoctor.degree}
              </p>
            </div>


          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* ── Left Column: Contact & Info ──────────────────────────────────────────────── */}
        <div className="space-y-8">
          {/* Info Card */}
          <div className="bg-white rounded-3xl p-6 border shadow-sm" style={{ borderColor: "var(--color-border-light)" }}>
            <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-5">Professional Info</h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 text-blue-600">
                  <BriefcaseMedical size={14} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-[var(--color-text-muted)] font-semibold">Experience</p>
                  <p className="text-sm font-medium text-[var(--color-text)]">{selectedDoctor.experience} Years</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0 text-emerald-600">
                  <CheckCircle size={14} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-[var(--color-text-muted)] font-semibold">Consultation Fee</p>
                  <p className="text-sm font-medium text-[var(--color-text)]">${selectedDoctor.fees}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center flex-shrink-0 text-indigo-600">
                  <Phone size={14} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-[var(--color-text-muted)] font-semibold">Contact Phone</p>
                  <p className="text-sm font-medium text-[var(--color-text)]">{selectedDoctor.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0 text-amber-600">
                  <MapPin size={14} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-[var(--color-text-muted)] font-semibold">Clinic Address</p>
                  <p className="text-sm font-medium text-[var(--color-text)] leading-snug">{selectedDoctor.address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right Column: About & Schedule ──────────────────────────────────────────────── */}
        <div className="md:col-span-2 space-y-8">

          {/* About Card */}
          <div className="bg-white rounded-3xl p-8 border shadow-sm relative overflow-hidden" style={{ borderColor: "var(--color-border-light)" }}>
            {/* Decorative Quote Mark */}
            <div className="absolute top-4 right-8 text-8xl text-gray-100 font-serif leading-none pointer-events-none">"</div>

            <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-4 relative z-10">About You</h3>
            <p className="text-[var(--color-text-soft)] leading-relaxed font-light relative z-10 text-[15px]">
              {selectedDoctor.about}
            </p>
          </div>

          {/* Quick Schedule Peek */}
          <div className="bg-white rounded-3xl p-8 border shadow-sm" style={{ borderColor: "var(--color-border-light)" }}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)]">Booked Slots (Next 7 Days)</h3>
              <Clock size={16} className="text-[var(--color-text-muted)]" />
            </div>

            <div className="space-y-4">
              {Object.keys(selectedDoctor.slots_booked || {}).length > 0 ? (
                Object.entries(selectedDoctor.slots_booked).map(([date, slots]) => (
                  <div key={date} className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-2xl bg-[var(--color-bg)] border" style={{ borderColor: "var(--color-border-light)" }}>
                    <div className="w-32 flex-shrink-0">
                      <p className="font-semibold text-sm text-[var(--color-text)]">
                        {new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {slots.map((slot, i) => (
                        <span key={i} className="px-3 py-1 bg-white border rounded-lg text-xs font-medium text-blue-600 shadow-sm" style={{ borderColor: "var(--color-border-light)" }}>
                          {slot}
                        </span>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-[var(--color-text-muted)] bg-[var(--color-bg)] rounded-2xl border border-dashed" style={{ borderColor: "var(--color-border-light)" }}>
                  <p className="text-sm">No slots currently booked for the upcoming week.</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
