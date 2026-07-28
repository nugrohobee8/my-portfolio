import Link from 'next/link'
import type { Metadata } from 'next'
import { prisma } from '@/lib/prisma'

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
    title: 'Article',
    description: 'Kumpulan artikel dan tulisan seputar teknologi dan pengembangan web.',
}

export default async function ArticlePage() {
    const articles = await prisma.article.findMany({
        where: { status: 'published' },
        orderBy: { publishedAt: 'desc' },
    })

    return (
        <div className="min-h-screen bg-[#F9F8F4]">
            <div className="mx-auto max-w-3xl px-6 py-16">
                <div className="mb-12">
                    <h1 className="font-[family-name:var(--font-serif)] text-4xl font-medium text-[#1B1B18] sm:text-5xl">Articles</h1>
                    {/* <p className="mt-4 text-lg text-[#6B6A63]">Kumpulan artikel dan insights seputar teknologi, desain, dan pengembangan web.</p> */}
                </div>

                {articles.length === 0 ? (
                    <div className="rounded-lg border border-[#DEDCD3] bg-white p-12 text-center">
                        <p className="text-lg text-[#6B6A63]">No Articles.</p>
                    </div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2">
                        {articles.map((article) => {
                            const excerpt = article.content
                                .replace(/<[^>]*>/g, '')
                                .slice(0, 120)
                                .concat('...')
                            return (
                                <Link
                                    key={article.id}
                                    href={`/articles/${article.slug}`}
                                    className="group overflow-hidden rounded-lg border border-[#DEDCD3] bg-white transition-all duration-300 hover:shadow-md"
                                >
                                    {article.coverImage && (
                                        <div className="relative h-40 overflow-hidden bg-gray-100">
                                            <img
                                                src={article.coverImage}
                                                alt={article.title}
                                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                        </div>
                                    )}
                                    <div className="flex flex-col gap-3 p-4">
                                        {article.tags.length > 0 && (
                                            <div className="flex flex-wrap gap-1.5">
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
                                        <div>
                                            <h2 className="font-medium text-[#1B1B18] line-clamp-2 group-hover:text-[#2F5D50] transition-colors">
                                                {article.title}
                                            </h2>
                                            <p className="mt-1 text-sm text-[#6B6A63] line-clamp-2">
                                                {excerpt}
                                            </p>
                                        </div>
                                        <div className="flex items-center justify-between pt-2 text-xs font-[family-name:var(--font-mono)] text-[#6B6A63]">
                                            <span>
                                                {article.publishedAt?.toLocaleDateString('id-ID', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric',
                                                })}
                                            </span>
                                            <span className="text-[#2F5D50] transition-transform group-hover:translate-x-1">→</span>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}