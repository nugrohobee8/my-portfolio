'use client'

import { useRef, useState, useTransition } from 'react'
import { createSkill } from '@/lib/actions/skill'

const CATEGORIES = [
    { value: 'frontend', label: 'Frontend' },
    { value: 'backend', label: 'Backend' },
    { value: 'database', label: 'Database' },
    { value: 'devops', label: 'DevOps' },
    { value: 'tools', label: 'Tools' },
    { value: 'other', label: 'Lainnya' },
] as const

export function SkillForm() {
    const formRef = useRef<HTMLFormElement>(null)
    const [error, setError] = useState<string | null>(null)
    const [isPending, startTransition] = useTransition()

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setError(null)

        const formData = new FormData(e.currentTarget)

        startTransition(async () => {
            const result = await createSkill(formData)
            if (result.success) {
                formRef.current?.reset()
            } else {
                setError(result.error)
            }
        })
    }

    return (
        <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="flex flex-wrap items-end gap-3 rounded-lg border p-4"
        >
            <div className="flex-1 min-w-[140px]">
                <label className="mb-1 block text-xs font-medium">Nama Skill</label>
                <input
                    name="name"
                    type="text"
                    required
                    placeholder="Next.js"
                    className="w-full rounded border px-3 py-2 text-sm"
                />
            </div>

            <div className="min-w-[140px]">
                <label className="mb-1 block text-xs font-medium">Kategori</label>
                <select
                    name="category"
                    required
                    className="w-full rounded border px-3 py-2 text-sm"
                >
                    {CATEGORIES.map((cat) => (
                        <option key={cat.value} value={cat.value}>
                            {cat.label}
                        </option>
                    ))}
                </select>
            </div>

            <div className="w-24">
                <label className="mb-1 block text-xs font-medium">Level (1-5)</label>
                <input
                    name="level"
                    type="number"
                    min={1}
                    max={5}
                    placeholder="opsional"
                    className="w-full rounded border px-3 py-2 text-sm"
                />
            </div>

            <div className="flex-1 min-w-[140px]">
                <label className="mb-1 block text-xs font-medium">Icon (opsional)</label>
                <input
                    name="icon"
                    type="text"
                    placeholder="nama icon / URL"
                    className="w-full rounded border px-3 py-2 text-sm"
                />
            </div>

            <button
                type="submit"
                disabled={isPending}
                className="rounded bg-black px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
            >
                {isPending ? 'Menyimpan...' : 'Tambah'}
            </button>

            {error && <p className="w-full text-sm text-red-600">{error}</p>}
        </form>
    )
}