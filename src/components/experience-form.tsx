'use client'

import { useRef, useState, useTransition } from 'react'
import { createExperience } from '@/lib/actions/experience'

export function ExperienceForm() {
    const formRef = useRef<HTMLFormElement>(null)
    const [error, setError] = useState<string | null>(null)
    const [isPending, startTransition] = useTransition()
    const [isCurrentJob, setIsCurrentJob] = useState(false)

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setError(null)

        const formData = new FormData(e.currentTarget)
        if (isCurrentJob) {
            formData.delete('endDate')
        }

        startTransition(async () => {
            const result = await createExperience(formData)
            if (result.success) {
                formRef.current?.reset()
                setIsCurrentJob(false)
            } else {
                setError(result.error)
            }
        })
    }

    return (
        <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-3 rounded-lg border p-4"
        >
            <div className="grid grid-cols-2 gap-3">
                <div>
                    <label className="mb-1 block text-xs font-medium">Perusahaan</label>
                    <input
                        name="company"
                        type="text"
                        required
                        placeholder="PT Contoh Teknologi"
                        className="w-full rounded border px-3 py-2 text-sm"
                    />
                </div>
                <div>
                    <label className="mb-1 block text-xs font-medium">Posisi</label>
                    <input
                        name="position"
                        type="text"
                        required
                        placeholder="Frontend Developer"
                        className="w-full rounded border px-3 py-2 text-sm"
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <div>
                    <label className="mb-1 block text-xs font-medium">Tanggal Mulai</label>
                    <input
                        name="startDate"
                        type="date"
                        required
                        className="w-full rounded border px-3 py-2 text-sm"
                    />
                </div>
                <div>
                    <label className="mb-1 block text-xs font-medium">Tanggal Selesai</label>
                    <input
                        name="endDate"
                        type="date"
                        disabled={isCurrentJob}
                        className="w-full rounded border px-3 py-2 text-sm disabled:bg-gray-100"
                    />
                </div>
            </div>

            <div className="flex items-center gap-2">
                <input
                    type="checkbox"
                    id="isCurrentJob"
                    checked={isCurrentJob}
                    onChange={(e) => setIsCurrentJob(e.target.checked)}
                    className="h-4 w-4"
                />
                <label htmlFor="isCurrentJob" className="text-sm">
                    Masih bekerja di sini
                </label>
            </div>

            <div>
                <label className="mb-1 block text-xs font-medium">Deskripsi</label>
                <textarea
                    name="description"
                    required
                    rows={3}
                    placeholder="Tanggung jawab dan pencapaian selama bekerja di sini..."
                    className="w-full rounded border px-3 py-2 text-sm"
                />
            </div>

            <button
                type="submit"
                disabled={isPending}
                className="rounded bg-black px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
            >
                {isPending ? 'Menyimpan...' : 'Tambah Pengalaman'}
            </button>

            {error && <p className="text-sm text-red-600">{error}</p>}
        </form>
    )
}