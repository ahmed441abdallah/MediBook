import React from "react";
import { Outlet, useNavigate, Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LogOut, CalendarDays, LayoutDashboard, User, Stethoscope } from "lucide-react";
import { doctorLogout } from "@/store/acrions/doctorActions";

const SIDEBAR_LINKS = [
  { name: "Dashboard", path: "/doctor-dashboard", icon: LayoutDashboard },
  { name: "Appointments", path: "/doctor-dashboard/appointments", icon: CalendarDays },
  { name: "My Profile", path: "/doctor-dashboard/profile", icon: User },
];

export default function DoctorLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(doctorLogout());
    navigate("/doctor/login");
  };

  return (
    <div className="flex h-screen bg-[var(--color-bg)]">
      {/* ── Sidebar ── */}
      <aside className="w-64 bg-white border-r flex flex-col justify-between" style={{ borderColor: "var(--color-border-light)" }}>
        <div>
          {/* Logo */}
          <div className="h-20 flex items-center px-8 border-b" style={{ borderColor: "var(--color-border-light)" }}>
            <Link to="/doctor-dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                <Stethoscope size={18} className="text-blue-600" />
              </div>
              <span className="font-semibold text-lg text-[#1a1a1a] tracking-tight">Doctor Portal</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="p-4 space-y-2">
            {SIDEBAR_LINKS.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive 
                      ? "bg-blue-50 text-blue-600" 
                      : "text-[var(--color-text-muted)] hover:bg-[var(--color-bg)] hover:text-[#1a1a1a]"
                  }`}
                >
                  <Icon size={18} className={isActive ? "text-blue-600" : "text-gray-400"} />
                  <span className="font-medium text-[13px] uppercase tracking-wider">{link.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Logout */}
        <div className="p-4 border-t" style={{ borderColor: "var(--color-border-light)" }}>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all duration-200"
          >
            <LogOut size={18} />
            <span className="font-medium text-[13px] uppercase tracking-wider">Logout</span>
          </button>
        </div>
      </aside>

      {/* ── Main Content Area ── */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="h-20 bg-white border-b px-8 flex items-center justify-between flex-shrink-0" style={{ borderColor: "var(--color-border-light)" }}>
          <h1 className="text-xl font-semibold" style={{ color: "var(--color-text)", fontFamily: "var(--font-serif)", letterSpacing: "-0.02em" }}>
            {SIDEBAR_LINKS.find((l) => l.path === location.pathname)?.name || "Dashboard"}
          </h1>
          <div className="flex items-center gap-4">
             {/* Future: Notifications, User Avatar */}
             <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold">
                DR
             </div>
          </div>
        </header>
        
        {/* Scrollable Content */}
        <div className="flex-1 overflow-auto p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
