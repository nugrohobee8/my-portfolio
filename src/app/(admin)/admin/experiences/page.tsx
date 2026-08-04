import { getExperiences } from '@/lib/actions/experience'
import { ExperienceForm } from '@/components/experience-form'
import { DeleteExperienceButton } from '@/components/delete-experience-button'
import { InboxIcon } from '@/components/admin/icons'

function formatDate(date: Date | null) {
    if (!date) return 'Sekarang'
    return date.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })
}

export default async function AdminExperiencesPage() {
    const experiences = await getExperiences()

    return (
        <div className="space-y-6">
            <div>
                <h1 className="font-serif text-2xl text-[#1B1B18]">
                    Kelola Pengalaman Kerja
                </h1>
                <p className="mt-1 text-sm text-[#1B1B18]/60">
                    {experiences.length} pengalaman total
                </p>
            </div>

            <ExperienceForm />

            {experiences.length === 0 ? (
                <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-[#1B1B18]/15 bg-white p-10 text-center">
                    <InboxIcon className="h-8 w-8 text-[#1B1B18]/30" />
                    <p className="text-sm text-[#1B1B18]/60">
                        Belum ada pengalaman kerja ditambahkan.
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {experiences.map((exp) => (
                        <div
                            key={exp.id}
                            className="rounded-lg border border-[#1B1B18]/10 bg-white p-5"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <h3 className="font-medium text-[#1B1B18]">{exp.position}</h3>
                                    <p className="text-sm text-[#1B1B18]/60">{exp.company}</p>
                                </div>
                                <DeleteExperienceButton experienceId={exp.id} />
                            </div>

                            <div className="mt-2 flex items-center gap-2">
                                <span className="font-mono text-xs text-[#1B1B18]/50">
                                    {formatDate(exp.startDate)} — {formatDate(exp.endDate)}
                                </span>
                                {!exp.endDate && (
                                    <span className="rounded-full bg-[#2F5D50]/10 px-2 py-0.5 text-xs font-medium text-[#2F5D50]">
                                        Aktif
                                    </span>
                                )}
                            </div>

                            <p className="mt-3 text-sm text-[#1B1B18]/70">{exp.description}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
