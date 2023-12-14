import React from 'react'
import { BiEdit } from 'react-icons/bi'
import { MdDelete } from 'react-icons/md'

const Comment: React.FC = () => {
    return (
        <div className="flex flex-col mt-8">
            <h3 className="mt-8 mb-4 font-semibold">Comments:</h3>
            {/* commentbox */}
            <div className="py-2 px-2 rounded-lg bg-gray-200 my-2">
                <div className="flex items-center justify-between">
                    <h3 className="font-bold text-gray-600">@govindDev</h3>
                    <div className="flex justify-center items-center space-x-4">
                        <p className="text-gray-500 text-sm">16/02/2022</p>
                        <p className="text-gray-500 text-sm">16:45</p>
                        <div className="flex items-center justify-center space-x-2">
                            <p>
                                <BiEdit />
                            </p>
                            <p>
                                <MdDelete />
                            </p>
                        </div>
                    </div>
                </div>

                <p className="px-4 mt-2">Nice Information!!</p>
            </div>

            <div className="py-2 px-2 rounded-lg bg-gray-200 my-2">
                <div className="flex items-center justify-between">
                    <h3 className="font-bold text-gray-600">@govindDev</h3>
                    <div className="flex justify-center items-center space-x-4">
                        <p className="text-gray-500 text-sm">16/02/2022</p>
                        <p className="text-gray-500 text-sm">16:45</p>
                        <div className="flex items-center justify-center space-x-2">
                            <p>
                                <BiEdit />
                            </p>
                            <p>
                                <MdDelete />
                            </p>
                        </div>
                    </div>
                </div>

                <p className="px-4 mt-2">Nice Information!!</p>
            </div>
        </div>
    )
}

export default Comment
