import { z } from 'zod'

export const articleSchema = z.object({
    title: z
        .string()
        .min(3, 'Judul minimal 3 karakter')
        .max(200, 'Judul maksimal 200 karakter'),
    slug: z
        .string()
        .min(3, 'Slug minimal 3 karakter')
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug hanya boleh huruf kecil, angka, dan tanda hubung'),
    content: z.string().min(10, 'Konten minimal 10 karakter'),
    coverImage: z.string().url('URL cover tidak valid').nullable().optional(),
    tags: z.array(z.string()).default([]),
    status: z.enum(['draft', 'published']),
})

export type ArticleFormValues = z.infer<typeof articleSchema>