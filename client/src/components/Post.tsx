import React from 'react'
import { Link } from 'react-router-dom'
import placeholderImage from '../../public/images/placeholder-image.png'
export interface IPost {
    id: string
    title: string
    description: string
    headerImageUrl: string
    username: string
    userId: string
    catagories: string[]
    dateTimeStamp: string
}

export const getFormattedDate = (timestamp: string) => {
    const date: Date = new Date(timestamp)
    const formattedDate: string = date.toLocaleString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    } as Intl.DateTimeFormatOptions)
    return formattedDate
}

export const getFormattedTime = (timestamp: string) => {
    const date: Date = new Date(timestamp)
    const formattedDate: string = date.toLocaleString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    } as Intl.DateTimeFormatOptions)
    return formattedDate
}

const Post = ({
    id,
    title,
    description,
    headerImageUrl,
    username,
    userId,
    dateTimeStamp,
    catagories,
}: IPost): React.ReactElement => {
    return (
        <div className="flex mt-8 w-full space-x-2 md:space-x-4">
            {/* left side*/}
            <div className="w-[35%] h-[150px] flex justify-center items-center md:h-[200px]">
                <Link to={`/posts/${id}`} className="w-full h-full">
                    {headerImageUrl ? (
                        <img src={headerImageUrl} alt={title} className="w-full h-full object-cover cursor-pointer" />
                    ) : (
                        <img
                            src={placeholderImage}
                            alt={'placeholder-image'}
                            className="w-full h-full object-cover cursor-pointer"
                        />
                    )}
                </Link>
            </div>
            {/* right side*/}
            <div className="flex flex-col w-[65%]">
                <h1 className="text-xl font-bold mb-1 md:md-2 md:text-2xl line-clamp-2 ">
                    <Link to={`/posts/${id}`} className="cursor-pointer">
                        {title}
                    </Link>
                </h1>
                <p className="text-sm font-semibold text-gray-500 md:text-lg line-clamp-3 mb-1 md:mb-2">
                    <Link to={`/posts/${id}`} className="cursor-pointer">
                        {description}
                    </Link>
                </p>

                <div className="flex mb-1 font-semibold text-xs text-gray-500 text-center items-center justify-start md:mb-2">
                    <Link to={`/profile/${userId}`}>
                        <span className="cursor-pointer text-black">@{username}</span>
                    </Link>
                    <span className="px-1">·</span>
                    <span>{getFormattedDate(dateTimeStamp)}</span>
                    <span className="px-1">·</span>
                    <span className="p-2 rounded-full bg-gray-200">{catagories[0]}</span>
                </div>
            </div>
        </div>
    )
}

export default Post
