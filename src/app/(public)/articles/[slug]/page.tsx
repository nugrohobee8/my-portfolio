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
        <div className="min-h-screen bg-[#F9F8F4]">
            <article className="mx-auto max-w-3xl px-6 py-16">
                <Link
                    href="/articles"
                    className="inline-flex items-center gap-2 text-sm font-medium text-[#2F5D50] hover:text-[#1B1B18] transition-colors mb-8"
                >
                    ← Kembali ke Artikel
                </Link>

                {article.coverImage && (
                    <div className="relative mb-8 h-96 overflow-hidden rounded-lg border border-[#DEDCD3] bg-gray-100 sm:mb-10">
                        <img
                            src={article.coverImage}
                            alt={article.title}
                            className="h-full w-full object-cover"
                        />
                    </div>
                )}

                <div className="mb-8">
                    {article.tags.length > 0 && (
                        <div className="mb-4 flex flex-wrap gap-1.5">
                            {article.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="inline-flex rounded-full bg-[#E4ECE9] px-2 py-0.5 font-[family-name:var(--font-mono)] text-[11px] text-[#2F5D50]"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                    <h1 className="font-[family-name:var(--font-serif)] text-4xl font-medium text-[#1B1B18] sm:text-5xl leading-tight">
                        {article.title}
                    </h1>
                    <p className="mt-6 text-sm font-[family-name:var(--font-mono)] text-[#6B6A63]">
                        {article.publishedAt?.toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                        })}
                    </p>
                </div>

                <div
                    className="prose prose-base sm:prose-lg max-w-none prose-headings:font-medium prose-headings:text-[#1B1B18] prose-headings:font-[family-name:var(--font-serif)] prose-a:text-[#2F5D50] prose-a:no-underline hover:prose-a:underline prose-code:text-[#1B1B18] prose-code:bg-gray-100 prose-code:rounded prose-code:px-2 prose-code:py-1 prose-code:before:content-none prose-code:after:content-none prose-pre:bg-[#1B1B18] prose-pre:text-gray-50 prose-img:rounded-lg prose-img:border prose-img:border-[#DEDCD3] prose-blockquote:border-l-4 prose-blockquote:border-[#DEDCD3] prose-blockquote:italic prose-blockquote:text-[#6B6A63] prose-p:text-[#6B6A63] prose-li:text-[#6B6A63] prose-hr:border-[#DEDCD3] prose-strong:text-[#1B1B18]"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                />
            </article>
        </div>
    )
}