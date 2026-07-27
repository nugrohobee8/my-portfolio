'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { deleteProject } from '@/lib/actions/project'

export function DeleteProjectButton({ projectId }: { projectId: string }) {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    function handleDelete() {
        const confirmed = window.confirm('Yakin mau hapus project ini?')
        if (!confirmed) return

        startTransition(async () => {
            const result = await deleteProject(projectId)
            if (result.success) {
                router.refresh()
            } else {
                alert(result.error)
            }
        })
    }

    return (
        <button
            onClick={handleDelete}
            disabled={isPending}
            className="text-red-600 hover:underline disabled:opacity-50"
        >
            {isPending ? 'Menghapus...' : 'Hapus'}
        </button>
    )
}