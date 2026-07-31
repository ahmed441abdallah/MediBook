import React, { useState } from "react";
import { ArrowRight, Calendar, Clock, User, Tag, ChevronRight } from "lucide-react";

// Dummy data
const CATEGORIES = ["All", "Medical News", "Healthy Living", "Innovations", "Patient Stories", "Nutrition"];

const FEATURED_POST = {
  id: 1,
  title: "The Future of Telemedicine: How Digital Healthcare is Evolving in 2026",
  excerpt: "Discover the latest breakthroughs in remote patient monitoring, AI-driven diagnostics, and how virtual care is fundamentally reshaping the doctor-patient relationship globally.",
  category: "Medical News",
  author: "Dr. Sarah Mitchell",
  image: "https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=1200",
};

const BLOG_POSTS = [
  {
    id: 2,
    title: "10 Superfoods That Naturally Boost Your Immune System",
    excerpt: "Learn which everyday ingredients can help fortify your body's natural defenses against seasonal illnesses.",
    category: "Nutrition",
    author: "Emma Watson",
    date: "Jun 14, 2026",
    readTime: "5 min",
    image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 3,
    title: "Understanding Sleep Apnea: Symptoms and Treatments",
    excerpt: "Millions suffer from sleep apnea. We break down the warning signs and modern treatments available.",
    category: "Healthy Living",
    author: "Dr. Nathan Pierce",
    date: "Jun 12, 2026",
    readTime: "6 min",
    image: "https://images.pexels.com/photos/935777/pexels-photo-935777.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 4,
    title: "Breakthrough in Alzheimer's Research",
    excerpt: "A promising clinical trial has shown unprecedented results in slowing cognitive decline.",
    category: "Innovations",
    author: "Dr. James Hartwell",
    date: "Jun 10, 2026",
    readTime: "10 min",
    image: "https://images.pexels.com/photos/8460159/pexels-photo-8460159.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 5,
    title: "Recovering from Major Heart Surgery",
    excerpt: "A patient shares their candid experience traversing the emotional and physical hurdles of bypass surgery.",
    category: "Patient Stories",
    author: "Michael T.",
    date: "Jun 08, 2026",
    readTime: "12 min",
    image: "https://images.pexels.com/photos/2324837/pexels-photo-2324837.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 6,
    title: "Managing Stress in a Hyper-Connected World",
    excerpt: "Actionable mental health strategies for disconnecting and preventing burnout.",
    category: "Healthy Living",
    author: "Dr. Laura Bennett",
    date: "Jun 05, 2026",
    readTime: "7 min",
    image: "https://images.pexels.com/photos/3759657/pexels-photo-3759657.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 7,
    title: "Wearable Health Tech: Fad or Future?",
    excerpt: "From smart rings to heart monitors, we evaluate which wearables provide actionable clinical data.",
    category: "Innovations",
    author: "Tech Desk",
    date: "Jun 01, 2026",
    readTime: "9 min",
    image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPosts = BLOG_POSTS.filter((post) =>
    activeCategory === "All" ? true : post.category === activeCategory
  );

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]" style={{ animation: "fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both" }}>

      {/* ── Editorial Header ───────────────────────────────────────────────── */}
      <header className="pt-32 pb-16 px-6 md:px-10 border-b" style={{ borderColor: "var(--color-border-light)" }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <span className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] mb-4 text-[var(--color-accent)]">
                The MediBook Journal
              </span>
              <h1 className="heading-editorial text-5xl md:text-7xl leading-[1.1] tracking-tight">
                Healthcare insights & <br />
                <em className="text-[var(--color-text-soft)] italic font-light">medical breakthroughs</em>
              </h1>
            </div>
            <p className="text-sm text-[var(--color-text-muted)] max-w-sm font-light leading-relaxed">
              Curated perspectives from world-class specialists, exploring the intersection of modern medicine, wellness, and human resilience.
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-6 md:px-10 py-16">

        {/* ── Categories ──────────────────────────────────────────────── */}
        <div className="flex items-center gap-6 md:gap-10 overflow-x-auto hide-scrollbar mb-16 pb-4 border-b" style={{ borderColor: "var(--color-border-light)" }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="relative text-[12px] uppercase tracking-[0.15em] font-medium whitespace-nowrap transition-colors duration-300 cursor-pointer"
              style={{
                color: activeCategory === cat ? "var(--color-text)" : "var(--color-text-muted)",
              }}
            >
              {cat}
              {activeCategory === cat && (
                <span
                  className="absolute -bottom-[17px] left-0 right-0 h-[2px] bg-[var(--color-text)] rounded-full"
                  style={{ animation: "fadeUp 0.3s ease-out both" }}
                />
              )}
            </button>
          ))}
        </div>


        {/* ── Articles Grid ──────────────────────────────────────────────── */}
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-10">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post, i) => (
              <article
                key={post.id}
                className="group flex flex-col cursor-pointer"
                style={{ animation: "fadeUp 0.5s ease-out both", animationDelay: `${i * 100}ms` }}
              >
                <div className="relative aspect-[4/3] overflow-hidden mb-6 rounded-sm bg-[var(--color-bg)]">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ filter: "brightness(0.96)" }}
                  />
                </div>

                <div className="flex flex-col flex-1">
                  <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-[var(--color-accent)] mb-3">
                    <span>{post.category}</span>
                    <span className="w-1 h-1 rounded-full bg-[var(--color-border)]" />
                    <span className="text-[var(--color-text-muted)] flex items-center gap-1"><Clock size={10} /> {post.readTime}</span>
                  </div>

                  <h3 className="heading-editorial text-2xl leading-snug mb-3 group-hover:text-[var(--color-accent)] transition-colors duration-300">
                    {post.title}
                  </h3>

                  <p className="text-sm text-[var(--color-text-soft)] font-light leading-relaxed mb-6 flex-1 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between border-t pt-4" style={{ borderColor: "var(--color-border-light)" }}>
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-[var(--color-text)]">{post.author}</span>
                      <span className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider mt-0.5">{post.date}</span>
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-text)] flex items-center gap-1 group-hover:text-[var(--color-accent)] transition-colors">
                      Read <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="col-span-full py-24 text-center border-t border-b" style={{ borderColor: "var(--color-border-light)" }}>
              <Tag size={32} strokeWidth={1} className="mx-auto mb-6 text-[var(--color-text-muted)]" />
              <h3 className="heading-editorial text-3xl text-[var(--color-text)] mb-3">No articles found</h3>
              <p className="text-[var(--color-text-muted)] font-light">There are currently no publications under "{activeCategory}".</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
