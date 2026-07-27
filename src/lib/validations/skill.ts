import { z } from 'zod'

export const skillCategoryEnum = z.enum([
    'frontend',
    'backend',
    'database',
    'devops',
    'tools',
    'other',
])

export const skillSchema = z.object({
    name: z.string().min(2, 'Nama skill minimal 2 karakter').max(50),
    category: skillCategoryEnum,
    icon: z.string().nullable().optional(),
    level: z.number().min(1).max(5).nullable().optional(),
})

export type SkillFormValues = z.infer<typeof skillSchema>