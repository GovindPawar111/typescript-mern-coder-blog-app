import React, { useContext } from 'react'
import Post from '../components/Post'
import { AppContext } from '../context/appContext'
import NoPost from '../components/NoPost'
import Loader from '../components/Loader'

const HomePage: React.FC = () => {
    const { posts } = useContext(AppContext)

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
                        photo={post.photo}
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
