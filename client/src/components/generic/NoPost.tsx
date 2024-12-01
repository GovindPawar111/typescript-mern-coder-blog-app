import React from 'react'

interface INoPost {
    title?: string
    steps?: string[]
}

const NoPost: React.FC<INoPost> = ({ title, steps }: INoPost) => {
    return (
        <div className="flex flex-col mt-4 justify-center items-start w-[360px]">
            <h2 className="text-xl text-black font-bold text-center mb-4">{title ? title : 'No Posts Found!'}</h2>
            {steps && (
                <div className="text-md text-black font-Semibold text-start">
                    {steps.map((step) => (
                        <p className="mb-1" key={`${step}-${Math.random()}-${Date.now()}`}>
                            {step}
                        </p>
                    ))}
                </div>
            )}
        </div>
    )
}

export default NoPost
