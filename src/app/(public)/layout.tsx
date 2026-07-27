import Link from 'next/link'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <header className="sticky top-0 z-10 border-b border-[#DEDCD3] bg-[#F9F8F4]/90 backdrop-blur">
                <nav className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
                    <Link
                        href="/"
                        className="font-[family-name:var(--font-mono)] text-sm text-[#1B1B18]"
                    >
                        ~/
                    </Link>
                    <div className="flex gap-6 font-[family-name:var(--font-mono)] text-sm text-[#6B6A63]">
                        <Link href="/" className="transition-colors hover:text-[#2F5D50]">
                            Home
                        </Link>
                        <Link href="/articles" className="transition-colors hover:text-[#2F5D50]">
                            Articles
                        </Link>
                    </div>
                </nav>
            </header>
            {children}
        </div>
    )
}