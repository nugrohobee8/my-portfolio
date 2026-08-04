import Link from 'next/link'
import { getArticles } from '@/lib/actions/article'
import { DeleteArticleButton } from '@/components/delete-article-button'
import ArticlesFilterBar from '@/components/admin/ArticlesFilterBar'
import Pagination from '@/components/admin/Pagination'
import { InboxIcon, PlusIcon } from '@/components/admin/icons'
import type { ArticleStatus } from '@prisma/client'

const PAGE_SIZE = 10

type AdminArticlesPageProps = {
    searchParams: Promise<{ q?: string; status?: string; page?: string }>
}

function formatDate(date: Date): string {
    return new Intl.DateTimeFormat('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    }).format(date)
}

export default async function AdminArticlesPage({
    searchParams,
}: AdminArticlesPageProps) {
    const params = await searchParams
    const query = params.q?.trim() ?? ''
    const status: 'all' | ArticleStatus =
        params.status === 'draft' || params.status === 'published'
            ? params.status
            : 'all'
    const page = Math.max(1, Number(params.page) || 1)

    const { articles, total, totalPages } = await getArticles({
        query,
        status,
        page,
        pageSize: PAGE_SIZE,
    })

    const hasFilters = Boolean(query) || status !== 'all'

    function buildHref(targetPage: number) {
        const sp = new URLSearchParams()
        if (query) sp.set('q', query)
        if (status !== 'all') sp.set('status', status)
        if (targetPage > 1) sp.set('page', String(targetPage))
        const qs = sp.toString()
        return qs ? `/admin/articles?${qs}` : '/admin/articles'
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="font-serif text-2xl text-[#1B1B18]">Kelola Artikel</h1>
                    <p className="mt-1 text-sm text-[#1B1B18]/60">
                        {total} artikel total
                    </p>
                </div>
                <Link
                    href="/admin/articles/new"
                    className="inline-flex items-center gap-2 self-start rounded-md bg-[#2F5D50] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#254A3F]"
                >
                    <PlusIcon className="h-4 w-4" />
                    Artikel Baru
                </Link>
            </div>

            <ArticlesFilterBar />

            <div className="overflow-hidden rounded-lg border border-[#1B1B18]/10 bg-white">
                {articles.length === 0 ? (
                    <div className="flex flex-col items-center gap-3 p-10 text-center">
                        <InboxIcon className="h-8 w-8 text-[#1B1B18]/30" />
                        {hasFilters ? (
                            <>
                                <p className="text-sm text-[#1B1B18]/60">
                                    Tidak ada artikel yang cocok dengan filter ini.
                                </p>
                                <Link
                                    href="/admin/articles"
                                    className="text-xs font-medium text-[#2F5D50] hover:underline"
                                >
                                    Reset filter
                                </Link>
                            </>
                        ) : (
                            <>
                                <p className="text-sm text-[#1B1B18]/60">Belum ada artikel.</p>
                                <Link
                                    href="/admin/articles/new"
                                    className="text-xs font-medium text-[#2F5D50] hover:underline"
                                >
                                    Buat artikel pertama
                                </Link>
                            </>
                        )}
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-[#1B1B18]/10 text-left font-mono text-xs uppercase text-[#1B1B18]/60">
                                    <th className="px-4 py-3">Judul</th>
                                    <th className="px-4 py-3">Status</th>
                                    <th className="px-4 py-3">Dibuat</th>
                                    <th className="px-4 py-3 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {articles.map((article) => (
                                    <tr
                                        key={article.id}
                                        className="border-b border-[#1B1B18]/5 transition-colors last:border-0 hover:bg-[#1B1B18]/[0.02]"
                                    >
                                        <td className="max-w-[280px] truncate px-4 py-3 font-medium text-[#1B1B18]">
                                            {article.title}
                                        </td>
                                        <td className="px-4 py-3">
                                            <span
                                                className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium ${article.status === 'published'
                                                    ? 'bg-[#2F5D50]/10 text-[#2F5D50]'
                                                    : 'bg-amber-100 text-amber-700'
                                                    }`}
                                            >
                                                <span
                                                    className={`h-1.5 w-1.5 rounded-full ${article.status === 'published'
                                                        ? 'bg-[#2F5D50]'
                                                        : 'bg-amber-600'
                                                        }`}
                                                    aria-hidden="true"
                                                />
                                                {article.status === 'published' ? 'Published' : 'Draft'}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 font-mono text-xs text-[#1B1B18]/60">
                                            {formatDate(article.createdAt)}
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center justify-end gap-4">
                                                <Link
                                                    href={`/admin/articles/${article.id}/edit`}
                                                    className="text-xs font-medium text-[#2F5D50] hover:underline"
                                                >
                                                    Edit
                                                </Link>
                                                <DeleteArticleButton articleId={article.id} />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                <Pagination
                    page={page}
                    totalPages={totalPages}
                    total={total}
                    pageSize={PAGE_SIZE}
                    buildHref={buildHref}
                />
            </div>
        </div>
    )
}
