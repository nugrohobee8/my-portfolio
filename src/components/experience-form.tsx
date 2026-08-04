'use client'

import { useRef, useState, useTransition } from 'react'
import { createExperience } from '@/lib/actions/experience'
import { PlusIcon } from '@/components/admin/icons'

const inputClass =
    'w-full rounded-md border border-[#1B1B18]/15 bg-white px-3 py-2 text-sm text-[#1B1B18] placeholder-[#1B1B18]/40 transition-colors focus:border-[#2F5D50] focus:outline-none focus:ring-1 focus:ring-[#2F5D50] disabled:bg-[#1B1B18]/5 disabled:text-[#1B1B18]/40'
const labelClass = 'mb-1.5 block text-xs font-medium text-[#1B1B18]/70'

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
        <div className="rounded-lg border border-[#1B1B18]/10 bg-white p-5">
            <h2 className="mb-4 text-sm font-medium text-[#1B1B18]">Tambah Pengalaman</h2>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <label className={labelClass}>Perusahaan</label>
                        <input
                            name="company"
                            type="text"
                            required
                            placeholder="PT Contoh Teknologi"
                            className={inputClass}
                        />
                    </div>
                    <div>
                        <label className={labelClass}>Posisi</label>
                        <input
                            name="position"
                            type="text"
                            required
                            placeholder="Frontend Developer"
                            className={inputClass}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <label className={labelClass}>Tanggal Mulai</label>
                        <input name="startDate" type="date" required className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>Tanggal Selesai</label>
                        <input
                            name="endDate"
                            type="date"
                            disabled={isCurrentJob}
                            className={inputClass}
                        />
                    </div>
                </div>

                <label className="flex w-fit cursor-pointer items-center gap-3">
                    <span className="relative inline-flex h-6 w-11 shrink-0 items-center rounded-full bg-[#1B1B18]/15 transition-colors has-[:checked]:bg-[#2F5D50]">
                        <input
                            type="checkbox"
                            checked={isCurrentJob}
                            onChange={(e) => setIsCurrentJob(e.target.checked)}
                            className="peer sr-only"
                        />
                        <span className="inline-block h-5 w-5 translate-x-0.5 rounded-full bg-white shadow transition-transform peer-checked:translate-x-5" />
                    </span>
                    <span className="text-sm text-[#1B1B18]">Masih bekerja di sini</span>
                </label>

                <div>
                    <label className={labelClass}>Deskripsi</label>
                    <textarea
                        name="description"
                        required
                        rows={3}
                        placeholder="Tanggung jawab dan pencapaian selama bekerja di sini..."
                        className={`${inputClass} resize-y`}
                    />
                </div>

                <button
                    type="submit"
                    disabled={isPending}
                    className="inline-flex items-center gap-2 rounded-md bg-[#2F5D50] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#254A3F] disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <PlusIcon className="h-4 w-4" />
                    {isPending ? 'Menyimpan...' : 'Tambah Pengalaman'}
                </button>

                {error && <p className="text-xs text-red-600">{error}</p>}
            </form>
        </div>
    )
}
