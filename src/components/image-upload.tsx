'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

type ImageUploadProps = {
    value: string
    onChange: (url: string) => void
}

export function ImageUpload({ value, onChange }: ImageUploadProps) {
    const [isUploading, setIsUploading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]
        if (!file) return

        setError(null)

        // Validasi tipe file
        if (!file.type.startsWith('image/')) {
            setError('File harus berupa gambar')
            return
        }

        // Validasi ukuran (maks 5MB)
        if (file.size > 5 * 1024 * 1024) {
            setError('Ukuran gambar maksimal 5MB')
            return
        }

        setIsUploading(true)

        const supabase = createClient()
        const fileExt = file.name.split('.').pop()
        const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`

        const { error: uploadError } = await supabase.storage
            .from('article-covers')
            .upload(fileName, file, { cacheControl: '3600', upsert: false })

        setIsUploading(false)

        if (uploadError) {
            setError('Gagal upload gambar: ' + uploadError.message)
            return
        }

        const { data } = supabase.storage
            .from('article-covers')
            .getPublicUrl(fileName)

        onChange(data.publicUrl)
    }

    return (
        <div>
            {value && (
                <div className="mb-3" >
                    <img
                        src={value}
                        alt="Cover preview"
                        className="h-40 w-full rounded object-cover"
                    />
                </div>
            )
            }

            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={isUploading}
                className="w-full rounded border px-3 py-2 text-sm file:mr-3 file:rounded file:border-0 file:bg-gray-100 file:px-3 file:py-1.5 file:text-sm"
            />

            {isUploading && (
                <p className="mt-1 text-xs text-gray-500" > Mengupload...</p>
            )}

            {error && <p className="mt-1 text-xs text-red-600" > {error} </p>}
        </div>
    )
}