import React from 'react'
import { Link } from 'react-router-dom'

const AuthNavbar: React.FC = () => {
    return (
        <nav className="flex justify-between items-center px-6 md:px-[200px] py-4 sticky top-0 bg-white border-b shadow-lg">
            <Link to={'/'}>
                <h1 className="font-extrabold text-2xl flex justify-center items-center">CoderBlog</h1>
            </Link>
        </nav>
    )
}

export default AuthNavbar
