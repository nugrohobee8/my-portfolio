import Link from 'next/link'
import { prisma } from '@/lib/prisma'

const CATEGORY_LABELS: Record<string, string> = {
    frontend: 'Frontend',
    backend: 'Backend',
    database: 'Database',
    devops: 'DevOps',
    tools: 'Tools',
    other: 'Lainnya',
}

function formatDate(date: Date | null) {
    if (!date) return 'Current'
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

export default async function HomePage() {
    const [projects, skills, experiences] = await Promise.all([
        prisma.project.findMany({ orderBy: [{ isFeatured: 'desc' }, { createdAt: 'desc' }] }),
        prisma.skill.findMany({ orderBy: [{ category: 'asc' }, { name: 'asc' }] }),
        prisma.experience.findMany({ orderBy: { startDate: 'desc' } }),
    ])

    const groupedSkills = skills.reduce<Record<string, typeof skills>>((acc, skill) => {
        if (!acc[skill.category]) acc[skill.category] = []
        acc[skill.category].push(skill)
        return acc
    }, {})

    return (
        <div className="min-h-screen bg-[#F9F8F4]">
            {/* Hero */}
            <section className="mx-auto max-w-3xl px-6 py-20">
                <p className="font-[family-name:var(--font-mono)] text-xs tracking-wide text-[#6B6A63]">
                    $ whoami
                </p>
                <h1 className="mt-3 font-[family-name:var(--font-serif)] text-5xl font-medium text-[#1B1B18]">
                    DIAN BAYU NUGROHO
                </h1>
                <p className="mt-4 max-w-xl text-lg text-[#6B6A63]">
                    An experienced Software Developer with a track record of building applications from
                    the ground up through to production — from architecture design and feature development to performance optimization.
                    Skilled at solving technical problems systematically and enjoys exploring new technologies to improve efficiency. Results-oriented, detail-focused,
                    and comfortable working both collaboratively in a team and independently.{' '}
                    <Link href="/articles" className="text-[#2F5D50] underline underline-offset-2">
                        Read my articles
                    </Link>
                    .
                </p>
                <div className="mt-6 flex gap-4 font-[family-name:var(--font-mono)] text-sm">

                    <a href="mailto:nugrohobee8@gmail.com"
                        className="text-[#2F5D50] hover:underline"
                    >
                        nugrohobee8@gmail.com
                    </a>
                    <a
                        href="https://github.com/nugrohobee8"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#2F5D50] hover:underline"
                    >
                        github.com/nugrohobee8
                    </a>
                </div>
            </section>

            {/* Experience */}
            {experiences.length > 0 && (
                <section className="mx-auto max-w-3xl border-t border-[#DEDCD3] px-6 py-16">
                    <p className="font-[family-name:var(--font-mono)] text-xs tracking-wide text-[#6B6A63]">
                        ~/experiences
                    </p>
                    <h2 className="mt-2 font-[family-name:var(--font-serif)] text-2xl font-medium text-[#1B1B18]">
                        Experience
                    </h2>

                    <div className="mt-8 space-y-8 border-l border-[#DEDCD3] pl-6">
                        {experiences.map((exp) => (
                            <div key={exp.id} className="relative">
                                <div className="absolute -left-[27px] top-1.5 h-2 w-2 rounded-full bg-[#2F5D50]" />
                                <p className="font-[family-name:var(--font-mono)] text-xs text-[#6B6A63]">
                                    {formatDate(exp.startDate)} — {formatDate(exp.endDate)}
                                </p>
                                <h3 className="mt-1 font-medium text-[#1B1B18]">{exp.position}</h3>
                                <p className="text-sm text-[#6B6A63]">{exp.company}</p>
                                <p className="mt-2 text-sm text-[#1B1B18]/80">{exp.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Projects */}
            {projects.length > 0 && (
                <section className="mx-auto max-w-3xl border-t border-[#DEDCD3] px-6 py-16">
                    <p className="font-[family-name:var(--font-mono)] text-xs tracking-wide text-[#6B6A63]">
                        ~/projects
                    </p>
                    <h2 className="mt-2 font-[family-name:var(--font-serif)] text-2xl font-medium text-[#1B1B18]">
                        Project
                    </h2>

                    <div className="mt-8 grid gap-6 sm:grid-cols-2">
                        {projects.map((project) => (
                            <div
                                key={project.id}
                                className="overflow-hidden rounded-lg border border-[#DEDCD3] bg-white"
                            >
                                {project.coverImage && (
                                    <img
                                        src={project.coverImage}
                                        alt={project.title}
                                        className="h-40 w-full object-cover"
                                    />
                                )}
                                <div className="p-4">
                                    {project.isFeatured && (
                                        <span className="mb-2 inline-block rounded-full bg-[#E4ECE9] px-2 py-0.5 font-[family-name:var(--font-mono)] text-[10px] text-[#2F5D50]">
                                            Featured
                                        </span>
                                    )}
                                    <h3 className="font-medium text-[#1B1B18]">{project.title}</h3>
                                    <p className="mt-1 line-clamp-2 text-sm text-[#6B6A63]">
                                        {project.description}
                                    </p>

                                    {project.techStack.length > 0 && (
                                        <div className="mt-3 flex flex-wrap gap-1.5">
                                            {project.techStack.map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="rounded-full bg-gray-100 px-2 py-0.5 font-[family-name:var(--font-mono)] text-[11px] text-[#6B6A63]"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    <div className="mt-4 flex gap-4 font-[family-name:var(--font-mono)] text-xs">
                                        {project.demoUrl && (

                                            <a href={project.demoUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-[#2F5D50] hover:underline"
                                            >
                                                Demo →
                                            </a>
                                        )}
                                        {project.repoUrl && (

                                            <a href={project.repoUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-[#2F5D50] hover:underline"
                                            >
                                                Repo →
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section >
            )
            }

            {/* Skills */}
            {
                skills.length > 0 && (
                    <section className="mx-auto max-w-3xl border-t border-[#DEDCD3] px-6 py-16">
                        <p className="font-[family-name:var(--font-mono)] text-xs tracking-wide text-[#6B6A63]">
                            ~/skills
                        </p>
                        <h2 className="mt-2 font-[family-name:var(--font-serif)] text-2xl font-medium text-[#1B1B18]">
                            Skill
                        </h2>

                        <div className="mt-8 space-y-6">
                            {Object.entries(groupedSkills).map(([category, items]) => (
                                <div key={category}>
                                    <h3 className="mb-2 font-[family-name:var(--font-mono)] text-xs text-[#6B6A63]">
                                        {CATEGORY_LABELS[category] ?? category}
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {items.map((skill) => (
                                            <span
                                                key={skill.id}
                                                className="rounded-full border border-[#DEDCD3] bg-white px-3 py-1.5 text-sm text-[#1B1B18]"
                                            >
                                                {skill.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )
            }

            <footer className="border-t border-[#DEDCD3] px-6 py-10 text-center font-[family-name:var(--font-mono)] text-xs text-[#6B6A63]">
                © <b>{new Date().getFullYear()} — Dian Bayu Nugroho</b> All rights reserved.
            </footer>
        </div >
    )
}