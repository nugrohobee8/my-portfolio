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
            onClick={handleDelete}
            disabled={isPending}
            className="text-sm text-red-600 hover:underline disabled:opacity-50"
        >
            {isPending ? 'Menghapus...' : 'Hapus'}
        </button>
    )
}