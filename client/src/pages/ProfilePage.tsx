import React from 'react'
import Post from '../components/Post'
import Profile from '../components/EditProfile'

const ProfilePage: React.FC = () => {
    return (
        <div className="px-8 md:px-[200px] mt-8 flex flex-col-reverse items-start md:flex-row md:gap-4">
            <div className="flex flex-col w-full md:w-[70%] mt-8 md:mt-0">
                <h1 className="text-xl font-bold mb-4">Your posts:</h1>
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
            </div>
            <div className="flex flex-col justify-start items-start space-x-2 md:space-x-4 md:w-[30%] w-full md:pl-8">
                <Profile />
            </div>
        </div>
    )
}

export default ProfilePage
