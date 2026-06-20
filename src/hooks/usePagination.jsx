import React, { useState } from 'react'

export const usePagination = (total) => {
    const [page, setPage] = useState(1);
    const LIMIT = 9;
    const totalPages = Math.max(1, Math.ceil(total / LIMIT));
    const handleNextPage = () => {
        if (page < totalPages) {
            setPage((prevPage) => prevPage + 1)
        }
    }
    const handlePrevPage = () => {
        if (page > 1) {
            setPage((prevPage) => prevPage - 1)
        }
    }

    return (
        { page, setPage, handleNextPage, handlePrevPage, LIMIT, totalPages }

    )
}
