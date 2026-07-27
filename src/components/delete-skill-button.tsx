'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { deleteSkill } from '@/lib/actions/skill'

export function DeleteSkillButton({ skillId }: { skillId: string }) {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    function handleDelete() {
        startTransition(async () => {
            const result = await deleteSkill(skillId)
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
            className="text-xs text-red-600 hover:underline disabled:opacity-50"
        >
            ✕
        </button>
    )
}