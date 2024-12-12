import React from 'react'
import Post from '../components/generic/Post'
import NoPost from '../components/generic/NoPost'
import Loader from '../components/generic/Loader'
import { useErrorBoundary } from 'react-error-boundary'
import SearchBox from '../components/generic/SearchBox'
import { useGetAllSearchedPosts } from '../api/queries/postQueries'
import { useUserContext } from '../context/appContext'

const HomePage: React.FC = () => {
    const { search } = useUserContext()
    const { showBoundary } = useErrorBoundary()
    const {
        data: postsData,
        isError: postsIsError,
        error: postsError,
        isLoading: postsLoading,
    } = useGetAllSearchedPosts(search)

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
            <div className="flex flex-col gap-6 md:gap-8 w-full py-4 sm:py-8 px-4 sm:px-8 lg:w-[90%] min-[1400px]:w-[1240px]">
                <div className="block md:hidden w-[240px]">
                    <SearchBox />
                </div>
                {postsData.length > 0 ? (
                    postsData.map((post) => <Post key={post._id} postData={post} />)
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
