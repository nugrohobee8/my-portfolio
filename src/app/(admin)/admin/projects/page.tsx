import Link from 'next/link'
import { getProjects } from '@/lib/actions/project'
import { DeleteProjectButton } from '@/components/delete-project-button'

export default async function AdminProjectsPage() {
    const projects = await getProjects()

    return (
        <div className="mx-auto max-w-4xl p-8">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold">Kelola Project</h1>
                <Link
                    href="/admin/projects/new"
                    className="rounded bg-black px-4 py-2 text-sm font-medium text-white"
                >
                    + Project Baru
                </Link>
            </div>

            {projects.length === 0 ? (
                <p className="text-gray-500">Belum ada project. Buat yang pertama!</p>
            ) : (
                <table className="w-full border-collapse text-sm">
                    <thead>
                        <tr className="border-b text-left">
                            <th className="py-2">Judul</th>
                            <th className="py-2">Tech Stack</th>
                            <th className="py-2">Featured</th>
                            <th className="py-2">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map((project) => (
                            <tr key={project.id} className="border-b">
                                <td className="py-3">{project.title}</td>
                                <td className="py-3 text-gray-500">
                                    {project.techStack.join(', ')}
                                </td>
                                <td className="py-3">
                                    {project.isFeatured ? (
                                        <span className="rounded bg-green-100 px-2 py-0.5 text-xs text-green-700">
                                            Ya
                                        </span>
                                    ) : (
                                        <span className="text-gray-400">-</span>
                                    )}
                                </td>
                                <td className="py-3">
                                    <div className="flex gap-3">
                                        <Link
                                            href={`/admin/projects/${project.id}/edit`}
                                            className="text-blue-600 hover:underline"
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
            )}
        </div>
    )
}