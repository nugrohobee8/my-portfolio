import { z } from 'zod'

export const experienceSchema = z.object({
    company: z.string().min(2, 'Nama perusahaan minimal 2 karakter').max(150),
    position: z.string().min(2, 'Posisi minimal 2 karakter').max(150),
    description: z.string().min(10, 'Deskripsi minimal 10 karakter'),
    startDate: z.coerce.date({ message: 'Tanggal mulai tidak valid' }),
    endDate: z.coerce.date().nullable().optional(),
})

export type ExperienceFormValues = z.infer<typeof experienceSchema>