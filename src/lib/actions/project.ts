'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import slugify from 'slugify'
import { prisma } from '@/lib/prisma'
import { createClient } from '@/lib/supabase/server'
import { projectSchema } from '@/lib/validations/project'

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

export async function getProjects() {
    return prisma.project.findMany({
        orderBy: { createdAt: 'desc' },
    })
}

export async function getProjectById(id: string) {
    return prisma.project.findUnique({
        where: { id },
    })
}

function parseProjectFormData(formData: FormData) {
    const rawTechStack = formData.get('techStack') as string
    const techStack = rawTechStack
        ? rawTechStack.split(',').map((item) => item.trim()).filter(Boolean)
        : []

    return {
        title: formData.get('title') as string,
        slug:
            (formData.get('slug') as string) ||
            slugify(formData.get('title') as string, { lower: true, strict: true }),
        description: formData.get('description') as string,
        coverImage: (formData.get('coverImage') as string) || null,
        techStack,
        demoUrl: (formData.get('demoUrl') as string) || '',
        repoUrl: (formData.get('repoUrl') as string) || '',
        isFeatured: formData.get('isFeatured') === 'on',
    }
}

export async function createProject(formData: FormData): Promise<ActionResult> {
    await requireAdmin()

    const rawData = parseProjectFormData(formData)
    const parsed = projectSchema.safeParse(rawData)

    if (!parsed.success) {
        return {
            success: false,
            error: parsed.error.issues[0]?.message ?? 'Data tidak valid',
        }
    }

    const existingSlug = await prisma.project.findUnique({
        where: { slug: parsed.data.slug },
    })

    if (existingSlug) {
        return { success: false, error: 'Slug sudah digunakan, coba judul lain' }
    }

    try {
        await prisma.project.create({
            data: {
                ...parsed.data,
                demoUrl: parsed.data.demoUrl || null,
                repoUrl: parsed.data.repoUrl || null,
            },
        })
    } catch {
        return { success: false, error: 'Gagal menyimpan project ke database' }
    }

    revalidatePath('/admin/projects')
    revalidatePath('/')
    redirect('/admin/projects')
}

export async function updateProject(
    id: string,
    formData: FormData
): Promise<ActionResult> {
    await requireAdmin()

    const rawData = parseProjectFormData(formData)
    const parsed = projectSchema.safeParse(rawData)

    if (!parsed.success) {
        return {
            success: false,
            error: parsed.error.issues[0]?.message ?? 'Data tidak valid',
        }
    }

    const existingSlug = await prisma.project.findFirst({
        where: { slug: parsed.data.slug, NOT: { id } },
    })

    if (existingSlug) {
        return { success: false, error: 'Slug sudah digunakan project lain' }
    }

    try {
        await prisma.project.update({
            where: { id },
            data: {
                ...parsed.data,
                demoUrl: parsed.data.demoUrl || null,
                repoUrl: parsed.data.repoUrl || null,
            },
        })
    } catch {
        return { success: false, error: 'Gagal memperbarui project' }
    }

    revalidatePath('/admin/projects')
    revalidatePath('/')
    redirect('/admin/projects')
}

export async function deleteProject(id: string): Promise<ActionResult> {
    await requireAdmin()

    try {
        await prisma.project.delete({ where: { id } })
    } catch {
        return { success: false, error: 'Gagal menghapus project' }
    }

    revalidatePath('/admin/projects')
    revalidatePath('/')
    return { success: true }
}