import React from 'react'

const Footer: React.FC = () => {
    return (
        <div className="w-full bg-black mt-8  text-white py-6 px-8 md:py-6 md:px-[200px]">
            <div className="w-full  flex justify-between items-center">
                <div className="flex flex-col">
                    <p>Featured Blogs</p>
                    <p>Most Viewed</p>
                    <p>Reader's choice</p>
                </div>
                <div className="flex flex-col">
                    <p>Forum</p>
                    <p>Support</p>
                    <p>Recent Post</p>
                </div>
                <div className="flex flex-col">
                    <p>Privacy Policy</p>
                    <p>About Us</p>
                    <p>Terms & Conditions</p>
                </div>
            </div>
            <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />
            <p className=" text-center">All right reserved @CoderBlog 2023</p>
        </div>
    )
}

export default Footer
