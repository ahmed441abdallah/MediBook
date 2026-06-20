import React, { useState, useRef, useEffect } from "react";
import {
  Search,
  MapPin,
  Clock,
  DollarSign,
  Stethoscope,
  CheckCircle2,
  XCircle,
  X,
  ChevronRight,
} from "lucide-react";
import { getAllDoctors } from "@/store/acrions/doctorActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PaginationUi from "@/components/common/Pagination";
import { usePagination } from "@/hooks/usePagination";

// ─── Specialty config ─────────────────────────────────────────────────────────
const SPECIALTIES = [
  { label: "All", icon: "🩺" },
  { label: "Cardiology", icon: "❤️" },
  { label: "Neurology", icon: "🧠" },
  { label: "Dermatology", icon: "🔬" },
  { label: "Orthopedics", icon: "🦴" },
  { label: "Gynecology", icon: "👩‍⚕️" },
  { label: "Pediatrics", icon: "👶" },
  { label: "Psychiatry", icon: "🛋️" },
  { label: "Ophthalmology", icon: "👁️" },
  { label: "Endocrinology", icon: "⚖️" },
  { label: "Gastroenterology", icon: "🫀" },
  { label: "Oncology", icon: "🎗️" },
  { label: "Pulmonology", icon: "🫁" },
  { label: "Rheumatology", icon: "🧬" },
  { label: "Urology", icon: "💧" },
  { label: "Nephrology", icon: "🩸" },
  { label: "Hematology", icon: "💉" },
  { label: "Infectious Disease", icon: "🦠" },
  { label: "General Surgery", icon: "🏥" },
  { label: "Plastic Surgery", icon: "✨" },
  { label: "Cardiothoracic Surgery", icon: "🫀" },
  { label: "Allergy & Immunology", icon: "🤧" },
  { label: "Emergency Medicine", icon: "🚑" },
  { label: "Internal Medicine", icon: "🩺" },
  { label: "Sports Medicine", icon: "🏃" },
];



// ─── Single doctor card ───────────────────────────────────────────────────────
function DoctorCard({ doctor, index }) {
  const { name, specialty, experience, fees, available, profile_picture, degree, address } = doctor;
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/doctors/${doctor._id}`)}
      className="group bg-[var(--color-bg-pure)] rounded-2xl border overflow-hidden flex flex-col cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5"
      style={{
        borderColor: "var(--color-border-light)",
        boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
        animation: "fadeUp 0.5s ease-out both",
        animationDelay: `${index * 60}ms`,
      }}
    >
      {/* Photo */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-bg)] flex-shrink-0">
        <img
          src={profile_picture}
          alt={name}
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />

        {/* Bottom gradient */}
        <div
          className="absolute inset-x-0 bottom-0 h-20 pointer-events-none"
          style={{
            background: "linear-gradient(to top, rgba(255,255,255,0.9) 0%, transparent 100%)",
          }}
        />

        {/* Availability pill */}
        <div
          className="absolute top-3 left-3 flex items-center gap-1.5 text-[11px] font-semibold rounded-full px-2.5 py-1 backdrop-blur-md shadow-sm"
          style={{
            background: available ? "rgba(209,250,229,0.95)" : "rgba(254,226,226,0.95)",
            color: available ? "#065f46" : "#991b1b",
            border: available ? "1px solid #a7f3d0" : "1px solid #fecaca",
          }}
        >
          {available ? <CheckCircle2 size={10} /> : <XCircle size={10} />}
          {available ? "Available" : "Unavailable"}
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pt-3 pb-4 flex flex-col gap-2.5 flex-1">
        <div>
          <h3 className="text-[15px] font-semibold text-[var(--color-text)] truncate leading-snug" title={name}>
            {name}
          </h3>
          {degree && (
            <p className="text-[11px] text-[var(--color-text-muted)] font-light mt-0.5 truncate">{degree}</p>
          )}
        </div>

        {/* Specialty chip */}
        <span
          className="self-start inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wide"
          style={{
            background: "var(--color-accent-light)",
            color: "var(--color-accent)",
            letterSpacing: "0.04em",
          }}
        >
          <Stethoscope size={10} />
          {specialty}
        </span>

        {/* Stats strip */}
        <div
          className="flex items-stretch divide-x rounded-xl overflow-hidden"
          style={{ border: "1px solid var(--color-border-light)" }}
        >
          <div className="flex-1 flex flex-col items-center py-2 gap-0.5">
            <Clock size={12} className="text-[var(--color-accent)]" />
            <span className="text-[11px] font-semibold text-[var(--color-text)]">
              {experience}<span className="font-light text-[10px] text-[var(--color-text-muted)]"> yr</span>
            </span>
            <span className="text-[10px] text-[var(--color-text-muted)] font-light">Exp.</span>
          </div>
          <div className="flex-1 flex flex-col items-center py-2 gap-0.5">
            <DollarSign size={12} className="text-[var(--color-accent)]" />
            <span className="text-[11px] font-semibold text-[var(--color-text)]">${fees}</span>
            <span className="text-[10px] text-[var(--color-text-muted)] font-light">Fee</span>
          </div>
          {address && (
            <div className="flex-1 flex flex-col items-center py-2 gap-0.5 px-1 min-w-0">
              <MapPin size={12} className="text-[var(--color-accent)]" />
              <span className="text-[11px] font-semibold text-[var(--color-text)] truncate w-full text-center px-1">{address.split(",")[0]}</span>
              <span className="text-[10px] text-[var(--color-text-muted)] font-light">City</span>
            </div>
          )}
        </div>

        {/* Book button */}
        <button
          className="mt-auto w-full py-2.5 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer group/btn"
          style={{
            background: available
              ? "linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-hover) 100%)"
              : "var(--color-border-light)",
            color: available ? "#fff" : "var(--color-text-muted)",
            boxShadow: available ? "0 4px 14px rgba(27,67,50,0.25)" : "none",
            cursor: available ? "pointer" : "not-allowed",
          }}
          disabled={!available}
          onMouseEnter={(e) => {
            if (available) {
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(27,67,50,0.38)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = available ? "0 4px 14px rgba(27,67,50,0.25)" : "none";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          {available ? "Book Appointment" : "Not Available"}
          {available && <ChevronRight size={14} className="transition-transform duration-200 group-hover/btn:translate-x-0.5" />}
        </button>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function DoctorsPage() {
  const { doctorList, isLoading, error, total } = useSelector(state => state.doctor)
  const { page, setPage, handleNextPage, handlePrevPage, LIMIT, totalPages } = usePagination(total)
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");
  const dispatch = useDispatch();

  const handleSearch = (val) => {
    setSearchTerm(val);
    setPage(1);
  };

  const handleSpecialtyChange = (spec) => {
    setSelectedSpecialty(spec);
    setPage(1);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(getAllDoctors(page, LIMIT, searchTerm, selectedSpecialty));
    }, 400); // debounce to avoid too many requests
    return () => clearTimeout(timer);
  }, [page, searchTerm, selectedSpecialty, dispatch]);

  return (
    <div className="min-h-screen bg-[var(--color-bg)]" style={{ animation: "fadeUp 0.5s ease-out both" }}>

      {/* ── Hero banner ───────────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden pt-28 pb-16 px-6"
        style={{
          background: "linear-gradient(135deg, #0a2e1f 0%, #1b4332 50%, #2d6a4f 100%)",
        }}
      >
        {/* decorative circles */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-10 bg-white pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full opacity-10 bg-white pointer-events-none" />

        <div className="max-w-7xl mx-auto relative">
          <p className="text-emerald-300 text-sm font-medium uppercase tracking-widest mb-3">
            MediBook Specialists
          </p>
          <h1
            className="text-4xl md:text-5xl text-white mb-4 leading-tight"
            style={{ fontFamily: "var(--font-serif)", fontWeight: 400, letterSpacing: "-0.03em" }}
          >
            Find Your Doctor
          </h1>
          <p className="text-emerald-100 font-light text-lg mb-8 max-w-xl">
            Browse our network of trusted specialists and book your appointment in seconds.
          </p>

          {/* Search bar */}
          <div
            className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3 max-w-xl shadow-xl transition-all duration-200 focus-within:shadow-2xl"
          >
            <Search size={18} className="text-[var(--color-text-muted)] flex-shrink-0" />
            <input
              type="text"
              placeholder="Search by name or specialty…"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="flex-1 bg-transparent text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] placeholder:font-light focus:outline-none"
            />
            {searchTerm && (
              <button
                onClick={() => handleSearch("")}
                className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors cursor-pointer"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Main content ──────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* ── Filters row ── */}
        <div className="flex items-start gap-4 flex-wrap mb-8">
          {/* Specialty chips */}
          <div className="flex items-center gap-2 flex-wrap flex-1">
            {SPECIALTIES.map((s) => (
              <button
                key={s.label}
                onClick={() => handleSpecialtyChange(s.label)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer border"
                style={
                  selectedSpecialty === s.label
                    ? {
                      background: "linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-hover) 100%)",
                      color: "#fff",
                      borderColor: "transparent",
                      boxShadow: "0 2px 8px rgba(27,67,50,0.3)",
                    }
                    : {
                      background: "var(--color-bg-pure)",
                      color: "var(--color-text-soft)",
                      borderColor: "var(--color-border-light)",
                    }
                }
              >
                <span>{s.icon}</span>
                {s.label}
              </button>
            ))}
          </div>

          {/* Available toggle */}

        </div>

        {/* ── Results count ── */}
        <div className="flex items-center justify-between mb-5">
          <p className="text-sm text-[var(--color-text-muted)] font-light">
            Found {total} doctors
          </p>


        </div>

        {/* ── Grid ── */}
        {doctorList.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctorList.map((doc, i) => (
              <DoctorCard key={doc.id} doctor={doc} index={i} />
            ))}
          </div>
        ) : (
          /* ── Empty state ── */
          <div
            className="flex flex-col items-center justify-center py-32 gap-5 rounded-2xl border"
            style={{ borderColor: "var(--color-border-light)", background: "var(--color-bg-pure)", borderStyle: "dashed" }}
          >
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center"
              style={{ background: "var(--color-accent-light)" }}
            >
              <Stethoscope size={32} className="text-[var(--color-accent)]" />
            </div>
            <div className="text-center">
              <p className="text-base font-semibold text-[var(--color-text)]">No doctors found</p>
              <p className="text-sm text-[var(--color-text-muted)] font-light mt-1.5 max-w-xs">
                Try a different search term or adjust your filters.
              </p>
            </div>

          </div>
        )}
        <PaginationUi
          page={page}
          totalPages={totalPages}
          setPage={setPage}
          onPrev={handlePrevPage}
          onNext={handleNextPage}
        />
      </div>

    </div>
  );
}
