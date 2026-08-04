'use client'

import { useRef, useState } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TiptapImage from '@tiptap/extension-image'
import TextAlign from '@tiptap/extension-text-align'
import { Placeholder, CharacterCount } from '@tiptap/extensions'
import { createClient } from '@/lib/supabase/client'

type RichTextEditorProps = {
    content: string
    onChange: (html: string) => void
}

export function RichTextEditor({ content, onChange }: RichTextEditorProps) {
    const [isUploadingImage, setIsUploadingImage] = useState(false)
    const [imageError, setImageError] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: { levels: [1, 2, 3] },
                link: { openOnClick: false, autolink: true },
            }),
            TiptapImage.configure({
                HTMLAttributes: { class: 'rounded-md border border-[#1B1B18]/10' },
            }),
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
            Placeholder.configure({
                placeholder: 'Tulis konten artikelmu di sini...',
            }),
            CharacterCount,
        ],
        content,
        immediatelyRender: false,
        editorProps: {
            attributes: {
                class:
                    'prose prose-sm sm:prose-base max-w-none min-h-[360px] px-4 py-3 focus:outline-none ' +
                    'prose-headings:text-[#1B1B18] prose-p:text-[#1B1B18] prose-li:text-[#1B1B18] prose-strong:text-[#1B1B18] ' +
                    'prose-a:text-[#2F5D50] prose-a:no-underline hover:prose-a:underline ' +
                    'prose-img:rounded-md prose-img:border prose-img:border-[#1B1B18]/10 ' +
                    'prose-blockquote:border-l-[#2F5D50] prose-blockquote:text-[#1B1B18]/70 ' +
                    'prose-code:rounded prose-code:bg-[#1B1B18]/5 prose-code:px-1 prose-code:py-0.5 prose-code:text-[#1B1B18] prose-code:before:content-none prose-code:after:content-none ' +
                    'prose-pre:bg-[#1B1B18] prose-pre:text-gray-50',
            },
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML())
        },
    })

    async function handleImageSelected(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]
        e.target.value = ''
        if (!file || !editor) return

        if (!file.type.startsWith('image/')) {
            setImageError('File harus berupa gambar')
            return
        }
        if (file.size > 5 * 1024 * 1024) {
            setImageError('Ukuran gambar maksimal 5MB')
            return
        }

        setImageError(null)
        setIsUploadingImage(true)

        const supabase = createClient()
        const fileExt = file.name.split('.').pop()
        const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`

        const { error: uploadError } = await supabase.storage
            .from('article-covers')
            .upload(fileName, file, { cacheControl: '3600', upsert: false })

        setIsUploadingImage(false)

        if (uploadError) {
            setImageError('Gagal upload gambar: ' + uploadError.message)
            return
        }

        const { data } = supabase.storage.from('article-covers').getPublicUrl(fileName)
        editor.chain().focus().setImage({ src: data.publicUrl, alt: file.name }).run()
    }

    function setLink() {
        if (!editor) return
        const previousUrl = editor.getAttributes('link').href as string | undefined
        const url = window.prompt('Masukkan URL tautan', previousUrl ?? 'https://')

        if (url === null) return

        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run()
            return
        }

        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
    }

    if (!editor) return null

    return (
        <div className="rounded-lg border border-[#1B1B18]/15 bg-white transition-colors focus-within:border-[#2F5D50] focus-within:ring-1 focus-within:ring-[#2F5D50]">
            <div className="flex flex-wrap items-center gap-1 border-b border-[#1B1B18]/10 p-2">
                <ToolbarButton
                    title="Urungkan"
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().undo()}
                >
                    <UndoIcon className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton
                    title="Ulangi"
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().redo()}
                >
                    <RedoIcon className="h-4 w-4" />
                </ToolbarButton>

                <Divider />

                <ToolbarButton
                    title="Heading 1"
                    active={editor.isActive('heading', { level: 1 })}
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                >
                    <span className="text-xs font-semibold">H1</span>
                </ToolbarButton>
                <ToolbarButton
                    title="Heading 2"
                    active={editor.isActive('heading', { level: 2 })}
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                >
                    <span className="text-xs font-semibold">H2</span>
                </ToolbarButton>
                <ToolbarButton
                    title="Heading 3"
                    active={editor.isActive('heading', { level: 3 })}
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                >
                    <span className="text-xs font-semibold">H3</span>
                </ToolbarButton>

                <Divider />

                <ToolbarButton
                    title="Tebal"
                    active={editor.isActive('bold')}
                    onClick={() => editor.chain().focus().toggleBold().run()}
                >
                    <span className="text-sm font-bold">B</span>
                </ToolbarButton>
                <ToolbarButton
                    title="Miring"
                    active={editor.isActive('italic')}
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                >
                    <span className="text-sm italic">I</span>
                </ToolbarButton>
                <ToolbarButton
                    title="Garis bawah"
                    active={editor.isActive('underline')}
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                >
                    <span className="text-sm underline">U</span>
                </ToolbarButton>
                <ToolbarButton
                    title="Coret"
                    active={editor.isActive('strike')}
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                >
                    <span className="text-sm line-through">S</span>
                </ToolbarButton>
                <ToolbarButton
                    title="Kode inline"
                    active={editor.isActive('code')}
                    onClick={() => editor.chain().focus().toggleCode().run()}
                >
                    <span className="font-mono text-xs">{'</>'}</span>
                </ToolbarButton>

                <Divider />

                <ToolbarButton
                    title="Daftar berpoin"
                    active={editor.isActive('bulletList')}
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                >
                    <BulletListIcon className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton
                    title="Daftar bernomor"
                    active={editor.isActive('orderedList')}
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                >
                    <OrderedListIcon className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton
                    title="Kutipan"
                    active={editor.isActive('blockquote')}
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                >
                    <QuoteIcon className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton
                    title="Blok kode"
                    active={editor.isActive('codeBlock')}
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                >
                    <CodeBlockIcon className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton
                    title="Garis pemisah"
                    onClick={() => editor.chain().focus().setHorizontalRule().run()}
                >
                    <HorizontalRuleIcon className="h-4 w-4" />
                </ToolbarButton>

                <Divider />

                <ToolbarButton
                    title="Rata kiri"
                    active={editor.isActive({ textAlign: 'left' })}
                    onClick={() => editor.chain().focus().setTextAlign('left').run()}
                >
                    <AlignLeftIcon className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton
                    title="Rata tengah"
                    active={editor.isActive({ textAlign: 'center' })}
                    onClick={() => editor.chain().focus().setTextAlign('center').run()}
                >
                    <AlignCenterIcon className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton
                    title="Rata kanan"
                    active={editor.isActive({ textAlign: 'right' })}
                    onClick={() => editor.chain().focus().setTextAlign('right').run()}
                >
                    <AlignRightIcon className="h-4 w-4" />
                </ToolbarButton>

                <Divider />

                <ToolbarButton title="Sisipkan tautan" active={editor.isActive('link')} onClick={setLink}>
                    <LinkIcon className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton
                    title="Sisipkan gambar"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploadingImage}
                >
                    <ImageIcon className="h-4 w-4" />
                </ToolbarButton>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelected}
                    className="hidden"
                />
            </div>

            <EditorContent editor={editor} />

            {imageError && (
                <p className="px-4 pb-2 text-xs text-red-600">{imageError}</p>
            )}

            <div className="flex items-center justify-between border-t border-[#1B1B18]/10 px-4 py-2 text-xs text-[#1B1B18]/40">
                <span>{isUploadingImage ? 'Mengunggah gambar...' : ''}</span>
                <span>
                    {editor.storage.characterCount.words()} kata ·{' '}
                    {editor.storage.characterCount.characters()} karakter
                </span>
            </div>
        </div>
    )
}

function Divider() {
    return <span className="mx-1 h-5 w-px shrink-0 bg-[#1B1B18]/10" aria-hidden="true" />
}

function ToolbarButton({
    active,
    disabled,
    onClick,
    title,
    children,
}: {
    active?: boolean
    disabled?: boolean
    onClick: () => void
    title: string
    children: React.ReactNode
}) {
    return (
        <button
            type="button"
            title={title}
            aria-label={title}
            aria-pressed={active}
            disabled={disabled}
            onClick={onClick}
            className={`flex h-8 min-w-8 items-center justify-center rounded-md px-1.5 transition-colors disabled:cursor-not-allowed disabled:opacity-30 ${active
                ? 'bg-[#2F5D50] text-white'
                : 'text-[#1B1B18]/70 hover:bg-[#1B1B18]/5 hover:text-[#1B1B18]'
                }`}
        >
            {children}
        </button>
    )
}

type IconProps = { className?: string }

function UndoIcon({ className }: IconProps) {
    return (
        <svg className={className} viewBox="0 0 20 20" fill="none">
            <path d="M6 5 3 8l3 3M3 8h8a5 5 0 0 1 0 10h-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

function RedoIcon({ className }: IconProps) {
    return (
        <svg className={className} viewBox="0 0 20 20" fill="none">
            <path d="M14 5l3 3-3 3M17 8H9a5 5 0 0 0 0 10h1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

function BulletListIcon({ className }: IconProps) {
    return (
        <svg className={className} viewBox="0 0 20 20" fill="none">
            <path d="M7 5.5h10M7 10h10M7 14.5h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="3.2" cy="5.5" r="1" fill="currentColor" />
            <circle cx="3.2" cy="10" r="1" fill="currentColor" />
            <circle cx="3.2" cy="14.5" r="1" fill="currentColor" />
        </svg>
    )
}

function OrderedListIcon({ className }: IconProps) {
    return (
        <svg className={className} viewBox="0 0 20 20" fill="none">
            <path d="M7.5 5.5h9M7.5 10h9M7.5 14.5h9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <text x="1.5" y="7" fontSize="4.5" fill="currentColor">1</text>
            <text x="1.5" y="11.5" fontSize="4.5" fill="currentColor">2</text>
            <text x="1.5" y="16" fontSize="4.5" fill="currentColor">3</text>
        </svg>
    )
}

function QuoteIcon({ className }: IconProps) {
    return (
        <svg className={className} viewBox="0 0 20 20" fill="none">
            <path d="M5 6h10M5 6v6a2 2 0 0 0 2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="3.5" y="6" width="3" height="5" rx="0.5" stroke="currentColor" strokeWidth="1.5" />
        </svg>
    )
}

function CodeBlockIcon({ className }: IconProps) {
    return (
        <svg className={className} viewBox="0 0 20 20" fill="none">
            <rect x="3" y="4.5" width="14" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M8 8l-2 2 2 2M12 8l2 2-2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

function HorizontalRuleIcon({ className }: IconProps) {
    return (
        <svg className={className} viewBox="0 0 20 20" fill="none">
            <path d="M4 10h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    )
}

function AlignLeftIcon({ className }: IconProps) {
    return (
        <svg className={className} viewBox="0 0 20 20" fill="none">
            <path d="M4 5.5h12M4 9h8M4 12.5h12M4 16h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    )
}

function AlignCenterIcon({ className }: IconProps) {
    return (
        <svg className={className} viewBox="0 0 20 20" fill="none">
            <path d="M4 5.5h12M6 9h8M4 12.5h12M6 16h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    )
}

function AlignRightIcon({ className }: IconProps) {
    return (
        <svg className={className} viewBox="0 0 20 20" fill="none">
            <path d="M4 5.5h12M8 9h8M4 12.5h12M8 16h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    )
}

function LinkIcon({ className }: IconProps) {
    return (
        <svg className={className} viewBox="0 0 20 20" fill="none">
            <path
                d="M8.5 11.5 11.5 8.5M8 6.5l1-1a2.8 2.8 0 0 1 4 4l-1 1M12 13.5l-1 1a2.8 2.8 0 0 1-4-4l1-1"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

function ImageIcon({ className }: IconProps) {
    return (
        <svg className={className} viewBox="0 0 20 20" fill="none">
            <rect x="3" y="4" width="14" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="7" cy="8" r="1.3" stroke="currentColor" strokeWidth="1.5" />
            <path d="M4.5 14.5 8 11l2.5 2.5L14 10l1.5 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}
