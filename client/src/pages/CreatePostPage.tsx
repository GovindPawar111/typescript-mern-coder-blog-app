import React, { useContext, useState } from 'react'
import CloseIcon from '../assets/svgs/close.svg?react'
import { AppContext } from '../context/appContext'
import { useNavigate } from 'react-router-dom'
import Loader from '../components/generic/Loader'
import placeholderImage from '../assets/images/placeholder-image.png'
import TextEditor from '../components/textEditor/TextEditor'
import Button from '../components/generic/Button'
import useNotification, { ToastType } from '../hooks/useNotification'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { PostFormSchema, PostFormType } from '../types/postFormType'
import { POST_QUERY_KEY, useCreatePost } from '../api/queries/postQueries'
import { queryClient } from '../api/queryClient'
import { PostType } from '../types/postType'
import { COMMENT_QUERY_KEY } from '../api/queries/commentQueries'

const CreatePostPage: React.FC = () => {
    const [inputCategory, setInputCategory] = useState<string>('')
    const [image, setImage] = useState<{ file: File | null; previewImageURL: string }>({
        file: null,
        previewImageURL: placeholderImage,
    })

    const { user } = useContext(AppContext)
    const navigate = useNavigate()
    const { createNotification } = useNotification()
    const { mutate: createPostMutation, isPending: isMutationLoading } = useCreatePost()

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },
        control,
        setError,
    } = useForm<PostFormType>({
        defaultValues: {
            title: '',
            description: '',
            categories: [],
            content: '',
        },
        resolver: zodResolver(PostFormSchema),
    })

    const handleAddCategory = () => {
        const currentCategories = getValues('categories')

        if (currentCategories && currentCategories.length >= 3) {
            setInputCategory('')
            setError('categories', { message: 'Maximum of 3 categories are allowed' })
            return
        }
        if (currentCategories?.filter((category) => category === inputCategory.trim()).length > 0) {
            setError('categories', { message: 'Duplicate categories are not allowed' })
            return
        }
        currentCategories && setValue('categories', [...currentCategories, inputCategory.trim()])
        setInputCategory('')
    }

    const handleRemoveCategory = (categoryToRemove: string) => {
        const updatedCategories = getValues('categories')?.filter((category) => category !== categoryToRemove)
        setValue('categories', updatedCategories)
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
                previewImageURL: placeholderImage,
            })
        }
    }

    const handleFormSubmit = async ({ title, description, categories, content }: PostFormType): Promise<void> => {
        const newPost = {
            title,
            description,
            categories: categories,
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

        createPostMutation(formData, {
            onSuccess: (data) => {
                // Add the post to the cache
                queryClient.setQueryData<PostType[]>([POST_QUERY_KEY, { search: '' }], (postsData) =>
                    postsData ? [data, ...postsData] : [data]
                )
                // Add the empty comments to the cache
                queryClient.setQueryData<PostType[]>([COMMENT_QUERY_KEY, data._id], [])
                createNotification('Successfully create a new post', ToastType.Success)
                navigate(`/posts/${data._id}`)
            },

            onError: () => {
                createNotification('Failed to create post', ToastType.Error)
            },
        })
    }

    if (isMutationLoading) {
        return (
            <div className="w-full flex flex-grow">
                <Loader label={'Creating New Post...'}></Loader>
            </div>
        )
    }

    return (
        <section className="flex justify-center items-start w-full">
            <div className="w-full py-8 px-4 sm:px-8 lg:w-[90%] min-[1400px]:w-[1240px]">
                <h1 className="font-bold text-xl md:text-2xl">Create a post</h1>
                <form noValidate className="w-full flex flex-col mt-4" onSubmit={handleSubmit(handleFormSubmit)}>
                    {/* Title input */}
                    <input
                        type="text"
                        placeholder="Enter post title"
                        className="px-4 py-2 text-black border-2 focus:border-black"
                        {...register('title')}
                    />
                    {errors.title && (
                        <label htmlFor="title" className="text-red-500 text-xs">
                            {errors.title.message}
                        </label>
                    )}
                    {/* Description input */}
                    <Controller
                        name="description"
                        control={control}
                        render={({ field }) => (
                            <textarea
                                id="description"
                                {...field}
                                placeholder="Enter post description"
                                className="px-4 py-2 text-black border-2 focus:border-black mt-4"
                            />
                        )}
                    />
                    {errors.description && (
                        <label htmlFor="description" className="text-red-500 text-xs">
                            {errors.description.message}
                        </label>
                    )}
                    {/* Image preview */}
                    <img
                        src={image.previewImageURL}
                        alt={'title'}
                        className="w-[250px] h-[150px] object-cover cursor-pointer mt-4"
                    />
                    {/* Image input */}
                    <input
                        type="file"
                        className="px-4 w-[300px] mt-4"
                        accept="image/*"
                        onChange={(e) => handleAddImage(e)}
                    />
                    {/* Categories input */}
                    <div className="flex flex-col mt-4">
                        <div className="flex items-center">
                            <input
                                type="text"
                                placeholder="Enter post categories"
                                className="px-4 py-2 mr-2 sm:mr-4 text-black border-2 focus:border-black"
                                value={inputCategory}
                                onChange={(e) => setInputCategory(e.target.value)}
                                onFocus={() => {
                                    if (errors.categories?.message) {
                                        setError('categories', { message: '' })
                                    }
                                }}
                            />

                            <Button
                                label={'Add'}
                                onClick={() => {
                                    if (inputCategory.trim()) handleAddCategory()
                                }}
                            />
                        </div>
                    </div>
                    {/* Categories list */}
                    <Controller
                        name="categories"
                        control={control}
                        render={({ field }) => (
                            <div className="flex flex-wrap">
                                {field.value?.map((category, index) => {
                                    const key = category + index + Date.now() + Math.random()
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
                        )}
                    />
                    {errors.categories && (
                        <label htmlFor="categories" className="text-red-500 text-xs">
                            {errors.categories.message}
                        </label>
                    )}
                    {/* Text Editor */}
                    <div className="mt-4">
                        <Controller
                            control={control}
                            name="content"
                            render={({ field }) => (
                                <TextEditor
                                    initialContent=""
                                    onChange={(text: string) => field.onChange(text)}
                                    onEmpty={(isEmpty: boolean) => {
                                        if (isEmpty) {
                                            setValue('content', '')
                                            setError('content', { message: 'Content is required' })
                                            field.onBlur()
                                        }
                                    }}
                                />
                            )}
                        />
                    </div>
                    {errors.content && (
                        <label htmlFor="content" className="text-red-500 text-xs">
                            {errors.content.message}
                        </label>
                    )}
                    {/* Submit Button */}
                    <Button type="submit" label={'Create'} className="w-[200px] mx-auto text-lg md:text-xl mt-4" />
                </form>
            </div>
        </section>
    )
}

export const Component = CreatePostPage

export default CreatePostPage
