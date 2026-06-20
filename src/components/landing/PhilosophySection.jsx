export default function PhilosophySection() {
  return (
    <section id="philosophy" className="py-24 lg:py-40" style={{ backgroundColor: "var(--color-bg-pure)" }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-32 items-center">

          {/* Left — Label + quote */}
          <div>
            <p
              className="text-[12px] uppercase tracking-[0.3em] font-semibold mb-8"
              style={{ color: "var(--color-text-muted)" }}
            >
              Our Philosophy
            </p>

            <blockquote className="heading-editorial text-[clamp(2.2rem,4vw,3.5rem)] leading-[1.1]" style={{ color: "var(--color-text)" }}>
              "We believe medicine should be{" "}
              <em style={{ color: "var(--color-accent)" }}>personal</em>,
              {" "}unhurried, and{" "}
              <em style={{ color: "var(--color-accent)" }}>uncompromising</em>
              {" "}in its pursuit of excellence."
            </blockquote>

            <div className="mt-12 flex items-center gap-4">
              <div className="w-16 h-px" style={{ backgroundColor: "var(--color-accent)" }} />
              <p className="text-[12px] uppercase tracking-[0.2em] font-medium" style={{ color: "var(--color-text-soft)" }}>
                Dr. Sarah Mitchell, Founder
              </p>
            </div>
          </div>

          {/* Right — Body text blocks */}
          <div className="flex flex-col gap-12 lg:pl-16 border-l" style={{ borderColor: "var(--color-border)" }}>
            {[
              {
                title: "Bespoke Patient Care",
                text: "Every consultation begins with understanding you — your history, your concerns, and your goals. We reject the one-size-fits-all approach, crafting individualized treatment plans that honor the complexity of your health.",
              },
              {
                title: "Curated Expertise",
                text: "Our specialists are selected through a rigorous credentialing process. Each physician brings not only exceptional qualifications but a genuine commitment to patient-centered medicine.",
              },
              {
                title: "Unhurried Excellence",
                text: "We intentionally limit our patient load. This means longer consultations, deeper dialogue, and the attentive care that modern medicine too often sacrifices for efficiency.",
              },
            ].map(({ title, text }) => (
              <div key={title} className="pl-6">
                <h3
                  className="text-[14px] uppercase tracking-[0.15em] font-semibold mb-4"
                  style={{ color: "var(--color-text)" }}
                >
                  {title}
                </h3>
                <p className="text-[16px] leading-[1.8] font-light" style={{ color: "var(--color-text-soft)" }}>
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
