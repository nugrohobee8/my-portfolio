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

const inputClass =
    'w-full rounded-md border border-[#1B1B18]/15 bg-white px-3 py-2 text-sm text-[#1B1B18] placeholder-[#1B1B18]/40 transition-colors focus:border-[#2F5D50] focus:outline-none focus:ring-1 focus:ring-[#2F5D50]'
const labelClass = 'mb-1.5 block text-sm font-medium text-[#1B1B18]'
const cardClass = 'rounded-lg border border-[#1B1B18]/10 bg-white p-5'

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
                            <label className={labelClass}>Judul</label>
                            <input
                                type="text"
                                required
                                value={title}
                                onChange={(e) => handleTitleChange(e.target.value)}
                                placeholder="Judul artikel"
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
                                URL artikel: /articles/{slug || '...'}
                            </p>
                        </div>
                    </div>

                    <div>
                        <label className={labelClass}>Konten</label>
                        <RichTextEditor content={content} onChange={setContent} />
                    </div>
                </div>

                <div className="space-y-6">
                    <div className={cardClass}>
                        <label className={labelClass}>Tags</label>
                        <input
                            type="text"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                            placeholder="nextjs, react, tutorial"
                            className={inputClass}
                        />
                        <p className="mt-1.5 text-xs text-[#1B1B18]/50">
                            Pisahkan setiap tag dengan koma.
                        </p>
                    </div>
                    <div className={`${cardClass} space-y-4`}>
                        <div>
                            <label className={labelClass}>Status</label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value as 'draft' | 'published')}
                                className={inputClass}
                            >
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            disabled={isPending}
                            className="w-full rounded-md bg-[#2F5D50] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#254A3F] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {isPending
                                ? 'Menyimpan...'
                                : mode === 'create'
                                    ? 'Buat Artikel'
                                    : 'Simpan Perubahan'}
                        </button>
                    </div>

                    {/* <div className={cardClass}>
                        <label className={labelClass}>Cover Image</label>
                        <ImageUpload value={coverImage} onChange={setCoverImage} />
                    </div> */}


                </div>
            </div>
        </form>
    )
}
