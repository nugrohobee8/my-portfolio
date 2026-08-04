'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { deleteSkill } from '@/lib/actions/skill'
import { XIcon } from '@/components/admin/icons'

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
            type="button"
            onClick={handleDelete}
            disabled={isPending}
            aria-label="Hapus skill"
            title="Hapus skill"
            className="flex h-4 w-4 items-center justify-center rounded-full text-[#1B1B18]/40 transition-colors hover:bg-red-100 hover:text-red-600 disabled:opacity-50"
        >
            <XIcon className="h-3 w-3" />
        </button>
    )
}
