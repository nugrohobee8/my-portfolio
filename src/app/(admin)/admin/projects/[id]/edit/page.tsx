import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProjectById } from '@/lib/actions/project'
import { ProjectForm } from '@/components/project-form'

type EditProjectPageProps = {
    params: Promise<{ id: string }>
}

export default async function EditProjectPage({ params }: EditProjectPageProps) {
    const { id } = await params
    const project = await getProjectById(id)

    if (!project) {
        notFound()
    }

    return (
        <div className="space-y-6">
            <div>
                <Link
                    href="/admin/projects"
                    className="text-xs font-medium text-[#2F5D50] hover:underline"
                >
                    ← Kembali ke Project
                </Link>
                <h1 className="mt-2 font-serif text-2xl text-[#1B1B18]">Edit Project</h1>
                <p className="mt-1 text-sm text-[#1B1B18]/60">{project.title}</p>
            </div>
            <ProjectForm
                mode="edit"
                projectId={project.id}
                initialValues={{
                    title: project.title,
                    slug: project.slug,
                    description: project.description,
                    coverImage: project.coverImage,
                    techStack: project.techStack,
                    demoUrl: project.demoUrl,
                    repoUrl: project.repoUrl,
                    isFeatured: project.isFeatured,
                }}
            />
        </div>
    )
}
