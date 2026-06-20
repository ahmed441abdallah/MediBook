import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  HeartPulse,
  CheckCircle2,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { registerUser } from "@/store/acrions/userActions";

// ── Feature benefit pill on the branding panel ─────────────────────────────
function FeaturePill({ icon: Icon, text }) {
  return (
    <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl px-4 py-3">
      <div className="w-8 h-8 rounded-lg bg-emerald-400/20 flex items-center justify-center flex-shrink-0">
        <Icon size={16} className="text-emerald-300" />
      </div>
      <span className="text-white/80 text-sm font-light">{text}</span>
    </div>
  );
}

// ── Minimal password strength meter ────────────────────────────────────────
function StrengthMeter({ password }) {
  const strength = !password
    ? 0
    : password.length < 6
      ? 1
      : password.length < 10 || !/[A-Z]/.test(password)
        ? 2
        : /[^a-zA-Z0-9]/.test(password)
          ? 4
          : 3;

  const labels = ["", "Weak", "Fair", "Good", "Strong"];
  const colors = ["", "#ef4444", "#f59e0b", "#3b82f6", "#22c55e"];

  if (!password) return null;

  return (
    <div className="mt-2">
      <div className="flex gap-1 mb-1">
        {[1, 2, 3, 4].map((lvl) => (
          <div
            key={lvl}
            className="h-1 flex-1 rounded-full transition-all duration-300"
            style={{
              background: lvl <= strength ? colors[strength] : "var(--color-border)",
            }}
          />
        ))}
      </div>
      <p className="text-xs font-light" style={{ color: colors[strength] }}>
        {labels[strength]} password
      </p>
    </div>
  );
}

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.user);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const isRegistered = await dispatch(registerUser(formData));
    if (isRegistered) {
      navigate("/login");
      toast.success("Registration successful");
    }
    else {
      toast.error('Registration failed, Try again.');
    }
  }
  const inputWrap = (focused) => ({
    borderColor: focused ? "var(--color-accent)" : "var(--color-border)",
    boxShadow: focused ? "0 0 0 3px var(--color-accent-light)" : "none",
    background: "var(--color-bg)",
  });

  return (
    <div
      className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center p-4 lg:p-8"
      style={{ animation: "fadeUp 0.7s ease-out both" }}
    >
      <div className="w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row min-h-[620px]">

        {/* ══ LEFT — Branding Panel ═══════════════════════════════════════ */}
        <div
          className="relative lg:w-[42%] flex-shrink-0 flex flex-col justify-between p-8 md:p-10 overflow-hidden"
          style={{
            background: "linear-gradient(160deg, #081c15 0%, #1b4332 55%, #40916c 100%)",
          }}
        >
          {/* Orbs */}
          <div className="absolute -top-20 -right-16 w-64 h-64 rounded-full bg-emerald-400/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-teal-300/10 blur-3xl pointer-events-none" />

          {/* Dot pattern */}
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
              Join thousands<br />
              <span className="text-emerald-300">feeling better.</span>
            </h2>
            <p className="text-white/50 text-sm font-light leading-relaxed max-w-xs">
              Create your free account and get instant access to top-rated doctors near you.
            </p>
          </div>

          {/* Feature pills */}
          <div className="relative z-10 space-y-2.5 mt-10">
            <FeaturePill icon={CheckCircle2} text="Book appointments in seconds" />
            <FeaturePill icon={CheckCircle2} text="Access your medical records anytime" />
            <FeaturePill icon={CheckCircle2} text="Verified doctors, guaranteed quality" />
            <FeaturePill icon={CheckCircle2} text="Completely free to join" />
          </div>
        </div>

        {/* ══ RIGHT — Register Form ════════════════════════════════════════ */}
        <div className="flex-1 bg-[var(--color-bg-pure)] flex flex-col justify-center px-8 md:px-12 py-10 relative overflow-hidden">
          {/* Blob */}
          <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-[var(--color-accent-light)] blur-3xl opacity-30 pointer-events-none" />

          <div className="relative z-10 max-w-sm w-full mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1
                className="text-[2rem] text-[var(--color-text)] mb-1.5 leading-tight"
                style={{ fontFamily: "var(--font-serif)", letterSpacing: "-0.03em", fontWeight: 400 }}
              >
                Create Account
              </h1>
              <p className="text-[var(--color-text-muted)] text-sm font-light">
                Join MediBook and take control of your healthcare journey.
              </p>
            </div>

            {/* Form */}
            <form className="space-y-4" onSubmit={handleSubmit}>

              {/* Full Name */}
              <div>
                <label htmlFor="reg-name" className="block text-sm font-medium text-[var(--color-text)] mb-1.5">
                  Full Name
                </label>
                <div className="flex items-center rounded-xl border transition-all duration-200" style={inputWrap(false)}>
                  <div className="pl-4 text-[var(--color-text-muted)] flex-shrink-0">
                    <User size={17} />
                  </div>
                  <input
                    id="reg-name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-3 bg-transparent text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] placeholder:font-light text-sm focus:outline-none"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="reg-email" className="block text-sm font-medium text-[var(--color-text)] mb-1.5">
                  Email Address
                </label>
                <div className="flex items-center rounded-xl border transition-all duration-200" style={inputWrap(false)}>
                  <div className="pl-4 text-[var(--color-text-muted)] flex-shrink-0">
                    <Mail size={17} />
                  </div>
                  <input
                    id="reg-email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-3 bg-transparent text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] placeholder:font-light text-sm focus:outline-none"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="reg-password" className="block text-sm font-medium text-[var(--color-text)] mb-1.5">
                  Password
                </label>
                <div className="flex items-center rounded-xl border transition-all duration-200" style={inputWrap(false)}>
                  <div className="pl-4 text-[var(--color-text-muted)] flex-shrink-0">
                    <Lock size={17} />
                  </div>
                  <input
                    id="reg-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    autoComplete="new-password"
                    value={formData.password}
                    onChange={handleChange}
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
                <StrengthMeter password={password} />
              </div>

              {/* Terms */}
              <label className="flex items-start gap-2.5 cursor-pointer group">
                <input id="reg-terms" type="checkbox" className="mt-0.5 accent-[var(--color-accent)] cursor-pointer" />
                <span className="text-xs text-[var(--color-text-muted)] font-light leading-relaxed group-hover:text-[var(--color-text-soft)] transition-colors">
                  I agree to the{" "}
                  <span className="text-[var(--color-accent)] font-medium hover:underline underline-offset-4 cursor-pointer">
                    Terms of Service
                  </span>{" "}
                  and{" "}
                  <span className="text-[var(--color-accent)] font-medium hover:underline underline-offset-4 cursor-pointer">
                    Privacy Policy
                  </span>
                </span>
              </label>

              {/* Submit */}
              <button
                id="register-btn"
                type="submit"
                disabled={isLoading}
                className="w-full mt-1 py-3.5 rounded-xl font-medium text-sm text-white flex items-center justify-center gap-2 group transition-all duration-300 cursor-pointer shadow-lg shadow-emerald-900/20 hover:shadow-emerald-900/30 hover:gap-3"
                style={{
                  background: "linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-hover) 100%)",
                }}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
                <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>
            </form>

            {/* Footer */}
            <div className="mt-7 text-center">
              <p className="text-[var(--color-text-soft)] font-light text-sm">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors underline-offset-4 hover:underline"
                >
                  Log in here
                </Link>
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
