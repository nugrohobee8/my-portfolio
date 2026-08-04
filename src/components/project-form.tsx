'use client'

import { useState, useTransition } from 'react'
import slugify from 'slugify'
import { ImageUpload } from '@/components/image-upload'
import { createProject, updateProject } from '@/lib/actions/project'

type ProjectFormProps = {
    mode: 'create' | 'edit'
    projectId?: string
    initialValues?: {
        title: string
        slug: string
        description: string
        coverImage: string | null
        techStack: string[]
        demoUrl: string | null
        repoUrl: string | null
        isFeatured: boolean
    }
}

const inputClass =
    'w-full rounded-md border border-[#1B1B18]/15 bg-white px-3 py-2 text-sm text-[#1B1B18] placeholder-[#1B1B18]/40 transition-colors focus:border-[#2F5D50] focus:outline-none focus:ring-1 focus:ring-[#2F5D50]'
const labelClass = 'mb-1.5 block text-sm font-medium text-[#1B1B18]'
const cardClass = 'rounded-lg border border-[#1B1B18]/10 bg-white p-5'

export function ProjectForm({ mode, projectId, initialValues }: ProjectFormProps) {
    const [title, setTitle] = useState(initialValues?.title ?? '')
    const [slug, setSlug] = useState(initialValues?.slug ?? '')
    const [description, setDescription] = useState(initialValues?.description ?? '')
    const [coverImage, setCoverImage] = useState(initialValues?.coverImage ?? '')
    const [techStack, setTechStack] = useState(initialValues?.techStack.join(', ') ?? '')
    const [demoUrl, setDemoUrl] = useState(initialValues?.demoUrl ?? '')
    const [repoUrl, setRepoUrl] = useState(initialValues?.repoUrl ?? '')
    const [isFeatured, setIsFeatured] = useState(initialValues?.isFeatured ?? false)
    const [error, setError] = useState<string | null>(null)
    const [isPending, startTransition] = useTransition()
    const [slugManuallyEdited, setSlugManuallyEdited] = useState(mode === 'edit')

    function handleTitleChange(value: string) {
        setTitle(value)
        if (!slugManuallyEdited) {
            setSlug(slugify(value, { lower: true, strict: true }))
        }
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setError(null)

        const formData = new FormData()
        formData.set('title', title)
        formData.set('slug', slug)
        formData.set('description', description)
        formData.set('coverImage', coverImage)
        formData.set('techStack', techStack)
        formData.set('demoUrl', demoUrl)
        formData.set('repoUrl', repoUrl)
        if (isFeatured) formData.set('isFeatured', 'on')

        startTransition(async () => {
            const result =
                mode === 'create'
                    ? await createProject(formData)
                    : await updateProject(projectId!, formData)

            if (result && !result.success) {
                setError(result.error)
            }
        })
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
                <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="space-y-6 lg:col-span-2">
                    <div className={`${cardClass} space-y-4`}>
                        <div>
                            <label className={labelClass}>Judul Project</label>
                            <input
                                type="text"
                                required
                                value={title}
                                onChange={(e) => handleTitleChange(e.target.value)}
                                placeholder="Nama project"
                                className={inputClass}
                            />
                        </div>

                        <div>
                            <label className={labelClass}>Slug</label>
                            <input
                                type="text"
                                required
                                value={slug}
                                onChange={(e) => {
                                    setSlug(e.target.value)
                                    setSlugManuallyEdited(true)
                                }}
                                className={`${inputClass} font-mono text-xs`}
                            />
                            <p className="mt-1.5 text-xs text-[#1B1B18]/50">
                                URL project: /projects/{slug || '...'}
                            </p>
                        </div>

                        <div>
                            <label className={labelClass}>Deskripsi</label>
                            <textarea
                                required
                                rows={8}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Ceritakan tentang project ini..."
                                className={`${inputClass} resize-y`}
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className={`${cardClass} space-y-4`}>
                        <label className="flex cursor-pointer items-center justify-between gap-3">
                            <span className="text-sm font-medium text-[#1B1B18]">
                                Project Unggulan
                            </span>
                            <span className="relative inline-flex h-6 w-11 shrink-0 items-center rounded-full bg-[#1B1B18]/15 transition-colors has-[:checked]:bg-[#2F5D50]">
                                <input
                                    type="checkbox"
                                    checked={isFeatured}
                                    onChange={(e) => setIsFeatured(e.target.checked)}
                                    className="peer sr-only"
                                />
                                <span className="inline-block h-5 w-5 translate-x-0.5 rounded-full bg-white shadow transition-transform peer-checked:translate-x-5" />
                            </span>
                        </label>
                        <p className="text-xs text-[#1B1B18]/50">
                            Tampilkan project ini sebagai unggulan di homepage.
                        </p>

                        <button
                            type="submit"
                            disabled={isPending}
                            className="w-full rounded-md bg-[#2F5D50] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#254A3F] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {isPending
                                ? 'Menyimpan...'
                                : mode === 'create'
                                    ? 'Buat Project'
                                    : 'Simpan Perubahan'}
                        </button>
                    </div>

                    <div className={cardClass}>
                        <label className={labelClass}>Cover Image</label>
                        <ImageUpload value={coverImage} onChange={setCoverImage} bucket="project-covers" />
                    </div>

                    <div className={cardClass}>
                        <label className={labelClass}>Tech Stack</label>
                        <input
                            type="text"
                            value={techStack}
                            onChange={(e) => setTechStack(e.target.value)}
                            placeholder="Next.js, TypeScript, Tailwind"
                            className={inputClass}
                        />
                        <p className="mt-1.5 text-xs text-[#1B1B18]/50">
                            Pisahkan setiap teknologi dengan koma.
                        </p>
                    </div>

                    <div className={`${cardClass} space-y-4`}>
                        <div>
                            <label className={labelClass}>Demo URL</label>
                            <input
                                type="url"
                                value={demoUrl}
                                onChange={(e) => setDemoUrl(e.target.value)}
                                placeholder="https://..."
                                className={inputClass}
                            />
                        </div>
                        <div>
                            <label className={labelClass}>Repository URL</label>
                            <input
                                type="url"
                                value={repoUrl}
                                onChange={(e) => setRepoUrl(e.target.value)}
                                placeholder="https://github.com/..."
                                className={inputClass}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}
