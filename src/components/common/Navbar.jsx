import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LogOut, UserCircle2 } from "lucide-react";
import { LOGOUT_USER_SUCCESS } from "@/store/types";

const NAV_LINKS = [
  { name: "About", path: "/about" },
  { name: "All Doctors", path: "/doctors" },
  { name: "Specialists", path: "/#specialties" },
  { name: "Services", path: "/#services" },
  { name: "Blog", path: "/blog" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { token } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: LOGOUT_USER_SUCCESS });
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled
        ? "bg-white/95 backdrop-blur-md border-b"
        : "bg-transparent border-b border-transparent"
        }`}
      style={{ borderColor: scrolled ? "var(--color-border)" : "transparent" }}
    >
      <nav className="max-w-[1400px] mx-auto px-6 md:px-10 flex items-center justify-between h-20">
        {/* Logo */}
        <a
          href="/"
          className="flex items-baseline gap-0.5 cursor-pointer select-none group"
        >
          <span
            className={`heading-editorial text-2xl tracking-[-0.04em] transition-colors duration-500 ${scrolled ? "text-[#1A1A1A]" : "text-white"}`}
          >
            Medi
          </span>
          <span
            className="heading-editorial text-2xl tracking-[-0.04em] transition-colors duration-500"
            style={{ color: "var(--color-accent)" }}
          >
            Book
          </span>
          <span
            className="w-1.5 h-1.5 rounded-full ml-0.5 mb-0.5 inline-block transition-colors duration-500"
            style={{ backgroundColor: "var(--color-accent)" }}
          />
        </a>

        {/* Center links — desktop */}
        <ul className="hidden lg:flex items-center gap-10">
          {NAV_LINKS.map((l) => (
            <li key={l.name}>
              <a
                href={l.path}
                className={`text-[13px] font-medium uppercase tracking-[0.15em] transition-colors duration-200 cursor-pointer ${scrolled ? "text-[#555555] hover:text-[#1A1A1A]" : "text-white/80 hover:text-white"}`}
              >
                {l.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Right — CTA + hamburger */}
        <div className="flex items-center gap-3">
          {token ? (
            /* ── Logged-in state ── */
            <div className="hidden sm:flex items-center gap-2">
              <a
                href="/profile"
                className={`flex items-center gap-1.5 text-[13px] font-medium uppercase tracking-[0.15em] transition-colors duration-200 cursor-pointer ${scrolled ? "text-[#555] hover:text-[#1A1A1A]" : "text-white/80 hover:text-white"
                  }`}
              >
                <UserCircle2 size={16} />
                My Account
              </a>
              <button
                onClick={handleLogout}
                className={`flex items-center gap-1.5 text-[13px] font-medium uppercase tracking-[0.15em] px-4 py-2.5 border cursor-pointer transition-all duration-300 ${scrolled
                  ? "border-red-300 text-red-500 hover:bg-red-500 hover:text-white"
                  : "border-white/40 text-white/80 hover:bg-white/10"
                  }`}
              >
                <LogOut size={14} />
                Logout
              </button>
            </div>
          ) : (
            /* ── Guest state ── */
            <a
              href="/register"
              className={`hidden sm:block text-[13px] font-medium uppercase tracking-[0.15em] px-6 py-3 border cursor-pointer transition-all duration-300 ${scrolled
                ? "border-[#1B4332] text-[#1B4332] hover:bg-[#1B4332] hover:text-white"
                : "border-white text-white hover:bg-white hover:text-black"
                }`}
            >
              Create Account
            </a>
          )}

          {/* Hamburger — mobile & tablet */}
          <button
            className="lg:hidden flex flex-col justify-center items-end gap-[5px] w-8 h-8 cursor-pointer"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <span
              className="block h-[1.5px] transition-all duration-300"
              style={{
                width: open ? "24px" : "24px",
                backgroundColor: scrolled ? "var(--color-text)" : "#ffffff",
                transform: open ? "rotate(45deg) translateY(6.5px)" : "none",
              }}
            />
            <span
              className="block h-[1.5px] w-4 transition-all duration-300"
              style={{
                backgroundColor: scrolled ? "var(--color-text)" : "#ffffff",
                opacity: open ? 0 : 1,
              }}
            />
            <span
              className="block h-[1.5px] transition-all duration-300"
              style={{
                width: open ? "24px" : "16px",
                backgroundColor: scrolled ? "var(--color-text)" : "#ffffff",
                transform: open ? "rotate(-45deg) translateY(-6.5px)" : "none",
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-400 ${open ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
          }`}
        style={{ backgroundColor: "var(--color-bg-pure)" }}
      >
        <div
          className="px-6 py-8 flex flex-col gap-5 border-t"
          style={{ borderColor: "var(--color-border)" }}
        >
          {NAV_LINKS.map((l) => (
            <a
              key={l.name}
              href={l.path}
              onClick={() => setOpen(false)}
              className="text-sm font-medium uppercase tracking-[0.15em] cursor-pointer"
              style={{ color: "var(--color-text-soft)" }}
            >
              {l.name}
            </a>
          ))}
          {/* Mobile auth buttons */}
          <div
            className="pt-4 border-t flex flex-col gap-3"
            style={{ borderColor: "var(--color-border)" }}
          >
            {token ? (
              <>
                <a
                  href="/profile"
                  className="flex items-center gap-2 text-sm font-medium uppercase tracking-[0.15em] cursor-pointer"
                  style={{ color: "var(--color-accent)" }}
                  onClick={() => setOpen(false)}
                >
                  <UserCircle2 size={15} /> My Account
                </a>
                <button
                  onClick={() => { handleLogout(); setOpen(false); }}
                  className="flex items-center gap-2 text-sm font-medium uppercase tracking-[0.15em] text-red-500 cursor-pointer"
                >
                  <LogOut size={15} /> Logout
                </button>
              </>
            ) : (
              <a
                href="/register"
                className="inline-block text-[13px] font-medium uppercase tracking-[0.15em] px-5 py-2.5 border cursor-pointer"
                style={{ color: "var(--color-accent)", borderColor: "var(--color-accent)" }}
              >
                Create Account
              </a>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
