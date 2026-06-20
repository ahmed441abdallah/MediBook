import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const HERO_IMAGE =
  "https://images.pexels.com/photos/5452209/pexels-photo-5452209.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&fit=crop";

export default function HeroSection() {
  return (
    <section
      id="find-doctors"
      className="relative min-h-screen flex items-center justify-center"
    >
      {/* ── BACKGROUND IMAGE ── */}
      <div className="absolute inset-0 z-0 bg-black">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat opacity-60"
          style={{
            backgroundImage: `url('${HERO_IMAGE}')`,
            filter: "grayscale(20%) brightness(0.7) contrast(1.15)",
          }}
        />
        {/* Subtle overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70" />
      </div>

      {/* ── CONTENT ── */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-10 flex flex-col items-center text-center mt-12 text-white">
        {/* Eyebrow */}
        <p className="animate-[fadeUp_1s_ease-out_both] text-[11px] md:text-[13px] uppercase tracking-[0.3em] font-semibold mb-6 text-white/80">
          Est. 2024 — Premium Healthcare
        </p>

        {/* Headline */}
        <h1 className="animate-[fadeUp_1s_ease-out_0.2s_both] heading-editorial text-[clamp(3.5rem,8vw,7.5rem)] leading-[1.05] mb-8 font-light text-white drop-shadow-sm">
          Exceptional Care.
          <br />
          <span
            className="italic font-normal"
            style={{ color: "var(--color-accent-light)" }}
          >
            Elevated
          </span>{" "}
          Experience.
        </h1>

        {/* Premium Button */}
        <div className="animate-[fadeUp_1s_ease-out_0.6s_both]">
          <Button
            variant="outline"
            className="group relative h-auto py-5 px-10 mb-2 text-[13px] uppercase tracking-[0.15em] font-semibold rounded-none bg-transparent border-white text-white hover:bg-white hover:text-black transition-all duration-500 overflow-hidden cursor-pointer"
          >
            <Link to="/doctors" className="relative z-10 flex items-center">
              Book an Appointment
              <ArrowRight className="w-4 h-4 ml-3 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 animate-[fadeUp_1s_ease-out_1s_both]">
        <div className="w-[1px] h-12 bg-white/20 overflow-hidden">
          <div className="w-full h-full bg-white animate-[fadeUp_1.5s_ease-in-out_infinite_alternate]" />
        </div>
      </div>
    </section>
  );
}
