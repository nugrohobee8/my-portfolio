'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { deleteExperience } from '@/lib/actions/experience'

export function DeleteExperienceButton({ experienceId }: { experienceId: string }) {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    function handleDelete() {
        const confirmed = window.confirm('Yakin mau hapus pengalaman kerja ini?')
        if (!confirmed) return

        startTransition(async () => {
            const result = await deleteExperience(experienceId)
            if (result.success) {
                router.refresh()
            } else {
                alert(result.error)
            }
        })
    }

    return (
        <button
            type="button"
            onClick={handleDelete}
            disabled={isPending}
            className="shrink-0 text-xs font-medium text-red-600 transition-colors hover:underline disabled:opacity-50"
        >
            {isPending ? 'Menghapus...' : 'Hapus'}
        </button>
    )
}
