// components/admin/Topbar.tsx
"use client";

interface TopbarProps {
    onMenuClick: () => void;
    adminEmail: string | null;
}

export default function Topbar({ onMenuClick, adminEmail }: TopbarProps) {
    return (
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-[#1B1B18]/10 bg-[#F9F8F4] px-4">
            <button
                type="button"
                onClick={onMenuClick}
                className="rounded-md p-2 text-[#1B1B18] hover:bg-[#1B1B18]/5 md:hidden"
                aria-label="Toggle sidebar"
            >
                {/* Hamburger icon, inline SVG biar tidak nambah dependency */}
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                        d="M2.5 5h15M2.5 10h15M2.5 15h15"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                    />
                </svg>
            </button>

            <h1 className="font-serif text-lg text-[#1B1B18] md:ml-0">
                Admin Dashboard
            </h1>

            <span className="font-mono text-xs text-[#1B1B18]/60">
                {adminEmail ?? "Admin"}
            </span>
        </header>
    );
}