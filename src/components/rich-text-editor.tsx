'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

type RichTextEditorProps = {
    content: string
    onChange: (html: string) => void
}

export function RichTextEditor({ content, onChange }: RichTextEditorProps) {
    const editor = useEditor({
        extensions: [StarterKit],
        content,
        immediatelyRender: false,
        editorProps: {
            attributes: {
                class:
                    'prose prose-sm max-w-none min-h-[300px] rounded border p-3 focus:outline-none prose-p:text-white prose-headings:text-white',
            },
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML())
        },
    })

    if (!editor) return null

    return (
        <div>
            <div className="mb-2 flex flex-wrap gap-1 border-b pb-2">
                <ToolbarButton
                    active={editor.isActive('bold')}
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    label="Bold"
                />
                <ToolbarButton
                    active={editor.isActive('italic')}
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    label="Italic"
                />
                <ToolbarButton
                    active={editor.isActive('heading', { level: 2 })}
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    label="H2"
                />
                <ToolbarButton
                    active={editor.isActive('bulletList')}
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    label="List"
                />
                <ToolbarButton
                    active={editor.isActive('blockquote')}
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    label="Quote"
                />
                <ToolbarButton
                    active={editor.isActive('codeBlock')}
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    label="Code"
                />
            </div>
            <EditorContent editor={editor} />
        </div>
    )
}

function ToolbarButton({
    active,
    onClick,
    label,
}: {
    active: boolean
    onClick: () => void
    label: string
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`rounded px-2 py-1 text-xs font-medium ${active ? 'bg-black text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
        >
            {label}
        </button>
    )
}