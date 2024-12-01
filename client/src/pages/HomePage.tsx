import React, { useContext, useEffect } from 'react'
import Post from '../components/generic/Post'
import { AppContext } from '../context/appContext'
import NoPost from '../components/generic/NoPost'
import Loader from '../components/generic/Loader'
import { AxiosError } from 'axios'
import { getAllPosts } from '../api/postApi'
import { ErrorType } from '../types/errorType'
import { useErrorBoundary } from 'react-error-boundary'
import SearchBox from '../components/generic/SearchBox'

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
        <section className="flex justify-center items-start w-full">
            <div className="flex flex-col gap-6 md:gap-8 w-full py-4 sm:py-8 px-4 sm:px-8 lg:w-[90%] min-[1400px]:w-[1240px]">
                <div className="block md:hidden w-[240px]">
                    <SearchBox />
                </div>
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
                    <div className="flex justify-center items-center">
                        <NoPost
                            title="No Posts Found!"
                            steps={[
                                'Ensure all words are spelled correctly.',
                                'Try using different keywords.',
                                'Consider using broader or more general terms.',
                            ]}
                        />
                    </div>
                )}
            </div>
        </section>
    )
}

export default HomePage
