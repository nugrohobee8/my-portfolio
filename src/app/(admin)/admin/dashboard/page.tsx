// app/admin/dashboard/page.tsx
import Link from "next/link";
import { getDashboardStats } from "@/lib/dashboard/getStats";
import StatCard from "@/components/admin/StatCard";
import RecentArticlesTable from "@/components/admin/RecentArticlesTable";
import {
    ArticleIcon,
    ExperienceIcon,
    ProjectIcon,
    PublishedIcon,
    DraftIcon,
    SkillIcon,
    PlusIcon,
    ArrowRightIcon,
} from "@/components/admin/icons";

const quickActions = [
    { label: "Artikel Baru", href: "/admin/articles/new" },
    { label: "Project Baru", href: "/admin/projects/new" },
    { label: "Tambah Skill", href: "/admin/skills" },
    { label: "Tambah Pengalaman", href: "/admin/experiences" },
];

export default async function DashboardPage() {
    const stats = await getDashboardStats();

    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="font-serif text-2xl text-[#1B1B18]">Dashboard</h1>
                    <p className="mt-1 text-sm text-[#1B1B18]/60">
                        Ringkasan konten dan aktivitas terbaru.
                    </p>
                </div>
                <Link
                    href="/admin/articles/new"
                    className="inline-flex items-center gap-2 self-start rounded-md bg-[#2F5D50] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#254A3F]"
                >
                    <PlusIcon className="h-4 w-4" />
                    Artikel Baru
                </Link>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <StatCard
                    label="Total Artikel"
                    value={stats.totalArticles}
                    accent="neutral"
                    icon={<ArticleIcon className="h-5 w-5" />}
                />
                <StatCard
                    label="Published"
                    value={stats.publishedCount}
                    accent="forest"
                    icon={<PublishedIcon className="h-5 w-5" />}
                />
                <StatCard
                    label="Draft"
                    value={stats.draftCount}
                    accent="amber"
                    icon={<DraftIcon className="h-5 w-5" />}
                />
                <StatCard
                    label="Total Project"
                    value={stats.totalProjects}
                    accent="neutral"
                    icon={<ProjectIcon className="h-5 w-5" />}
                />
                <StatCard
                    label="Total Skill"
                    value={stats.totalSkills}
                    accent="neutral"
                    icon={<SkillIcon className="h-5 w-5" />}
                />
                <StatCard
                    label="Pengalaman"
                    value={stats.totalExperiences}
                    accent="neutral"
                    icon={<ExperienceIcon className="h-5 w-5" />}
                />
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    <div className="mb-3 flex items-center justify-between">
                        <h2 className="font-serif text-base text-[#1B1B18]">
                            Artikel Terbaru
                        </h2>
                        <Link
                            href="/admin/articles"
                            className="text-xs font-medium text-[#2F5D50] hover:underline"
                        >
                            Lihat semua
                        </Link>
                    </div>
                    <RecentArticlesTable articles={stats.recentArticles} />
                </div>

                <div>
                    <h2 className="mb-3 font-serif text-base text-[#1B1B18]">
                        Aksi Cepat
                    </h2>
                    <div className="flex flex-col gap-1 rounded-lg border border-[#1B1B18]/10 bg-white p-2">
                        {quickActions.map((action) => (
                            <Link
                                key={action.href}
                                href={action.href}
                                className="flex items-center justify-between rounded-md px-3 py-2 text-sm text-[#1B1B18] transition-colors hover:bg-[#1B1B18]/5"
                            >
                                {action.label}
                                <ArrowRightIcon className="h-4 w-4 text-[#1B1B18]/40" />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
