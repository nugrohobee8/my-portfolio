'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { createClient } from '@/lib/supabase/server'
import { experienceSchema } from '@/lib/validations/experience'

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

export async function getExperiences() {
    return prisma.experience.findMany({
        orderBy: { startDate: 'desc' },
    })
}

export async function createExperience(formData: FormData): Promise<ActionResult> {
    await requireAdmin()

    const rawEndDate = formData.get('endDate') as string

    const rawData = {
        company: formData.get('company') as string,
        position: formData.get('position') as string,
        description: formData.get('description') as string,
        startDate: formData.get('startDate') as string,
        endDate: rawEndDate || null,
    }

    const parsed = experienceSchema.safeParse(rawData)

    if (!parsed.success) {
        return {
            success: false,
            error: parsed.error.issues[0]?.message ?? 'Data tidak valid',
        }
    }

    try {
        await prisma.experience.create({ data: parsed.data })
    } catch {
        return { success: false, error: 'Gagal menyimpan pengalaman kerja' }
    }

    revalidatePath('/admin/experiences')
    revalidatePath('/')
    return { success: true }
}

export async function deleteExperience(id: string): Promise<ActionResult> {
    await requireAdmin()

    try {
        await prisma.experience.delete({ where: { id } })
    } catch {
        return { success: false, error: 'Gagal menghapus pengalaman kerja' }
    }

    revalidatePath('/admin/experiences')
    revalidatePath('/')
    return { success: true }
}