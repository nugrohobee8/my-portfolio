import { getSkills } from '@/lib/actions/skill'
import { SkillForm } from '@/components/skill-form'
import { DeleteSkillButton } from '@/components/delete-skill-button'
import { InboxIcon } from '@/components/admin/icons'

const CATEGORY_LABELS: Record<string, string> = {
    frontend: 'Frontend',
    backend: 'Backend',
    database: 'Database',
    devops: 'DevOps',
    tools: 'Tools',
    other: 'Lainnya',
}

const CATEGORY_ORDER = ['frontend', 'backend', 'database', 'devops', 'tools', 'other']

function LevelDots({ level }: { level: number }) {
    return (
        <span className="flex items-center gap-0.5" aria-label={`Level ${level} dari 5`}>
            {Array.from({ length: 5 }, (_, i) => (
                <span
                    key={i}
                    className={`h-1 w-1 rounded-full ${i < level ? 'bg-[#2F5D50]' : 'bg-[#1B1B18]/15'
                        }`}
                />
            ))}
        </span>
    )
}

export default async function AdminSkillsPage() {
    const skills = await getSkills()

    const groupedSkills = skills.reduce<Record<string, typeof skills>>((acc, skill) => {
        if (!acc[skill.category]) acc[skill.category] = []
        acc[skill.category].push(skill)
        return acc
    }, {})

    const categories = Object.keys(groupedSkills).sort(
        (a, b) => CATEGORY_ORDER.indexOf(a) - CATEGORY_ORDER.indexOf(b)
    )

    return (
        <div className="space-y-6">
            <div>
                <h1 className="font-serif text-2xl text-[#1B1B18]">Kelola Skill</h1>
                <p className="mt-1 text-sm text-[#1B1B18]/60">{skills.length} skill total</p>
            </div>

            <SkillForm />

            <div className="rounded-lg border border-[#1B1B18]/10 bg-white p-5">
                {categories.length === 0 ? (
                    <div className="flex flex-col items-center gap-3 py-10 text-center">
                        <InboxIcon className="h-8 w-8 text-[#1B1B18]/30" />
                        <p className="text-sm text-[#1B1B18]/60">Belum ada skill ditambahkan.</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {categories.map((category) => (
                            <div key={category}>
                                <div className="mb-2.5 flex items-center gap-2">
                                    <h2 className="font-mono text-xs uppercase tracking-wide text-[#1B1B18]/60">
                                        {CATEGORY_LABELS[category] ?? category}
                                    </h2>
                                    <span className="text-xs text-[#1B1B18]/30">
                                        ({groupedSkills[category].length})
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {groupedSkills[category].map((skill) => (
                                        <span
                                            key={skill.id}
                                            className="flex items-center gap-2 rounded-full border border-[#1B1B18]/10 bg-[#F9F8F4] px-3 py-1.5 text-sm text-[#1B1B18]"
                                        >
                                            {skill.name}
                                            {skill.level && <LevelDots level={skill.level} />}
                                            <DeleteSkillButton skillId={skill.id} />
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
