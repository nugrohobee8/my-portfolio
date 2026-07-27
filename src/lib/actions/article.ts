'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import slugify from 'slugify'
import { prisma } from '@/lib/prisma'
import { createClient } from '@/lib/supabase/server'
import { articleSchema } from '@/lib/validations/article'

type ActionResult =
    | { success: true }
    | { success: false; error: string }

async function requireAdmin() {
    const supabase = await createClient()
    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        redirect('/admin/login')
    }
}

export async function getArticles() {
    return prisma.article.findMany({
        orderBy: { createdAt: 'desc' },
    })
}

export async function getArticleById(id: string) {
    return prisma.article.findUnique({
        where: { id },
    })
}

export async function createArticle(formData: FormData): Promise<ActionResult> {
    await requireAdmin()

    const rawTags = formData.get('tags') as string
    const tags = rawTags
        ? rawTags.split(',').map((tag) => tag.trim()).filter(Boolean)
        : []

    const rawData = {
        title: formData.get('title') as string,
        slug: (formData.get('slug') as string) || slugify(formData.get('title') as string, { lower: true, strict: true }),
        content: formData.get('content') as string,
        coverImage: (formData.get('coverImage') as string) || null,
        tags,
        status: formData.get('status') as string,
    }

    const parsed = articleSchema.safeParse(rawData)

    if (!parsed.success) {
        return {
            success: false,
            error: parsed.error.issues[0]?.message ?? 'Data tidak valid',
        }
    }

    const existingSlug = await prisma.article.findUnique({
        where: { slug: parsed.data.slug },
    })

    if (existingSlug) {
        return { success: false, error: 'Slug sudah digunakan, coba judul lain' }
    }

    try {
        await prisma.article.create({
            data: {
                ...parsed.data,
                publishedAt: parsed.data.status === 'published' ? new Date() : null,
            },
        })
    } catch {
        return { success: false, error: 'Gagal menyimpan artikel ke database' }
    }

    revalidatePath('/admin/articles')
    redirect('/admin/articles')
}

export async function updateArticle(
    id: string,
    formData: FormData
): Promise<ActionResult> {
    await requireAdmin()

    const rawTags = formData.get('tags') as string
    const tags = rawTags
        ? rawTags.split(',').map((tag) => tag.trim()).filter(Boolean)
        : []

    const rawData = {
        title: formData.get('title') as string,
        slug: formData.get('slug') as string,
        content: formData.get('content') as string,
        coverImage: (formData.get('coverImage') as string) || null,
        tags,
        status: formData.get('status') as string,
    }

    const parsed = articleSchema.safeParse(rawData)

    if (!parsed.success) {
        return {
            success: false,
            error: parsed.error.issues[0]?.message ?? 'Data tidak valid',
        }
    }

    const existingSlug = await prisma.article.findFirst({
        where: { slug: parsed.data.slug, NOT: { id } },
    })

    if (existingSlug) {
        return { success: false, error: 'Slug sudah digunakan artikel lain' }
    }

    const currentArticle = await prisma.article.findUnique({ where: { id } })

    try {
        await prisma.article.update({
            where: { id },
            data: {
                ...parsed.data,
                publishedAt:
                    parsed.data.status === 'published' && !currentArticle?.publishedAt
                        ? new Date()
                        : currentArticle?.publishedAt,
            },
        })
    } catch {
        return { success: false, error: 'Gagal memperbarui artikel' }
    }

    revalidatePath('/admin/articles')
    redirect('/admin/articles')
}

export async function deleteArticle(id: string): Promise<ActionResult> {
    await requireAdmin()

    try {
        await prisma.article.delete({ where: { id } })
    } catch {
        return { success: false, error: 'Gagal menghapus artikel' }
    }

    revalidatePath('/admin/articles')
    return { success: true }
}