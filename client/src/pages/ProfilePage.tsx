import React, { useContext } from 'react'
import ProfileSection from '../components/ProfileSection'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/appContext'
import Loader from '../components/generic/Loader'
import Post from '../components/generic/Post'
import NoPost from '../components/generic/NoPost'
import { useGetUsersPosts } from '../api/queries/postQueries'
import { useErrorBoundary } from 'react-error-boundary'
import ArrowBack from '../assets/svgs/arrow_back.svg?react'

const ProfilePage: React.FC = () => {
    const { user } = useContext(AppContext)

    const params = useParams()
    const location = useLocation()
    const { showBoundary } = useErrorBoundary()
    const navigate = useNavigate()
    const username = location.state

    if (!params.profileId) {
        return null
    }

    const {
        data: postsData,
        isError: postsIsError,
        error: postsError,
        isLoading: postsLoading,
    } = useGetUsersPosts(params.profileId)

    if (postsIsError) {
        showBoundary(postsError)
    }

    if (postsLoading || postsData === undefined) {
        return (
            <div className="w-full flex flex-grow">
                <Loader></Loader>
            </div>
        )
    }

    return (
        <section className="flex justify-center items-start w-full">
            <div className="flex flex-col-reverse items-start lg:flex-row lg:gap-4 py-8 px-4 sm:px-8 w-full lg:w-[90%] min-[1400px]:w-[1240px]">
                <div className="flex flex-col w-full lg:w-[82%] mt-4 sm:mt-8 lg:mt-0 gap-6 md:gap-8">
                    <div className="flex justify-start align-center gap-1">
                        <ArrowBack
                            className="cursor-pointer w-[32px] h-[24px] mt-[5px] hidden lg:block"
                            onClick={() => navigate(-1)}
                        />
                        <h1 className="text-xl font-extrabold">{`${
                            params.profileId === user?.id ? 'Your' : `${username}'s`
                        } posts:`}</h1>
                    </div>
                    {postsData.length > 0 ? (
                        postsData?.map((post) => <Post key={post._id} postData={post} />)
                    ) : (
                        <div className="flex justify-center items-center">
                            <NoPost title="This user hasn't posted anything yet." />
                        </div>
                    )}
                </div>
                <div className="flex flex-col justify-start items-start space-x-2 md:space-x-4 lg:w-[18%] w-full">
                    <ProfileSection id={params.profileId} />
                </div>
            </div>
        </section>
    )
}

export const Component = ProfilePage

export default ProfilePage
