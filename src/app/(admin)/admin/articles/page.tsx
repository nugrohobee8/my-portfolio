import Link from 'next/link'
import { getArticles } from '@/lib/actions/article'
import { LogoutButton } from '@/components/logout-button'
import { DeleteArticleButton } from '../../../../components/delete-article-button'

export default async function AdminArticlesPage() {
    const articles = await getArticles()

    return (
        <div className="mx-auto max-w-4xl p-8">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold">Kelola Artikel</h1>
                <div className="flex gap-3">
                    <Link
                        href="/admin/articles/new"
                        className="rounded bg-black px-4 py-2 text-sm font-medium text-white"
                    >
                        + Artikel Baru
                    </Link>
                    <LogoutButton />
                </div>
            </div>

            {articles.length === 0 ? (
                <p className="text-gray-500">Belum ada artikel. Buat yang pertama!</p>
            ) : (
                <table className="w-full border-collapse text-sm">
                    <thead>
                        <tr className="border-b text-left">
                            <th className="py-2">Judul</th>
                            <th className="py-2">Status</th>
                            <th className="py-2">Dibuat</th>
                            <th className="py-2">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {articles.map((article) => (
                            <tr key={article.id} className="border-b">
                                <td className="py-3">{article.title}</td>
                                <td className="py-3">
                                    <span
                                        className={`rounded px-2 py-0.5 text-xs ${article.status === 'published'
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-gray-100 text-gray-600'
                                            }`}
                                    >
                                        {article.status}
                                    </span>
                                </td>
                                <td className="py-3 text-gray-500">
                                    {article.createdAt.toLocaleDateString('id-ID')}
                                </td>
                                <td className="py-3">
                                    <div className="flex gap-3">
                                        <Link
                                            href={`/admin/articles/${article.id}/edit`}
                                            className="text-blue-600 hover:underline"
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
            )}
        </div>
    )
}