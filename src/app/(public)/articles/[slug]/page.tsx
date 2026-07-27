import Link from 'next/link'
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
        <article className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8 sm:py-12">
            <Link
                href="/articles"
                className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors mb-8"
            >
                ← Kembali ke Artikel
            </Link>

            {article.coverImage && (
                <div className="relative mb-8 h-96 overflow-hidden rounded-2xl bg-slate-200 dark:bg-slate-800 sm:mb-10">
                    <img
                        src={article.coverImage}
                        alt={article.title}
                        className="h-full w-full object-cover"
                    />
                </div>
            )}

            <div className="mb-8">
                {article.tags.length > 0 && (
                    <div className="mb-4 flex flex-wrap gap-2">
                        {article.tags.map((tag) => (
                            <span
                                key={tag}
                                className="inline-flex rounded-full bg-slate-100 dark:bg-slate-800 px-3 py-1 text-xs font-medium text-slate-700 dark:text-slate-300"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
                <h1 className="text-4xl font-bold text-slate-900 dark:text-white sm:text-5xl leading-tight">
                    {article.title}
                </h1>
                <p className="mt-6 text-base font-medium text-slate-600 dark:text-slate-400">
                    {article.publishedAt?.toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                    })}
                </p>
            </div>

            <div
                className="prose prose-base sm:prose-lg max-w-none prose-headings:font-bold prose-headings:text-slate-900 dark:prose-headings:text-white prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline prose-code:text-slate-900 dark:prose-code:text-slate-100 prose-code:bg-slate-100 dark:prose-code:bg-slate-800 prose-code:rounded prose-code:px-2 prose-code:py-1 prose-code:before:content-none prose-code:after:content-none prose-pre:bg-slate-900 dark:prose-pre:bg-slate-800 prose-pre:text-slate-50 dark:prose-pre:text-slate-50 prose-img:rounded-lg prose-img:border prose-img:border-slate-200 dark:prose-img:border-slate-700 prose-blockquote:border-l-4 prose-blockquote:border-slate-300 dark:prose-blockquote:border-slate-600 prose-blockquote:italic prose-blockquote:text-slate-700 dark:prose-blockquote:text-slate-300 dark:prose-p:text-slate-300 dark:prose-li:text-slate-300 dark:prose-hr:border-slate-700"
                dangerouslySetInnerHTML={{ __html: article.content }}
            />
        </article>
    )
}