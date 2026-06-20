import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDoctors } from "../../store/acrions/adminActions";
import { DoctorsLoading } from "../../components/common/DoctorsLoading";
import DoctorCard from "../../components/common/DoctorCard";
import {
    Stethoscope,
    XCircle,
    Users,
    Search,
    X,
} from "lucide-react";
import PaginationUi from "@/components/common/Pagination";
import { usePagination } from "@/hooks/usePagination";


// ─── AllDoctors page ─────────────────────────────────────────────────────────

export const AllDoctors = () => {
    const { doctorList, isLoading, error, total } = useSelector((state) => state.doctor);
    const { page, setPage, handleNextPage, handlePrevPage, LIMIT, totalPages } = usePagination(total)
    const [keyword, setKeyword] = useState("");
    const [inputVal, setInputVal] = useState("");
    const dispatch = useDispatch();
    const handleSearch = (value) => {
        setInputVal(value);
    };
    // ─── Debounce ───
    useEffect(() => {
        // 500 ms delay before confirming the search
        const delayDebounceFn = setTimeout(() => {
            // If the value has actually changed
            if (keyword !== inputVal) {
                setKeyword(inputVal); // update the keyword to be sent to the backend
                setPage(1);           // return to page 1
            }
        }, 500);

        // Clear the timeout if the user types a new character before the 500ms
        return () => clearTimeout(delayDebounceFn);
    }, [inputVal, keyword]);
    // ─── Fetch Doctors (with pagination & search) ───
    useEffect(() => {
        dispatch(getAllDoctors(page, LIMIT, keyword));
    }, [page, keyword]);


    // ── Error state ──
    if (error)
        return (
            <div
                className="flex flex-col items-center justify-center py-32 gap-4"
                style={{ animation: "fadeUp 0.4s ease-out both" }}
            >
                <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center">
                    <XCircle size={28} className="text-red-400" />
                </div>
                <div className="text-center">
                    <p className="text-sm font-medium text-[var(--color-text)]">Something went wrong</p>
                    <p className="text-xs text-[var(--color-text-muted)] font-light mt-1">{error}</p>
                </div>
            </div>
        );

    return (
        <div className="space-y-6" style={{ animation: "fadeUp 0.5s ease-out both" }}>

            {/* ══ Header bar ══════════════════════════════════════════════════ */}
            <div className="flex items-center gap-4 flex-wrap">
                {/* Title */}
                <div className="flex-1 min-w-[160px]">
                    <h1
                        className="text-2xl text-[var(--color-text)] leading-tight"
                        style={{
                            fontFamily: "var(--font-serif)",
                            letterSpacing: "-0.03em",
                            fontWeight: 400,
                        }}
                    >
                        All Doctors
                    </h1>
                    <p className="text-sm text-[var(--color-text-muted)] font-light mt-0.5">
                        {isLoading
                            ? "Loading…" : total > 0 ? `${total} doctors found` : "No doctors found"

                        }
                    </p>
                </div>

                {/* Search box */}
                <div
                    className="flex items-center gap-2 rounded-xl border px-3 py-2 transition-all duration-200 focus-within:border-[var(--color-accent)] focus-within:shadow-[0_0_0_3px_var(--color-accent-light)]"
                    style={{
                        background: "var(--color-bg-pure)",
                        borderColor: "var(--color-border)",
                        minWidth: "220px",
                    }}
                >
                    <Search size={15} className="text-[var(--color-text-muted)] flex-shrink-0" />
                    <input
                        type="text"
                        value={inputVal}
                        onChange={(e) => handleSearch(e.target.value)}
                        placeholder="Search by name, specialty…"
                        className="w-full bg-transparent text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] placeholder:font-light focus:outline-none"
                    />
                    {inputVal && (
                        <button
                            onClick={() => handleSearch("")}
                            className="flex-shrink-0 text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors cursor-pointer"
                        >
                            <X size={13} />
                        </button>
                    )}
                </div>

                {/* Count badge */}
                {!isLoading && doctorList.length > 0 && (
                    <span
                        className="flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-xl"
                        style={{
                            background: "var(--color-accent-light)",
                            color: "var(--color-accent)",
                        }}
                    >
                        <Users size={13} />
                        {doctorList.length}
                    </span>
                )}

            </div>

            {/* ══ Loading skeleton ═════════════════════════════════════════════ */}
            {isLoading && <DoctorsLoading count={9} />}

            {/* ══ Empty state ══════════════════════════════════════════════════ */}
            {!isLoading && doctorList.length === 0 && (
                <div
                    className="flex flex-col items-center justify-center py-32 gap-5 rounded-2xl border"
                    style={{
                        borderColor: "var(--color-border-light)",
                        background: "var(--color-bg-pure)",
                        borderStyle: "dashed",
                    }}
                >
                    <div
                        className="w-20 h-20 rounded-2xl flex items-center justify-center"
                        style={{ background: "var(--color-accent-light)" }}
                    >
                        <Stethoscope size={32} className="text-[var(--color-accent)]" />
                    </div>
                    <div className="text-center">
                        <p className="text-base font-semibold text-[var(--color-text)]">
                            {keyword ? "No results found" : "No doctors yet"}
                        </p>
                        <p className="text-sm text-[var(--color-text-muted)] font-light mt-1.5 max-w-xs">
                            {keyword
                                ? `No doctors match "${keyword}". Try a different search.`
                                : "Add your first doctor to get started."}
                        </p>
                    </div>
                </div>
            )}

            {/* ══ Doctors grid ════════════════════════════════════════════════ */}
            {!isLoading && doctorList.length > 0 && (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {doctorList.map((doctor, i) => (
                            <DoctorCard key={doctor._id} doctor={doctor} index={i} />
                        ))}
                    </div>


                </>
            )}

            <PaginationUi
                page={page}
                totalPages={totalPages}
                setPage={setPage}
                onPrev={handlePrevPage}
                onNext={handleNextPage}
            />

        </div>

    );
};
