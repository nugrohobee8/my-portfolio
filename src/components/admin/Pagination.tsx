// components/admin/Pagination.tsx
import Link from "next/link";
import { ChevronLeftIcon } from "@/components/admin/icons";

interface PaginationProps {
    page: number;
    totalPages: number;
    total: number;
    pageSize: number;
    buildHref: (page: number) => string;
}

export default function Pagination({
    page,
    totalPages,
    total,
    pageSize,
    buildHref,
}: PaginationProps) {
    if (totalPages <= 1) return null;

    const start = (page - 1) * pageSize + 1;
    const end = Math.min(page * pageSize, total);
    const isFirstPage = page <= 1;
    const isLastPage = page >= totalPages;

    return (
        <div className="flex flex-col gap-3 border-t border-[#1B1B18]/10 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-[#1B1B18]/60">
                Menampilkan {start}–{end} dari {total} artikel
            </p>

            <div className="flex items-center gap-2">
                <Link
                    href={buildHref(page - 1)}
                    aria-disabled={isFirstPage}
                    tabIndex={isFirstPage ? -1 : undefined}
                    className={`flex items-center gap-1 rounded-md border border-[#1B1B18]/15 px-3 py-1.5 text-xs font-medium text-[#1B1B18] transition-colors hover:bg-[#1B1B18]/5 ${isFirstPage ? "pointer-events-none opacity-40" : ""
                        }`}
                >
                    <ChevronLeftIcon className="h-3.5 w-3.5" />
                    Sebelumnya
                </Link>

                <span className="px-1 font-mono text-xs text-[#1B1B18]/60">
                    {page} / {totalPages}
                </span>

                <Link
                    href={buildHref(page + 1)}
                    aria-disabled={isLastPage}
                    tabIndex={isLastPage ? -1 : undefined}
                    className={`flex items-center gap-1 rounded-md border border-[#1B1B18]/15 px-3 py-1.5 text-xs font-medium text-[#1B1B18] transition-colors hover:bg-[#1B1B18]/5 ${isLastPage ? "pointer-events-none opacity-40" : ""
                        }`}
                >
                    Berikutnya
                    <ChevronLeftIcon className="h-3.5 w-3.5 rotate-180" />
                </Link>
            </div>
        </div>
    );
}
