import React, { useContext, useEffect, useState } from 'react'
import ProfileSection from '../components/ProfileSection'
import { useLocation, useParams } from 'react-router-dom'
import { AppContext } from '../context/appContext'
import { AxiosError } from 'axios'
import Loader from '../components/generic/Loader'
import Post from '../components/generic/Post'
import NoPost from '../components/generic/NoPost'
import { PostType } from '../types/postType'
import { ErrorType } from '../types/errorType'
import { getUsersPosts } from '../api/postApi'

const ProfilePage: React.FC = () => {
    const [posts, setPosts] = useState<PostType[]>([])
    const { user } = useContext(AppContext)

    const params = useParams()
    const location = useLocation()
    const username = location.state

    const getUserPost = async (id: string) => {
        try {
            const response = await getUsersPosts(id)
            response && setPosts(response)
        } catch (e) {
            const error = e as AxiosError<ErrorType>
            console.log(error)
        }
    }

    useEffect(() => {
        params.profileId && getUserPost(params.profileId)
    }, [params.profileId])

    if (posts === undefined || posts === null) {
        return (
            <div className="w-full flex flex-grow">
                <Loader></Loader>
            </div>
        )
    }

    return (
        <section className="flex justify-center items-start w-full">
            <div className="flex flex-col-reverse items-start lg:flex-row lg:gap-4 py-8 px-4 sm:px-8 w-full lg:w-[90%] min-[1400px]:w-[1240px]">
                <div className="flex flex-col w-full lg:w-[75%] mt-4 sm:mt-8 lg:mt-0 gap-6 md:gap-8">
                    <h1 className="text-xl font-extrabold">{`${
                        params.profileId === user?.id ? 'Your' : `${username}'s`
                    } posts:`}</h1>
                    {posts.length > 0 ? (
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
                            <NoPost title="This user hasn't posted anything yet." />
                        </div>
                    )}
                </div>
                <div className="flex flex-col justify-start items-start space-x-2 md:space-x-4 lg:w-[25%] w-full lg:pl-4">
                    <ProfileSection id={params.profileId} />
                </div>
            </div>
        </section>
    )
}

export const Component = ProfilePage

export default ProfilePage
