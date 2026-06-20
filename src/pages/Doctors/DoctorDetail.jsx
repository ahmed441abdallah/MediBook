import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDoctorById } from "@/store/acrions/doctorActions";
import {
    ArrowLeft,
    Stethoscope,
    Clock,
    DollarSign,
    Phone,
    MapPin,
    CheckCircle2,
    XCircle,
    GraduationCap,
    User,
    FileText,
    CalendarDays,
} from "lucide-react";
import { toast } from "sonner";
import { bookAppointemnt } from "@/store/acrions/userActions";
import { getReviews, addReview } from "@/store/acrions/reviewActions";
import { Star } from "lucide-react";

// ─── Skeleton loader ──────────────────────────────────────────────────────────
function DetailSkeleton() {
    return (
        <div className="min-h-screen bg-[var(--color-bg)] pt-24 pb-16 px-6" style={{ animation: "fadeUp 0.4s ease-out both" }}>
            <div className="max-w-5xl mx-auto space-y-6">
                <div className="h-8 w-32 rounded-xl bg-[var(--color-border)] animate-pulse" />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="aspect-[3/4] rounded-2xl bg-[var(--color-border)] animate-pulse" />
                    <div className="lg:col-span-2 space-y-4">
                        <div className="h-8 w-2/3 rounded-xl bg-[var(--color-border)] animate-pulse" />
                        <div className="h-4 w-1/3 rounded-lg bg-[var(--color-border)] animate-pulse" />
                        <div className="h-4 w-1/2 rounded-lg bg-[var(--color-border)] animate-pulse" />
                        <div className="grid grid-cols-3 gap-3 pt-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="h-20 rounded-2xl bg-[var(--color-border)] animate-pulse" />
                            ))}
                        </div>
                        <div className="h-32 rounded-2xl bg-[var(--color-border)] animate-pulse mt-4" />
                        <div className="h-12 rounded-2xl bg-[var(--color-border)] animate-pulse mt-2" />
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── Stat box ─────────────────────────────────────────────────────────────────
function StatBox({ icon: Icon, label, value }) {
    return (
        <div
            className="flex flex-col items-center gap-2 p-4 rounded-2xl border text-center"
            style={{ borderColor: "var(--color-border-light)", background: "var(--color-bg-pure)" }}
        >
            <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: "var(--color-accent-light)" }}
            >
                <Icon size={18} className="text-[var(--color-accent)]" />
            </div>
            <p className="text-lg font-semibold text-[var(--color-text)] leading-none">{value}</p>
            <p className="text-[11px] text-[var(--color-text-muted)] font-light">{label}</p>
        </div>
    );
}

// ─── Info row ─────────────────────────────────────────────────────────────────
function InfoRow({ icon: Icon, label, value }) {
    if (!value) return null;
    return (
        <div className="flex items-start gap-3">
            <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: "var(--color-accent-light)" }}
            >
                <Icon size={14} className="text-[var(--color-accent)]" />
            </div>
            <div>
                <p className="text-[11px] text-[var(--color-text-muted)] font-light uppercase tracking-wide">{label}</p>
                <p className="text-sm font-medium text-[var(--color-text)] mt-0.5">{value}</p>
            </div>
        </div>
    );
}

// ─── Doctor Detail Page ───────────────────────────────────────────────────────
export default function DoctorDetailPage() {
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [reason, setReason] = useState("");

    const availableSlots = [
        "10:00 AM", "10:30 AM", "11:00 AM", "12:00 PM", "01:00 PM", "01:30PM", "02:00PM", "02:30PM", "03:00PM", "03:30PM", "04:00PM", "04:30PM", "05:00PM", "05:30PM", "06:00PM", "06:30PM", "07:00PM",
    ];
    const getTodayDate = () => {
        const today = new Date();
        return today.toISOString().split('T')[0]; //  return YYYY-MM-DD
    };
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { selectedDoctor: doctor, detailLoading, detailError } = useSelector((state) => state.doctor);
    const { user } = useSelector((state) => state.user);
    const { reviews, averageRating } = useSelector((state) => state.review);

    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");

    useEffect(() => {
        if (id) {
            dispatch(getDoctorById(id));
            dispatch(getReviews(id));
        }
    }, [id]);
    const handleBookAppointemnt = async (e) => {
        e.preventDefault()
        const result = await dispatch(bookAppointemnt({ userId: user._id, doctorId: id, appointmentDate: selectedDate, slotTime: selectedTime, reasonOfVisit: reason }))
        if (result) {
            toast.success("Appointment booked successfully")
            setSelectedDate("")
            setSelectedTime("")
            setReason("")

        }
        else {
            toast.error("Appointment booking failed")
        }

    }

    const handleAddReview = async (e) => {
        e.preventDefault();
        if (!user) {
            toast.error("Please login to add a review");
            return;
        }
        const result = await dispatch(addReview({ doctorId: id, rating, comment }));
        if (result.success) {
            toast.success("Review added successfully");
            setRating(5);
            setComment("");
        } else {
            toast.error(result.message || "Failed to add review");
        }
    };

    // ── Loading ──
    if (detailLoading) return <DetailSkeleton />;

    // ── Error ──
    if (detailError)
        return (
            <div
                className="min-h-screen flex flex-col items-center justify-center gap-5 px-6"
                style={{ animation: "fadeUp 0.4s ease-out both" }}
            >
                <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center"
                    style={{ background: "rgba(254,226,226,0.7)" }}
                >
                    <XCircle size={28} className="text-red-400" />
                </div>
                <div className="text-center">
                    <p className="text-base font-semibold text-[var(--color-text)]">Doctor not found</p>
                    <p className="text-sm text-[var(--color-text-muted)] font-light mt-1">{detailError}</p>
                </div>
                <button
                    onClick={() => navigate("/doctors")}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white cursor-pointer transition-all"
                    style={{ background: "linear-gradient(135deg, var(--color-accent), var(--color-accent-hover))" }}
                >
                    <ArrowLeft size={14} /> Back to Doctors
                </button>
            </div>
        );

    if (!doctor) return null;

    const {
        name, specialization, degree, experience, fees, phone, address,
        available, profile_picture, about, age,
    } = doctor;

    return (
        <div className="min-h-screen bg-[var(--color-bg)] pb-20" style={{ animation: "fadeUp 0.5s ease-out both" }}>

            {/* ── Emerald top bar ── */}
            <div
                className="w-full pt-24 pb-10 px-6"
                style={{ background: "linear-gradient(135deg, #0a2e1f 0%, #1b4332 60%, #2d6a4f 100%)" }}
            >
                <div className="max-w-5xl mx-auto">
                    <button
                        onClick={() => navigate("/doctors")}
                        className="flex items-center gap-2 text-emerald-200 hover:text-white text-sm font-medium transition-colors cursor-pointer mb-6"
                    >
                        <ArrowLeft size={15} /> Back to Doctors
                    </button>

                    <p className="text-emerald-300 text-xs font-medium uppercase tracking-widest mb-2">
                        Doctor Profile
                    </p>
                    <h1
                        className="text-3xl md:text-4xl text-white leading-tight"
                        style={{ fontFamily: "var(--font-serif)", fontWeight: 400, letterSpacing: "-0.03em" }}
                    >
                        {name}
                    </h1>
                    {degree && (
                        <p className="text-emerald-100 font-light mt-1 text-sm">{degree}</p>
                    )}
                </div>
            </div>

            {/* ── Main content ── */}
            <div className="max-w-5xl mx-auto px-6 -mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* ── LEFT: Photo + quick info ── */}
                    <div className="flex flex-col gap-4">
                        {/* Photo card */}
                        <div
                            className="rounded-2xl border overflow-hidden shadow-lg"
                            style={{ borderColor: "var(--color-border-light)" }}
                        >
                            {profile_picture ? (
                                <img
                                    src={profile_picture}
                                    alt={name}
                                    className="w-full aspect-[3/4] object-cover object-center"
                                />
                            ) : (
                                <div
                                    className="w-full aspect-[3/4] flex items-center justify-center"
                                    style={{ background: "linear-gradient(135deg, var(--color-accent-light), #e8f5e9)" }}
                                >
                                    <div
                                        className="w-24 h-24 rounded-full flex items-center justify-center"
                                        style={{ background: "rgba(27,67,50,0.1)" }}
                                    >
                                        <Stethoscope size={40} className="text-[var(--color-accent)]" />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Availability card */}
                        <div
                            className="rounded-2xl border p-4 flex items-center gap-3"
                            style={{
                                borderColor: available ? "#a7f3d0" : "#fecaca",
                                background: available ? "rgba(209,250,229,0.3)" : "rgba(254,226,226,0.3)",
                            }}
                        >
                            {available
                                ? <CheckCircle2 size={20} className="text-emerald-600 flex-shrink-0" />
                                : <XCircle size={20} className="text-red-400 flex-shrink-0" />}
                            <div>
                                <p className="text-sm font-semibold" style={{ color: available ? "#065f46" : "#991b1b" }}>
                                    {available ? "Currently Available" : "Currently Unavailable"}
                                </p>
                                <p className="text-[11px] font-light" style={{ color: available ? "#047857" : "#b91c1c" }}>
                                    {available ? "Accepting new patients" : "Not accepting appointments"}
                                </p>
                            </div>
                        </div>

                        {/* Quick info rows */}
                        <div
                            className="rounded-2xl border p-4 flex flex-col gap-3"
                            style={{ borderColor: "var(--color-border-light)", background: "var(--color-bg-pure)" }}
                        >
                            <InfoRow icon={Stethoscope} label="Specialization" value={specialization} />
                            <InfoRow icon={Phone} label="Phone" value={phone} />
                            <InfoRow icon={MapPin} label="Address" value={address} />
                            <InfoRow icon={User} label="Age" value={age ? `${age} years old` : null} />
                        </div>
                    </div>

                    {/* ── RIGHT: Details ── */}
                    <div className="lg:col-span-2 flex flex-col gap-5">

                        {/* Stats strip */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            <StatBox icon={Clock} label="Experience" value={experience ? `${experience} yrs` : "—"} />
                            <StatBox icon={DollarSign} label="Fees" value={fees ? `$${fees}` : "—"} />
                            <StatBox icon={GraduationCap} label="Degree" value={degree?.split(",")[0] || "—"} />
                            <StatBox icon={Star} label="Rating" value={averageRating ? `${averageRating.toFixed(1)} / 5` : "—"} />
                        </div>

                        {/* About section */}
                        {about && (
                            <div
                                className="rounded-2xl border p-5"
                                style={{ borderColor: "var(--color-border-light)", background: "var(--color-bg-pure)" }}
                            >
                                <div className="flex items-center gap-2 mb-3">
                                    <div
                                        className="w-7 h-7 rounded-lg flex items-center justify-center"
                                        style={{ background: "var(--color-accent-light)" }}
                                    >
                                        <FileText size={13} className="text-[var(--color-accent)]" />
                                    </div>
                                    <h2 className="text-sm font-semibold text-[var(--color-text)]">About</h2>
                                </div>
                                <p className="text-sm text-[var(--color-text-soft)] font-light leading-relaxed">{about}</p>
                            </div>
                        )}

                        {/* Specialization highlight */}
                        <div
                            className="rounded-2xl border p-5"
                            style={{ borderColor: "var(--color-border-light)", background: "var(--color-bg-pure)" }}
                        >
                            <h2 className="text-sm font-semibold text-[var(--color-text)] mb-3">Specialization</h2>
                            <span
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide"
                                style={{ background: "var(--color-accent-light)", color: "var(--color-accent)", letterSpacing: "0.04em" }}
                            >
                                <Stethoscope size={14} />
                                {specialization || "General Practice"}
                            </span>
                        </div>

                        {/* Book appointment CTA */}
                        <div

                            className="rounded-2xl border p-5"
                            style={{ borderColor: "var(--color-border-light)", background: "var(--color-bg-pure)" }}
                        >
                            <h2 className="text-sm font-semibold text-[var(--color-text)] mb-1">Book an Appointment</h2>
                            <p className="text-xs text-[var(--color-text-muted)] font-light mb-4">
                                {available
                                    ? "This doctor is currently available. Choose a convenient time slot."
                                    : "This doctor is currently not accepting new appointments."}
                            </p>
                            <form className="flex flex-col gap-5 mt-2" onSubmit={handleBookAppointemnt}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Date Input */}
                                    <div className="flex flex-col gap-1.5">
                                        <label htmlFor="appointmentDate" className="text-xs font-semibold text-[var(--color-text)] ml-1 flex items-center gap-1.5">
                                            <CalendarDays size={14} className="text-[var(--color-text-muted)]" />
                                            Select Date
                                        </label>
                                        <input
                                            id="appointmentDate"
                                            type="date"
                                            value={selectedDate}
                                            onChange={(e) => setSelectedDate(e.target.value)}
                                            min={getTodayDate()}
                                            required
                                            className="w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none"
                                            style={{
                                                borderColor: "var(--color-border)",
                                                background: "var(--color-bg)",
                                                color: selectedDate ? "var(--color-text)" : "var(--color-text-muted)",
                                            }}
                                            onFocus={(e) => (e.target.style.borderColor = "var(--color-accent)")}
                                            onBlur={(e) => (e.target.style.borderColor = "var(--color-border)")}
                                        />
                                    </div>

                                    {/* Time Input */}
                                    <div className="flex flex-col gap-1.5">
                                        <label htmlFor="appointmentTime" className="text-xs font-semibold text-[var(--color-text)] ml-1 flex items-center gap-1.5">
                                            <Clock size={14} className="text-[var(--color-text-muted)]" />
                                            Select Time
                                        </label>
                                        <div className="relative">
                                            <select
                                                id="appointmentTime"
                                                value={selectedTime}
                                                onChange={(e) => setSelectedTime(e.target.value)}
                                                required
                                                className="w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none appearance-none"
                                                style={{
                                                    borderColor: "var(--color-border)",
                                                    background: "var(--color-bg)",
                                                    color: selectedTime ? "var(--color-text)" : "var(--color-text-muted)",
                                                }}
                                                onFocus={(e) => (e.target.style.borderColor = "var(--color-accent)")}
                                                onBlur={(e) => (e.target.style.borderColor = "var(--color-border)")}
                                            >
                                                <option value="" disabled>Select a Time Slot</option>
                                                {availableSlots.map((slot, index) => (
                                                    <option key={index} value={slot} className="text-[var(--color-text)]">
                                                        {slot}
                                                    </option>
                                                ))}
                                            </select>
                                            {/* Custom chevron */}
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--color-text-muted)]">
                                                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Reason for Visit */}
                                <div className="flex flex-col gap-1.5">
                                    <label htmlFor="appointmentReason" className="text-xs font-semibold text-[var(--color-text)] ml-1 flex items-center gap-1.5">
                                        <FileText size={14} className="text-[var(--color-text-muted)]" />
                                        Reason for Visit
                                    </label>
                                    <textarea
                                        id="appointmentReason"
                                        value={reason}
                                        onChange={(e) => setReason(e.target.value)}
                                        required
                                        placeholder="Please briefly describe your symptoms or reason for visit..."
                                        rows={3}
                                        className="w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none resize-none"
                                        style={{
                                            borderColor: "var(--color-border)",
                                            background: "var(--color-bg)",
                                            color: "var(--color-text)",
                                        }}
                                        onFocus={(e) => (e.target.style.borderColor = "var(--color-accent)")}
                                        onBlur={(e) => (e.target.style.borderColor = "var(--color-border)")}
                                    />
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={!available}
                                    className="w-full mt-2 py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2.5 transition-all duration-300"
                                    style={{
                                        background: available
                                            ? "linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-hover) 100%)"
                                            : "var(--color-border-light)",
                                        color: available ? "#fff" : "var(--color-text-muted)",
                                        boxShadow: available ? "0 4px 16px rgba(27,67,50,0.25)" : "none",
                                        cursor: available ? "pointer" : "not-allowed",
                                    }}
                                    onMouseEnter={(e) => {
                                        if (available) e.currentTarget.style.boxShadow = "0 6px 22px rgba(27,67,50,0.4)";
                                    }}
                                    onMouseLeave={(e) => {
                                        if (available) e.currentTarget.style.boxShadow = "0 4px 16px rgba(27,67,50,0.25)";
                                    }}
                                >
                                    <CalendarDays size={16} />
                                    {available ? "Book Appointment" : "Not Available"}
                                </button>
                            </form>

                        </div>

                        {/* ── Reviews Section ── */}
                        <div className="rounded-2xl border p-5 mt-2" style={{ borderColor: "var(--color-border-light)", background: "var(--color-bg-pure)" }}>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "var(--color-accent-light)" }}>
                                    <Star size={13} className="text-[var(--color-accent)]" />
                                </div>
                                <h2 className="text-sm font-semibold text-[var(--color-text)]">Patient Reviews</h2>
                            </div>

                            {/* Reviews List */}
                            <div className="space-y-4 mb-6">
                                {reviews?.length > 0 ? (
                                    reviews.map((rev) => (
                                        <div key={rev._id} className="p-4 rounded-xl border" style={{ borderColor: "var(--color-border-light)", background: "var(--color-bg)" }}>
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-2.5">
                                                    {rev.userId?.profile_picture ? (
                                                        <img src={rev.userId.profile_picture} alt={rev.userId.name} className="w-8 h-8 rounded-full object-cover" />
                                                    ) : (
                                                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-white" style={{ background: "linear-gradient(135deg, var(--color-accent), var(--color-accent-hover))" }}>
                                                            {rev.userId?.name?.charAt(0)}
                                                        </div>
                                                    )}
                                                    <div>
                                                        <p className="text-xs font-semibold text-[var(--color-text)]">{rev.userId?.name}</p>
                                                        <p className="text-[10px] text-[var(--color-text-muted)]">{new Date(rev.createdAt).toLocaleDateString()}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-0.5">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} size={12} fill={i < rev.rating ? "#f59e0b" : "transparent"} className={i < rev.rating ? "text-amber-500" : "text-gray-300"} />
                                                    ))}
                                                </div>
                                            </div>
                                            <p className="text-xs text-[var(--color-text-soft)] leading-relaxed">{rev.comment}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-xs text-[var(--color-text-muted)] italic text-center py-4">No reviews yet. Be the first to review!</p>
                                )}
                            </div>

                            {/* Add Review Form */}
                            <div className="pt-4 border-t" style={{ borderColor: "var(--color-border-light)" }}>
                                <h3 className="text-xs font-semibold text-[var(--color-text)] mb-3">Leave a Review</h3>
                                <form onSubmit={handleAddReview} className="flex flex-col gap-3">
                                    <div>
                                        <label className="text-[11px] font-medium text-[var(--color-text-muted)] block mb-1.5">Rating</label>
                                        <div className="flex items-center gap-1.5">
                                            {[1, 2, 3, 4, 5].map((num) => (
                                                <button
                                                    key={num}
                                                    type="button"
                                                    onClick={() => setRating(num)}
                                                    className="cursor-pointer transition-transform hover:scale-110"
                                                >
                                                    <Star size={18} fill={num <= rating ? "#f59e0b" : "transparent"} className={num <= rating ? "text-amber-500" : "text-gray-300"} />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <textarea
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                            required
                                            placeholder="Share your experience with this doctor..."
                                            rows={3}
                                            className="w-full px-3 py-2.5 rounded-xl border text-xs transition-all focus:outline-none resize-none"
                                            style={{ borderColor: "var(--color-border)", background: "var(--color-bg)", color: "var(--color-text)" }}
                                            onFocus={(e) => (e.target.style.borderColor = "var(--color-accent)")}
                                            onBlur={(e) => (e.target.style.borderColor = "var(--color-border)")}
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="self-end px-4 py-2 rounded-lg text-xs font-semibold text-white transition-all duration-300 cursor-pointer"
                                        style={{ background: "linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-hover) 100%)" }}
                                    >
                                        Submit Review
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
