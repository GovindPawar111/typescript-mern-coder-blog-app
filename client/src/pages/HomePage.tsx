import React, { useContext, useEffect } from 'react'
import Post from '../components/Post'
import { AppContext } from '../utils/context/appContext'
import NoPost from '../components/NoPost'
import Loader from '../components/Loader'
import { AxiosError } from 'axios'
import { getAllPosts } from '../utils/api/postApi'
import { ErrorType } from '../utils/types/errorType'
import { useErrorBoundary } from 'react-error-boundary'

const HomePage: React.FC = () => {
    const { posts, setPosts } = useContext(AppContext)
    const { showBoundary } = useErrorBoundary()

    useEffect(() => {
        const getPosts = async () => {
            try {
                const data = await getAllPosts()
                setPosts(data)
            } catch (e) {
                const error = e as AxiosError<ErrorType>
                console.log(error)
                showBoundary(error)
            }
        }
        getPosts()
    }, [])

    return (
        <section className="flex flex-col gap-8 md:mx-[160px] w-[100wh] md:px-8 bg-white shadow-md flex-grow">
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
        </section>
    )
}

export default HomePage
