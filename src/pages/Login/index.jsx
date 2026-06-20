import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  HeartPulse,
  Star,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/store/acrions/userActions";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

// ── Testimonial chip on the branding panel ─────────────────────────────────
function ReviewChip({ name, text, rating = 5 }) {
  return (
    <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-4">
      <div className="flex gap-0.5 mb-2">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} size={11} className="fill-amber-300 text-amber-300" />
        ))}
      </div>
      <p className="text-white/80 text-xs font-light leading-relaxed mb-2">"{text}"</p>
      <p className="text-white/50 text-[11px]">— {name}</p>
    </div>
  );
}

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginUser(formData));
    if (result) {
      toast.success("Login successful");
      navigate("/");
    } else {
      toast.error("Invalid email or password");
    }
  };

  return (
    <div
      className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center p-4 lg:p-8"
      style={{ animation: "fadeUp 0.7s ease-out both" }}
    >
      <div className="w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row min-h-[580px]">

        {/* ══ LEFT — Branding Panel ═══════════════════════════════════════ */}
        <div
          className="relative lg:w-[42%] flex-shrink-0 flex flex-col justify-between p-8 md:p-10 overflow-hidden"
          style={{
            background: "linear-gradient(160deg, #081c15 0%, #1b4332 55%, #40916c 100%)",
          }}
        >
          {/* Decorative orbs */}
          <div className="absolute -top-24 -left-16 w-72 h-72 rounded-full bg-emerald-400/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -right-12 w-64 h-64 rounded-full bg-teal-300/10 blur-3xl pointer-events-none" />

          {/* Dot pattern overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.06]"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          {/* Logo */}
          <div className="relative z-10">
            <div className="flex items-center gap-2.5 mb-10">
              <div className="w-9 h-9 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center">
                <HeartPulse size={19} className="text-emerald-300" />
              </div>
              <span className="text-white font-semibold text-lg tracking-tight">MediBook</span>
            </div>

            <h2
              className="text-3xl md:text-[2.4rem] text-white leading-[1.1] mb-4"
              style={{ fontFamily: "var(--font-serif)", letterSpacing: "-0.03em", fontWeight: 400 }}
            >
              Your health,<br />
              <span className="text-emerald-300">our priority.</span>
            </h2>
            <p className="text-white/50 text-sm font-light leading-relaxed max-w-xs">
              Book appointments, track records, and connect with top doctors — all from one place.
            </p>
          </div>

          {/* Reviews */}
          <div className="relative z-10 space-y-3 mt-10">
            <ReviewChip
              name="Sarah M."
              text="Booking my appointments has never been this easy. Absolutely love MediBook!"
            />
            <ReviewChip
              name="James T."
              text="My health records are always up-to-date. Highly recommended."
              rating={5}
            />
          </div>
        </div>

        {/* ══ RIGHT — Login Form ══════════════════════════════════════════ */}
        <div className="flex-1 bg-[var(--color-bg-pure)] flex flex-col justify-center px-8 md:px-12 py-10 relative overflow-hidden">
          {/* Subtle blob */}
          <div className="absolute -bottom-20 -right-20 w-56 h-56 rounded-full bg-[var(--color-accent-light)] blur-3xl opacity-30 pointer-events-none" />

          <div className="relative z-10 max-w-sm w-full mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1
                className="text-[2rem] text-[var(--color-text)] mb-1.5 leading-tight"
                style={{ fontFamily: "var(--font-serif)", letterSpacing: "-0.03em", fontWeight: 400 }}
              >
                Welcome back
              </h1>
              <p className="text-[var(--color-text-muted)] text-sm font-light">
                Log in to manage your appointments and records.
              </p>
            </div>

            {/* Form */}
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              {/* Email */}
              <div>
                <label htmlFor="login-email" className="block text-sm font-medium text-[var(--color-text)] mb-1.5">
                  Email Address
                </label>
                <div
                  className="flex items-center rounded-xl border transition-all duration-200"
                  style={{
                    borderColor: emailFocused ? "var(--color-accent)" : "var(--color-border)",
                    boxShadow: emailFocused ? "0 0 0 3px var(--color-accent-light)" : "none",
                    background: "var(--color-bg)",
                  }}
                >
                  <div className="pl-4 text-[var(--color-text-muted)] flex-shrink-0">
                    <Mail size={17} />
                  </div>
                  <input
                    id="login-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    autoComplete="email"
                    onFocus={() => setEmailFocused(true)}
                    onBlur={() => setEmailFocused(false)}
                    className="w-full px-3 py-3 bg-transparent text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] placeholder:font-light text-sm focus:outline-none"
                  />
                </div>
              </div>

              {/* Password */}
              <div>

                <div
                  className="flex items-center rounded-xl border transition-all duration-200"
                  style={{
                    borderColor: passwordFocused ? "var(--color-accent)" : "var(--color-border)",
                    boxShadow: passwordFocused ? "0 0 0 3px var(--color-accent-light)" : "none",
                    background: "var(--color-bg)",
                  }}
                >
                  <div className="pl-4 text-[var(--color-text-muted)] flex-shrink-0">
                    <Lock size={17} />
                  </div>
                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    onFocus={() => setPasswordFocused(true)}
                    onBlur={() => setPasswordFocused(false)}
                    className="w-full px-3 py-3 bg-transparent text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] placeholder:font-light text-sm focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="pr-4 text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors cursor-pointer flex-shrink-0"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                disabled={isLoading}
                onClick={handleSubmit}
                id="login-btn"
                type="submit"
                className="w-full mt-1 py-3.5 rounded-xl font-medium text-sm text-white flex items-center justify-center gap-2 group transition-all duration-300 cursor-pointer shadow-lg shadow-emerald-900/20 hover:shadow-emerald-900/30 hover:gap-3"
                style={{
                  background: "linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-hover) 100%)",
                }}
              >
                Log In
                <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>
            </form>

            {/* Footer links */}
            <div className="mt-7 space-y-3 text-center">
              <p className="text-[var(--color-text-soft)] font-light text-sm">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-medium text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors underline-offset-4 hover:underline"
                >
                  Create one now
                </Link>
              </p>

              {/* Admin redirect */}
            </div>
            <div className="flex items-center gap-2 justify-center">
              <div className="h-px flex-1 bg-[var(--color-border-light)]" />
              <Link
                to="/admin/login"
                className="inline-flex items-center gap-1.5 text-xs text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors duration-200 group cursor-pointer"
              >
                <ShieldCheck size={13} className="group-hover:scale-110 transition-transform" />
                Are you an admin?
              </Link>
              <div className="h-px flex-1 bg-[var(--color-border-light)]" />
            </div>
            <div className="mt-3 flex items-center gap-2 justify-center">
              <div className="h-px  flex-1 bg-[var(--color-border-light)]" />
              <Link
                to="/doctor/login"
                className="inline-flex items-center gap-1.5 text-xs text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors duration-200 group cursor-pointer"
              >
                <ShieldCheck size={13} className="group-hover:scale-110 transition-transform" />
                Are you a doctor?
              </Link>
              <div className="h-px flex-1 bg-[var(--color-border-light)]" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
