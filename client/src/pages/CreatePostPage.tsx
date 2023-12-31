import React, { useState } from 'react'
import { RxCross2 } from 'react-icons/rx'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const modules = {
    toolbar: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
        ['link', 'image'],
        ['clean'],
    ],
}

const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
]

const CreatePostPage: React.FC = () => {
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [category, setCategory] = useState<string>('')
    const [content, setContent] = useState<string>('')
    const [categoryList, setCategoryList] = useState<string[]>([])

    const handleAddCategory = (): void => {
        if (category !== '' && categoryList.indexOf(category) < 0) {
            const newCategoryLIst = [...categoryList, category]
            setCategoryList(newCategoryLIst)
        }
    }

    const handleRemoveCategory = (removedCategory: string): void => {
        const newCategoryLIst = categoryList.filter((category) => category !== removedCategory)
        setCategoryList(newCategoryLIst)
        console.log(categoryList)
    }

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {}

    return (
        <div className="px-6 md:px-[200px] mt-8">
            <h1 className="font-bold text-xl md:text-2xl">Create a post</h1>
            <form className="w-full flex flex-col space-y-4 md:space-y-4 mt-4" onSubmit={(e) => handleFormSubmit(e)}>
                <input
                    type="text"
                    placeholder="Enter post title"
                    className="px-4 py-2 text-black border-2 focus:border-black"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Enter post description"
                    className="px-4 py-2 text-black border-2 focus:border-black"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input type="file" className="px-4" />
                <div className="flex flex-col">
                    <div className="flex items-center space-x-4 md:space-x-8">
                        <input
                            type="text"
                            placeholder="Enter post categories"
                            className="px-4 py-2 text-black border-2 focus:border-black"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                        <a
                            onClick={() => handleAddCategory()}
                            className="bg-black text-white px-4 py-2 font-semibold cursor-pointer"
                        >
                            Add
                        </a>
                    </div>
                </div>
                {/* categories */}
                <div className="flex flex-wrap mt-3">
                    {categoryList.map((category) => {
                        const key = category + Date.now() + Math.random()
                        console.log(key)
                        return (
                            <div
                                key={key}
                                className="flex justify-center items-center space-x-2 m-2 bg-gray-200 px-2 py-1 rounded"
                            >
                                <span>{category}</span>
                                <span
                                    className="text-black p-1 cursor-pointer text-sm"
                                    onClick={() => handleRemoveCategory(category)}
                                >
                                    <RxCross2 />
                                </span>
                            </div>
                        )
                    })}
                </div>

                <ReactQuill theme="snow" value={content} onChange={setContent} modules={modules} formats={formats} />

                <button
                    type="submit"
                    className="bg-black text-white w-full md:w-[20%] mx-auto font-semibold px-4 py-2 text-lg md:text-xl"
                >
                    Create
                </button>
            </form>
        </div>
    )
}

export default CreatePostPage
