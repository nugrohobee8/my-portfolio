import Link from 'next/link'
import type { Metadata } from 'next'
import { prisma } from '@/lib/prisma'

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
        <div className="mx-auto max-w-3xl px-4 py-12">
            <h1 className="mb-8 text-3xl font-bold">Artikel</h1>

            {articles.length === 0 ? (
                <p className="text-gray-500">Belum ada artikel yang dipublikasikan.</p>
            ) : (
                <div className="space-y-8">
                    {articles.map((article) => (
                        <Link
                            key={article.id}
                            href={`/articles/${article.slug}`}
                            className="block rounded-lg border p-5 transition hover:shadow-md"
                        >
                            {article.coverImage && (
                                <img
                                    src={article.coverImage}
                                    alt={article.title}
                                    className="mb-4 h-48 w-full rounded object-cover"
                                />
                            )}
                            <h2 className="text-xl font-semibold">{article.title}</h2>
                            <p className="mt-1 text-sm text-gray-500">
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
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}