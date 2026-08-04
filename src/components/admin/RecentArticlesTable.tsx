// components/admin/RecentArticlesTable.tsx
import Link from "next/link";
import type { RecentArticle } from "@/lib/dashboard/getStats";
import { InboxIcon } from "@/components/admin/icons";

interface RecentArticlesTableProps {
    articles: RecentArticle[];
}

function formatDate(date: Date): string {
    return new Intl.DateTimeFormat("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    }).format(date);
}

export default function RecentArticlesTable({
    articles,
}: RecentArticlesTableProps) {
    if (articles.length === 0) {
        return (
            <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-[#1B1B18]/15 bg-white p-10 text-center">
                <InboxIcon className="h-8 w-8 text-[#1B1B18]/30" />
                <p className="text-sm text-[#1B1B18]/60">Belum ada artikel.</p>
                <Link
                    href="/admin/articles/new"
                    className="text-xs font-medium text-[#2F5D50] hover:underline"
                >
                    Buat artikel pertama
                </Link>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto rounded-lg border border-[#1B1B18]/10 bg-white">
            <table className="w-full text-sm">
                <thead>
                    <tr className="border-b border-[#1B1B18]/10 text-left font-mono text-xs uppercase text-[#1B1B18]/60">
                        <th className="px-4 py-3">Judul</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3">Terakhir diubah</th>
                        <th className="px-4 py-3 text-right">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {articles.map((article) => (
                        <tr
                            key={article.id}
                            className="border-b border-[#1B1B18]/5 transition-colors last:border-0 hover:bg-[#1B1B18]/[0.02]"
                        >
                            <td className="max-w-[240px] truncate px-4 py-3 font-medium text-[#1B1B18]">
                                {article.title}
                            </td>
                            <td className="px-4 py-3">
                                <span
                                    className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium ${article.status === "published"
                                        ? "bg-[#2F5D50]/10 text-[#2F5D50]"
                                        : "bg-amber-100 text-amber-700"
                                        }`}
                                >
                                    <span
                                        className={`h-1.5 w-1.5 rounded-full ${article.status === "published"
                                            ? "bg-[#2F5D50]"
                                            : "bg-amber-600"
                                            }`}
                                        aria-hidden="true"
                                    />
                                    {article.status === "published" ? "Published" : "Draft"}
                                </span>
                            </td>
                            <td className="px-4 py-3 font-mono text-xs text-[#1B1B18]/60">
                                {formatDate(article.updatedAt)}
                            </td>
                            <td className="px-4 py-3 text-right">
                                <Link
                                    href={`/admin/articles/${article.id}/edit`}
                                    className="text-xs font-medium text-[#2F5D50] hover:underline"
                                >
                                    Edit
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
