import React from 'react'
import { useLocation } from 'react-router-dom'

const NoPost: React.FC = () => {
    const location = useLocation()
    console.log()

    return (
        <div className="flex flex-col mt-8 w-full space-x-2 md:space-x-4 justify-center items-center">
            <h2 className="text-3xl text-black font-bold text-center mb-8">Posts not found!!!</h2>
            <div className="text-lg text-black font-Semibold text-start">
                <p className="mb-1">Make sure all words are spelled correctly.</p>
                <p className="mb-1">Try different keywords.</p>
                <p className="mb-1">Try more general keywords.</p>
            </div>
        </div>
    )
}

export default NoPost
