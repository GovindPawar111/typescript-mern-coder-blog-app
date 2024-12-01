import { useNavigate } from 'react-router-dom'
import Button from './generic/Button'

interface IMainLayoutErrorFallbackProps {
    error: Error
    resetErrorBoundary: () => void
}

export const MainLayoutErrorFallback = ({ error, resetErrorBoundary }: IMainLayoutErrorFallbackProps) => {
    const navigate = useNavigate()

    return (
        <div className="w-full flex h-[calc(100vh-64px)] justify-center items-center p-4">
            <div className="flex flex-col">
                <h2 className="text-black font-semibold text-3xl capitalize">Something went wrong</h2>
                <p className="text-black py-4">{error.message}</p>
                <div className="flex">
                    <Button label={'Try again'} className="mr-2 w-[140px]" onClick={() => resetErrorBoundary()} />
                    <Button
                        label={'Back to home'}
                        className="w-[140px]"
                        onClick={() => {
                            resetErrorBoundary()
                            navigate('/')
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default MainLayoutErrorFallback
