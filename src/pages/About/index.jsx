import React from "react";
import { Shield, Heart, Award, Activity, ArrowRight } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] overflow-hidden pb-20">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center animate-[fadeUp_1s_ease-out]">
        <div className="inline-block px-4 py-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-pure)] text-sm font-medium mb-6 text-[var(--color-text-soft)] shadow-sm">
          About MediBook
        </div>
        <h1 className="heading-editorial text-5xl md:text-7xl mb-6 max-w-4xl tracking-tight text-[var(--color-text)]">
          Redefining Healthcare <br className="hidden md:block" />
          <span className="text-[var(--color-accent)] italic font-light">With Compassion</span>
        </h1>
        <p className="text-lg md:text-xl text-[var(--color-text-soft)] max-w-2xl font-light">
          We believe that accessing quality healthcare should be seamless, transparent, and built on trust. MediBook is your partner in a healthier tomorrow.
        </p>
      </section>

      {/* Story / Vision Section */}
      <section className="py-24 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative animate-[reveal_1.2s_ease-out]">
            <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-accent-light)] to-transparent opacity-50 rounded-3xl blur-2xl transform -rotate-6"></div>
            <img
              src="https://images.pexels.com/photos/7446997/pexels-photo-7446997.jpeg"
              alt="Medical Professionals"
              className="relative w-full h-[500px] object-cover rounded-3xl shadow-xl hover:scale-[1.02] transition-transform duration-700 ease-in-out"
            />
            <div className="absolute -bottom-8 -right-8 bg-[var(--color-bg-pure)] p-8 rounded-2xl shadow-lg border border-[var(--color-border-light)] hidden md:block animate-[float_6s_ease-in-out_infinite]">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[var(--color-accent-light)] flex items-center justify-center text-[var(--color-accent)]">
                  <Activity size={24} />
                </div>
                <div>
                  <p className="font-semibold text-xl">10k+</p>
                  <p className="text-sm text-[var(--color-text-soft)]">Patients Helped</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div>
              <h2 className="heading-editorial text-4xl mb-4 text-[var(--color-text)]">Our Story</h2>
              <p className="text-[var(--color-text-soft)] text-lg font-light leading-relaxed">
                Founded in 2026, MediBook emerged from a simple observation: navigating healthcare appointments was too complicated. We set out to build a platform that bridges the gap between exceptional medical practitioners and the patients who need them most.
              </p>
            </div>
            <div className="rule"></div>
            <div>
              <h2 className="heading-editorial text-4xl mb-4 text-[var(--color-text)]">Our Vision</h2>
              <p className="text-[var(--color-text-soft)] text-lg font-light leading-relaxed">
                A world where healthcare is accessible, empathetic, and technologically advanced. We empower doctors to focus on what they do best—caring for patients—while we handle the rest.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-[var(--color-bg-pure)] border-y border-[var(--color-border-light)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="heading-editorial text-4xl md:text-5xl mb-4">Core Values</h2>
            <p className="text-[var(--color-text-soft)] text-lg max-w-2xl mx-auto font-light">
              The principles that guide our decisions and shape our culture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                icon: <Heart size={32} strokeWidth={1.5} />,
                title: "Empathy First",
                desc: "We understand that behind every appointment is a person seeking care. We design for their peace of mind."
              },
              {
                icon: <Shield size={32} strokeWidth={1.5} />,
                title: "Unwavering Trust",
                desc: "Security and privacy are not features; they are the foundation of everything we build."
              },
              {
                icon: <Award size={32} strokeWidth={1.5} />,
                title: "Excellence",
                desc: "We continuously refine our platform to deliver the highest standard of service for both patients and doctors."
              }
            ].map((val, idx) => (
              <div
                key={idx}
                className="group p-8 rounded-3xl bg-[var(--color-bg)] border border-[var(--color-border-light)] hover:border-[var(--color-accent)] transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-2xl bg-[var(--color-bg-pure)] flex items-center justify-center text-[var(--color-accent)] mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                  {val.icon}
                </div>
                <h3 className="text-2xl font-serif mb-3 text-[var(--color-text)]">{val.title}</h3>
                <p className="text-[var(--color-text-soft)] leading-relaxed font-light">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 lg:px-8 text-center relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--color-accent-light)] opacity-20"></div>
        <div className="max-w-3xl mx-auto relative z-10 animate-[fadeUp_1s_ease-out_0.5s]">
          <h2 className="heading-editorial text-4xl md:text-6xl mb-6">Join the Revolution</h2>
          <p className="text-xl text-[var(--color-text-soft)] mb-10 font-light">
            Whether you're a healthcare provider or a patient, experience the future of medical appointments today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 rounded-full bg-[var(--color-text)] text-white hover:bg-[var(--color-accent)] transition-colors duration-300 text-lg font-medium flex items-center justify-center gap-2 group shadow-lg">
              Book an Appointment
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 rounded-full bg-[var(--color-bg-pure)] border border-[var(--color-border)] text-[var(--color-text)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors duration-300 text-lg font-medium shadow-sm">
              Partner with Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
