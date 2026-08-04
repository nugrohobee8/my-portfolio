"use client"

import { AdminSidebar } from '@/components/admin-sidebar'
import { usePathname } from 'next/navigation'

export default function AdminLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const pathname = usePathname()

    const isLoginRoute = pathname?.startsWith('/admin/login') ?? false
    const showSidebar = !isLoginRoute

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
            <div className="mx-auto flex min-h-screen flex-col lg:flex-row">
                {showSidebar && <AdminSidebar />}
                <main className="flex-1 p-6 lg:p-10">{children}</main>
            </div>
        </div>
    )
}