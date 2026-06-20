import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { changeAvailability } from "@/store/acrions/adminActions";
import { CheckCircle2, XCircle, Clock, DollarSign, Phone, MapPin, Stethoscope } from "lucide-react";
export default function DoctorCard({ doctor, index }) {
    const dispatch = useDispatch();
    const {
        name,
        specialization,
        experience,
        fees,
        phone,
        address,
        available,
        profile_picture,
        degree,
    } = doctor;

    return (
        <div
            className="group bg-[var(--color-bg-pure)] rounded-2xl border overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5"
            style={{
                borderColor: "var(--color-border-light)",
                boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
                animationDelay: `${index * 50}ms`,
                animation: "fadeUp 0.5s ease-out both",
            }}
        >
            {/* ── Photo area ── */}
            <div className="relative h-52 bg-[var(--color-bg)] overflow-hidden flex-shrink-0">
                {profile_picture ? (
                    <img
                        src={profile_picture}
                        alt={name}
                        className="w-full h-[450px] object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                ) : (
                    <div
                        className="w-full h-full flex items-center justify-center"
                        style={{
                            background:
                                "linear-gradient(135deg, var(--color-accent-light) 0%, #e8f5e9 100%)",
                        }}
                    >
                        <div
                            className="w-20 h-20 rounded-full flex items-center justify-center shadow-inner"
                            style={{ background: "rgba(27,67,50,0.08)" }}
                        >
                            <Stethoscope size={34} className="text-[var(--color-accent)]" />
                        </div>
                    </div>
                )}

                {/* Gradient overlay at bottom of photo */}
                <div
                    className="absolute inset-x-0 bottom-0 h-16 pointer-events-none"
                    style={{
                        background:
                            "linear-gradient(to top, rgba(255,255,255,0.85) 0%, transparent 100%)",
                    }}
                />

                {/* Availability pill */}
                <div
                    className="absolute top-3 left-3 flex items-center gap-1.5 text-[11px] font-semibold rounded-full px-2.5 py-1 backdrop-blur-md shadow-sm"
                    style={{
                        background: available
                            ? "rgba(209,250,229,0.95)"
                            : "rgba(254,226,226,0.95)",
                        color: available ? "#065f46" : "#991b1b",
                        border: available
                            ? "1px solid #a7f3d0"
                            : "1px solid #fecaca",
                    }}
                >
                    {available ? <CheckCircle2 size={10} /> : <XCircle size={10} />}
                    {available ? "Available" : "Unavailable"}
                </div>
            </div>

            {/* ── Content ── */}
            <div className="px-4 pt-3 pb-4 flex flex-col gap-3 flex-1">
                {/* Name + degree */}
                <div>
                    <h3
                        className="text-[15px] font-semibold text-[var(--color-text)] leading-snug truncate"
                        title={name}
                    >
                        {name || "—"}
                    </h3>
                    {degree && (
                        <p className="text-[11px] text-[var(--color-text-muted)] font-light mt-0.5 truncate">
                            {degree}
                        </p>
                    )}
                </div>

                {/* Specialization chip */}
                <span
                    className="self-start inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full tracking-wide uppercase"
                    style={{
                        background: "var(--color-accent-light)",
                        color: "var(--color-accent)",
                        letterSpacing: "0.04em",
                    }}
                >
                    <Stethoscope size={10} />
                    {specialization || "General Practice"}
                </span>

                {/* Stats strip */}
                <div
                    className="flex items-center divide-x rounded-xl overflow-hidden"
                    style={{
                        borderColor: "var(--color-border-light)",
                        border: "1px solid var(--color-border-light)",
                        divideColor: "var(--color-border-light)",
                    }}
                >
                    {experience !== undefined && experience !== "" && (
                        <div className="flex-1 flex flex-col items-center py-2 px-1 gap-0.5">
                            <Clock size={12} className="text-[var(--color-accent)]" />
                            <span className="text-[11px] font-semibold text-[var(--color-text)]">
                                {experience}
                                <span className="font-light text-[10px] text-[var(--color-text-muted)]"> yr</span>
                            </span>
                            <span className="text-[10px] text-[var(--color-text-muted)] font-light">Exp.</span>
                        </div>
                    )}
                    {fees !== undefined && fees !== "" && (
                        <div className="flex-1 flex flex-col items-center py-2 px-1 gap-0.5">
                            <DollarSign size={12} className="text-[var(--color-accent)]" />
                            <span className="text-[11px] font-semibold text-[var(--color-text)]">
                                ${fees}
                            </span>
                            <span className="text-[10px] text-[var(--color-text-muted)] font-light">Fee</span>
                        </div>
                    )}
                    {phone && (
                        <div className="flex-1 flex flex-col items-center py-2 px-1 gap-0.5 min-w-0">
                            <Phone size={12} className="text-[var(--color-accent)]" />
                            <span className="text-[11px] font-semibold text-[var(--color-text)] truncate w-full text-center px-1">
                                {phone}
                            </span>
                            <span className="text-[10px] text-[var(--color-text-muted)] font-light">Phone</span>
                        </div>
                    )}
                </div>

                {/* Address */}
                {address && (
                    <div className="flex items-start gap-1.5 text-[11px] text-[var(--color-text-muted)]">
                        <MapPin size={11} className="flex-shrink-0 mt-0.5 text-[var(--color-text-muted)]" />
                        <span className="truncate">{address}</span>
                    </div>
                )}

                {/* ── Action buttons ── */}
                <div className="mt-auto flex gap-2">
                    {/* View Profile */}
                    <button
                        className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 cursor-pointer"
                        style={{
                            background:
                                "linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-hover) 100%)",
                            color: "#fff",
                            boxShadow: "0 4px 14px rgba(27,67,50,0.25)",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.boxShadow = "0 6px 20px rgba(27,67,50,0.38)";
                            e.currentTarget.style.transform = "translateY(-1px)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.boxShadow = "0 4px 14px rgba(27,67,50,0.25)";
                            e.currentTarget.style.transform = "translateY(0)";
                        }}
                    >
                        View Profile
                    </button>

                    {/* Change Availability */}
                    <button
                        title={available ? "Mark as Unavailable" : "Mark as Available"}
                        onClick={async () => {
                            const success = await dispatch(changeAvailability(doctor._id));
                            if (success) {
                                toast.success(
                                    available
                                        ? `${name} marked as unavailable`
                                        : `${name} marked as available`
                                );
                            } else {
                                toast.error("Failed to change availability. Please try again.");
                            }
                        }}
                        className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-300 cursor-pointer flex-shrink-0 border"
                        style={
                            available
                                ? {
                                    background: "rgba(254,226,226,0.6)",
                                    color: "#991b1b",
                                    borderColor: "#fecaca",
                                }
                                : {
                                    background: "rgba(209,250,229,0.6)",
                                    color: "#065f46",
                                    borderColor: "#a7f3d0",
                                }
                        }
                        onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.75"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
                    >
                        {available ? (
                            <XCircle size={13} />
                        ) : (
                            <CheckCircle2 size={13} />
                        )}
                        {available ? "Disable" : "Enable"}
                    </button>
                </div>
            </div>
        </div>
    );
}