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

        router.push('/admin/articles')
        router.refresh()
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
            <form
                onSubmit={handleLogin}
                className="w-full max-w-sm rounded-lg border bg-white p-8 shadow-sm"
            >
                <h1 className="mb-6 text-xl font-semibold">Admin Login</h1>

                {error && (
                    <p className="mb-4 rounded bg-red-50 p-2 text-sm text-red-600">
                        {error}
                    </p>
                )}

                <div className="mb-4">
                    <label htmlFor="email" className="mb-1 block text-sm font-medium">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded border px-3 py-2 text-sm"
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="password" className="mb-1 block text-sm font-medium">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded border px-3 py-2 text-sm"
                    />
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full rounded bg-black py-2 text-sm font-medium text-white disabled:opacity-50"
                >
                    {isLoading ? 'Memproses...' : 'Masuk'}
                </button>
            </form>
        </div>
    )
}