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
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mb-12">
                <h1 className="text-4xl font-bold text-slate-900 dark:text-white sm:text-5xl">Artikel</h1>
                <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">Kumpulan artikel dan insights seputar teknologi, desain, dan pengembangan web.</p>
            </div>

            {articles.length === 0 ? (
                <div className="rounded-2xl bg-slate-50 dark:bg-slate-900 p-12 text-center">
                    <p className="text-lg text-slate-500 dark:text-slate-400">Belum ada artikel yang dipublikasikan.</p>
                </div>
            ) : (
                <div className="grid gap-8 md:grid-cols-2">
                    {articles.map((article) => {
                        const excerpt = article.content
                            .replace(/<[^>]*>/g, '')
                            .slice(0, 120)
                            .concat('...')
                        return (
                            <Link
                                key={article.id}
                                href={`/articles/${article.slug}`}
                                className="group flex flex-col overflow-hidden rounded-2xl bg-white dark:bg-slate-900 shadow-sm dark:shadow-md transition-all duration-300 hover:shadow-lg dark:hover:shadow-lg hover:ring-1 hover:ring-slate-200 dark:hover:ring-slate-700"
                            >
                                {article.coverImage && (
                                    <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-800">
                                        <img
                                            src={article.coverImage}
                                            alt={article.title}
                                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                    </div>
                                )}
                                <div className="flex flex-col gap-4 p-6">
                                    {article.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-2">
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
                                    <div>
                                        <h2 className="text-xl font-bold text-slate-900 dark:text-white line-clamp-2 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors">
                                            {article.title}
                                        </h2>
                                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                                            {excerpt}
                                        </p>
                                    </div>
                                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                                        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                                            {article.publishedAt?.toLocaleDateString('id-ID', {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric',
                                            })}
                                        </span>
                                        <span className="text-slate-400 dark:text-slate-500 transition-transform group-hover:translate-x-1">→</span>
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            )}
        </div>
    )
}