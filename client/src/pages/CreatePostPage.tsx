import React from 'react'
import { RxCross2 } from 'react-icons/rx'

const CreatePostPage: React.FC = () => {
    return (
        <div className="px-6 md:px-[200px] mt-8">
            <h1 className="font-bold text-xl md:text-2xl">Create a post</h1>
            <form className="w-full flex flex-col space-y-4 md:space-y-8 mt-4">
                <input type="text" placeholder="Enter post title" className="outline-none px-4 py-2" />
                <input type="file" className="px-4" />
                <div className="flex flex-col">
                    <div className="flex items-center space-x-4 md:space-x-8">
                        <input type="text" placeholder="Enter post categories" className="outline-none px-4 py-2" />
                        <div className="bg-black text-white px-4 py-2 font-semibold cursor-pointer">Add</div>
                    </div>
                </div>

                {/* categories */}
                <div className="flex px-4 mt-3">
                    <div className="flex justify-center items-center space-x-2 mr-4 bg-gray-200 px-2 py-1 rounded">
                        <p>Tech</p>
                        <p className="text-black p-1 cursor-pointer text-sm">
                            <RxCross2 />
                        </p>
                    </div>
                    <div className="flex justify-center items-center space-x-2 mr-4 bg-gray-200 px-2 py-1 rounded">
                        <p>Tech</p>
                        <p className="text-black p-1 cursor-pointer text-sm">
                            <RxCross2 />
                        </p>
                    </div>
                </div>
                <textarea
                    placeholder="Enter post description"
                    cols={30}
                    rows={15}
                    className="px-4 py-2 outline-none"
                ></textarea>
                <button className="bg-black text-white w-full md:w-[20%] mx-auto font-semibold px-4 py-2 text-lg md:text-xl">
                    Create
                </button>
            </form>
        </div>
    )
}

export default CreatePostPage
