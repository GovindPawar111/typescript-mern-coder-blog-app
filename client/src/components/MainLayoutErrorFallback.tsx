import { useNavigate } from 'react-router-dom'

interface IMainLayoutErrorFallbackProps {
    error: Error
    resetErrorBoundary: () => void
}

export const MainLayoutErrorFallback = ({ error, resetErrorBoundary }: IMainLayoutErrorFallbackProps) => {
    const navigate = useNavigate()

    return (
        <div className="w-full min-h-full flex justify-center items-center">
            <div className="flex flex-col">
                <h2 className="text-black font-extrabold text-2xl capitalize">Something went wrong</h2>
                <p className="text-black py-4">{error.message}</p>
                <div className="flex">
                    <button className="bg-black text-white px-3 py-1 mr-2 rounded-md" onClick={resetErrorBoundary}>
                        Try again
                    </button>
                    <button
                        className="text-white bg-black px-3 py-1 mr-2 rounded-md"
                        onClick={() => {
                            resetErrorBoundary()
                            navigate('/')
                        }}
                    >
                        Back To Home
                    </button>
                </div>
            </div>
        </div>
    )
}

export default MainLayoutErrorFallback
