'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function AdminLoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault()
        setError(null)
        setIsLoading(true)

        const supabase = createClient()
        const { error: signInError } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        setIsLoading(false)

        if (signInError) {
            setError('Email atau password salah.')
            return
        }

        router.push('/admin')
        router.refresh()
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
            <form
                onSubmit={handleLogin}
                className="w-full max-w-sm space-y-6 rounded-2xl bg-white dark:bg-slate-900 px-8 py-12 shadow-lg dark:shadow-2xl"
            >
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Masuk</h1>
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Kelola artikel Anda di sini</p>
                </div>

                {error && (
                    <div className="flex items-center gap-3 rounded-lg bg-red-50 dark:bg-red-950 p-4 text-sm text-red-700 dark:text-red-200 border border-red-200 dark:border-red-800">
                        <span className="text-lg">⚠️</span>
                        <p>{error}</p>
                    </div>
                )}

                <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 transition-all focus:border-slate-500 dark:focus:border-slate-400 focus:bg-white dark:focus:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-200 dark:focus:ring-slate-700"
                        placeholder="nama@example.com"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 transition-all focus:border-slate-500 dark:focus:border-slate-400 focus:bg-white dark:focus:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-200 dark:focus:ring-slate-700"
                        placeholder="••••••••"
                    />
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full rounded-lg bg-slate-900 dark:bg-slate-700 py-3 text-sm font-semibold text-white dark:text-white transition-all hover:bg-slate-800 dark:hover:bg-slate-600 active:scale-98 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Memproses...' : 'Masuk'}
                </button>
            </form>
        </div>
    )
}