'use client'

import { useState, useTransition } from 'react'
import slugify from 'slugify'
import { RichTextEditor } from '@/components/rich-text-editor'
import { createArticle, updateArticle } from '@/lib/actions/article'
import { ImageUpload } from './image-upload'

type ArticleFormProps = {
    mode: 'create' | 'edit'
    articleId?: string
    initialValues?: {
        title: string
        slug: string
        content: string
        coverImage: string | null
        tags: string[]
        status: 'draft' | 'published'
    }
}

export function ArticleForm({ mode, articleId, initialValues }: ArticleFormProps) {
    const [title, setTitle] = useState(initialValues?.title ?? '')
    const [slug, setSlug] = useState(initialValues?.slug ?? '')
    const [content, setContent] = useState(initialValues?.content ?? '')
    const [coverImage, setCoverImage] = useState(initialValues?.coverImage ?? '')
    const [tags, setTags] = useState(initialValues?.tags.join(', ') ?? '')
    const [status, setStatus] = useState(initialValues?.status ?? 'draft')
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
        formData.set('content', content)
        formData.set('coverImage', coverImage)
        formData.set('tags', tags)
        formData.set('status', status)

        startTransition(async () => {
            const result =
                mode === 'create'
                    ? await createArticle(formData)
                    : await updateArticle(articleId!, formData)

            if (result && !result.success) {
                setError(result.error)
            }
            // Kalau sukses, Server Action akan redirect otomatis, tidak perlu handle di sini
        })
    }

    return (
        <form onSubmit={handleSubmit} className="mx-auto max-w-2xl space-y-5">
            {error && (
                <p className="rounded bg-red-50 p-3 text-sm text-red-600">{error}</p>
            )}

            <div>
                <label className="mb-1 block text-sm font-medium">Judul</label>
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
                <p className="mt-1 text-xs text-gray-500">
                    URL artikel: /articles/{slug || '...'}
                </p>
            </div>

            <div>
                <label className="mb-1 block text-sm font-medium">Cover Image</label>
                <ImageUpload value={coverImage} onChange={setCoverImage} />
            </div>

            <div>
                <label className="mb-1 block text-sm font-medium">Tags</label>
                <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="nextjs, react, tutorial (pisahkan dengan koma)"
                    className="w-full rounded border px-3 py-2 text-sm"
                />
            </div>

            <div>
                <label className="mb-1 block text-sm font-medium">Konten</label>
                <RichTextEditor content={content} onChange={setContent} />
            </div>

            <div>
                <label className="mb-1 block text-sm font-medium">Status</label>
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as 'draft' | 'published')}
                    className="rounded border px-3 py-2 text-sm"
                >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                </select>
            </div>

            <button
                type="submit"
                disabled={isPending}
                className="rounded bg-black px-5 py-2 text-sm font-medium text-white disabled:opacity-50"
            >
                {isPending ? 'Menyimpan...' : mode === 'create' ? 'Buat Artikel' : 'Simpan Perubahan'}
            </button>
        </form>
    )
}