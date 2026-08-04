'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { LogoutButton } from '@/components/logout-button'

const navItems = [
    { href: '/admin', label: 'Dashboard', icon: 'home' },
    { href: '/admin/articles', label: 'Artikel', icon: 'doc' },
    { href: '/admin/projects', label: 'Project', icon: 'folder' },
    { href: '/admin/experiences', label: 'Pengalaman', icon: 'briefcase' },
    { href: '/admin/skills', label: 'Skill', icon: 'star' },
]

function Icon({ name }: { name: string }) {
    switch (name) {
        case 'home':
            return (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <path d="M3 11.5L12 4l9 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M5 21V11h14v10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            )
        case 'doc':
            return (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M14 2v6h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            )
        case 'folder':
            return (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            )
        case 'briefcase':
            return (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <rect x="2" y="7" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            )
        case 'star':
            return (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <path d="M12 17.3L6.6 20l1.1-6.4L2.8 9.6l6.5-.9L12 3l2.7 5.7 6.5.9-4.9 3.9L17.4 20z" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            )
        default:
            return null
    }
}

export function AdminSidebar() {
    const pathname = usePathname()
    const [collapsed, setCollapsed] = useState(false)
    const [username, setUsername] = useState<string | null>(null)

    useEffect(() => {
        try {
            const stored = localStorage.getItem('adminSidebarCollapsed')
            if (stored != null) setCollapsed(stored === 'true')
        } catch (e) {
            // ignore
        }
    }, [])

    useEffect(() => {
        try {
            localStorage.setItem('adminSidebarCollapsed', collapsed ? 'true' : 'false')
        } catch (e) {
            // ignore
        }
    }, [collapsed])

    useEffect(() => {
        async function loadUser() {
            try {
                const supabase = createClient()
                const { data } = await supabase.auth.getUser()
                setUsername(data?.user?.email ?? null)
            } catch {
                setUsername(null)
            }
        }

        loadUser()
    }, [])

    return (
        <aside
            className={`relative flex min-h-screen flex-col border-b border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950 transition-all duration-200 overflow-visible ${collapsed ? 'w-20 min-w-[5rem]' : 'w-full lg:w-72 lg:border-b-0 lg:border-r'}
                }`}
        >
            <div className="mb-6 flex items-center justify-between gap-2 px-2">
                <div className={`flex-1 ${collapsed ? 'hidden lg:block' : 'block'}`}>
                    <h2 className={`mt-2 ${collapsed ? 'text-md' : 'text-lg'} font-bold text-slate-900 dark:text-white`}>Admin</h2>
                    {!collapsed && username ? (
                        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{username}</p>
                    ) : null}
                </div>

                <button
                    type="button"
                    aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                    title={collapsed ? 'Expand' : 'Collapse'}
                    onClick={() => setCollapsed((s) => !s)}
                    className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 p-2 text-slate-700 shadow-sm transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                >
                    {collapsed ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                            <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    ) : (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    )}
                </button>
            </div>

            <nav className="flex flex-col gap-2 px-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            title={item.label}
                            className={`flex items-center gap-3 rounded-2xl py-2 text-sm font-medium transition ${collapsed ? 'justify-center items-center px-0' : 'px-3'} ${isActive
                                ? 'bg-slate-900 text-white shadow-sm dark:bg-slate-700'
                                : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                                }`}
                        >
                            <span className={`flex h-8 ${collapsed ? 'w-full' : 'w-6'} items-center justify-center text-slate-700 dark:text-slate-300`}>
                                <Icon name={item.icon} />
                            </span>
                            <span className={`transition-all duration-200 ${collapsed ? 'max-w-0 overflow-hidden opacity-0' : 'max-w-full opacity-100'}`}>
                                {item.label}
                            </span>
                        </Link>
                    )
                })}
            </nav>

            <div className="mt-auto px-2 py-4">
                <div className={`${collapsed ? 'flex items-center justify-center' : ''}`}>
                    <LogoutButton compact={collapsed} />
                </div>
            </div>
        </aside>
    )
}
