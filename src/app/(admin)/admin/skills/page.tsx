import { getSkills } from '@/lib/actions/skill'
import { SkillForm } from '@/components/skill-form'
import { DeleteSkillButton } from '@/components/delete-skill-button'

const CATEGORY_LABELS: Record<string, string> = {
    frontend: 'Frontend',
    backend: 'Backend',
    database: 'Database',
    devops: 'DevOps',
    tools: 'Tools',
    other: 'Lainnya',
}

export default async function AdminSkillsPage() {
    const skills = await getSkills()

    const groupedSkills = skills.reduce<Record<string, typeof skills>>((acc, skill) => {
        if (!acc[skill.category]) acc[skill.category] = []
        acc[skill.category].push(skill)
        return acc
    }, {})

    return (
        <div className="mx-auto max-w-4xl p-8">
            <h1 className="mb-6 text-2xl font-bold">Kelola Skill</h1>

            <SkillForm />

            <div className="mt-8 space-y-6">
                {Object.keys(groupedSkills).length === 0 ? (
                    <p className="text-gray-500">Belum ada skill ditambahkan.</p>
                ) : (
                    Object.entries(groupedSkills).map(([category, items]) => (
                        <div key={category}>
                            <h2 className="mb-2 text-sm font-semibold text-gray-500">
                                {CATEGORY_LABELS[category] ?? category}
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {items.map((skill) => (
                                    <span
                                        key={skill.id}
                                        className="flex items-center gap-2 rounded-full border bg-gray-50 px-3 py-1.5 text-sm"
                                    >
                                        {skill.name}
                                        {skill.level && (
                                            <span className="text-xs text-gray-400">Lv.{skill.level}</span>
                                        )}
                                        <DeleteSkillButton skillId={skill.id} />
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}