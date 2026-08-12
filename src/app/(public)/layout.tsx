'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

const navItems = [
    // { key: 'home', label: 'About me', href: '/#home' },
    { key: 'articles', label: 'Articles', href: '/articles' },
    { key: 'projects', label: 'Projects', href: '/#projects' },
    { key: 'skills', label: 'Skills', href: '/#skills' },
] as const

type NavKey = (typeof navItems)[number]['key']

function navLinkClassName(isActive: boolean) {
    return `transition-colors hover:text-[#2F5D50] ${isActive ? 'text-[#1B1B18] underline decoration-black decoration-2 underline-offset-4' : 'text-[#6B6A63]'}`
}

export default function PublicLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const [activeItem, setActiveItem] = useState<NavKey>('projects')
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    useEffect(() => {
        if (pathname.startsWith('/articles')) {
            setActiveItem('articles')
            return
        }

        const sections = ['home', 'projects', 'skills'].map((id) => document.getElementById(id))

        if (sections.every((section) => !section)) {
            setActiveItem('projects')
            return
        }

        const observer = new IntersectionObserver(
            (entries) => {
                const visibleEntry = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

                if (visibleEntry) {
                    setActiveItem(visibleEntry.target.id as NavKey)
                }
            },
            {
                rootMargin: '-35% 0px -45% 0px',
                threshold: [0.2, 0.4, 0.6],
            },
        )

        sections.forEach((section) => {
            if (section) observer.observe(section)
        })

        return () => observer.disconnect()
    }, [pathname])

    return (
        <div>
            <header className="sticky top-0 z-10 border-b border-[#DEDCD3] bg-[#F9F8F4]/90 backdrop-blur">
                <nav className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
                    <Link href="/" className="text-[#1B1B18] transition-colors hover:text-[#2F5D50]">
                        <h4 className="font-[family-name:var(--font-mono)] text-sm">Dian Bayu Nugroho</h4>
                    </Link>
                    <div className="hidden items-center gap-6 font-[family-name:var(--font-mono)] text-sm sm:flex">
                        {navItems.map((item) => (
                            <Link key={item.href} href={item.href} className={navLinkClassName(activeItem === item.key)}>
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    <button
                        type="button"
                        onClick={() => setIsMenuOpen((prev) => !prev)}
                        aria-label={isMenuOpen ? 'Tutup menu' : 'Buka menu'}
                        aria-expanded={isMenuOpen}
                        className="rounded-md p-2 text-[#1B1B18] hover:bg-[#1B1B18]/5 sm:hidden"
                    >
                        {/* Ikon hamburger inline, biar tidak nambah dependency */}
                        {isMenuOpen ? (
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                        ) : (
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M2.5 5h15M2.5 10h15M2.5 15h15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                        )}
                    </button>
                </nav>

                {isMenuOpen && (
                    <div className="border-t border-[#DEDCD3] px-6 py-4 sm:hidden">
                        <div className="flex flex-col gap-4 font-[family-name:var(--font-mono)] text-sm">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={navLinkClassName(activeItem === item.key)}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </header>
            {children}
        </div>
    )
}