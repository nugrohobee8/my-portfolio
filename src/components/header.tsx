import Link from 'next/link'
import { ThemeToggle } from './theme-toggle'

export function Header() {
    return (
        <header className="sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-950/60">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center gap-8">
                        <Link href="/" className="font-bold text-lg text-slate-900 dark:text-white hover:text-slate-700 dark:hover:text-slate-200 transition-colors">
                            Portfolio
                        </Link>
                        <nav className="hidden md:flex items-center gap-6">
                            <Link href="/articles" className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                                Artikel
                            </Link>
                        </nav>
                    </div>
                    <ThemeToggle />
                </div>
            </div>
        </header>
    )
}
