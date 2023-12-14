import React from 'react'

export interface IPost {

}

const Post: React.FC = () => {
    return (
        <div className="flex mt-8 w-full space-x-2 md:space-x-4">
            {/* left side*/}
            <div className="w-[35%] h-[150px] flex justify-center items-center md:h-[200px]">
                <img
                    src={'https://miro.medium.com/v2/resize:fit:1100/format:webp/1*TDndNB8cS95g5faXBKitHA.png'}
                    alt=""
                    className="w-full h-full object-cover"
                />
            </div>
            {/* right side*/}
            <div className="flex flex-col w-[65%] ">
                <h1 className="text-xl font-bold mb-1 md:md-2 md:text-2xl line-clamp-2">
                    What’s new in Flutter 3.16 in current industry. What’s new in Flutter 3.16 in current industry.
                    What’s new in Flutter 3.16 in current industry.
                </h1>
                <div className="flex mb-2 text-sm font-semibold text-gray-500 items-center justify-between md:mb-4">
                    <p>@govindDev</p>
                    <div className="flex space-x-2">
                        <p>16/02/2022</p>
                        <p>16:45</p>
                    </div>
                </div>
                <p className="text-sm md:text-lg line-clamp-3">
                    Welcome back to the quarterly Flutter stable release, this time for Flutter 3.16. This release sets
                    Material 3 as the new default theme, brings a preview of Impeller to Android, allows adding
                    extensions for DevTools, and much more! It also coincides with significant updates to the Flutter
                    Casual Games Toolkit! In only three months since our last release, we’ve had 928 pull requests
                    merged by 145 community members with 40 community members authoring their first commit to Flutter!
                </p>
            </div>
        </div>
    )
}

export default Post
