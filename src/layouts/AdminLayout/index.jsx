import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  Stethoscope,
  BarChart3,
  Settings,
  LogOut,
  Bell,
  Search,
  Menu,
  X,
  HeartPulse,
  ChevronRight,
} from "lucide-react";

const NAV_ITEMS = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/patients", label: "Patients", icon: Users },
  { to: "/admin/all-doctors", label: "Doctors", icon: Stethoscope },
  { to: "/admin/add-doctor", label: "Add Doctor", icon: Stethoscope },
  { to: "/admin/appointments", label: "Appointments", icon: CalendarDays },
  { to: "/admin/analytics", label: "Analytics", icon: BarChart3 },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "ADMIN_LOGOUT" });
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen flex" style={{ background: "var(--color-bg)", fontFamily: "var(--font-sans)" }}>

      {/* ══ SIDEBAR ══════════════════════════════════════════════════════ */}
      <aside
        className="flex flex-col flex-shrink-0 transition-all duration-300 relative z-20"
        style={{
          width: sidebarOpen ? "240px" : "72px",
          background: "linear-gradient(180deg, #081c15 0%, #1b4332 100%)",
          borderRight: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        {/* Logo */}
        <div
          className="flex items-center gap-3 px-4 py-5 border-b"
          style={{ borderColor: "rgba(255,255,255,0.07)" }}
        >
          <div className="w-9 h-9 rounded-xl bg-emerald-400/20 border border-emerald-400/30 flex items-center justify-center flex-shrink-0">
            <HeartPulse size={18} className="text-emerald-300" />
          </div>
          {sidebarOpen && (
            <div className="overflow-hidden">
              <p className="text-white font-semibold text-sm tracking-tight leading-none">MediBook</p>
              <p className="text-emerald-400/70 text-[10px] font-medium uppercase tracking-widest mt-0.5">Admin</p>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-2 space-y-0.5 overflow-y-auto">
          {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 group cursor-pointer ${isActive
                  ? "bg-emerald-400/15 text-emerald-300"
                  : "text-white/50 hover:text-white hover:bg-white/8"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon size={18} className="flex-shrink-0" />
                  {sidebarOpen && (
                    <span className="text-sm font-medium truncate">{label}</span>
                  )}
                  {sidebarOpen && isActive && (
                    <ChevronRight size={14} className="ml-auto text-emerald-400" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-2 border-t" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-400/70 hover:text-red-400 hover:bg-red-400/10 transition-all duration-150 cursor-pointer"
          >
            <LogOut size={18} className="flex-shrink-0" />
            {sidebarOpen && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* ══ MAIN AREA ══════════════════════════════════════════════════════ */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Top Bar */}
        <header
          className="flex items-center gap-4 px-6 py-4 border-b flex-shrink-0"
          style={{
            background: "var(--color-bg-pure)",
            borderColor: "var(--color-border-light)",
          }}
        >
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-9 h-9 flex items-center justify-center rounded-xl border text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg)] transition-all cursor-pointer"
            style={{ borderColor: "var(--color-border)" }}
          >
            {sidebarOpen ? <X size={17} /> : <Menu size={17} />}
          </button>

          <div className="ml-auto flex items-center gap-3">
            {/* Notification bell */}
            <button className="relative w-9 h-9 flex items-center justify-center rounded-xl border text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg)] transition-all cursor-pointer" style={{ borderColor: "var(--color-border)" }}>
              <Bell size={17} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full border-2 border-white" />
            </button>

            {/* Avatar */}
            <div className="flex items-center gap-2.5 pl-3 border-l" style={{ borderColor: "var(--color-border)" }}>
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-semibold"
                style={{ background: "linear-gradient(135deg, #1b4332, #40916c)" }}
              >
                A
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-[var(--color-text)] leading-none">Admin</p>
                <p className="text-xs text-[var(--color-text-muted)] font-light mt-0.5">Super Admin</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
