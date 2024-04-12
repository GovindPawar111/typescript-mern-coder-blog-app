import React, { useContext, useEffect, useState } from 'react'
import EditIcon from '../assets/svgs/edit.svg?react'
import DeleteIcon from '../assets/svgs/Delete.svg?react'
import CommentSection from '../components/CommentSection'
import { AppContext } from '../utils/context/appContext'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { apiBaseUrl } from '../utils/config/url'
import Overlay from '../components/Overlay'
import Model from '../components/Model'
import TextViewer from '../components/TextEditor/TextViewer'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import placeholderImage from '../assets/images/placeholder-image.png'
import { PostType } from '../utils/types/postType'
import { getFormattedDate, getFormattedTime } from '../utils/formattedDateTime'

const PostDetailsPage: React.FC = () => {
    const [post, setPost] = useState<PostType | null>(null)
    const [isModelOpen, setIsModelOpen] = useState<boolean>(false)

    const { user } = useContext(AppContext)
    const params = useParams()
    const navigate = useNavigate()

    const handleDeletePost = async (): Promise<void> => {
        try {
            await axios.delete<PostType>(`${apiBaseUrl}/api/post/${params.postId}`, {
                withCredentials: true,
            })
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const getPost = async (postId: string) => {
            const postResponse = await axios.get<PostType>(`${apiBaseUrl}/api/post/${postId}`)
            setPost(postResponse.data)
        }

        params.postId && getPost(params.postId)
    }, [])

    return (
        <section className="px-8 py-8 md:mx-[160px] w-[100wh] md:px-8 bg-white shadow-md flex-grow">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-black md:text-3xl">{post?.title}</h1>
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
            <div className="flex justify-between items-center mt-2 md:mt-4">
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
            <div className="w-full mx-auto mt-8 rounded-sm">
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
            <p className="mx-auto mt-8">{post?.description}</p>
            <div className="flex items-center mt-8 space-x-4 font-semibold">
                <p>Categories:</p>
                <div className="flex justify-center items-center space-x-2">
                    {post?.catagories.map((category, index) => (
                        <div key={index} className="bg-gray-300 rounded-lg px-3 py-1 ">
                            {category}
                        </div>
                    ))}
                </div>
            </div>

            {post?.content && <TextViewer initialContent={post?.content || ''} />}

            {params.postId && <CommentSection postId={params.postId} />}
        </section>
    )
}

export const Component = PostDetailsPage

export default PostDetailsPage
