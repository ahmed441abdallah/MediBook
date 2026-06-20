import React, { useState, useRef } from "react";
import {
    User,
    Mail,
    Lock,
    Phone,
    MapPin,
    GraduationCap,
    Stethoscope,
    DollarSign,
    Clock,
    Calendar,
    FileText,
    Upload,
    Eye,
    EyeOff,
    CheckCircle2,
    X,
    UserPlus,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addDocotr } from "@/store/acrions/adminActions";
import { toast } from "sonner";


// ─── Reusable input wrapper ────────────────────────────────────────────────
function Field({ label, required, children, hint }) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[var(--color-text)]">
                {label}
                {required && <span className="text-red-500 ml-0.5">*</span>}
            </label>
            {children}
            {hint && <p className="text-xs text-[var(--color-text-muted)] font-light">{hint}</p>}
        </div>
    );
}

// ─── Styled text/number input ──────────────────────────────────────────────
function Input({ icon: Icon, type = "text", placeholder, value, onChange, suffix, ...rest }) {
    return (
        <div
            className="flex items-center gap-0 rounded-xl border transition-all duration-200 focus-within:border-[var(--color-accent)] focus-within:shadow-[0_0_0_3px_var(--color-accent-light)]"
            style={{ background: "var(--color-bg)", borderColor: "var(--color-border)" }}
        >
            {Icon && (
                <div className="pl-3.5 flex-shrink-0 text-[var(--color-text-muted)]">
                    <Icon size={16} />
                </div>
            )}
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="w-full px-3 py-2.5 bg-transparent text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] placeholder:font-light focus:outline-none"
                {...rest}
            />
            {suffix && (
                <span className="pr-3.5 text-sm text-[var(--color-text-muted)] font-light flex-shrink-0">
                    {suffix}
                </span>
            )}
        </div>
    );
}

// ─── Section card ──────────────────────────────────────────────────────────
function Section({ title, description, children }) {
    return (
        <div
            className="bg-[var(--color-bg-pure)] rounded-2xl border overflow-hidden"
            style={{ borderColor: "var(--color-border-light)" }}
        >
            <div
                className="px-6 py-4 border-b"
                style={{ borderColor: "var(--color-border-light)" }}
            >
                <h2 className="text-sm font-semibold text-[var(--color-text)]">{title}</h2>
                {description && (
                    <p className="text-xs text-[var(--color-text-muted)] font-light mt-0.5">{description}</p>
                )}
            </div>
            <div className="p-6">{children}</div>
        </div>
    );
}

// ─── Specialization options ────────────────────────────────────────────────
const SPECIALIZATIONS = [
    "Cardiology", "Neurology", "Pediatrics", "Orthopedics",
    "Dermatology", "Psychiatry", "Ophthalmology", "Oncology",
    "Radiology", "General Surgery", "Gynecology", "Urology",
    "Endocrinology", "Gastroenterology", "Pulmonology", "Nephrology",
    "General Practice", "Emergency Medicine",
];

// ─── Main component ────────────────────────────────────────────────────────
export const AddDoctor = () => {
    const fileInputRef = useRef(null);
    const [showPassword, setShowPassword] = useState(false);
    const [available, setAvailable] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [dragging, setDragging] = useState(false);
    const dispatch = useDispatch();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        profile_picture: "",
        specialization: "",
        phone: "",
        age: "",
        address: "",
        fees: "",
        degree: "",
        about: "",
        experience: "",
    });

    const set = (field) => (e) =>
        setForm((prev) => ({ ...prev, [field]: e.target.value }));

    // Image handling
    const handleImage = (file) => {
        if (!file || !file.type.startsWith("image/")) return;
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
        setForm((prev) => ({ ...prev, profile_picture: file }));
    };

    const onDrop = (e) => {
        e.preventDefault();
        setDragging(false);
        const file = e.dataTransfer.files[0];
        handleImage(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Build FormData so the image file is sent as multipart/form-data
        const formData = new FormData();
        Object.entries(form).forEach(([key, value]) => {
            if (value !== "" && value !== null) {
                formData.append(key, value);
            }
        });
        formData.append("available", available);
        const res = await dispatch(addDocotr(formData));
        if (res) {
            toast.success("Doctor added successfully");
            setForm({
                name: "",
                email: "",
                password: "",
                profile_picture: "",
                specialization: "",
                phone: "",
                age: "",
                address: "",
                fees: "",
                degree: "",
                about: "",
                experience: "",
            });
            setPreviewUrl(null);
            setAvailable(false);
        } else {
            toast.error("Failed to add doctor");
        }
    };

    return (
        <div className="space-y-6 max-w-4xl" style={{ animation: "fadeUp 0.5s ease-out both" }}>

            {/* ── Page header ── */}
            <div className="flex items-center justify-between gap-4">
                <div>
                    <h1
                        className="text-2xl text-[var(--color-text)] leading-tight"
                        style={{ fontFamily: "var(--font-serif)", letterSpacing: "-0.03em", fontWeight: 400 }}
                    >
                        Add New Doctor
                    </h1>
                    <p className="text-sm text-[var(--color-text-muted)] font-light mt-0.5">
                        Fill in all required fields to register a new doctor.
                    </p>
                </div>
                <span className="text-xs text-[var(--color-text-muted)] font-light bg-[var(--color-bg-pure)] border border-[var(--color-border-light)] rounded-xl px-3 py-1.5">
                    <span className="text-red-500">*</span> Required fields
                </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

                {/* ══ 1. Profile Photo ═══════════════════════════════════════════ */}
                <Section title="Profile Photo" description="Upload a clear, professional headshot.">
                    <div className="flex items-start gap-6 flex-wrap">
                        {/* Preview circle */}
                        <div className="relative flex-shrink-0">
                            <div
                                className="w-24 h-24 rounded-2xl overflow-hidden border-2 flex items-center justify-center"
                                style={{
                                    borderColor: previewUrl ? "var(--color-accent)" : "var(--color-border)",
                                    background: "var(--color-bg)",
                                }}
                            >
                                {previewUrl ? (
                                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <User size={32} className="text-[var(--color-text-muted)]" />
                                )}
                            </div>
                            {previewUrl && (
                                <button
                                    type="button"
                                    onClick={() => { setPreviewUrl(null); setForm(p => ({ ...p, profile_picture: "" })); }}
                                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer"
                                >
                                    <X size={12} />
                                </button>
                            )}
                        </div>

                        {/* Drop zone */}
                        <div
                            className="flex-1 min-w-[200px] border-2 border-dashed rounded-2xl p-5 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all duration-200"
                            style={{
                                borderColor: dragging ? "var(--color-accent)" : "var(--color-border)",
                                background: dragging ? "var(--color-accent-light)" : "var(--color-bg)",
                            }}
                            onClick={() => fileInputRef.current?.click()}
                            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                            onDragLeave={() => setDragging(false)}
                            onDrop={onDrop}
                        >
                            <div className="w-10 h-10 rounded-xl bg-[var(--color-accent-light)] flex items-center justify-center">
                                <Upload size={18} className="text-[var(--color-accent)]" />
                            </div>
                            <div className="text-center">
                                <p className="text-sm font-medium text-[var(--color-text)]">
                                    Drop image here or <span className="text-[var(--color-accent)]">browse</span>
                                </p>
                                <p className="text-xs text-[var(--color-text-muted)] font-light mt-0.5">
                                    PNG, JPG, WEBP — max 5 MB
                                </p>
                            </div>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => handleImage(e.target.files[0])}
                            />
                        </div>
                    </div>
                </Section>

                {/* ══ 2. Personal Info ════════════════════════════════════════════ */}
                <Section title="Personal Information" description="Basic identity details.">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Field label="Full Name" required>
                            <Input icon={User} placeholder="Dr. John Smith" value={form.name} onChange={set("name")} />
                        </Field>

                        <Field label="Email Address" required>
                            <Input icon={Mail} type="email" placeholder="doctor@medibook.com" value={form.email} onChange={set("email")} />
                        </Field>

                        <Field label="Password" required hint="Minimum 8 characters.">
                            <div
                                className="flex items-center rounded-xl border transition-all duration-200 focus-within:border-[var(--color-accent)] focus-within:shadow-[0_0_0_3px_var(--color-accent-light)]"
                                style={{ background: "var(--color-bg)", borderColor: "var(--color-border)" }}
                            >
                                <div className="pl-3.5 text-[var(--color-text-muted)] flex-shrink-0">
                                    <Lock size={16} />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Create a strong password"
                                    value={form.password}
                                    onChange={set("password")}
                                    className="w-full px-3 py-2.5 bg-transparent text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] placeholder:font-light focus:outline-none"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="pr-3.5 text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors cursor-pointer flex-shrink-0"
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </Field>

                        <Field label="Phone Number" required>
                            <Input icon={Phone} type="tel" placeholder="+1 (555) 000-0000" value={form.phone} onChange={set("phone")} />
                        </Field>

                        <Field label="Age" required>
                            <Input icon={Calendar} type="number" placeholder="35" value={form.age} onChange={set("age")} suffix="yrs" min="18" max="90" />
                        </Field>

                        <Field label="Address" required>
                            <Input icon={MapPin} placeholder="123 Medical Ave, City" value={form.address} onChange={set("address")} />
                        </Field>
                    </div>
                </Section>

                {/* ══ 3. Professional Info ════════════════════════════════════════ */}
                <Section title="Professional Details" description="Clinical qualifications and experience.">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Field label="Specialization" required>
                            <div
                                className="rounded-xl border transition-all duration-200 focus-within:border-[var(--color-accent)] focus-within:shadow-[0_0_0_3px_var(--color-accent-light)]"
                                style={{ background: "var(--color-bg)", borderColor: "var(--color-border)" }}
                            >
                                <div className="flex items-center">
                                    <div className="pl-3.5 text-[var(--color-text-muted)] flex-shrink-0">
                                        <Stethoscope size={16} />
                                    </div>
                                    <select
                                        value={form.specialization}
                                        onChange={set("specialization")}
                                        className="w-full px-3 py-2.5 bg-transparent text-sm text-[var(--color-text)] focus:outline-none cursor-pointer appearance-none"
                                    >
                                        <option value="" disabled>Select specialization…</option>
                                        {SPECIALIZATIONS.map((s) => (
                                            <option key={s} value={s}>{s}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </Field>

                        <Field label="Degree / Qualification" required>
                            <Input icon={GraduationCap} placeholder="MBBS, MD, FRCS…" value={form.degree} onChange={set("degree")} />
                        </Field>

                        <Field label="Experience" required>
                            <Input icon={Clock} type="number" placeholder="8" value={form.experience} onChange={set("experience")} suffix="yrs" min="0" />
                        </Field>

                        <Field label="Consultation Fees" required>
                            <Input icon={DollarSign} type="number" placeholder="150" value={form.fees} onChange={set("fees")} suffix="USD" min="0" />
                        </Field>
                    </div>
                </Section>

                {/* ══ 4. About ════════════════════════════════════════════════════ */}
                <Section title="About the Doctor" description="A brief bio shown on the doctor's public profile.">
                    <Field label="Bio / Description" required>
                        <div
                            className="rounded-xl border transition-all duration-200 focus-within:border-[var(--color-accent)] focus-within:shadow-[0_0_0_3px_var(--color-accent-light)]"
                            style={{ background: "var(--color-bg)", borderColor: "var(--color-border)" }}
                        >
                            <div className="flex items-start gap-0">
                                <div className="pl-3.5 pt-3 text-[var(--color-text-muted)] flex-shrink-0">
                                    <FileText size={16} />
                                </div>
                                <textarea
                                    rows={4}
                                    placeholder="Write a short professional biography…"
                                    value={form.about}
                                    onChange={set("about")}
                                    className="w-full px-3 py-2.5 bg-transparent text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] placeholder:font-light focus:outline-none resize-none"
                                />
                            </div>
                        </div>
                        <p className="text-xs text-[var(--color-text-muted)] font-light text-right mt-1">
                            {form.about.length} / 500
                        </p>
                    </Field>
                </Section>

                {/* ══ 5. Availability toggle ══════════════════════════════════════ */}
                <Section title="Availability" description="Set whether this doctor is currently accepting patients.">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-[var(--color-text)]">Available for appointments</p>
                            <p className="text-xs text-[var(--color-text-muted)] font-light mt-0.5">
                                Toggle this off to temporarily hide the doctor from booking.
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={() => setAvailable(!available)}
                            className="relative w-12 h-6 rounded-full transition-all duration-300 cursor-pointer flex-shrink-0"
                            style={{
                                background: available
                                    ? "linear-gradient(135deg, var(--color-accent), var(--color-accent-hover))"
                                    : "var(--color-border)",
                            }}
                            aria-label="Toggle availability"
                        >
                            <span
                                className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-300"
                                style={{ transform: available ? "translateX(24px)" : "translateX(0)" }}
                            />
                        </button>
                    </div>
                    {available && (
                        <div className="mt-4 flex items-center gap-2 text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2.5">
                            <CheckCircle2 size={15} className="flex-shrink-0" />
                            Doctor will appear as available for bookings.
                        </div>
                    )}
                </Section>

                {/* ══ Actions ══════════════════════════════════════════════════════ */}
                <div className="flex items-center justify-end gap-3 pt-1">
                    <button
                        type="button"
                        className="px-5 py-2.5 rounded-xl text-sm font-medium text-[var(--color-text-soft)] border border-[var(--color-border)] hover:bg-[var(--color-bg)] transition-all cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        id="add-doctor-btn"
                        className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium text-white transition-all duration-300 cursor-pointer shadow-lg shadow-emerald-900/20 hover:shadow-emerald-900/30"
                        style={{
                            background: "linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-hover) 100%)",
                        }}
                    >
                        <UserPlus size={15} />
                        Add Doctor
                    </button>
                </div>

            </form>
        </div>
    );
};
