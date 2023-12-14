import React from 'react'

const Profile: React.FC = () => {
    return (
        <div className="flex flex-col space-y-4">
            <h1 className="text-xl font-bold mb-4 md:mt-6">Profile</h1>
            <input
                type="text"
                placeholder="Your name"
                className=" px-4 py-2 text-gray-500 border-2 focus:border-black "
            />
            <input
                type="email"
                placeholder="Your email"
                className=" px-4 py-2 text-gray-500 border-2 focus:border-black"
            />
            <input
                type="password"
                placeholder="Your password"
                className="outline-none px-4 py-2 text-gray-500 border-2 focus:border-black"
            />
            <div className="flex items-center space-x-4 mt-8">
                <button className="text-white bg-black font-semibold px-4 py-2 hover:text-black hover:bg-gray-400">
                    Update
                </button>
                <button className="text-white bg-black font-semibold px-4 py-2 hover:text-black hover:bg-gray-400">
                    Delete
                </button>
            </div>
        </div>
    )
}

export default Profile
