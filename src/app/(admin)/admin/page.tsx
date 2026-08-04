import Link from 'next/link'
import { getArticles } from '@/lib/actions/article'
import { getExperiences } from '@/lib/actions/experience'
import { getProjects } from '@/lib/actions/project'
import { getSkills } from '@/lib/actions/skill'
import { LogoutButton } from '@/components/logout-button'

export default async function AdminDashboardPage() {
    const [articles, projects, experiences, skills] = await Promise.all([
        getArticles(),
        getProjects(),
        getExperiences(),
        getSkills(),
    ])

    return (
        <div className="mx-auto max-w-5xl p-8">
            <div className="mb-8 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Admin Dashboard</p>
                    <h1 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">Ringkasan Kontrol</h1>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                        Lihat statistik cepat dan navigasi cepat untuk konten admin Anda.
                    </p>
                </div>
                <div className="flex flex-wrap gap-3">
                    <Link
                        href="/admin/articles"
                        className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                    >
                        Kelola Artikel
                    </Link>
                    <Link
                        href="/admin/projects"
                        className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                    >
                        Kelola Project
                    </Link>
                    <LogoutButton />
                </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Artikel</p>
                    <p className="mt-4 text-4xl font-semibold text-slate-900 dark:text-white">{articles.length}</p>
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Jumlah artikel yang tersedia</p>
                    <Link href="/admin/articles" className="mt-4 inline-flex text-sm font-semibold text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">
                        Lihat detail →
                    </Link>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Project</p>
                    <p className="mt-4 text-4xl font-semibold text-slate-900 dark:text-white">{projects.length}</p>
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Jumlah project yang ditampilkan</p>
                    <Link href="/admin/projects" className="mt-4 inline-flex text-sm font-semibold text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">
                        Lihat detail →
                    </Link>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Pengalaman</p>
                    <p className="mt-4 text-4xl font-semibold text-slate-900 dark:text-white">{experiences.length}</p>
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Jumlah pengalaman kerja yang tersimpan</p>
                    <Link href="/admin/experiences" className="mt-4 inline-flex text-sm font-semibold text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">
                        Lihat detail →
                    </Link>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Skill</p>
                    <p className="mt-4 text-4xl font-semibold text-slate-900 dark:text-white">{skills.length}</p>
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Jumlah skill yang terdaftar</p>
                    <Link href="/admin/skills" className="mt-4 inline-flex text-sm font-semibold text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">
                        Lihat detail →
                    </Link>
                </div>
            </div>

            <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Navigasi cepat</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                    <Link href="/admin/articles" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-medium text-slate-900 transition hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
                        Artikel
                    </Link>
                    <Link href="/admin/projects" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-medium text-slate-900 transition hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
                        Project
                    </Link>
                    <Link href="/admin/experiences" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-medium text-slate-900 transition hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
                        Pengalaman
                    </Link>
                    <Link href="/admin/skills" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-medium text-slate-900 transition hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
                        Skill
                    </Link>
                </div>
            </div>
        </div>
    )
}
