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
        <form onSubmit={handleSubmit} className="mx-auto max-w-2xl space-y-5">
            {error && (
                <p className="rounded bg-red-50 p-3 text-sm text-red-600">{error}</p>
            )}

            <div>
                <label className="mb-1 block text-sm font-medium">Judul Project</label>
                <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="w-full rounded border px-3 py-2 text-sm"
                />
            </div>

            <div>
                <label className="mb-1 block text-sm font-medium">Slug</label>
                <input
                    type="text"
                    required
                    value={slug}
                    onChange={(e) => {
                        setSlug(e.target.value)
                        setSlugManuallyEdited(true)
                    }}
                    className="w-full rounded border px-3 py-2 text-sm font-mono"
                />
            </div>

            <div>
                <label className="mb-1 block text-sm font-medium">Cover Image</label>
                <ImageUpload value={coverImage} onChange={setCoverImage} bucket="project-covers" />
            </div>

            <div>
                <label className="mb-1 block text-sm font-medium">Deskripsi</label>
                <textarea
                    required
                    rows={5}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full rounded border px-3 py-2 text-sm"
                />
            </div>

            <div>
                <label className="mb-1 block text-sm font-medium">Tech Stack</label>
                <input
                    type="text"
                    value={techStack}
                    onChange={(e) => setTechStack(e.target.value)}
                    placeholder="Next.js, TypeScript, Tailwind (pisahkan dengan koma)"
                    className="w-full rounded border px-3 py-2 text-sm"
                />
            </div>

            <div>
                <label className="mb-1 block text-sm font-medium">Demo URL</label>
                <input
                    type="url"
                    value={demoUrl}
                    onChange={(e) => setDemoUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full rounded border px-3 py-2 text-sm"
                />
            </div>

            <div>
                <label className="mb-1 block text-sm font-medium">Repository URL</label>
                <input
                    type="url"
                    value={repoUrl}
                    onChange={(e) => setRepoUrl(e.target.value)}
                    placeholder="https://github.com/..."
                    className="w-full rounded border px-3 py-2 text-sm"
                />
            </div>

            <div className="flex items-center gap-2">
                <input
                    type="checkbox"
                    id="isFeatured"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="h-4 w-4"
                />
                <label htmlFor="isFeatured" className="text-sm font-medium">
                    Tampilkan sebagai project unggulan di homepage
                </label>
            </div>

            <button
                type="submit"
                disabled={isPending}
                className="rounded bg-black px-5 py-2 text-sm font-medium text-white disabled:opacity-50"
            >
                {isPending ? 'Menyimpan...' : mode === 'create' ? 'Buat Project' : 'Simpan Perubahan'}
            </button>
        </form>
    )
}