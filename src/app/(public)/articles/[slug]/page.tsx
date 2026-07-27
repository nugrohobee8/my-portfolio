import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { prisma } from '@/lib/prisma'

type ArticleDetailPageProps = {
    params: Promise<{ slug: string }>
}

async function getPublishedArticle(slug: string) {
    return prisma.article.findFirst({
        where: { slug, status: 'published' },
    })
}

export async function generateMetadata({
    params,
}: ArticleDetailPageProps): Promise<Metadata> {
    const { slug } = await params
    const article = await getPublishedArticle(slug)

    if (!article) {
        return { title: 'Artikel Tidak Ditemukan' }
    }

    return {
        title: article.title,
        description: article.content.replace(/<[^>]*>/g, '').slice(0, 160),
    }
}

export default async function ArticleDetailPage({ params }: ArticleDetailPageProps) {
    const { slug } = await params
    const article = await getPublishedArticle(slug)

    if (!article) {
        notFound()
    }

    return (
        <article className="mx-auto max-w-3xl px-4 py-12">
            {article.coverImage && (
                <img
                    src={article.coverImage}
                    alt={article.title}
                    className="mb-6 h-72 w-full rounded-lg object-cover"
                />
            )}

            <h1 className="text-3xl font-bold">{article.title}</h1>

            <p className="mt-2 text-sm text-gray-500">
                {article.publishedAt?.toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                })}
            </p>

            {article.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                        <span
                            key={tag}
                            className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-600"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            )}

            <div
                className="prose prose-slate mt-8 max-w-none"
                dangerouslySetInnerHTML={{ __html: article.content }}
            />
        </article>
    )
}