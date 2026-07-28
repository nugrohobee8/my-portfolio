'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

const navItems = [
    { key: 'home', label: 'About me', href: '/#home' },
    { key: 'projects', label: 'Projects', href: '/#projects' },
    { key: 'skills', label: 'Skills', href: '/#skills' },
    { key: 'articles', label: 'Articles', href: '/articles' },
] as const

type NavKey = (typeof navItems)[number]['key']

export default function PublicLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const [activeItem, setActiveItem] = useState<NavKey>('home')

    useEffect(() => {
        if (pathname.startsWith('/articles')) {
            setActiveItem('articles')
            return
        }

        const sections = ['home', 'projects', 'skills'].map((id) => document.getElementById(id))

        if (sections.every((section) => !section)) {
            setActiveItem('home')
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
                    <Link
                        href="/"
                        className="font-[family-name:var(--font-mono)] text-sm text-[#1B1B18]"
                    >

                    </Link>
                    <div className="flex flex-wrap items-center gap-4 font-[family-name:var(--font-mono)] text-sm sm:gap-6">
                        {navItems.map((item) => {
                            const isActive = activeItem === item.key

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`transition-colors hover:text-[#2F5D50] ${isActive ? 'text-[#1B1B18] underline decoration-black decoration-2 underline-offset-4' : 'text-[#6B6A63]'}`}
                                >
                                    {item.label}
                                </Link>
                            )
                        })}
                    </div>
                </nav>
            </header>
            {children}
        </div>
    )
}