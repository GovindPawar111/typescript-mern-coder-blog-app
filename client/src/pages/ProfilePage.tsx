import React, { useContext, useEffect, useState } from 'react'
import Profile from '../components/EditProfile'
import { useLocation, useParams } from 'react-router-dom'
import { AppContext, PostResponse } from '../context/appContext'
import axios, { AxiosError } from 'axios'
import { apiBaseUrl } from '../config/url'
import Loader from '../components/Loader'
import Post from '../components/Post'
import NoPost from '../components/NoPost'
import { errorResponse } from './LoginPage'

const ProfilePage: React.FC = () => {
    const [posts, setPosts] = useState<PostResponse[]>([])
    const { user } = useContext(AppContext)
    const params = useParams()
    const location = useLocation()
    const username = location.state

    const getUserPost = async (id: string) => {
        try {
            const response = await axios.get<PostResponse[]>(`${apiBaseUrl}/api/post/user/${id}`, {
                withCredentials: true,
            })
            response.data && setPosts(response.data)
        } catch (e) {
            const error = e as AxiosError<errorResponse>
            console.log(error)
        }
    }

    useEffect(() => {
        params.profileId && getUserPost(params.profileId)
    }, [])

    return (
        <section className="px-8 py-8 md:mx-[160px] md:px-8 flex flex-col-reverse items-start md:flex-row md:gap-4 min-h-screen bg-white">
            <div className="flex flex-col w-full md:w-[70%] mt-8 md:mt-0">
                <h1 className="text-xl font-bold mb-4">{`${
                    params.profileId === user?.id ? 'Your' : `${username}'s`
                } posts:`}</h1>
                {posts === undefined || posts === null ? (
                    <Loader></Loader>
                ) : posts.length > 0 ? (
                    posts?.map((post) => (
                        <Post
                            key={post._id}
                            id={post._id}
                            title={post.title}
                            description={post.description}
                            headerImageUrl={post.headerImageUrl}
                            username={post.username}
                            userId={post.userId}
                            catagories={post.catagories}
                            dateTimeStamp={post.updatedAt}
                        />
                    ))
                ) : (
                    <NoPost />
                )}
            </div>
            <div className="flex flex-col justify-start items-start space-x-2 md:space-x-4 md:w-[30%] w-full md:pl-8">
                <Profile id={params.profileId} />
            </div>
        </section>
    )
}

export default ProfilePage
