// app/admin/layout.tsx
import { createClient } from "@/lib/supabase/server";
import AdminShell from "@/components/admin/AdminShell";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    // Route protection utama tetap dipegang oleh proxy.ts.
    // `user?.email` di sini murni untuk ditampilkan di Topbar.
    return <AdminShell adminEmail={user?.email ?? null}>{children}</AdminShell>;
}