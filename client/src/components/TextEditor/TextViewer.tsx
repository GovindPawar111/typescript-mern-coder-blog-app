import { useEditor, EditorContent } from '@tiptap/react'
import './TextEditor.css'
import { useEffect } from 'react'
import { extension } from './TextEditor'

interface ITextViewerProps {
    initialContent: string
}

export const TextViewer = ({ initialContent }: ITextViewerProps) => {
    const editor = useEditor({
        extensions: extension,
        editable: false,
        content: JSON.parse(initialContent),
        editorProps: {
            attributes: {
                class: 'py-2 focus:border-none focus:rounded-none border-none',
            },
        },
    })

    useEffect(() => {
        if (editor && initialContent !== '') {
            const parsedContent = JSON.parse(initialContent)
            editor.commands.setContent(parsedContent)
        }
    }, [initialContent])

    return (
        <div className="focus:rounded-none mt-8">
            <EditorContent editor={editor} />
        </div>
    )
}

export default TextViewer
