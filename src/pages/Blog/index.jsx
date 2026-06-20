import React, { useState, useEffect } from "react";
import { ArrowRight, Calendar, Clock, User, Tag, ChevronRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "@/store/acrions/blogActions";

const CATEGORIES = ["All", "Medical News", "Healthy Living", "Innovations", "Patient Stories", "Nutrition"];
const LIMIT = 6;

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  const { blogs, totalBlogs, loading } = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(getAllBlogs(page, LIMIT, activeCategory));
  }, [page, activeCategory, dispatch]);

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setPage(1);
  };

  const totalPages = Math.ceil((totalBlogs || 0) / LIMIT);

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
              onClick={() => handleCategoryChange(cat)}
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
        {loading && blogs.length === 0 ? (
           <div className="py-20 text-center text-[var(--color-text-muted)]">
             <div className="w-8 h-8 mx-auto border-2 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin mb-4"></div>
             Loading articles...
           </div>
        ) : (
          <>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-10">
              {blogs?.length > 0 ? (
                blogs.map((post, i) => (
                  <article
                    key={post._id}
                    className="group flex flex-col cursor-pointer"
                    style={{ animation: "fadeUp 0.5s ease-out both", animationDelay: `${(i % LIMIT) * 100}ms` }}
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
                        <span className="text-[var(--color-text-muted)] flex items-center gap-1"><Clock size={10} /> 5 min</span>
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
                          <span className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider mt-0.5">
                             {new Date(post.createdAt).toLocaleDateString()}
                          </span>
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

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-16 flex items-center justify-center gap-2">
                <button
                  disabled={page === 1}
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  className="w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 disabled:opacity-30 cursor-pointer"
                  style={{ borderColor: "var(--color-border)" }}
                >
                  &larr;
                </button>
                <span className="text-sm font-medium px-4">
                  Page {page} of {totalPages}
                </span>
                <button
                  disabled={page === totalPages}
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  className="w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 disabled:opacity-30 cursor-pointer"
                  style={{ borderColor: "var(--color-border)" }}
                >
                  &rarr;
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
