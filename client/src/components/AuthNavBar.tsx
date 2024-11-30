import React from 'react'
import { Link } from 'react-router-dom'

const AuthNavbar: React.FC = () => {
    return (
        <nav className="flex justify-center items-center sticky bg-white border-b shadow-lg top-0 z-10 w-full">
            <div className="flex justify-between items-center py-4 px-4 sm:px-8 w-full lg:w-[90%] min-[1400px]:w-[1240px]">
                <Link to={'/'}>
                    <h1 className="font-extrabold text-2xl flex justify-center items-center">CoderBlog</h1>
                </Link>
            </div>
        </nav>
    )
}

export default AuthNavbar
