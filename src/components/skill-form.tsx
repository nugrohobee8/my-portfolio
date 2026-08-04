'use client'

import { useRef, useState, useTransition } from 'react'
import { createSkill } from '@/lib/actions/skill'
import { PlusIcon } from '@/components/admin/icons'

const CATEGORIES = [
    { value: 'frontend', label: 'Frontend' },
    { value: 'backend', label: 'Backend' },
    { value: 'database', label: 'Database' },
    { value: 'devops', label: 'DevOps' },
    { value: 'tools', label: 'Tools' },
    { value: 'other', label: 'Lainnya' },
] as const

const inputClass =
    'w-full rounded-md border border-[#1B1B18]/15 bg-white px-3 py-2 text-sm text-[#1B1B18] placeholder-[#1B1B18]/40 transition-colors focus:border-[#2F5D50] focus:outline-none focus:ring-1 focus:ring-[#2F5D50]'
const labelClass = 'mb-1.5 block text-xs font-medium text-[#1B1B18]/70'

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
        <div className="rounded-lg border border-[#1B1B18]/10 bg-white p-5">
            <h2 className="mb-4 text-sm font-medium text-[#1B1B18]">Tambah Skill</h2>
            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-wrap items-end gap-3">
                <div className="min-w-[160px] flex-1">
                    <label className={labelClass}>Nama Skill</label>
                    <input
                        name="name"
                        type="text"
                        required
                        placeholder="Next.js"
                        className={inputClass}
                    />
                </div>

                <div className="min-w-[140px]">
                    <label className={labelClass}>Kategori</label>
                    <select name="category" required className={inputClass}>
                        {CATEGORIES.map((cat) => (
                            <option key={cat.value} value={cat.value}>
                                {cat.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="w-24">
                    <label className={labelClass}>Level (1-5)</label>
                    <input
                        name="level"
                        type="number"
                        min={1}
                        max={5}
                        placeholder="opsional"
                        className={inputClass}
                    />
                </div>

                <div className="min-w-[160px] flex-1">
                    <label className={labelClass}>Icon (opsional)</label>
                    <input
                        name="icon"
                        type="text"
                        placeholder="nama icon / URL"
                        className={inputClass}
                    />
                </div>

                <button
                    type="submit"
                    disabled={isPending}
                    className="inline-flex items-center gap-2 rounded-md bg-[#2F5D50] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#254A3F] disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <PlusIcon className="h-4 w-4" />
                    {isPending ? 'Menyimpan...' : 'Tambah'}
                </button>

                {error && (
                    <p className="w-full text-xs text-red-600">{error}</p>
                )}
            </form>
        </div>
    )
}
