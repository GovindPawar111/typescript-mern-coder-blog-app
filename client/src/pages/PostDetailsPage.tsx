import React from 'react'
import { BiEdit } from 'react-icons/bi'
import { MdDelete } from 'react-icons/md'
import Comment from '../components/Comment'

const PostDetailsPage: React.FC = () => {
    return (
        <div className="px-8 md:px-[200px] mt-8">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-black md:text-3xl">
                    What’s new in Flutter 3.16 in current industry.
                </h1>
                <div className="flex items-center justify-center space-x-2">
                    <p>
                        <BiEdit />
                    </p>
                    <p>
                        <MdDelete />
                    </p>
                </div>
            </div>
            <div className="flex justify-between items-center mt-2 md:mt-4">
                <p>@govindDev</p>
                <div className="flex space-x-2">
                    <p>16/02/2022</p>
                    <p>16:45</p>
                </div>
            </div>
            <img
                src={'https://miro.medium.com/v2/resize:fit:1100/format:webp/1*TDndNB8cS95g5faXBKitHA.png'}
                alt=""
                className="w-full mx-auto mt-8"
            />
            <p className="mx-auto mt8"></p>
            <div className="flex items-center mt-8 space-x-4 font-semibold">
                <p>Categories:</p>
                <div className="flex justify-center items-center space-x-2">
                    <div className="bg-gray-300 rounded-lg px-3 py-1 ">Tech</div>
                    <div className="bg-gray-300 rounded-lg px-3 py-1 ">AI</div>
                </div>
            </div>
            {/* comments */}
            <Comment />

            {/* write a comment */}
            <div className="w-full flex flex-col md:flex-row mt-4">
                <input
                    type="text"
                    placeholder="Write a comment"
                    className="w-[80%] outline-none px-4 py-2 mt-4 md:mt-0"
                />
                <button className="bg-black text-white px-4 py-2 mt-4 md:mt-0  md:w-[20%]">Add comment</button>
            </div>
        </div>
    )
}

export default PostDetailsPage
