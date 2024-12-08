import React from 'react'
import { Link } from 'react-router-dom'
import placeholderImage from '../../assets/images/placeholder-image.png'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import { getFormattedDate } from '../../utils/formattedDateTime'

export interface IPostProps {
    id: string
    title: string
    description: string
    headerImageUrl: string
    username: string
    userId: string
    categories: string[]
    dateTimeStamp: string
}

const Post = ({
    id,
    title,
    description,
    headerImageUrl,
    username,
    userId,
    dateTimeStamp,
    categories,
}: IPostProps): React.ReactElement => {
    return (
        <div className="flex flex-col md:flex-row md:w-full md:space-x-6 lg:space-x-8">
            {/* left side*/}
            <div className="flex justify-center items-center w-full md:w-[35%] h-54 sm:h-72 md:h-[200PX] lg:h-[260px]">
                <Link
                    to={`/posts/${id}`}
                    className="w-full h-54 sm:h-72 md:h-full"
                    aria-label={title}
                    rel="noopener noreferrer"
                >
                    {headerImageUrl ? (
                        <LazyLoadImage
                            alt={title}
                            effect="blur"
                            className="w-full h-54 sm:h-72 md:h-full object-cover cursor-pointer rounded-sm"
                            height={'100%'}
                            width={'100%'}
                            src={headerImageUrl}
                            placeholderSrc={placeholderImage}
                            onErrorCapture={(e) => (e.currentTarget.src = placeholderImage)}
                        />
                    ) : (
                        <img
                            src={placeholderImage}
                            alt={'placeholder-image'}
                            className="w-full h-54 sm:h-72 md:h-full object-cover cursor-pointer rounded-sm"
                        />
                    )}
                </Link>
            </div>
            {/* right side*/}
            <div className="flex flex-col w-full md:w-[65%] p-4 sm:p-6 md:p-0">
                <h1 className="text-xl font-bold mb-4 lg:text-2xl line-clamp-2">
                    <Link to={`/posts/${id}`} className="cursor-pointer">
                        {title}
                    </Link>
                </h1>
                <p className="text-sm font-semibold text-gray-500 lg:text-lg line-clamp-3 mb-2 lg:mb-4">
                    <Link to={`/posts/${id}`} className="cursor-pointer">
                        {description}
                    </Link>
                </p>

                <div className="flex flex-col md:flex-row items-start md:items-center font-semibold text-xs text-gray-500 text-center justify-start md:mb-2">
                    <div className="flex mb-2 md:mb-0">
                        <Link to={`/profile/${userId}`} state={username}>
                            <div className=" cursor-pointer text-black hover:border-b-2 hover:border-black">
                                @{username}
                            </div>
                        </Link>
                        <div className="px-1">·</div>
                        <div>{getFormattedDate(dateTimeStamp)}</div>
                        <div className="px-1 hidden md:block">·</div>
                    </div>
                    <div className="flex">
                        {categories.map((category, index) => {
                            if (index === 3) {
                                return
                            }
                            return (
                                <div
                                    className="p-2 rounded-lg bg-gray-200 text-black mr-1"
                                    key={`${category}-${Math.random()}-${Date.now()}`}
                                >
                                    {category}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post
