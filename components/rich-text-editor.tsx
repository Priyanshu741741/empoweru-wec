"use client"

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import { Button } from './ui/button'

interface RichTextEditorProps {
  content: string
  onChange: (content: string) => void
  placeholder?: string
}

export default function RichTextEditor({ content, onChange, placeholder }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Bold,
      Italic,
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[200px] p-4 border border-white/20 rounded-lg bg-white/5 text-white',
      },
    },
  })

  if (!editor) {
    return null
  }

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 p-3 border border-white/20 rounded-lg bg-white/5">
        <Button
          type="button"
          variant={editor.isActive('bold') ? 'default' : 'outline'}
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className="text-xs"
        >
          Bold
        </Button>
        <Button
          type="button"
          variant={editor.isActive('italic') ? 'default' : 'outline'}
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className="text-xs"
        >
          Italic
        </Button>
        <Button
          type="button"
          variant={editor.isActive('underline') ? 'default' : 'outline'}
          size="sm"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className="text-xs"
        >
          Underline
        </Button>
        <div className="w-px h-6 bg-white/20 mx-1" />
        <Button
          type="button"
          variant={editor.isActive('heading', { level: 1 }) ? 'default' : 'outline'}
          size="sm"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className="text-xs"
        >
          H1
        </Button>
        <Button
          type="button"
          variant={editor.isActive('heading', { level: 2 }) ? 'default' : 'outline'}
          size="sm"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className="text-xs"
        >
          H2
        </Button>
        <Button
          type="button"
          variant={editor.isActive('heading', { level: 3 }) ? 'default' : 'outline'}
          size="sm"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className="text-xs"
        >
          H3
        </Button>
        <div className="w-px h-6 bg-white/20 mx-1" />
        <Button
          type="button"
          variant={editor.isActive('bulletList') ? 'default' : 'outline'}
          size="sm"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className="text-xs"
        >
          • List
        </Button>
        <Button
          type="button"
          variant={editor.isActive('orderedList') ? 'default' : 'outline'}
          size="sm"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className="text-xs"
        >
          1. List
        </Button>
        <div className="w-px h-6 bg-white/20 mx-1" />
        <Button
          type="button"
          variant={editor.isActive({ textAlign: 'left' }) ? 'default' : 'outline'}
          size="sm"
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className="text-xs"
        >
          Left
        </Button>
        <Button
          type="button"
          variant={editor.isActive({ textAlign: 'center' }) ? 'default' : 'outline'}
          size="sm"
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className="text-xs"
        >
          Center
        </Button>
        <Button
          type="button"
          variant={editor.isActive({ textAlign: 'right' }) ? 'default' : 'outline'}
          size="sm"
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className="text-xs"
        >
          Right
        </Button>
      </div>

      {/* Editor */}
      <div className="min-h-[200px]">
        <EditorContent 
          editor={editor} 
          placeholder={placeholder}
        />
      </div>
    </div>
  )
}
