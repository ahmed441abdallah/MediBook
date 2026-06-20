import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllAppointments, changeAppointmentStatus } from "@/store/acrions/adminActions";
import { toast } from "sonner";
import {
    Search,
    Filter,
    CalendarDays,
    Clock,
    User,
    Stethoscope,
    DollarSign,
    CheckCircle2,
    XCircle,
    AlertCircle,
    MoreVertical,
    ChevronLeft,
    ChevronRight,
    TrendingUp,
    Activity,
    Ban,
} from "lucide-react";

// ─── Temp Data ────────────────────────────────────────────────────────────────
const TEMP_APPOINTMENTS = [
    { _id: "1", userId: { name: "Alex Johnson" }, doctorId: { name: "Dr. Sarah Mitchell", specialization: "Cardiologist" }, appointmentDate: "2025-06-20", slotTime: "10:30 AM", status: "booked", amount: 150, appointmentType: "offline", payment: false },
    { _id: "2", userId: { name: "Maya Rodriguez" }, doctorId: { name: "Dr. James Carter", specialization: "Neurologist" }, appointmentDate: "2025-06-18", slotTime: "02:00 PM", status: "completed", amount: 200, appointmentType: "online", payment: true },
    { _id: "3", userId: { name: "Omar Hassan" }, doctorId: { name: "Dr. Emily Rhodes", specialization: "Dermatologist" }, appointmentDate: "2025-06-15", slotTime: "11:00 AM", status: "cancelled", amount: 120, appointmentType: "offline", payment: false },
    { _id: "4", userId: { name: "Layla Chen" }, doctorId: { name: "Dr. Robert Kim", specialization: "Orthopedist" }, appointmentDate: "2025-06-22", slotTime: "09:00 AM", status: "booked", amount: 180, appointmentType: "offline", payment: true },
    { _id: "5", userId: { name: "David Okonkwo" }, doctorId: { name: "Dr. Sarah Mitchell", specialization: "Cardiologist" }, appointmentDate: "2025-06-17", slotTime: "03:30 PM", status: "completed", amount: 150, appointmentType: "online", payment: true },
    { _id: "6", userId: { name: "Aisha Patel" }, doctorId: { name: "Dr. Emily Rhodes", specialization: "Dermatologist" }, appointmentDate: "2025-06-25", slotTime: "01:00 PM", status: "booked", amount: 120, appointmentType: "offline", payment: false },
    { _id: "7", userId: { name: "Lucas Smith" }, doctorId: { name: "Dr. James Carter", specialization: "Neurologist" }, appointmentDate: "2025-06-14", slotTime: "10:00 AM", status: "cancelled", amount: 200, appointmentType: "online", payment: false },
    { _id: "8", userId: { name: "Nora Williams" }, doctorId: { name: "Dr. Robert Kim", specialization: "Orthopedist" }, appointmentDate: "2025-06-28", slotTime: "04:00 PM", status: "booked", amount: 180, appointmentType: "offline", payment: true },
    { _id: "9", userId: { name: "Ethan Brown" }, doctorId: { name: "Dr. Sarah Mitchell", specialization: "Cardiologist" }, appointmentDate: "2025-06-10", slotTime: "11:30 AM", status: "completed", amount: 150, appointmentType: "offline", payment: true },
    { _id: "10", userId: { name: "Sofia Garcia" }, doctorId: { name: "Dr. Emily Rhodes", specialization: "Dermatologist" }, appointmentDate: "2025-07-01", slotTime: "09:30 AM", status: "booked", amount: 120, appointmentType: "online", payment: false },
];

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ icon: Icon, label, value, sub, color }) {
    return (
        <div
            className="rounded-2xl border p-5 flex items-center gap-4"
            style={{ borderColor: "var(--color-border-light)", background: "var(--color-bg-pure)" }}
        >
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: color + "20" }}>
                <Icon size={20} style={{ color }} />
            </div>
            <div>
                <p className="text-2xl font-semibold text-[var(--color-text)] leading-none">{value}</p>
                <p className="text-sm text-[var(--color-text-muted)] font-light mt-0.5">{label}</p>
                {sub && <p className="text-xs mt-1" style={{ color }}>{sub}</p>}
            </div>
        </div>
    );
}

// ─── Status Badge ─────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
    const map = {
        booked: { label: "Booked", bg: "rgba(219,234,254,0.8)", color: "#1d4ed8", icon: AlertCircle },
        completed: { label: "Completed", bg: "rgba(209,250,229,0.8)", color: "#065f46", icon: CheckCircle2 },
        cancelled: { label: "Cancelled", bg: "rgba(254,226,226,0.8)", color: "#b91c1c", icon: XCircle },
    };
    const s = map[status] || map.booked;
    const Icon = s.icon;
    return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wide" style={{ background: s.bg, color: s.color }}>
            <Icon size={11} />
            {s.label}
        </span>
    );
}

// ─── Appointments Page ────────────────────────────────────────────────────────
const TABS = ["all", "booked", "completed", "cancelled"];
const PER_PAGE = 6;

export const Appointments = () => {
    const dispatch = useDispatch();
    const { appointments, appointmentsTotal, loading } = useSelector((state) => state.admin);

    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [page, setPage] = useState(1);

    // Debounce search input — wait 400ms after user stops typing
    useEffect(() => {
        const t = setTimeout(() => {
            setDebouncedSearch(search);
            setPage(1); // reset to page 1 on new search
        }, 400);
        return () => clearTimeout(t);
    }, [search]);

    // Fetch whenever page or debounced search changes
    useEffect(() => {
        dispatch(getAllAppointments(page, PER_PAGE, debouncedSearch));
    }, [page, debouncedSearch]);

    const totalPages = Math.ceil(appointmentsTotal / PER_PAGE);
    const totalRevenue = appointments.filter(a => a.payment).reduce((s, a) => s + (a.amount || 0), 0);

    const handleStatusChange = async (id, status) => {
        const ok = await dispatch(changeAppointmentStatus(id, status));
        if (ok) toast.success(`Status changed to "${status}"`);
        else toast.error("Failed to change status");
    };

    return (
        <div className="min-h-screen bg-[var(--color-bg)] p-6 md:p-8" style={{ animation: "fadeUp 0.4s ease-out both" }}>
            <div className="max-w-7xl mx-auto space-y-6">

                {/* ── Header ── */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-semibold text-[var(--color-text)]" style={{ fontFamily: "var(--font-serif)", letterSpacing: "-0.02em" }}>
                            Appointments
                        </h1>
                        <p className="text-sm text-[var(--color-text-muted)] font-light mt-0.5">
                            Overview of all patient appointments
                        </p>
                    </div>
                    <div
                        className="flex items-center gap-2 px-4 py-2 rounded-xl border text-sm text-[var(--color-text-muted)]"
                        style={{ borderColor: "var(--color-border)", background: "var(--color-bg-pure)" }}
                    >
                        <CalendarDays size={14} className="text-[var(--color-accent)]" />
                        <span>{new Date().toDateString().slice(0, 16)}</span>
                    </div>
                </div>

                {/* ── Stat Cards ── */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard icon={Activity} label="Total" value={appointmentsTotal} color="#1b4332" />
                    <StatCard icon={AlertCircle} label="Booked" value={appointments.filter(a => a.status === "booked").length} color="#1d4ed8" />
                    <StatCard icon={CheckCircle2} label="Completed" value={appointments.filter(a => a.status === "completed").length} color="#065f46" />
                    <StatCard icon={TrendingUp} label="Revenue" value={`$${totalRevenue}`} sub="from paid" color="#7c3aed" />
                </div>

                {/* ── Table Card ── */}
                <div
                    className="rounded-2xl border overflow-hidden"
                    style={{ borderColor: "var(--color-border-light)", background: "var(--color-bg-pure)" }}
                >
                    {/* Toolbar */}
                    <div className="px-6 py-4 border-b flex flex-col md:flex-row md:items-center gap-3" style={{ borderColor: "var(--color-border-light)" }}>
                        {/* Search */}
                        <div
                            className="flex items-center gap-2 flex-1 max-w-sm rounded-xl border px-3 py-2 transition-all focus-within:border-[var(--color-accent)]"
                            style={{ borderColor: "var(--color-border)", background: "var(--color-bg)" }}
                        >
                            <Search size={14} className="text-[var(--color-text-muted)] flex-shrink-0" />
                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search patient or doctor..."
                                className="flex-1 bg-transparent text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none"
                            />
                            {search && (
                                <button onClick={() => setSearch("")} className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] cursor-pointer">
                                    <span className="text-xs">✕</span>
                                </button>
                            )}
                        </div>

                        {/* Loading indicator */}
                        {loading && (
                            <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
                                <div className="w-3.5 h-3.5 border-2 border-[var(--color-accent-light)] border-t-[var(--color-accent)] rounded-full animate-spin" />
                                Loading...
                            </div>
                        )}
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr style={{ borderBottom: "1px solid var(--color-border-light)" }}>
                                    {["Patient", "Doctor", "Date & Time", "Type", "Amount", "Payment", "Status", ""].map((h) => (
                                        <th key={h} className="text-left px-5 py-3.5 text-[11px] font-semibold uppercase tracking-widest text-[var(--color-text-muted)]">
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {loading && appointments.length === 0 ? (
                                    // Skeleton rows
                                    Array.from({ length: 5 }).map((_, i) => (
                                        <tr key={i} style={{ borderBottom: "1px solid var(--color-border-light)" }}>
                                            {Array.from({ length: 8 }).map((_, j) => (
                                                <td key={j} className="px-5 py-4">
                                                    <div className="h-4 rounded-lg bg-[var(--color-border)] animate-pulse" style={{ width: j === 0 ? "120px" : j === 7 ? "32px" : "80px" }} />
                                                </td>
                                            ))}
                                        </tr>
                                    ))
                                ) : appointments.length === 0 ? (
                                    <tr>
                                        <td colSpan={8} className="text-center py-16 text-[var(--color-text-muted)] text-sm font-light">
                                            No appointments found.
                                        </td>
                                    </tr>
                                ) : appointments.map((appt, i) => (
                                    <tr
                                        key={appt._id}
                                        className="transition-colors hover:bg-[var(--color-bg)] group"
                                        style={{ borderBottom: i < appointments.length - 1 ? "1px solid var(--color-border-light)" : "none" }}
                                    >
                                        {/* Patient */}
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-2.5">
                                                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-white flex-shrink-0"
                                                    style={{ background: "linear-gradient(135deg, var(--color-accent), var(--color-accent-hover))" }}>
                                                    {appt.userId?.name?.charAt(0)}
                                                </div>
                                                <span className="font-medium text-[var(--color-text)] whitespace-nowrap">{appt.userId?.name}</span>
                                            </div>
                                        </td>

                                        {/* Doctor */}
                                        <td className="px-5 py-4">
                                            <p className="font-medium text-[var(--color-text)] whitespace-nowrap">{appt.doctorId?.name}</p>
                                            <p className="text-xs text-[var(--color-text-muted)] font-light">{appt.doctorId?.specialization}</p>
                                        </td>

                                        {/* Date & Time */}
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-1.5 text-[var(--color-text-soft)]">
                                                <CalendarDays size={13} className="flex-shrink-0" />
                                                <span className="whitespace-nowrap">{appt.appointmentDate?.slice(0,10)}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-[var(--color-text-muted)] mt-0.5">
                                                <Clock size={12} className="flex-shrink-0" />
                                                <span className="text-xs">{appt.slotTime}</span>
                                            </div>
                                        </td>

                                        {/* Type */}
                                        <td className="px-5 py-4">
                                            <span className="capitalize text-xs font-medium px-2.5 py-1 rounded-full"
                                                style={{
                                                    background: appt.appointmentType === "online" ? "rgba(219,234,254,0.6)" : "var(--color-bg)",
                                                    color: appt.appointmentType === "online" ? "#1d4ed8" : "var(--color-text-muted)",
                                                }}>
                                                {appt.appointmentType}
                                            </span>
                                        </td>

                                        {/* Amount */}
                                        <td className="px-5 py-4">
                                            <span className="font-semibold text-[var(--color-text)]">${appt.amount}</span>
                                        </td>

                                        {/* Payment */}
                                        <td className="px-5 py-4">
                                            {appt.payment ? (
                                                <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700">
                                                    <CheckCircle2 size={13} /> Paid
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 text-xs font-medium text-[var(--color-text-muted)]">
                                                    <AlertCircle size={13} /> Pending
                                                </span>
                                            )}
                                        </td>

                                        {/* Status */}
                                        <td className="px-5 py-4">
                                            <StatusBadge status={appt.status} />
                                        </td>

                                        {/* Change Status */}
                                        <td className="px-5 py-4">
                                            <select
                                                value={appt.status}
                                                onChange={(e) => handleStatusChange(appt._id, e.target.value)}
                                                className="text-xs font-medium px-2.5 py-1.5 rounded-xl border transition-all focus:outline-none cursor-pointer"
                                                style={{
                                                    borderColor: "var(--color-border)",
                                                    background: "var(--color-bg)",
                                                    color: "var(--color-text-soft)",
                                                }}
                                            >
                                                <option value="booked">Booked</option>
                                                <option value="completed">Completed</option>
                                                <option value="cancelled">Cancelled</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="px-6 py-4 border-t flex items-center justify-between" style={{ borderColor: "var(--color-border-light)" }}>
                            <p className="text-xs text-[var(--color-text-muted)]">
                                Showing {(page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, appointmentsTotal)} of {appointmentsTotal}
                            </p>
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={() => setPage(p => Math.max(1, p - 1))}
                                    disabled={page === 1}
                                    className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors hover:bg-[var(--color-border-light)] disabled:opacity-30 cursor-pointer"
                                >
                                    <ChevronLeft size={15} />
                                </button>
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                                    <button
                                        key={n}
                                        onClick={() => setPage(n)}
                                        className="w-8 h-8 rounded-lg text-sm font-medium transition-all cursor-pointer"
                                        style={page === n
                                            ? { background: "var(--color-accent)", color: "#fff" }
                                            : { color: "var(--color-text-muted)" }
                                        }
                                    >
                                        {n}
                                    </button>
                                ))}
                                <button
                                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                    disabled={page === totalPages}
                                    className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors hover:bg-[var(--color-border-light)] disabled:opacity-30 cursor-pointer"
                                >
                                    <ChevronRight size={15} />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
