import React from 'react'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

const PaginationUi = ({ page, totalPages, setPage, onPrev, onNext }) => {
    return (
        <Pagination>
            <PaginationContent>
                {/* Previous */}
                <PaginationItem>
                    <PaginationPrevious
                        onClick={onPrev}
                        aria-disabled={page === 1}
                        className={page === 1 ? "pointer-events-none opacity-40" : "cursor-pointer"}
                    />
                </PaginationItem>

                {/* Page numbers */}
                {Array.from({ length: totalPages }).map((_, index) => (
                    <PaginationItem key={index}>
                        <PaginationLink
                            onClick={() => setPage(index + 1)}
                            isActive={page === index + 1}
                            className="cursor-pointer"
                        >
                            {index + 1}
                        </PaginationLink>
                    </PaginationItem>
                ))}

                {/* Ellipsis — only show when there are many pages */}
                {totalPages > 5 && (
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                )}

                {/* Next */}
                <PaginationItem>
                    <PaginationNext
                        onClick={onNext}
                        aria-disabled={page === totalPages}
                        className={page === totalPages ? "pointer-events-none opacity-40" : "cursor-pointer"}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}

export default PaginationUi