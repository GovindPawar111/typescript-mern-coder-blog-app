import React, { useContext, useEffect, useState } from 'react'
import { BiEdit } from 'react-icons/bi'
import { MdDelete } from 'react-icons/md'
import CommentSection from '../components/CommentSection'
import { AppContext, PostResponse } from '../context/appContext'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { apiBaseUrl } from '../config/url'
import { getFormattedTime, getFormattedDate } from '../components/Post'
import Overlay from '../components/Overlay'
import Model from '../components/Model'
import TextViewer from '../components/TextEditor/TextViewer'

const PostDetailsPage: React.FC = () => {
    const [post, setPost] = useState<PostResponse | null>(null)
    const [isModelOpen, setIsModelOpen] = useState<boolean>(false)

    const { user } = useContext(AppContext)
    const params = useParams()
    const navigate = useNavigate()

    const handleDeletePost = async (): Promise<void> => {
        try {
            const response = await axios.delete<PostResponse>(`${apiBaseUrl}/api/post/${params.postId}`, {
                withCredentials: true,
            })
            console.log(response)
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const getPost = async (postId: string) => {
            const postResponse = await axios.get<PostResponse>(`${apiBaseUrl}/api/post/${postId}`)
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
                            <BiEdit />
                        </Link>
                        <MdDelete className="cursor-pointer" onClick={() => setIsModelOpen(true)} />
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
            <img src={post?.headerImageUrl} alt="" className="w-full mx-auto mt-8 rounded-sm" />
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
