import Link from 'next/link'
import { ProjectForm } from '@/components/project-form'

export default function NewProjectPage() {
    return (
        <div className="space-y-6">
            <div>
                <Link
                    href="/admin/projects"
                    className="text-xs font-medium text-[#2F5D50] hover:underline"
                >
                    ← Kembali ke Project
                </Link>
                <h1 className="mt-2 font-serif text-2xl text-[#1B1B18]">Project Baru</h1>
                <p className="mt-1 text-sm text-[#1B1B18]/60">
                    Tambahkan project baru ke portofolio.
                </p>
            </div>
            <ProjectForm mode="create" />
        </div>
    )
}
