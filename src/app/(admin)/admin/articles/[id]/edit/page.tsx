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
        <div className="p-8">
            <h1 className="mb-6 text-2xl font-bold">Edit Artikel</h1>
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