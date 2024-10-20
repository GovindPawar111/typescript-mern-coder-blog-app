import React from 'react'

interface INoPost {
    title?: string
    steps?: string[]
}

const NoPost: React.FC<INoPost> = ({ title, steps }: INoPost) => {
    return (
        <div className="flex flex-col mt-8 w-full space-x-2 md:space-x-4 justify-center items-center">
            <h2 className="text-3xl text-black font-bold text-center mb-8">{title ? title : 'Posts not found!'}</h2>
            {steps && (
                <div className="text-lg text-black font-Semibold text-start">
                    {steps.map((step) => (
                        <p className="mb-1">{step}</p>
                    ))}
                </div>
            )}
        </div>
    )
}

export default NoPost
