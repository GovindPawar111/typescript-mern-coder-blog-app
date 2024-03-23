import { Editor } from '@tiptap/react'

import { RiBold, RiItalic, RiStrikethrough } from 'react-icons/ri'
import { PiParagraph, PiListBullets, PiCodeBlock } from 'react-icons/pi'
import { LuHeading1, LuHeading2, LuHeading3, LuUndo, LuRedo } from 'react-icons/lu'
import { TbClearFormatting } from 'react-icons/tb'
import { AiOutlineOrderedList } from 'react-icons/ai'
import { FaLink } from 'react-icons/fa'
import { GrBlockQuote } from 'react-icons/gr'
import { MdOutlineWrapText } from 'react-icons/md'
import { LiaHighlighterSolid } from 'react-icons/lia'
import { IoRemoveOutline } from 'react-icons/io5'
import { IoCodeOutline } from 'react-icons/io5'
import { CiTextAlignLeft } from 'react-icons/ci'
import { CiTextAlignCenter } from 'react-icons/ci'
import { CiTextAlignRight } from 'react-icons/ci'

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
        <div className="px-1 rounded-none border-[1px]">
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
                <RiBold />
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
                <RiItalic />
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
                <RiStrikethrough />
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
                <LiaHighlighterSolid />
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
                <IoCodeOutline />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
                className={'p-2 m-1 hover:bg-gray-100 hover:rounded-md'}
            >
                <TbClearFormatting />
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
                <PiParagraph />
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
                <LuHeading1 />
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
                <LuHeading2 />
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
                <LuHeading3 />
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
                <PiListBullets />
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
                <AiOutlineOrderedList />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().setTextAlign('left').run()}
                className={'p-2 m-1 hover:bg-gray-100 hover:rounded-md'}
            >
                <CiTextAlignLeft />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().setTextAlign('center').run()}
                className={'p-2 m-1 hover:bg-gray-100 hover:rounded-md'}
            >
                <CiTextAlignCenter />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().setTextAlign('right').run()}
                className={'p-2 m-1 hover:bg-gray-100 hover:rounded-md'}
            >
                <CiTextAlignRight />
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
                <PiCodeBlock />
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
                <GrBlockQuote />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().setHorizontalRule().run()}
                className={'p-2 m-1 hover:bg-gray-100 hover:rounded-md'}
            >
                <IoRemoveOutline />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().setHardBreak().run()}
                className={'px-2 mr-1 mb-1 hover:bg-gray-100 hover:rounded-md'}
            >
                <MdOutlineWrapText />
            </button>
            <button
                type="button"
                onClick={() => setLink(editor)}
                className={'p-2 m-1 hover:bg-gray-100 hover:rounded-md'}
            >
                <FaLink />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().chain().focus().undo().run()}
                className={'p-2 m-1 hover:bg-gray-100 hover:rounded-md'}
            >
                <LuUndo />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().chain().focus().redo().run()}
                className={'p-2 m-1 hover:bg-gray-100 hover:rounded-md'}
            >
                <LuRedo />
            </button>
        </div>
    )
}

export default ToolBar
