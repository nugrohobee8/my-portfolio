import { z } from 'zod'

export const projectSchema = z.object({
    title: z
        .string()
        .min(3, 'Judul minimal 3 karakter')
        .max(200, 'Judul maksimal 200 karakter'),
    slug: z
        .string()
        .min(3, 'Slug minimal 3 karakter')
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug hanya boleh huruf kecil, angka, dan tanda hubung'),
    description: z.string().min(10, 'Deskripsi minimal 10 karakter'),
    coverImage: z.string().url('URL cover tidak valid').nullable().optional(),
    techStack: z.array(z.string()).default([]),
    demoUrl: z.string().url('URL demo tidak valid').nullable().optional().or(z.literal('')),
    repoUrl: z.string().url('URL repo tidak valid').nullable().optional().or(z.literal('')),
    isFeatured: z.boolean().default(false),
})

export type ProjectFormValues = z.infer<typeof projectSchema>