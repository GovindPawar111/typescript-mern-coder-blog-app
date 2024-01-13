import React, { useContext, useState } from 'react'
import { RxCross2 } from 'react-icons/rx'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { AppContext, PostResponse } from '../context/appContext'
import { apiBaseUrl } from '../config/url'
import axios, { AxiosError } from 'axios'
import { errorResponse } from './LoginPage'
import { useNavigate } from 'react-router-dom'
import Loader from '../components/Loader'

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
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [category, setCategory] = useState<string>('')
    const [content, setContent] = useState<string>('')
    const [categoryList, setCategoryList] = useState<string[]>([])

    const { user, setPosts } = useContext(AppContext)
    const navigate = useNavigate()

    const handleAddCategory = (): void => {
        if (category !== '' && categoryList.indexOf(category) < 0) {
            const newCategoryLIst = [...categoryList, category]
            setCategoryList(newCategoryLIst)
        }
    }

    const handleRemoveCategory = (removedCategory: string): void => {
        const newCategoryLIst = categoryList.filter((category) => category !== removedCategory)
        setCategoryList(newCategoryLIst)
    }

    const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement & { files: FileList }
        setImageFile(target.files[0])
    }

    const handleFormSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> => {
        e.preventDefault()

        const newPost = {
            title,
            description,
            catagories: categoryList,
            username: user?.username,
            userId: user?.id,
        }

        // formData is create to send image file and json data together
        const formData = new FormData()
        if (imageFile !== null) {
            formData.append('header-image', imageFile, imageFile.name)
        }

        formData.append('data', JSON.stringify(newPost))
        try {
            setIsLoading(true)
            const response = await axios.post<PostResponse>(`${apiBaseUrl}/api/post`, formData, {
                withCredentials: true,
            })
            setPosts((posts) => {
                if (posts !== null) {
                    return [...posts, response.data]
                }
                return posts
            })
            navigate('/')
            setIsLoading(false)
        } catch (e) {
            const error = e as AxiosError<errorResponse>
            console.error(error.response?.data.message)
        }
    }

    if (isLoading) {
        return (
            <div className="px-6 md:px-[200px] mt-8 min-h-screen">
                <Loader label={'Creating New Post...'}></Loader>
            </div>
        )
    }

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
                <input type="file" className="px-4" accept="image/png, image/jpg" onChange={(e) => handleAddImage(e)} />
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
                    onClick={(e) => handleFormSubmit(e)}
                    className="bg-black text-white w-full md:w-[20%] mx-auto font-semibold px-4 py-2 text-lg md:text-xl"
                >
                    Create
                </button>
            </form>
        </div>
    )
}

export default CreatePostPage
