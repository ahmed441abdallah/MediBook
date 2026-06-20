import { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllDoctors } from "@/store/acrions/doctorActions";

export default function SpecialistsSection() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { doctorList } = useSelector((state) => state.doctor);

  useEffect(() => {
    // Only fetch if we don't have enough or at all
    if (doctorList.length < 8) {
      dispatch(getAllDoctors(1, 8));
    }
  }, [dispatch, doctorList.length]);

  const displayDoctors = doctorList.slice(0, 8);

  return (
    <section id="specialists" className="py-24 lg:py-40" style={{ backgroundColor: "var(--color-bg)" }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 lg:mb-24">
          <div>
            <p
              className="text-[12px] uppercase tracking-[0.25em] font-semibold mb-4"
              style={{ color: "var(--color-text-muted)" }}
            >
              World-Class Specialists
            </p>
            <h2 className="heading-editorial text-[clamp(2.5rem,5vw,4.5rem)]" style={{ color: "var(--color-text)" }}>
              The Minds Behind
              <br />
              Your <em style={{ color: "var(--color-accent)" }}>Wellbeing</em>
            </h2>
          </div>

          <button
            onClick={() => navigate("/doctors")}
            className="group flex items-center gap-2 text-[13px] uppercase tracking-[0.15em] font-medium cursor-pointer transition-colors duration-200 self-start md:self-auto bg-transparent border-none"
            style={{ color: "var(--color-accent)" }}
          >
            <span>View All Physicians</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>

        {/* Doctor grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {displayDoctors.map((doc) => (
            <article
              key={doc._id}
              onClick={() => navigate(`/doctors/${doc._id}`)}
              className="group cursor-pointer"
            >
              {/* Image */}
              <div className="relative overflow-hidden mb-6 aspect-[3/4]">
                <img
                  src={doc.profile_picture}
                  alt={`Portrait of ${doc.name}`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                  style={{ filter: "grayscale(80%) contrast(1.1) brightness(0.95)" }}
                  onMouseEnter={(e) => (e.target.style.filter = "grayscale(0%) contrast(1) brightness(1)")}
                  onMouseLeave={(e) => (e.target.style.filter = "grayscale(80%) contrast(1.1) brightness(0.95)")}
                />
                {/* Hover overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-8"
                  style={{
                    background: "linear-gradient(to top, rgba(27,67,50,0.8) 0%, transparent 70%)",
                  }}
                >
                  <span className="text-[12px] uppercase tracking-[0.2em] text-white font-semibold">
                    View Profile →
                  </span>
                </div>
              </div>

              {/* Info */}
              <p
                className="text-[12px] uppercase tracking-[0.2em] font-semibold mb-2"
                style={{ color: "var(--color-accent)" }}
              >
                {doc.specialization}
              </p>
              <h3
                className="heading-editorial text-2xl mb-1"
                style={{ color: "var(--color-text)" }}
              >
                {doc.name}
              </h3>
              <p
                className="text-[14px] font-light"
                style={{ color: "var(--color-text-soft)" }}
              >
                {doc.degree}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
