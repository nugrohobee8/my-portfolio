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
        <div className="p-8">
            <h1 className="mb-6 text-2xl font-bold">Edit Project</h1>
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