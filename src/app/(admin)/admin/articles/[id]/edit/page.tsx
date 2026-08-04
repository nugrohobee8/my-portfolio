import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getArticleById } from '@/lib/actions/article'
import { ArticleForm } from '@/components/article-form'

type EditArticlePageProps = {
    params: Promise<{ id: string }>
}

export default async function EditArticlePage({ params }: EditArticlePageProps) {
    const { id } = await params
    const article = await getArticleById(id)

    if (!article) {
        notFound()
    }

    return (
        <div className="space-y-6">
            <div>
                <Link
                    href="/admin/articles"
                    className="text-xs font-medium text-[#2F5D50] hover:underline"
                >
                    ← Kembali ke Artikel
                </Link>
                <h1 className="mt-2 font-serif text-2xl text-[#1B1B18]">Edit Artikel</h1>
                <p className="mt-1 text-sm text-[#1B1B18]/60">{article.title}</p>
            </div>
            <ArticleForm
                mode="edit"
                articleId={article.id}
                initialValues={{
                    title: article.title,
                    slug: article.slug,
                    content: article.content,
                    coverImage: article.coverImage,
                    tags: article.tags,
                    status: article.status,
                }}
            />
        </div>
    )
}
