'use client';

import { usePathname, useSearchParams } from "next/navigation";

import {
    Pagination,
    PaginationContent,
    PaginationLink,
    PaginationItem,
    PaginationPrevious,
    PaginationNext,
    PaginationEllipsis,
} from './core';

const buildPaginationRange = (page, totalPages) => {
    if (totalPages <= 5) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const range = [1];
    const left = Math.max(2, page - 1);
    const right = Math.min(totalPages - 1, page + 1);

    if (left > 2) {
        range.push("left-ellipsis");
    }

    for (let i = left; i <= right; i += 1) {
        range.push(i);
    }

    if (right < totalPages - 1) {
        range.push("right-ellipsis");
    }

    range.push(totalPages);
    return range;
};

const CustomPagination = ({ page, totalPages, hideSinglePage, className }) => {
    const pathname = usePathname() || "/products";
    const searchParams = useSearchParams();

    if ( totalPages === 1 && hideSinglePage ) {
        return null;
    }

    const paginationRange = buildPaginationRange(page, totalPages);


    const prevPage = page > 1 ? page - 1 : 1;
    const nextPage = page < totalPages ? page + 1 : totalPages;
    const prevDisabled = page === 1;
    const nextDisabled = page === totalPages;

    const getPageHref = (targetPage) => {
        const currentSearch = searchParams?.toString() ?? "";
        const params = new URLSearchParams(currentSearch);
        params.set("page", String(targetPage));

        const queryString = params.toString();
        if (!queryString) {
            return pathname;
        }

        return `${pathname}?${queryString}`;
    };

    return (
        <Pagination className={`justify-center ${className || ''}`}>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        href={getPageHref(prevPage)}
                        aria-disabled={prevDisabled}
                        tabIndex={prevDisabled ? -1 : 0}
                        className={prevDisabled ? "pointer-events-none opacity-50" : undefined}
                        prefetch
                    />
                </PaginationItem>

                {paginationRange.map((entry, index) => (
                    <PaginationItem key={`${entry}-${index}`}>
                        {typeof entry === "number" ? (
                            <PaginationLink
                                href={getPageHref(entry)}
                                isActive={entry === page}
                                prefetch
                            >
                                {entry}
                            </PaginationLink>
                        ) : (
                            <PaginationEllipsis />
                        )}
                    </PaginationItem>
                ))}

                <PaginationItem>
                    <PaginationNext
                        href={getPageHref(nextPage)}
                        aria-disabled={nextDisabled}
                        tabIndex={nextDisabled ? -1 : 0}
                        className={nextDisabled ? "pointer-events-none opacity-50" : undefined}
                        prefetch
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}


export default CustomPagination;
