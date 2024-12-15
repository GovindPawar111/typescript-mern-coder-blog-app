import { Editor } from '@tiptap/react'
import BoldIcon from '../../assets/svgs/bold.svg?react'
import ItalicIcon from '../../assets/svgs/italic.svg?react'
import StrikeThroughIcon from '../../assets/svgs/strikethrough.svg?react'
import ParagraphIcon from '../../assets/svgs/paragraph.svg?react'
import UnorderedListIcon from '../../assets/svgs/unordered-list.svg?react'
import CodeBlockIcon from '../../assets/svgs/code-block.svg?react'
import Heading1Icon from '../../assets/svgs/heading1.svg?react'
import Heading2Icon from '../../assets/svgs/heading2.svg?react'
import Heading3Icon from '../../assets/svgs/heading3.svg?react'
import UndoIcon from '../../assets/svgs/undo.svg?react'
import RedoIcon from '../../assets/svgs/redo.svg?react'
import FormatClearIcon from '../../assets/svgs/format-clear.svg?react'
import OrderedListIcon from '../../assets/svgs/ordered-list.svg?react'
import LinkIcon from '../../assets/svgs/link.svg?react'
import DoubleQuotesIcon from '../../assets/svgs/double-quotes.svg?react'
import TextWrapIcon from '../../assets/svgs/text-wrap.svg?react'
import MarkPenIcon from '../../assets/svgs/mark-pen.svg?react'
import SeparatorLineIcon from '../../assets/svgs/separator-line.svg?react'
import CodeIcon from '../../assets/svgs/code.svg?react'
import AlignLeftIcon from '../../assets/svgs/align-left.svg?react'
import AlignCenterIcon from '../../assets/svgs/align-center.svg?react'
import AlignRightIcon from '../../assets/svgs/align-right.svg?react'

interface IToolBarProps {
    editor: Editor | null
}

export const ToolBar = ({ editor }: IToolBarProps) => {
    if (!editor) {
        return null
    }

    const setLink = (editor: Editor) => {
        const previousUrl = editor.getAttributes('link').href
        const url = window.prompt('URL', previousUrl)

        //cancelled
        if (url === null) {
            return
        }

        // empty
        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run()
            return
        }

        // update link
        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
    }

    return (
        <div className="px-1 rounded-none border-[2px]">
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editor.can().chain().focus().toggleBold().run()}
                className={
                    editor.isActive('bold')
                        ? 'bg-gray-100 p-2 m-1 rounded-md'
                        : 'p-2 m-1 hover:bg-gray-100 hover:rounded-md'
                }
            >
                <BoldIcon />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
                className={
                    editor.isActive('italic')
                        ? 'bg-gray-100 p-2 m-1 rounded-md'
                        : 'p-2 m-1 hover:bg-gray-100 hover:rounded-md'
                }
            >
                <ItalicIcon />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleStrike().run()}
                disabled={!editor.can().chain().focus().toggleStrike().run()}
                className={
                    editor.isActive('strike')
                        ? 'bg-gray-100 p-2 m-1 rounded-md'
                        : 'p-2 m-1 hover:bg-gray-100 hover:rounded-md'
                }
            >
                <StrikeThroughIcon />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleHighlight().run()}
                disabled={!editor.can().chain().focus().toggleHighlight().run()}
                className={
                    editor.isActive('strike')
                        ? 'bg-gray-100 p-2 m-1 rounded-md'
                        : 'p-2 m-1 hover:bg-gray-100 hover:rounded-md'
                }
            >
                <MarkPenIcon />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleCode().run()}
                className={
                    editor.isActive('code')
                        ? 'bg-gray-100 p-2 m-1 rounded-md'
                        : 'p-2 m-1 hover:bg-gray-100 hover:rounded-md'
                }
            >
                <CodeIcon />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
                className={'p-2 m-1 hover:bg-gray-100 hover:rounded-md'}
            >
                <FormatClearIcon />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().setParagraph().run()}
                className={
                    editor.isActive('paragraph')
                        ? 'bg-gray-100 p-2 m-1 rounded-md'
                        : 'p-2 m-1 hover:bg-gray-100 hover:rounded-md'
                }
            >
                <ParagraphIcon />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={
                    editor.isActive('heading', { level: 1 })
                        ? 'bg-gray-100 p-2 m-1 rounded-md'
                        : 'p-2 m-1 hover:bg-gray-100 hover:rounded-md'
                }
            >
                <Heading1Icon />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={
                    editor.isActive('heading', { level: 2 })
                        ? 'bg-gray-100 p-2 m-1 rounded-md'
                        : 'p-2 m-1 hover:bg-gray-100 hover:rounded-md'
                }
            >
                <Heading2Icon />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                className={
                    editor.isActive('heading', { level: 3 })
                        ? 'bg-gray-100 p-2 m-1 rounded-md'
                        : 'p-2 m-1 hover:bg-gray-100 hover:rounded-md'
                }
            >
                <Heading3Icon />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={
                    editor.isActive('bulletList')
                        ? 'bg-gray-100 p-2 m-1 rounded-md'
                        : 'p-2 m-1 hover:bg-gray-100 hover:rounded-md'
                }
            >
                <UnorderedListIcon />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={
                    editor.isActive('orderedList')
                        ? 'bg-gray-100 p-2 m-1 rounded-md'
                        : 'p-2 m-1 hover:bg-gray-100 hover:rounded-md'
                }
            >
                <OrderedListIcon />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().setTextAlign('left').run()}
                className={'p-2 m-1 hover:bg-gray-100 hover:rounded-md'}
            >
                <AlignLeftIcon />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().setTextAlign('center').run()}
                className={'p-2 m-1 hover:bg-gray-100 hover:rounded-md'}
            >
                <AlignCenterIcon />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().setTextAlign('right').run()}
                className={'p-2 m-1 hover:bg-gray-100 hover:rounded-md'}
            >
                <AlignRightIcon />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                className={
                    editor.isActive('codeBlock')
                        ? 'bg-gray-100 p-2 m-1 rounded-md'
                        : 'p-2 m-1 hover:bg-gray-100 hover:rounded-md'
                }
            >
                <CodeBlockIcon />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={
                    editor.isActive('blockquote')
                        ? 'bg-gray-100 p-2 m-1 rounded-md'
                        : 'p-2 m-1 hover:bg-gray-100 hover:rounded-md'
                }
            >
                <DoubleQuotesIcon />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().setHorizontalRule().run()}
                className={'p-2 m-1 hover:bg-gray-100 hover:rounded-md'}
            >
                <SeparatorLineIcon />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().setHardBreak().run()}
                className={'px-2 mr-1 mb-1 hover:bg-gray-100 hover:rounded-md'}
            >
                <TextWrapIcon />
            </button>
            <button
                type="button"
                onClick={() => setLink(editor)}
                className={'p-2 m-1 hover:bg-gray-100 hover:rounded-md'}
            >
                <LinkIcon />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().chain().focus().undo().run()}
                className={'p-2 m-1 hover:bg-gray-100 hover:rounded-md'}
            >
                <UndoIcon />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().chain().focus().redo().run()}
                className={'p-2 m-1 hover:bg-gray-100 hover:rounded-md'}
            >
                <RedoIcon />
            </button>
        </div>
    )
}

export default ToolBar
