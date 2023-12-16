import React from 'react'
export interface IPost {
    title: string
    description: string
    photo: string
    username: string
    catagories: string[]
    dateTimeStamp: string
}

const getFormattedDate = (timestamp: string) => {
    const date: Date = new Date(timestamp)
    const formattedDate: string = date.toLocaleString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    } as Intl.DateTimeFormatOptions)
    return formattedDate
}

// const getFormattedTime = (timestamp: string) => {
//     const date: Date = new Date(timestamp)
//     const formattedDate: string = date.toLocaleString('en-US', {
//         hour: 'numeric',
//         minute: '2-digit',
//         hour12: true,
//     } as Intl.DateTimeFormatOptions)
//     return formattedDate
// }

const Post = ({ title, description, photo, username, dateTimeStamp, catagories }: IPost): React.ReactElement => {
    // console.log(catagories[0], catagories)
    return (
        <div className="flex mt-8 w-full space-x-2 md:space-x-4">
            {/* left side*/}
            <div className="w-[35%] h-[150px] flex justify-center items-center md:h-[200px]">
                <img src={photo} alt="" className="w-full h-full object-cover cursor-pointer" />
            </div>
            {/* right side*/}
            <div className="flex flex-col w-[65%]">
                <h1 className="text-xl font-bold mb-1 md:md-2 md:text-2xl line-clamp-2 cursor-pointer">{title}</h1>
                <p className="text-sm font-semibold text-gray-500 md:text-lg line-clamp-3 mb-1 md:mb-2 cursor-pointer">
                    {description}
                </p>
                <div className="flex mb-1 font-semibold text-xs text-gray-500 text-center items-center justify-start md:mb-2">
                    <span className="cursor-pointer text-black">@{username}</span>
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
