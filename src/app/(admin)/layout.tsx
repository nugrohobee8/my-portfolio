import { ThemeToggle } from '@/components/theme-toggle'

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div className="absolute top-4 right-4">
                <ThemeToggle />
            </div>
            <main className="flex-1">
                {children}
            </main>
        </>
    )
}
