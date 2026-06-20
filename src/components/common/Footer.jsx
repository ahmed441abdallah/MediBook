import { ArrowRight } from "lucide-react";

const FOOTER_LINKS = {
  Explore: [
    "Find a Specialist",
    "Our Philosophy",
    "Concierge Services",
    "Patient Stories",
  ],
  Clinic: ["About Us", "Careers", "Press", "Partnerships"],
  Legal: [
    "Privacy Policy",
    "Terms of Service",
    "Cookie Policy",
    "Accessibility",
  ],
};

export default function Footer() {
  return (
    <footer
      style={{ backgroundColor: "var(--color-text)", color: "var(--color-bg)" }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Top — Newsletter + CTA */}
        <div
          className="py-20 md:py-28 grid md:grid-cols-[1fr_1fr] gap-12 items-center border-b"
          style={{ borderColor: "rgba(255,255,255,0.08)" }}
        >
          <div>
            <h2 className="heading-editorial text-[clamp(2rem,4vw,3.2rem)] leading-[1.1] mb-4 text-white">
              Begin Your{" "}
              <em style={{ color: "var(--color-accent-light)" }}>Journey</em>
            </h2>
            <p
              className="text-[15px] leading-[1.8]"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              Subscribe to receive curated health insights, specialist
              highlights, and exclusive invitations to private consultations.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {/* Email input */}
            <div
              className="flex border"
              style={{ borderColor: "rgba(255,255,255,0.15)" }}
            >
              <input
                id="footer-email"
                type="email"
                placeholder="Your email address"
                aria-label="Email for newsletter"
                className="flex-1 bg-transparent px-5 py-4 text-[14px] text-white placeholder:text-white/30 outline-none font-medium"
              />
              <button
                className="flex items-center gap-2 px-6 py-4 text-[13px] uppercase tracking-[0.15em] font-semibold text-white cursor-pointer transition-colors duration-300 group"
                style={{ backgroundColor: "var(--color-accent)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    "var(--color-accent-hover)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    "var(--color-accent)")
                }
              >
                Subscribe
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>
            </div>
            <p
              className="text-[12px]"
              style={{ color: "rgba(255,255,255,0.25)" }}
            >
              By subscribing, you agree to our Privacy Policy. Unsubscribe at
              any time.
            </p>
          </div>
        </div>

        {/* Middle — Links */}
        <div
          className="py-16 grid grid-cols-2 md:grid-cols-4 gap-10 border-b"
          style={{ borderColor: "rgba(255,255,255,0.08)" }}
        >
          {/* Brand column */}
          <div>
            <div className="flex items-baseline gap-0.5 mb-5">
              <span className="heading-editorial text-2xl text-white tracking-[-0.04em]">
                Medi
              </span>
              <span
                className="heading-editorial text-2xl tracking-[-0.04em]"
                style={{ color: "var(--color-accent-light)" }}
              >
                Book
              </span>
              <span
                className="w-1.5 h-1.5 rounded-full ml-0.5 mb-0.5 inline-block"
                style={{ backgroundColor: "var(--color-accent-light)" }}
              />
            </div>
            <p
              className="text-[13px] leading-[1.7]"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              Exceptional care.
              <br />
              Elevated experience.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([cat, links]) => (
            <div key={cat}>
              <p
                className="text-[12px] uppercase tracking-[0.2em] font-semibold mb-5"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                {cat}
              </p>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-[13px] transition-colors duration-200 cursor-pointer"
                      style={{ color: "rgba(255,255,255,0.35)" }}
                      onMouseEnter={(e) =>
                        (e.target.style.color = "rgba(255,255,255,0.8)")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.color = "rgba(255,255,255,0.35)")
                      }
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[12px]" style={{ color: "rgba(255,255,255,0.2)" }}>
            © {new Date().getFullYear()} MediBook, Inc. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Accessibility"].map((l) => (
              <a
                key={l}
                href="#"
                className="text-[12px] transition-colors duration-200 cursor-pointer"
                style={{ color: "rgba(255,255,255,0.2)" }}
                onMouseEnter={(e) =>
                  (e.target.style.color = "rgba(255,255,255,0.5)")
                }
                onMouseLeave={(e) =>
                  (e.target.style.color = "rgba(255,255,255,0.2)")
                }
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
