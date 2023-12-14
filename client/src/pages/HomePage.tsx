import React from 'react'
import Post from '../components/Post'

const HomePage: React.FC = () => {
    return (
        <div className="px-8 md:px-[200px] h-full">
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
        </div>
    )
}

export default HomePage
