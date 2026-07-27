import { ArticleForm } from '@/components/article-form'

export default function NewArticlePage() {
    return (
        <div className="p-8">
            <h1 className="mb-6 text-2xl font-bold">Artikel Baru</h1>
            <ArticleForm mode="create" />
        </div>
    )
}