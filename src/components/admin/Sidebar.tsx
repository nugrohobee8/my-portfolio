// components/admin/Sidebar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "@/components/admin/LogoutButton";
import {
    ArticleIcon,
    ChevronLeftIcon,
    DashboardIcon,
    ExperienceIcon,
    ProjectIcon,
    SkillIcon,
} from "@/components/admin/icons";

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const navItems = [
    { label: "Dashboard", href: "/admin/dashboard", icon: DashboardIcon },
    { label: "Articles", href: "/admin/articles", icon: ArticleIcon },
    { label: "Projects", href: "/admin/projects", icon: ProjectIcon },
    { label: "Skills", href: "/admin/skills", icon: SkillIcon },
    { label: "Experience", href: "/admin/experiences", icon: ExperienceIcon },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);

    return (
        <>
            {/* Overlay untuk mobile, klik di luar sidebar untuk menutup */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/30 md:hidden"
                    onClick={onClose}
                    aria-hidden="true"
                />
            )}

            <aside
                className={`fixed inset-y-0 left-0 z-40 flex w-64 transform flex-col bg-[#1B1B18] text-[#F9F8F4] transition-all duration-200 md:static md:translate-x-0 ${collapsed ? "md:w-20" : "md:w-64"
                    } ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
                <div className="flex h-16 items-center justify-between px-5">
                    <span
                        className={`truncate font-serif text-lg ${collapsed ? "md:hidden" : ""}`}
                    >
                        Bayu Nugroho
                    </span>
                    <button
                        type="button"
                        onClick={() => setCollapsed((prev) => !prev)}
                        aria-label={collapsed ? "Perluas sidebar" : "Ciutkan sidebar"}
                        aria-expanded={!collapsed}
                        className="hidden shrink-0 rounded-md p-1.5 text-[#F9F8F4]/60 transition-colors hover:bg-white/5 hover:text-[#F9F8F4] md:inline-flex"
                    >
                        <ChevronLeftIcon
                            className={`h-4 w-4 transition-transform duration-200 ${collapsed ? "rotate-180" : ""}`}
                        />
                    </button>
                </div>

                <nav className="flex flex-1 flex-col gap-1 px-3">
                    {navItems.map((item) => {
                        const isActive = pathname.startsWith(item.href);
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={onClose}
                                title={collapsed ? item.label : undefined}
                                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${isActive
                                    ? "bg-[#2F5D50] text-white"
                                    : "text-[#F9F8F4]/70 hover:bg-white/5 hover:text-[#F9F8F4]"
                                    } ${collapsed ? "md:justify-center" : ""}`}
                            >
                                <Icon className="h-5 w-5 shrink-0" />
                                <span className={collapsed ? "md:hidden" : ""}>
                                    {item.label}
                                </span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="border-t border-white/10 p-3">
                    <LogoutButton collapsed={collapsed} />
                </div>
            </aside>
        </>
    );
}
