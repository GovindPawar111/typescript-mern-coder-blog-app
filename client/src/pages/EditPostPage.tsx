import React, { useContext, useEffect, useRef, useState } from 'react'
import CloseIcon from '../assets/svgs/close.svg?react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/appContext'
import Loader from '../components/generic/Loader'
import { AxiosError } from 'axios'
import placeholderImage from '../assets/images/placeholder-image.png'
import TextEditor from '../components/textEditor/TextEditor'
import { ErrorType } from '../types/errorType'
import { getPostWithId, updatePost } from '../api/postApi'
import Button from '../components/generic/Button'
import useNotification, { ToastType } from '../hooks/useNotification'

const EditPostPage: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [image, setImage] = useState<{ file: File | null; previewImageURL: string }>({
        file: null,
        previewImageURL: placeholderImage,
    })

    // To hold the headerImageUrl value which already on cloudinary store.
    const headerImageUrlRef = useRef<string>('')
    const [category, setCategory] = useState<string>('')
    const [content, setContent] = useState<string>('')
    const [initialContent, setInitialContent] = useState<string>('')
    const [categoryList, setCategoryList] = useState<string[]>([])

    const { user } = useContext(AppContext)
    const navigate = useNavigate()
    const params = useParams()
    const { createNotification } = useNotification()

    const handleAddCategory = (): void => {
        if (categoryList.length >= 3) {
            setCategory('')
            return
        }
        if (category !== '' && categoryList.indexOf(category) < 0) {
            const newCategoryLIst = [...categoryList, category]
            setCategoryList(newCategoryLIst)
        }
        setCategory('')
    }

    const handleRemoveCategory = (removedCategory: string): void => {
        const newCategoryLIst = categoryList.filter((category) => category !== removedCategory)
        setCategoryList(newCategoryLIst)
    }

    const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement & { files: FileList }
        const selectedFile = target.files[0]

        if (selectedFile) {
            // Update state with the new file and its preview URL
            setImage({
                file: target.files[0],
                previewImageURL: URL.createObjectURL(selectedFile),
            })
        } else {
            setImage({
                file: null,
                previewImageURL: headerImageUrlRef.current,
            })
        }
    }

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault()

        if (!params.postId) {
            return
        }

        const newPost = {
            title,
            description,
            headerImageUrl: image.file ? '' : headerImageUrlRef.current,
            categories: categoryList,
            content: content,
            username: user?.username,
            userId: user?.id,
        }

        // formData is create to send image file and json data together
        const formData = new FormData()
        if (image.file !== null) {
            formData.append('header-image', image.file, image.file.name)
        }

        formData.append('data', JSON.stringify(newPost))
        try {
            setIsLoading(true)
            const response = await updatePost(params.postId, formData)
            navigate(`/posts/${response._id}`)
            setIsLoading(false)
            createNotification('Post Updated Successfully', ToastType.Success)
        } catch (e) {
            const error = e as AxiosError<ErrorType>
            console.error(error.response?.data.message)
            createNotification('Post Update Failed', ToastType.Error)
        }
    }

    useEffect(() => {
        const getPost = async (postId: string) => {
            const postResponse = await getPostWithId(postId)
            setTitle(postResponse.title || '')
            setDescription(postResponse.description || '')
            setContent(postResponse.content || '')
            setInitialContent(postResponse.content || '')
            headerImageUrlRef.current = postResponse.headerImageUrl
            setImage({
                file: null,
                previewImageURL: postResponse.headerImageUrl || placeholderImage,
            })
            setCategoryList(postResponse.categories || [])
        }

        params.postId && getPost(params.postId)
        setIsLoading(false)
    }, [])

    if (isLoading) {
        return (
            <div className="w-full flex flex-grow">
                <Loader label={'Saving Post...'}></Loader>
            </div>
        )
    }

    return (
        <section className="flex justify-center items-start w-full">
            <div className="w-full py-8 px-4 sm:px-8 lg:w-[90%] min-[1400px]:w-[1240px]">
                <h1 className="font-bold text-xl md:text-2xl">Edit a post</h1>
                <form
                    className="w-full flex flex-col space-y-4 md:space-y-4 mt-4"
                    onSubmit={(e) => handleFormSubmit(e)}
                >
                    <input
                        type="text"
                        placeholder="Enter post title"
                        className="px-4 py-2 text-black border-2 focus:border-black"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                        placeholder="Enter post description"
                        className="px-4 py-2 text-black border-2 focus:border-black"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <img
                        src={image.previewImageURL}
                        alt={title}
                        className="w-[250px] h-[150px] object-contain cursor-pointer"
                    />
                    <input
                        type="file"
                        className="px-4 w-[300px]"
                        accept="image/*"
                        onChange={(e) => handleAddImage(e)}
                    />
                    <div className="flex flex-col">
                        <div className="flex items-center">
                            <input
                                type="text"
                                placeholder="Enter post categories"
                                className="px-4 py-2 mr-2 sm:mr-4 text-black border-2 focus:border-black"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            />
                            <Button label={'Add'} className="" onClick={() => handleAddCategory()} />
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
                                        <CloseIcon />
                                    </span>
                                </div>
                            )
                        })}
                    </div>

                    <TextEditor initialContent={initialContent} onChange={(text: string) => setContent(text)} />

                    <Button type="submit" label={'Save'} className="w-[200px] mx-auto text-lg md:text-xl" />
                </form>
            </div>
        </section>
    )
}

export const Component = EditPostPage

export default EditPostPage
