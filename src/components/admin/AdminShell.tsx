
// components/admin/AdminShell.tsx
"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

interface AdminShellProps {
    adminEmail: string | null;
    children: React.ReactNode;
}

export default function AdminShell({ adminEmail, children }: AdminShellProps) {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-[#F9F8F4]">
            <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />

            <div className="flex min-h-screen flex-1 flex-col md:ml-0">
                <Topbar
                    adminEmail={adminEmail}
                    onMenuClick={() => setSidebarOpen((prev) => !prev)}
                />
                <main className="flex-1 p-4 md:p-6">{children}</main>
            </div>
        </div>
    );
}