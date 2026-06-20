import React from "react";

// ─── Single skeleton card ────────────────────────────────────────────────────
function SkeletonCard() {
    return (
        <div
            className="bg-[var(--color-bg-pure)] rounded-2xl border overflow-hidden flex flex-col"
            style={{ borderColor: "var(--color-border-light)" }}
        >
            {/* Avatar shimmer */}
            <div className="relative h-44 bg-[var(--color-bg)] overflow-hidden">
                <div className="absolute inset-0 skeleton-shimmer" />
            </div>

            {/* Content shimmer */}
            <div className="p-4 flex flex-col gap-3">
                {/* Name */}
                <div className="h-4 rounded-lg w-2/3 bg-[var(--color-border)] overflow-hidden relative">
                    <div className="absolute inset-0 skeleton-shimmer" />
                </div>
                {/* Specialization badge */}
                <div className="h-3.5 rounded-lg w-1/2 bg-[var(--color-border)] overflow-hidden relative">
                    <div className="absolute inset-0 skeleton-shimmer" />
                </div>

                {/* Divider */}
                <div className="h-px bg-[var(--color-border-light)]" />

                {/* Stats row */}
                <div className="flex items-center justify-between gap-2">
                    <div className="h-3 rounded-lg w-1/3 bg-[var(--color-border)] overflow-hidden relative">
                        <div className="absolute inset-0 skeleton-shimmer" />
                    </div>
                    <div className="h-3 rounded-lg w-1/4 bg-[var(--color-border)] overflow-hidden relative">
                        <div className="absolute inset-0 skeleton-shimmer" />
                    </div>
                </div>

                {/* Button shimmer */}
                <div className="h-9 rounded-xl w-full bg-[var(--color-accent-light)] overflow-hidden relative mt-1">
                    <div className="absolute inset-0 skeleton-shimmer" />
                </div>
            </div>
        </div>
    );
}

// ─── Main loading component ──────────────────────────────────────────────────
export function DoctorsLoading({ count = 8 }) {
    return (
        <div className="space-y-6" style={{ animation: "fadeUp 0.4s ease-out both" }}>
            {/* Header skeleton */}
            <div className="flex items-center justify-between">
                <div className="space-y-2">
                    <div
                        className="h-7 w-48 rounded-xl bg-[var(--color-border)] overflow-hidden relative"
                    >
                        <div className="absolute inset-0 skeleton-shimmer" />
                    </div>
                    <div
                        className="h-3.5 w-64 rounded-lg bg-[var(--color-border)] overflow-hidden relative"
                    >
                        <div className="absolute inset-0 skeleton-shimmer" />
                    </div>
                </div>
                {/* Badge skeleton */}
                <div
                    className="h-8 w-28 rounded-xl bg-[var(--color-border)] overflow-hidden relative"
                >
                    <div className="absolute inset-0 skeleton-shimmer" />
                </div>
            </div>

            {/* Cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {Array.from({ length: count }).map((_, i) => (
                    <SkeletonCard key={i} />
                ))}
            </div>

            {/* Shimmer keyframes injected once */}
            <style>{`
                @keyframes skeleton-wave {
                    0%   { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                .skeleton-shimmer::after {
                    content: "";
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(
                        90deg,
                        transparent 0%,
                        rgba(255,255,255,0.55) 50%,
                        transparent 100%
                    );
                    animation: skeleton-wave 1.4s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}
