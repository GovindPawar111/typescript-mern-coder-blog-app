import React, { useContext, useEffect } from 'react'
import Post from '../components/Post'
import { AppContext, PostResponse } from '../context/appContext'
import NoPost from '../components/NoPost'
import Loader from '../components/Loader'
import axios, { AxiosError } from 'axios'
import { apiBaseUrl } from '../config/url'

const HomePage: React.FC = () => {
    const { posts, setPosts } = useContext(AppContext)

    useEffect(() => {
        const getPosts = async () => {
            try {
                const response = await axios.get<PostResponse[]>(`${apiBaseUrl}/api/post`)
                setPosts(response.data)
            } catch (e) {
                const error = e as AxiosError
                console.log(error)
            }
        }
        getPosts()
    }, [])

    return (
        <div className="px-8 md:px-[200px] min-h-screen">
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
    )
}

export default HomePage
