'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { deleteArticle } from '@/lib/actions/article'

export function DeleteArticleButton({ articleId }: { articleId: string }) {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    function handleDelete() {
        const confirmed = window.confirm('Yakin mau hapus artikel ini?')
        if (!confirmed) return

        startTransition(async () => {
            const result = await deleteArticle(articleId)
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