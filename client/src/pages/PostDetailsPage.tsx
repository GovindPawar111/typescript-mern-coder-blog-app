import React, { useState } from 'react'
import EditIcon from '../assets/svgs/edit.svg?react'
import DeleteIcon from '../assets/svgs/delete.svg?react'
import CommentSection from '../components/CommentSection'
import { useUserContext } from '../context/appContext'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Overlay from '../components/generic/Overlay'
import Model from '../components/generic/Model'
import TextViewer from '../components/textEditor/TextViewer'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import placeholderImage from '../assets/images/placeholder-image.png'
import { PostType } from '../types/postType'
import { getFormattedDate, getFormattedTime } from '../utils/formattedDateTime'
import { queryClient } from '../api/queryClient'
import { POST_QUERY_KEY, useDeletePost, useGetPostWithId } from '../api/queries/postQueries'
import useNotification, { ToastType } from '../hooks/useNotification'
import { useErrorBoundary } from 'react-error-boundary'
import Loader from '../components/generic/Loader'
import ArrowBack from '../assets/svgs/arrow_back.svg?react'

const PostDetailsPage: React.FC = () => {
    const [isModelOpen, setIsModelOpen] = useState<boolean>(false)

    const { user } = useUserContext()
    const params = useParams()
    const navigate = useNavigate()
    const { createNotification } = useNotification()
    const { showBoundary } = useErrorBoundary()

    if (!params.postId) {
        return
    }

    // Get post data from react query cache
    const posts = queryClient.getQueryData<PostType[]>([POST_QUERY_KEY, { search: '' }])
    const postDataFromCache = posts?.find((post) => post._id === params.postId)

    const {
        data: postDataFromApi,
        isError: postIsError,
        error: postError,
        isLoading: postLoading,
    } = useGetPostWithId(params.postId, !postDataFromCache)
    const { mutate: deletePostMutation, isPending: deletePostPending } = useDeletePost(params.postId)

    if (postIsError) {
        showBoundary(postError)
    }

    const post = postDataFromCache || postDataFromApi

    const handleDeletePost = async (): Promise<void> => {
        if (user?.isAnonymous) {
            createNotification('You need to log in as a real user to delete a post.', ToastType.Info)
            return
        }
        
        if (!params.postId) {
            return
        }

        deletePostMutation(params.postId, {
            onSuccess: () => {
                // If post data is present in react query cache then remove it
                if (postDataFromCache) {
                    queryClient.setQueryData(
                        [POST_QUERY_KEY, { search: '' }],
                        posts?.filter((post) => post._id !== params.postId)
                    )
                }
                createNotification('Post deleted successfully', ToastType.Success)
                navigate('/')
            },
            onError: () => {
                createNotification('Failed to delete the post', ToastType.Error)
            },
        })
    }

    if (postLoading || post === undefined || deletePostPending) {
        return (
            <div className="w-full flex flex-grow">
                <Loader></Loader>
            </div>
        )
    }

    return (
        <section className="flex justify-center items-start w-full">
            <div className="w-full py-8 px-4 sm:px-8 lg:w-[90%] min-[1400px]:w-[1240px]">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-2 justify-between items-start sm:items-center">
                    <div className="flex justify-start align-center gap-1">
                        <ArrowBack className="cursor-pointer w-[32px] h-[24px] mt-[8px]" onClick={() => navigate(-1)} />
                        <h1 className="text-2xl font-bold text-black md:text-3xl">{post?.title}</h1>
                    </div>

                    {post?.userId === user?.id && (
                        <div className="flex items-center justify-center space-x-2">
                            <Link to={`/posts/edit/${post?._id}`}>
                                <EditIcon />
                            </Link>
                            <DeleteIcon className="cursor-pointer" onClick={() => setIsModelOpen(true)} />
                            <Overlay isOpen={isModelOpen} onClose={() => setIsModelOpen(false)}>
                                <Model
                                    headerText={'Are you sure you want to delete this post?'}
                                    description={'This will delete the post permanently. You cannot undo this action.'}
                                    onClose={() => setIsModelOpen(false)}
                                    onAction={() => handleDeletePost()}
                                    actionLabel="Delete"
                                />
                            </Overlay>
                        </div>
                    )}
                </div>
                <div className="flex justify-between items-center mt-4">
                    <Link to={`/profile/${post?.userId}`} state={post?.username}>
                        <p>@{post?.username}</p>
                    </Link>
                    <div className="flex space-x-2">
                        {post?.updatedAt && (
                            <>
                                <span>{getFormattedDate(post.updatedAt)}</span>
                                <span>{getFormattedTime(post.updatedAt)}</span>
                            </>
                        )}
                    </div>
                </div>
                <div className="w-full mx-auto mt-6 rounded-sm">
                    {post?.headerImageUrl && (
                        <LazyLoadImage
                            alt={post.title}
                            effect="blur"
                            className="w-full h-full object-cover cursor-pointer rounded-sm"
                            height={'110%'}
                            width={'100%'}
                            src={post?.headerImageUrl}
                            placeholderSrc={placeholderImage}
                            onErrorCapture={(e) => (e.currentTarget.src = placeholderImage)}
                        />
                    )}
                </div>
                <p className="mx-auto mt-6">{post?.description}</p>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-2 items-start sm:items-center mt-6 font-semibold">
                    <p>Categories:</p>
                    <div className="flex justify-start items-start flex-wrap">
                        {post?.categories.map((category, index) => (
                            <div key={`${category}-${index}`} className="bg-gray-300 rounded-lg px-3 py-1 mr-2 mb-2">
                                {category}
                            </div>
                        ))}
                    </div>
                </div>

                {post?.content && <TextViewer initialContent={post?.content || ''} />}

                {params.postId && <CommentSection postId={params.postId} />}
            </div>
        </section>
    )
}

export const Component = PostDetailsPage

export default PostDetailsPage
