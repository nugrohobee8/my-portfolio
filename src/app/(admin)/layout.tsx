export default function AdminLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return <main className="flex-1">{children}</main>
}