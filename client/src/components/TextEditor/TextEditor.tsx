import { useEditor, EditorContent } from '@tiptap/react'

import ToolBar from './ToolBar'
import Bold from '@tiptap/extension-bold'
import Strike from '@tiptap/extension-strike'
import Italic from '@tiptap/extension-italic'
import Document from '@tiptap/extension-document'
import Heading from '@tiptap/extension-heading'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import { Blockquote } from '@tiptap/extension-blockquote'
import { Highlight } from '@tiptap/extension-highlight'
import BulletList from '@tiptap/extension-bullet-list'
import ListItem from '@tiptap/extension-list-item'
import OrderedList from '@tiptap/extension-ordered-list'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import CodeBlock from '@tiptap/extension-code-block'
import Code from '@tiptap/extension-code'
import TextAlign from '@tiptap/extension-text-align'
import HardBreak from '@tiptap/extension-hard-break'
import Link from '@tiptap/extension-link'
import History from '@tiptap/extension-history'

import './TextEditor.css'
import { useEffect } from 'react'

interface ITextEditorProps {
    initialContent: string
    onChange: (editorText: string) => void
}

export const extension = [
    Document,
    Text,
    Bold,
    Italic,
    Strike,
    Highlight,
    History,
    Heading,
    Paragraph.configure({
        HTMLAttributes: {
            class: 'my-4',
        },
    }),
    BulletList.configure({
        HTMLAttributes: {
            class: 'list-disc m-4',
        },
    }),
    OrderedList.configure({
        HTMLAttributes: {
            class: 'list-decimal m-4',
        },
    }),
    ListItem.configure({
        HTMLAttributes: {
            class: 'my-4',
        },
    }),
    Blockquote.configure({
        HTMLAttributes: {
            class: 'pl-4 border-l-[3px] border-gray-300 m-4',
        },
    }),
    HorizontalRule.configure({
        HTMLAttributes: {
            class: 'my-4',
        },
    }),
    CodeBlock.configure({
        HTMLAttributes: {
            class: 'my-4 p-4 bg-black text-white font-sans rounded-sm',
        },
    }),
    Code.configure({
        HTMLAttributes: {
            class: 'my-4 px-2 py-1 bg-[#f0f0f0] text-[#616161] font-sans rounded',
        },
    }),
    HardBreak.configure({
        keepMarks: false,
    }),
    TextAlign.configure({
        types: ['heading', 'paragraph'],
        alignments: ['left', 'center', 'right'],
    }),
    Link.configure({
        validate: (href) => /^https?:\/\//.test(href),
        HTMLAttributes: {
            class: 'underline italic',
            // Remove target entirely so links open in current tab
            target: '_blank',
        },
    }),
]

export const TextEditor = ({ initialContent, onChange }: ITextEditorProps) => {
    const editor = useEditor({
        extensions: extension,
        content: '',
        editorProps: {
            attributes: {
                class: 'px-4 py-2 focus:border-none focus:rounded-none border-none',
            },
        },
        onUpdate({ editor }) {
            onChange(JSON.stringify(editor.getJSON()))
        },
    })

    useEffect(() => {
        if (editor && initialContent !== '') {
            const parsedContent = JSON.parse(initialContent)
            editor.commands.setContent(parsedContent)
        }
    }, [initialContent])

    return (
        <>
            <ToolBar editor={editor} />
            <div className=" focus:border-black focus:rounded-none border-[1px] mt-2 ">
                <EditorContent editor={editor} />
            </div>
        </>
    )
}

export default TextEditor
