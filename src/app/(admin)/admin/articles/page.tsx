import { LogoutButton } from "@/components/logout-button";

export default function AdminArticlesPage() {
    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold">Halo Admin 👋</h1>
            <p className="text-gray-500">Kalau kamu lihat ini, middleware berhasil.</p>
            <LogoutButton />
        </div>
    )
}