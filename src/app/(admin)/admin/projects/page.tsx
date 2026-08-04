import Link from 'next/link'
import { getProjects } from '@/lib/actions/project'
import { DeleteProjectButton } from '@/components/delete-project-button'
import ProjectsFilterBar from '@/components/admin/ProjectsFilterBar'
import Pagination from '@/components/admin/Pagination'
import { InboxIcon, PlusIcon, StarIcon } from '@/components/admin/icons'

const PAGE_SIZE = 10

type AdminProjectsPageProps = {
    searchParams: Promise<{ q?: string; featured?: string; page?: string }>
}

function formatDate(date: Date): string {
    return new Intl.DateTimeFormat('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    }).format(date)
}

export default async function AdminProjectsPage({
    searchParams,
}: AdminProjectsPageProps) {
    const params = await searchParams
    const query = params.q?.trim() ?? ''
    const featured: 'all' | 'featured' | 'not-featured' =
        params.featured === 'featured' || params.featured === 'not-featured'
            ? params.featured
            : 'all'
    const page = Math.max(1, Number(params.page) || 1)

    const { projects, total, totalPages } = await getProjects({
        query,
        featured,
        page,
        pageSize: PAGE_SIZE,
    })

    const hasFilters = Boolean(query) || featured !== 'all'

    function buildHref(targetPage: number) {
        const sp = new URLSearchParams()
        if (query) sp.set('q', query)
        if (featured !== 'all') sp.set('featured', featured)
        if (targetPage > 1) sp.set('page', String(targetPage))
        const qs = sp.toString()
        return qs ? `/admin/projects?${qs}` : '/admin/projects'
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="font-serif text-2xl text-[#1B1B18]">Kelola Project</h1>
                    <p className="mt-1 text-sm text-[#1B1B18]/60">
                        {total} project total
                    </p>
                </div>
                <Link
                    href="/admin/projects/new"
                    className="inline-flex items-center gap-2 self-start rounded-md bg-[#2F5D50] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#254A3F]"
                >
                    <PlusIcon className="h-4 w-4" />
                    Project Baru
                </Link>
            </div>

            <ProjectsFilterBar />

            <div className="overflow-hidden rounded-lg border border-[#1B1B18]/10 bg-white">
                {projects.length === 0 ? (
                    <div className="flex flex-col items-center gap-3 p-10 text-center">
                        <InboxIcon className="h-8 w-8 text-[#1B1B18]/30" />
                        {hasFilters ? (
                            <>
                                <p className="text-sm text-[#1B1B18]/60">
                                    Tidak ada project yang cocok dengan filter ini.
                                </p>
                                <Link
                                    href="/admin/projects"
                                    className="text-xs font-medium text-[#2F5D50] hover:underline"
                                >
                                    Reset filter
                                </Link>
                            </>
                        ) : (
                            <>
                                <p className="text-sm text-[#1B1B18]/60">Belum ada project.</p>
                                <Link
                                    href="/admin/projects/new"
                                    className="text-xs font-medium text-[#2F5D50] hover:underline"
                                >
                                    Buat project pertama
                                </Link>
                            </>
                        )}
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-[#1B1B18]/10 text-left font-mono text-xs uppercase text-[#1B1B18]/60">
                                    <th className="px-4 py-3">Judul</th>
                                    <th className="px-4 py-3">Tech Stack</th>
                                    <th className="px-4 py-3">Featured</th>
                                    <th className="px-4 py-3">Dibuat</th>
                                    <th className="px-4 py-3 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projects.map((project) => (
                                    <tr
                                        key={project.id}
                                        className="border-b border-[#1B1B18]/5 transition-colors last:border-0 hover:bg-[#1B1B18]/[0.02]"
                                    >
                                        <td className="max-w-[220px] truncate px-4 py-3 font-medium text-[#1B1B18]">
                                            {project.title}
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex max-w-[280px] flex-wrap gap-1">
                                                {project.techStack.slice(0, 3).map((tech) => (
                                                    <span
                                                        key={tech}
                                                        className="rounded-full bg-[#1B1B18]/5 px-2 py-0.5 text-xs text-[#1B1B18]/70"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                                {project.techStack.length > 3 && (
                                                    <span className="rounded-full bg-[#1B1B18]/5 px-2 py-0.5 text-xs text-[#1B1B18]/50">
                                                        +{project.techStack.length - 3}
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            {project.isFeatured ? (
                                                <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
                                                    <StarIcon className="h-3 w-3" />
                                                    Featured
                                                </span>
                                            ) : (
                                                <span className="text-xs text-[#1B1B18]/30">—</span>
                                            )}
                                        </td>
                                        <td className="px-4 py-3 font-mono text-xs text-[#1B1B18]/60">
                                            {formatDate(project.createdAt)}
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center justify-end gap-4">
                                                <Link
                                                    href={`/admin/projects/${project.id}/edit`}
                                                    className="text-xs font-medium text-[#2F5D50] hover:underline"
                                                >
                                                    Edit
                                                </Link>
                                                <DeleteProjectButton projectId={project.id} />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                <Pagination
                    page={page}
                    totalPages={totalPages}
                    total={total}
                    pageSize={PAGE_SIZE}
                    buildHref={buildHref}
                />
            </div>
        </div>
    )
}
