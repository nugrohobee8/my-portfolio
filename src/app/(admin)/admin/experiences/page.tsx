import { getExperiences } from '@/lib/actions/experience'
import { ExperienceForm } from '@/components/experience-form'
import { DeleteExperienceButton } from '@/components/delete-experience-button'

function formatDate(date: Date | null) {
    if (!date) return 'Sekarang'
    return date.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })
}

export default async function AdminExperiencesPage() {
    const experiences = await getExperiences()

    return (
        <div className="mx-auto max-w-3xl p-8">
            <h1 className="mb-6 text-2xl font-bold">Kelola Pengalaman Kerja</h1>

            <ExperienceForm />

            <div className="mt-8 space-y-4">
                {experiences.length === 0 ? (
                    <p className="text-gray-500">Belum ada pengalaman kerja ditambahkan.</p>
                ) : (
                    experiences.map((exp) => (
                        <div
                            key={exp.id}
                            className="flex items-start justify-between rounded-lg border p-4"
                        >
                            <div>
                                <h3 className="font-semibold">{exp.position}</h3>
                                <p className="text-sm text-gray-600">{exp.company}</p>
                                <p className="mt-1 text-xs text-gray-400">
                                    {formatDate(exp.startDate)} — {formatDate(exp.endDate)}
                                </p>
                                <p className="mt-2 text-sm text-gray-700">{exp.description}</p>
                            </div>
                            <DeleteExperienceButton experienceId={exp.id} />
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}