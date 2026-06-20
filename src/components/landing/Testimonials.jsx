import { useState } from "react";

const QUOTES = [
  {
    text: "For the first time in years, I felt genuinely listened to. The consultation was unhurried, deeply thorough, and the follow-up care has been extraordinary. This is what medicine should feel like.",
    name: "Catherine L.",
    detail: "Cardiology Patient · New York",
  },
  {
    text: "MediBook connected me with a specialist who changed everything. The entire experience — from booking to the consultation itself — felt remarkably refined. I can't recommend this enough.",
    name: "Marcus T.",
    detail: "Neurology Patient · London",
  },
  {
    text: "As someone who values privacy and quality, MediBook exceeded every expectation. The concierge service managed all my appointments seamlessly. It's healthcare that truly respects your time.",
    name: "Priya K.",
    detail: "Dermatology Patient · Dubai",
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const q = QUOTES[active];

  return (
    <section className="py-24 lg:py-40" style={{ backgroundColor: "var(--color-bg)" }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid lg:grid-cols-[340px_1fr] gap-16 lg:gap-24">

          {/* Left — label + navigation */}
          <div className="flex flex-col justify-between">
            <div>
              <p
                className="text-[12px] uppercase tracking-[0.25em] font-semibold mb-4"
                style={{ color: "var(--color-text-muted)" }}
              >
                Patient Voices
              </p>
              <h2
                className="heading-editorial text-[clamp(2.5rem,4vw,3.5rem)] leading-[1.1]"
                style={{ color: "var(--color-text)" }}
              >
                Stories of{" "}
                <em style={{ color: "var(--color-accent)" }}>Trust</em>
              </h2>
            </div>

            {/* Dots */}
            <div className="flex items-center gap-3 mt-12 lg:mt-0">
              {QUOTES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`Testimonial ${i + 1}`}
                  className="transition-all duration-300 cursor-pointer"
                  style={{
                    width: i === active ? 32 : 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor:
                      i === active
                        ? "var(--color-accent)"
                        : "var(--color-border)",
                  }}
                />
              ))}
              <span
                className="ml-4 text-[12px] font-medium tabular-nums"
                style={{ color: "var(--color-text-muted)" }}
              >
                {String(active + 1).padStart(2, "0")} / {String(QUOTES.length).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* Right — Quote */}
          <div
            className="flex flex-col justify-center border-l pl-12 lg:pl-20"
            style={{ borderColor: "var(--color-border)" }}
          >
            <blockquote
              className="heading-editorial text-[clamp(1.5rem,3vw,2.5rem)] leading-[1.35] mb-12 font-light"
              style={{ color: "var(--color-text)" }}
            >
              "{q.text}"
            </blockquote>

            <div className="flex items-center gap-4">
              <div
                className="w-12 h-px"
                style={{ backgroundColor: "var(--color-accent)" }}
              />
              <div>
                <p
                  className="text-[14px] font-semibold mb-1"
                  style={{ color: "var(--color-text)" }}
                >
                  {q.name}
                </p>
                <p
                  className="text-[12px] uppercase tracking-[0.1em]"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {q.detail}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
