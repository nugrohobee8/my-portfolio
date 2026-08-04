// components/admin/ArticlesFilterBar.tsx
"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SearchIcon } from "@/components/admin/icons";

const STATUS_OPTIONS = [
    { value: "all", label: "Semua Status" },
    { value: "published", label: "Published" },
    { value: "draft", label: "Draft" },
];

export default function ArticlesFilterBar() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();

    const [query, setQuery] = useState(searchParams.get("q") ?? "");
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const status = searchParams.get("status") ?? "all";
    const hasActiveFilters = Boolean(searchParams.get("q")) || status !== "all";

    useEffect(() => {
        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current);
        };
    }, []);

    function updateParams(next: Record<string, string | null>) {
        const params = new URLSearchParams(searchParams.toString());

        for (const [key, value] of Object.entries(next)) {
            if (!value) {
                params.delete(key);
            } else {
                params.set(key, value);
            }
        }
        params.delete("page");

        startTransition(() => {
            const qs = params.toString();
            router.replace(qs ? `${pathname}?${qs}` : pathname);
        });
    }

    function handleSearchChange(value: string) {
        setQuery(value);
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => updateParams({ q: value }), 400);
    }

    function handleReset() {
        setQuery("");
        startTransition(() => router.replace(pathname));
    }

    return (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
                <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#1B1B18]/40" />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    placeholder="Cari judul artikel..."
                    className="w-full rounded-md border border-[#1B1B18]/15 bg-white py-2 pl-9 pr-3 text-sm text-[#1B1B18] placeholder-[#1B1B18]/40 transition-colors focus:border-[#2F5D50] focus:outline-none focus:ring-1 focus:ring-[#2F5D50]"
                />
            </div>

            <select
                value={status}
                onChange={(e) =>
                    updateParams({ status: e.target.value === "all" ? null : e.target.value })
                }
                className="rounded-md border border-[#1B1B18]/15 bg-white px-3 py-2 text-sm text-[#1B1B18] transition-colors focus:border-[#2F5D50] focus:outline-none focus:ring-1 focus:ring-[#2F5D50]"
            >
                {STATUS_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>

            {hasActiveFilters && (
                <button
                    type="button"
                    onClick={handleReset}
                    className="text-xs font-medium text-[#1B1B18]/60 transition-colors hover:text-[#1B1B18] hover:underline"
                >
                    Reset filter
                </button>
            )}

            {isPending && (
                <span className="text-xs text-[#1B1B18]/40">Memuat...</span>
            )}
        </div>
    );
}
