import React, { useContext, useEffect, useState } from 'react'
import { BiEdit } from 'react-icons/bi'
import { MdDelete } from 'react-icons/md'
import Comment from '../components/Comment'
import { AppContext, PostResponse } from '../context/appContext'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { apiBaseUrl } from '../config/url'
import { getFormattedTime, getFormattedDate } from '../components/Post'

const PostDetailsPage: React.FC = () => {
    const [post, setPost] = useState<PostResponse | null>(null)
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
        <div className="px-8 md:px-[200px] mt-8">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-black md:text-3xl">{post?.title}</h1>
                {post?.userId === user?.id && (
                    <div className="flex items-center justify-center space-x-2">
                        <Link to={`/posts/edit/${post?._id}`}>
                            <BiEdit />
                        </Link>
                        <MdDelete className="cursor-pointer" onClick={handleDeletePost} />
                    </div>
                )}
            </div>
            <div className="flex justify-between items-center mt-2 md:mt-4">
                <p>@{post?.username}</p>
                <div className="flex space-x-2">
                    {post?.updatedAt && (
                        <>
                            <span>{getFormattedDate(post.updatedAt)}</span>
                            <span>{getFormattedTime(post.updatedAt)}</span>
                        </>
                    )}
                </div>
            </div>
            <img src={post?.headerImageUrl} alt="" className="w-full mx-auto mt-8" />
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
            {/* comments */}
            <Comment />

            {/* write a comment */}
            <div className="w-full flex flex-col md:flex-row mt-4">
                <input
                    type="text"
                    placeholder="Write a comment"
                    className="w-[80%] outline-none px-4 py-2 mt-4 md:mt-0"
                />
                <button className="bg-black text-white px-4 py-2 mt-4 md:mt-0  md:w-[20%]">Add comment</button>
            </div>
        </div>
    )
}

export default PostDetailsPage
