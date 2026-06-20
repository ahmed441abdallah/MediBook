import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
    User,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Users,
    Camera,
    Edit3,
    Save,
    X,
    Shield,
    Clock,
    CheckCircle2,
    ChevronRight,
    Activity,
    Stethoscope,
    Heart,
    Bell,
    Lock,
    LogOut,
    XCircle,
    Video,
    VideoOff
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { cancelAppointment, getMyAppointment, getProfile, updateProfile } from "@/store/acrions/userActions";
import { toast } from "sonner";
import { Link } from "react-router-dom";

// ─── Mock static data (UI only) ───────────────────────────────────────────────


const MOCK_APPOINTMENTS = [
    {
        id: 1,
        doctor: "Dr. Sarah Mitchell",
        specialty: "Cardiologist",
        date: "Jun 20, 2025",
        time: "10:30 AM",
        status: "upcoming",
    },
    {
        id: 2,
        doctor: "Dr. James Carter",
        specialty: "Neurologist",
        date: "May 15, 2025",
        time: "2:00 PM",
        status: "completed",
    },
    {
        id: 3,
        doctor: "Dr. Emily Rhodes",
        specialty: "Dermatologist",
        date: "Apr 3, 2025",
        time: "11:00 AM",
        status: "completed",
    },
];

const NAV_ITEMS = [
    { id: "profile", label: "My Profile", icon: User },
    { id: "appointments", label: "Appointments", icon: Calendar },

];

// ─── Info Row ─────────────────────────────────────────────────────────────────
function InfoRow({ icon: Icon, label, value, editing, name, onChange }) {
    return (
        <div className="flex items-start gap-4 py-4 border-b last:border-0" style={{ borderColor: "var(--color-border-light)" }}>
            <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: "var(--color-accent-light)" }}
            >
                <Icon size={15} className="text-[var(--color-accent)]" />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-[11px] uppercase tracking-widest text-[var(--color-text-muted)] font-medium mb-1">{label}</p>
                {editing ? (
                    <input
                        name={name}
                        value={value ?? ""}
                        onChange={onChange}
                        className="w-full px-3 py-2 rounded-xl border text-sm text-[var(--color-text)] focus:outline-none transition-all"
                        style={{
                            borderColor: "var(--color-accent)",
                            boxShadow: "0 0 0 3px var(--color-accent-light)",
                            background: "var(--color-bg)",
                        }}
                    />
                ) : (
                    <p className="text-sm font-medium text-[var(--color-text)] truncate">{value || "—"}</p>
                )}
            </div>
        </div>
    );
}

// ─── Appointment Card ─────────────────────────────────────────────────────────
function AppointmentCard({ appt, onCancel }) {
    const isCompleted = appt.status === "completed";
    const isCancelled = appt.status === "cancelled";
    const isOnline = appt.appointmentType === "online";

    return (
        <div
            className="group flex flex-col p-5 rounded-2xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 relative overflow-hidden"
            style={{
                borderColor: isCompleted ? "#a7f3d0" : isCancelled ? "#fecaca" : "var(--color-border)",
                background: isCompleted ? "linear-gradient(180deg, rgba(209,250,229,0.2) 0%, var(--color-bg-pure) 100%)" :
                            isCancelled ? "linear-gradient(180deg, rgba(254,202,202,0.2) 0%, var(--color-bg-pure) 100%)" : 
                            "var(--color-bg-pure)",
            }}
        >
            {/* Status Badge */}
            <div className="absolute top-4 right-4 flex items-center gap-2">
                <span
                    className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border"
                    style={{
                        background: isCompleted ? "#d1fae5" : isCancelled ? "#fee2e2" : "var(--color-bg)",
                        color: isCompleted ? "#065f46" : isCancelled ? "#991b1b" : "var(--color-text-soft)",
                        borderColor: isCompleted ? "#a7f3d0" : isCancelled ? "#fecaca" : "var(--color-border-light)",
                    }}
                >
                    {appt.status}
                </span>
            </div>

            {/* Doctor Info */}
            <div className="flex items-center gap-4 mb-5">
                <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm"
                    style={{ background: isCompleted ? "#059669" : isCancelled ? "#dc2626" : "linear-gradient(135deg, var(--color-accent), var(--color-accent-hover))" }}
                >
                    <Stethoscope size={24} className="text-white" />
                </div>
                <div>
                    <h3 className="text-base font-bold text-[var(--color-text)] tracking-tight">{appt.doctorId?.name}</h3>
                    <p className="text-xs font-medium text-[var(--color-text-soft)]">{appt.doctorId?.specialization}</p>
                </div>
            </div>

            {/* Appointment Details */}
            <div className="grid grid-cols-2 gap-y-3 gap-x-4 mb-5 p-4 rounded-xl" style={{ background: "var(--color-bg)" }}>
                <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-[var(--color-accent)]" />
                    <span className="text-xs font-medium text-[var(--color-text)]">{new Date(appt.appointmentDate).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Clock size={14} className="text-[var(--color-accent)]" />
                    <span className="text-xs font-medium text-[var(--color-text)]">{appt.slotTime}</span>
                </div>
                <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-[var(--color-accent)]" />
                    <span className="text-xs font-medium text-[var(--color-text)] truncate" title={appt.doctorId?.address}>{appt.doctorId?.address || "Clinic"}</span>
                </div>
                <div className="flex items-center gap-2">
                    {isOnline ? <Video size={14} className="text-emerald-500" /> : <VideoOff size={14} className="text-[var(--color-text-muted)]" />}
                    <span className="text-xs font-medium text-[var(--color-text)]">{isOnline ? "Online Consultation" : "In-Person Visit"}</span>
                </div>
            </div>

            {/* Actions Footer */}
            <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: "var(--color-border-light)" }}>
                <div className="flex items-baseline gap-1">
                    <span className="text-xs text-[var(--color-text-muted)]">Fee:</span>
                    <span className="text-sm font-bold text-[var(--color-text)]">${appt.amount || appt.doctorId?.fees}</span>
                </div>

                <div className="flex items-center gap-2">
                    {/* Join Call Button for Online Appointments */}
                    {isOnline && appt.meetingUrl && !isCancelled && (
                        <a 
                            href={appt.meetingUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-xs font-semibold px-4 py-2 rounded-xl transition-all shadow-sm hover:shadow"
                            style={{ 
                                background: isCompleted ? "var(--color-bg)" : "linear-gradient(135deg, #10b981, #059669)", 
                                color: isCompleted ? "var(--color-text-muted)" : "white",
                                pointerEvents: isCompleted ? "none" : "auto",
                                opacity: isCompleted ? 0.6 : 1
                            }}
                        >
                            {isCompleted ? "Call Ended" : "Join Call"}
                        </a>
                    )}

                    {/* Cancel Button */}
                    {(!isCompleted && !isCancelled) && (
                        <button
                            onClick={() => onCancel(appt._id)}
                            className="text-xs font-semibold px-4 py-2 rounded-xl transition-all cursor-pointer bg-red-50 text-red-600 hover:bg-red-100 border border-red-100"
                        >
                            Cancel Appointment
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

// ─── Profile Page ─────────────────────────────────────────────────────────────
export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState("profile");
    const [editing, setEditing] = useState(false);
    const [cancelModalId, setCancelModalId] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        age: "",
        gender: "",
        address: "",

    });
    const dispatch = useDispatch();
    const { user, error, isLoading, appointements } = useSelector(state => state.user);

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || "",
                email: user.email || "",
                phone: user.phone || "",
                age: user.age || "",
                gender: user.gender || "",
                address: user.address || "",
            });
        }
    }, [user]);

    const handleUpdateProfile = async () => {
        const result = await dispatch(updateProfile(formData));
        if (result) {
            toast.success("Profile updated successfully");
            setEditing(false);
            dispatch(getProfile()); // Refresh user data to get updated values like age if backend formats it
        } else {
            toast.error("Failed to update profile");
        }
    };

    const handleCancelAppointment = (id) => {
        setCancelModalId(id);
    };

    const confirmCancel = async () => {
        if (!cancelModalId) return;
        const result = await dispatch(cancelAppointment(cancelModalId));
        if (result) {
            toast.success("Appointment cancelled successfully");
            dispatch(getMyAppointment());
        } else {
            toast.error("Failed to cancel appointment");
        }
        setCancelModalId(null);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    useEffect(() => {
        const fetchData = async () => {
            await dispatch(getProfile());
            await dispatch(getMyAppointment());
        };
        fetchData();
    }, []);


    return (
        <div
            className="min-h-screen bg-[var(--color-bg)] pt-24 pb-16 px-4 md:px-8"
            style={{ animation: "fadeUp 0.5s ease-out both" }}
        >
            <div className="max-w-6xl mx-auto">

                {/* ── Hero banner ── */}
                <div
                    className="relative rounded-3xl overflow-hidden mb-6"
                    style={{ background: "linear-gradient(135deg, #081c15 0%, #1b4332 55%, #40916c 100%)", minHeight: 160 }}
                >
                    {/* Dot pattern */}
                    <div
                        className="absolute inset-0 pointer-events-none opacity-[0.07]"
                        style={{
                            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
                            backgroundSize: "22px 22px",
                        }}
                    />
                    {/* Orbs */}
                    <div className="absolute -top-10 -right-10 w-56 h-56 rounded-full bg-emerald-400/10 blur-3xl" />
                    <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-teal-300/10 blur-3xl" />

                    {/* Content */}
                    <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-end gap-4 p-6 md:p-8">
                        {/* Avatar */}
                        <div className="relative flex-shrink-0">
                            <div
                                className="w-24 h-24 rounded-2xl border-4 border-white/20 overflow-hidden flex items-center justify-center"
                                style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(8px)" }}
                            >
                                {user?.profile_picture ? (
                                    <img src={user?.profile_picture} alt="avatar" className="w-full h-full object-cover" />
                                ) : (
                                    <span
                                        className="text-3xl font-bold text-white/80"
                                        style={{ fontFamily: "var(--font-serif)" }}
                                    >
                                        {user?.name?.charAt(0) || "U"}
                                    </span>
                                )}
                            </div>

                        </div>

                        {/* Name + meta */}
                        <div className="flex-1">
                            <h1
                                className="text-2xl md:text-3xl text-white leading-tight"
                                style={{ fontFamily: "var(--font-serif)", fontWeight: 400, letterSpacing: "-0.03em" }}
                            >
                                {user?.name}
                            </h1>
                            <div className="flex flex-wrap items-center gap-3 mt-1.5">
                                <span className="flex items-center gap-1 text-emerald-200 text-xs font-light">
                                    <Mail size={11} /> {user?.email}
                                </span>
                                <span className="flex items-center gap-1 text-emerald-300/70 text-xs font-light">
                                    <Calendar size={11} /> Member since {user?.createdAt.split("T")[0]}
                                </span>
                            </div>
                        </div>

                        {/* Verified badge */}
                        <div
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium"
                            style={{ background: "rgba(255,255,255,0.1)", color: "#6ee7b7", backdropFilter: "blur(8px)" }}
                        >
                            <Shield size={12} />
                            Verified Account
                        </div>
                    </div>
                </div>

                {/* ── Stats strip ── */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-white/10 border border-[var(--color-border-light)] rounded-2xl p-4 flex flex-col items-center gap-1.5 text-center">
                        <p className="text-xl font-semibold text-[var(--color-text)] leading-none"> {appointements.length}</p>
                        <p className="text-[11px] text-[var(--color-text-muted)] font-light">No Appointments</p>
                    </div>
                    {
                        appointements.filter((ap) => ap.status === "completed").length > 0 ? (
                            <div className="bg-white/10 border border-[var(--color-border-light)] rounded-2xl p-4 flex flex-col items-center gap-1.5 text-center">
                                <p className="text-xl font-semibold text-[var(--color-text)] leading-none"> {appointements.filter((ap) => ap.status === "completed").length}</p>
                                <p className="text-[11px] text-[var(--color-text-muted)] font-light">Completed Appointments</p>
                            </div>
                        ) : (
                            <div className="bg-white/10 border border-[var(--color-border-light)] rounded-2xl p-4 flex flex-col items-center gap-1.5 text-center">
                                <p className="text-xl font-semibold text-[var(--color-text)] leading-none"> {appointements.filter((ap) => ap.status === "completed").length}</p>
                                <p className="text-[11px] text-[var(--color-text-muted)] font-light">Completed Appointments</p>
                            </div>
                        )
                    }
                    {
                        appointements.filter((ap) => ap.status === "cancelled").length > 0 ? (
                            <div className="bg-white/10 border border-[var(--color-border-light)] rounded-2xl p-4 flex flex-col items-center gap-1.5 text-center">
                                <p className="text-xl font-semibold text-[var(--color-text)] leading-none"> {appointements.filter((ap) => ap.status === "cancelled").length}</p>
                                <p className="text-[11px] text-[var(--color-text-muted)] font-light">Cancelled Appointments</p>
                            </div>
                        ) : (
                            <div className="bg-white/10 border border-[var(--color-border-light)] rounded-2xl p-4 flex flex-col items-center gap-1.5 text-center">
                                <p className="text-xl font-semibold text-[var(--color-text)] leading-none"> {appointements.filter((ap) => ap.status === "cancelled").length}</p>
                                <p className="text-[11px] text-[var(--color-text-muted)] font-light">Cancelled Appointments</p>
                            </div>
                        )
                    }

                </div>

                {/* ── Body: sidebar + content ── */}
                <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-6">

                    {/* ── Sidebar nav ── */}
                    <div
                        className="rounded-2xl border p-3 flex flex-row lg:flex-col gap-1 h-fit"
                        style={{ borderColor: "var(--color-border-light)", background: "var(--color-bg-pure)" }}
                    >
                        {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
                            const active = activeTab === id;
                            return (
                                <button
                                    key={id}
                                    onClick={() => setActiveTab(id)}
                                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer w-full text-left"
                                    style={{
                                        background: active ? "var(--color-accent-light)" : "transparent",
                                        color: active ? "var(--color-accent)" : "var(--color-text-soft)",
                                    }}
                                >
                                    <Icon size={16} />
                                    <span className="hidden sm:block">{label}</span>
                                </button>
                            );
                        })}

                        {/* Divider + Logout */}
                        <div className="hidden lg:block mt-4 pt-4 border-t" style={{ borderColor: "var(--color-border-light)" }}>
                            <button className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all duration-200 cursor-pointer w-full">
                                <LogOut size={16} />
                                Logout
                            </button>
                        </div>
                    </div>

                    {/* ── Main panel ── */}
                    <div className="min-w-0">

                        {/* ─ Profile Tab ─ */}
                        {activeTab === "profile" && (
                            <div
                                className="rounded-2xl border overflow-hidden"
                                style={{ borderColor: "var(--color-border-light)", background: "var(--color-bg-pure)" }}
                            >
                                {/* Header */}
                                <div
                                    className="flex items-center justify-between px-6 py-4 border-b"
                                    style={{ borderColor: "var(--color-border-light)" }}
                                >
                                    <div>
                                        <h2 className="text-base font-semibold text-[var(--color-text)]">Personal Information</h2>
                                        <p className="text-xs text-[var(--color-text-muted)] font-light mt-0.5">Manage your profile details</p>
                                    </div>
                                    {editing ? (
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => { setEditing(false); setFormData({}); }}
                                                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium border cursor-pointer transition-all hover:bg-red-50 text-red-500"
                                                style={{ borderColor: "#fecaca" }}
                                            >
                                                <X size={14} /> Cancel
                                            </button>
                                            <button
                                                onClick={handleUpdateProfile}
                                                disabled={isLoading}
                                                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white cursor-pointer transition-all hover:shadow-lg disabled:opacity-50"
                                                style={{ background: "linear-gradient(135deg, var(--color-accent), var(--color-accent-hover))" }}
                                            >
                                                <Save size={14} /> {isLoading ? "Saving..." : "Save Changes"}
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => setEditing(true)}
                                            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium border cursor-pointer transition-all duration-200 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                                            style={{ borderColor: "var(--color-border)", color: "var(--color-text-soft)" }}
                                        >
                                            <Edit3 size={14} /> Edit Profile
                                        </button>
                                    )}
                                </div>

                                {/* Fields */}
                                <div className="px-6 py-2">
                                    <InfoRow icon={User} label="Full Name" value={editing ? formData.name : user?.name} editing={editing} name="name" onChange={handleChange} />
                                    <InfoRow icon={Mail} label="Email Address" value={user?.email} editing={false} name="email" onChange={handleChange} />
                                    <InfoRow icon={Phone} label="Phone Number" value={editing ? formData.phone : user?.phone} editing={editing} name="phone" onChange={handleChange} />
                                    <InfoRow icon={MapPin} label="Address" value={editing ? formData.address : user?.address} editing={editing} name="address" onChange={handleChange} />
                                    <InfoRow icon={Users} label="Gender" value={editing ? formData.gender : user?.gender} editing={editing} name="gender" onChange={handleChange} />
                                    <InfoRow icon={Activity} label="Age" value={editing ? formData.age : (user?.age ? `${user?.age} years old` : "")} editing={editing} name="age" onChange={handleChange} />
                                </div>
                            </div>
                        )}

                        {/* ─ Appointments Tab ─ */}
                        {activeTab === "appointments" && (
                            <div
                                className="rounded-2xl border overflow-hidden"
                                style={{ borderColor: "var(--color-border-light)", background: "var(--color-bg-pure)" }}
                            >
                                <div
                                    className="flex items-center justify-between px-6 py-4 border-b"
                                    style={{ borderColor: "var(--color-border-light)" }}
                                >
                                    <div>
                                        <h2 className="text-base font-semibold text-[var(--color-text)]">My Appointments</h2>
                                        <p className="text-xs text-[var(--color-text-muted)] font-light mt-0.5">{appointements?.length || 0} total appointments</p>
                                    </div>
                                    <Link
                                        to="/doctors"

                                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white cursor-pointer transition-all hover:shadow-lg"
                                        style={{ background: "linear-gradient(135deg, var(--color-accent), var(--color-accent-hover))" }}
                                    >
                                        Book New
                                    </Link>
                                </div>
                                <div className="p-4 flex flex-col gap-3">
                                    {appointements?.map((appt) => (
                                        <AppointmentCard key={appt._id} appt={appt} onCancel={handleCancelAppointment} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Cancel Confirmation Portal Modal */}
            {cancelModalId && createPortal(
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" style={{ animation: "fadeIn 0.2s ease-out" }}>
                    <div className="bg-[var(--color-bg-pure)] rounded-2xl p-6 max-w-sm w-full border border-[var(--color-border)] shadow-2xl" style={{ animation: "scaleUp 0.2s ease-out" }}>
                        <div className="flex items-center gap-3 text-red-600 mb-4">
                            <div className="p-2 bg-red-100 rounded-full">
                                <XCircle size={24} />
                            </div>
                            <h3 className="text-lg font-semibold">Cancel Appointment</h3>
                        </div>
                        <p className="text-sm text-[var(--color-text-muted)] mb-6">
                            Are you sure you want to cancel this appointment? This action cannot be undone.
                        </p>
                        <div className="flex items-center justify-end gap-3">
                            <button
                                onClick={() => setCancelModalId(null)}
                                disabled={isLoading}
                                className="px-4 py-2 text-sm font-medium text-[var(--color-text)] border border-[var(--color-border)] rounded-xl hover:bg-[var(--color-bg)] transition-colors cursor-pointer"
                            >
                                Keep it
                            </button>
                            <button
                                onClick={confirmCancel}
                                disabled={isLoading}
                                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-xl hover:bg-red-700 transition-colors disabled:opacity-50 cursor-pointer flex items-center gap-2"
                            >
                                {isLoading ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Canceling...
                                    </>
                                ) : "Yes, Cancel"}
                            </button>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
}