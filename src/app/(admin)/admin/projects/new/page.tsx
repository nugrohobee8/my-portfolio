import { ProjectForm } from '@/components/project-form'

export default function NewProjectPage() {
    return (
        <div className="p-8">
            <h1 className="mb-6 text-2xl font-bold">Project Baru</h1>
            <ProjectForm mode="create" />
        </div>
    )
}