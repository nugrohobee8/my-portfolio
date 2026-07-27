'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { createClient } from '@/lib/supabase/server'
import { skillSchema } from '@/lib/validations/skill'

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

export async function getSkills() {
    return prisma.skill.findMany({
        orderBy: [{ category: 'asc' }, { name: 'asc' }],
    })
}

export async function createSkill(formData: FormData): Promise<ActionResult> {
    await requireAdmin()

    const rawLevel = formData.get('level') as string

    const rawData = {
        name: formData.get('name') as string,
        category: formData.get('category') as string,
        icon: (formData.get('icon') as string) || null,
        level: rawLevel ? Number(rawLevel) : null,
    }

    const parsed = skillSchema.safeParse(rawData)

    if (!parsed.success) {
        return {
            success: false,
            error: parsed.error.issues[0]?.message ?? 'Data tidak valid',
        }
    }

    try {
        await prisma.skill.create({ data: parsed.data })
    } catch {
        return { success: false, error: 'Gagal menyimpan skill' }
    }

    revalidatePath('/admin/skills')
    revalidatePath('/')
    return { success: true }
}

export async function deleteSkill(id: string): Promise<ActionResult> {
    await requireAdmin()

    try {
        await prisma.skill.delete({ where: { id } })
    } catch {
        return { success: false, error: 'Gagal menghapus skill' }
    }

    revalidatePath('/admin/skills')
    revalidatePath('/')
    return { success: true }
}