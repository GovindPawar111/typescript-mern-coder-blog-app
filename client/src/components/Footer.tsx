import React from 'react'

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear()
    return (
        <footer className="w-full bg-black text-white py-6 px-8 md:py-6 md:px-[200px] mt-auto">
            <p className=" text-center">
                <span>Made with ❤️ by Govind</span>
                <span> | All right reserved &#169;</span>
                <span>{` CoderBlog ${currentYear}`}</span>
            </p>
        </footer>
    )
}

export default Footer
