'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function AdminLoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
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

        router.push('/admin/articles')
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
                    <div className="relative">
                        <input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 px-4 py-3 pr-11 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 transition-all focus:border-slate-500 dark:focus:border-slate-400 focus:bg-white dark:focus:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-200 dark:focus:ring-slate-700"
                            placeholder="••••••••"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                            className="absolute inset-y-0 right-0 flex items-center px-3 text-slate-400 transition-colors hover:text-slate-600 dark:hover:text-slate-200"
                        >
                            {showPassword ? (
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path
                                        d="M3 3l14 14M8.5 8.7a2 2 0 0 0 2.8 2.8M6.1 6.3C4.1 7.5 2.7 9.3 2 10c1.4 2.3 4.3 5.5 8 5.5 1.4 0 2.7-.4 3.8-1.1M10 4.5c3.7 0 6.6 3.2 8 5.5a13.3 13.3 0 0 1-2 2.5"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            ) : (
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path
                                        d="M2 10c1.4-2.3 4.3-5.5 8-5.5s6.6 3.2 8 5.5c-1.4 2.3-4.3 5.5-8 5.5S3.4 12.3 2 10Z"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M12.5 10a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>
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