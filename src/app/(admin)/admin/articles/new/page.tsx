import Link from 'next/link'
import { ArticleForm } from '@/components/article-form'

export default function NewArticlePage() {
    return (
        <div className="space-y-6">
            <div>
                <Link
                    href="/admin/articles"
                    className="text-xs font-medium text-[#2F5D50] hover:underline"
                >
                    ← Kembali ke Artikel
                </Link>
                <h1 className="mt-2 font-serif text-2xl text-[#1B1B18]">Artikel Baru</h1>
                <p className="mt-1 text-sm text-[#1B1B18]/60">
                    Tulis dan publikasikan artikel baru.
                </p>
            </div>
            <ArticleForm mode="create" />
        </div>
    )
}
