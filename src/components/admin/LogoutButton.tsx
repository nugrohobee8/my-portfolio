// components/admin/LogoutButton.tsx
"use client";

import { useEffect, useState, useTransition } from "react";
import { logout } from "@/lib/actions/auth";
import { LogoutIcon } from "@/components/admin/icons";

interface LogoutButtonProps {
    collapsed?: boolean;
}

export default function LogoutButton({ collapsed }: LogoutButtonProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        if (!isOpen) return;

        function handleKeyDown(e: KeyboardEvent) {
            if (e.key === "Escape") setIsOpen(false);
        }

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen]);

    function handleConfirm() {
        startTransition(async () => {
            await logout();
        });
    }

    return (
        <>
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                title={collapsed ? "Logout" : undefined}
                className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-[#F9F8F4]/70 transition-colors hover:bg-red-500/10 hover:text-red-300 ${collapsed ? "md:justify-center" : ""
                    }`}
            >
                <LogoutIcon className="h-5 w-5 shrink-0" />
                <span className={collapsed ? "md:hidden" : ""}>Logout</span>
            </button>

            {isOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="logout-dialog-title"
                    onClick={() => !isPending && setIsOpen(false)}
                >
                    <div
                        className="w-full max-w-sm rounded-lg bg-white p-6 shadow-xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2
                            id="logout-dialog-title"
                            className="font-serif text-lg text-[#1B1B18]"
                        >
                            Konfirmasi Logout
                        </h2>
                        <p className="mt-2 text-sm text-[#1B1B18]/60">
                            Kamu akan keluar dari dashboard admin. Lanjutkan?
                        </p>
                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                disabled={isPending}
                                className="rounded-md px-4 py-2 text-sm font-medium text-[#1B1B18]/70 transition-colors hover:bg-[#1B1B18]/5 disabled:opacity-50"
                            >
                                Batal
                            </button>
                            <button
                                type="button"
                                onClick={handleConfirm}
                                disabled={isPending}
                                className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:opacity-50"
                            >
                                {isPending ? "Keluar..." : "Logout"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
