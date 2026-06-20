import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, Stethoscope, ArrowRight, Activity, Users, CalendarDays, Star } from "lucide-react";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { doctorLogin } from "@/store/acrions/doctorActions";

// ── Stat badge shown on the branding panel ──────────────────────────────────
function StatBadge({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl px-4 py-3">
      <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
        <Icon size={18} className="text-blue-300" />
      </div>
      <div>
        <p className="text-white/60 text-xs leading-none mb-0.5">{label}</p>
        <p className="text-white font-semibold text-sm">{value}</p>
      </div>
    </div>
  );
}

export default function DoctorLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    const success = await dispatch(doctorLogin(email, password));
    if (success) {
      toast.success("Welcome Doctor", {
        description: "You have logged in successfully.",
      });
      navigate("/doctor-dashboard");
    } else {
      toast.error("Login failed", {
        description: "Invalid email or password. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center p-4 lg:p-0">
      {/* ── Outer card wrapper ───────────────────────────────────────────── */}
      <div
        className="w-full max-w-5xl min-h-[600px] rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row"
        style={{ animation: "fadeUp 0.7s ease-out both" }}
      >
        {/* ══ LEFT — Branding Panel ══════════════════════════════════════ */}
        <div
          className="relative lg:w-[45%] flex-shrink-0 flex flex-col justify-between p-8 md:p-10 overflow-hidden"
          style={{ background: "linear-gradient(145deg, #1e3a8a 0%, #1e40af 50%, #2563eb 100%)" }}
        >
          {/* Background orbs */}
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-blue-400/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-cyan-400/20 blur-3xl pointer-events-none" />

          {/* Grid texture overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.05]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />

          {/* Top section: logo + badge */}
          <div className="relative z-10">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 rounded-xl bg-blue-400/20 border border-blue-400/30 flex items-center justify-center">
                <Stethoscope size={20} className="text-blue-300" />
              </div>
              <div>
                <span className="text-white font-semibold text-lg tracking-tight leading-none">MediBook</span>
                <span className="block text-blue-300/80 text-[11px] font-medium uppercase tracking-widest leading-none mt-0.5">
                  Doctor Portal
                </span>
              </div>
            </div>

            <div className="mt-8">
              <h2
                className="text-3xl md:text-4xl font-light text-white leading-tight mb-3"
                style={{ fontFamily: "var(--font-serif)", letterSpacing: "-0.03em" }}
              >
                Focus on care. <br />
                <span className="text-blue-300">We'll handle</span>
                <br />the rest.
              </h2>
              <p className="text-white/60 text-sm font-light leading-relaxed max-w-xs">
                Manage your appointments, patient records, and daily schedule with our streamlined doctor workspace.
              </p>
            </div>
          </div>

          {/* Bottom section: stat badges */}
          <div className="relative z-10 space-y-2.5 mt-8">
            <StatBadge icon={CalendarDays} label="Appointments Today" value="12" />
            <StatBadge icon={Users} label="Total Patients" value="348" />
            <StatBadge icon={Star} label="Patient Rating" value="4.9 / 5.0" />
          </div>
        </div>

        {/* ══ RIGHT — Login Form ═════════════════════════════════════════ */}
        <div className="flex-1 bg-[var(--color-bg-pure)] flex flex-col justify-center px-8 md:px-12 py-10 relative overflow-hidden">
          {/* Subtle decorative blob */}
          <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-blue-100 blur-3xl opacity-50 pointer-events-none" />

          <div className="relative z-10 max-w-sm w-full mx-auto">
            {/* Header */}
            <div className="mb-8">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full mb-4">
                <Stethoscope size={12} />
                Physician Access
              </span>
              <h1
                className="text-3xl text-[var(--color-text)] mb-1.5"
                style={{ fontFamily: "var(--font-serif)", letterSpacing: "-0.03em", fontWeight: 400 }}
              >
                Welcome back, Doctor
              </h1>
              <p className="text-[var(--color-text-muted)] text-sm font-light">
                Sign in to your professional dashboard.
              </p>
            </div>

            {/* Form */}
            <form className="space-y-4" onSubmit={handleLogin}>
              {/* Email field */}
              <div>
                <label
                  htmlFor="doctor-email"
                  className="block text-sm font-medium text-[var(--color-text)] mb-1.5"
                >
                  Professional Email
                </label>
                <div
                  className="relative flex items-center rounded-xl border transition-all duration-200"
                  style={{
                    borderColor: emailFocused ? "#2563eb" : "var(--color-border)",
                    boxShadow: emailFocused ? "0 0 0 3px rgba(37, 99, 235, 0.1)" : "none",
                    background: "var(--color-bg)",
                  }}
                >
                  <div className="pl-4 flex-shrink-0 text-[var(--color-text-muted)]">
                    <Mail size={17} />
                  </div>
                  <input
                    id="doctor-email"
                    type="email"
                    autoComplete="email"
                    placeholder="dr.smith@medibook.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setEmailFocused(true)}
                    onBlur={() => setEmailFocused(false)}
                    className="w-full px-3 py-3 bg-transparent text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] placeholder:font-light text-sm focus:outline-none"
                  />
                </div>
              </div>

              {/* Password field */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="doctor-password"
                    className="block text-sm font-medium text-[var(--color-text)]"
                  >
                    Password
                  </label>
                  <button
                    type="button"
                    className="text-xs text-blue-600 hover:text-blue-700 transition-colors cursor-pointer font-medium"
                  >
                    Forgot password?
                  </button>
                </div>
                <div
                  className="relative flex items-center rounded-xl border transition-all duration-200"
                  style={{
                    borderColor: passwordFocused ? "#2563eb" : "var(--color-border)",
                    boxShadow: passwordFocused ? "0 0 0 3px rgba(37, 99, 235, 0.1)" : "none",
                    background: "var(--color-bg)",
                  }}
                >
                  <div className="pl-4 flex-shrink-0 text-[var(--color-text-muted)]">
                    <Lock size={17} />
                  </div>
                  <input
                    id="doctor-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setPasswordFocused(true)}
                    onBlur={() => setPasswordFocused(false)}
                    className="w-full px-3 py-3 bg-transparent text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] placeholder:font-light text-sm focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="pr-4 flex-shrink-0 text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors cursor-pointer"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </div>

              {/* Remember me */}
              <label className="flex items-center gap-2.5 cursor-pointer group">
                <div className="relative">
                  <input id="remember-me" type="checkbox" className="sr-only peer" />
                  <div className="w-4 h-4 rounded border border-[var(--color-border)] bg-[var(--color-bg)] peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-all duration-150 flex items-center justify-center">
                    <svg className="hidden peer-checked:block w-2.5 h-2.5 text-white" viewBox="0 0 10 10" fill="none">
                      <path d="M1.5 5l2.5 2.5 4.5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
                <span className="text-sm text-[var(--color-text-soft)] font-light group-hover:text-[var(--color-text)] transition-colors">
                  Keep me signed in
                </span>
              </label>

              {/* Submit button */}
              <button
                id="doctor-login-btn"
                type="submit"
                className="w-full mt-2 py-3.5 rounded-xl font-medium text-sm text-white flex items-center justify-center gap-2 group transition-all duration-300 cursor-pointer shadow-lg shadow-blue-900/20 hover:shadow-blue-900/30 hover:gap-3"
                style={{
                  background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                }}
              >
                Sign in to Workspace
                <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <hr className="rule flex-1" />
              <span className="text-xs text-[var(--color-text-muted)] font-light">secured portal</span>
              <hr className="rule flex-1" />
            </div>

            {/* Footer note */}
            <p className="text-center text-xs text-[var(--color-text-muted)] font-light leading-relaxed mb-3">
              Not a doctor?{" "}
              <Link
                to="/login"
                className="text-blue-600 font-medium hover:text-blue-700 transition-colors hover:underline underline-offset-4"
              >
                Patient login →
              </Link>
            </p>
            <p className="text-center text-xs text-[var(--color-text-muted)] font-light leading-relaxed">
              Are you an admin?{" "}
              <Link
                to="/admin/login"
                className="text-blue-600 font-medium hover:text-blue-700 transition-colors hover:underline underline-offset-4"
              >
                Admin portal →
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
