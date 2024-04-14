export const AppErrorFallback = () => {
    return (
        <div className="w-full min-h-screen flex justify-center items-center">
            <div className="flex flex-col">
                <h2 className="text-black font-extrabold text-2xl capitalize">Oops, Something went wrong</h2>
                <p className="text-black py-4">Server Error 500, Please try again after some time.</p>
            </div>
        </div>
    )
}

export default AppErrorFallback
