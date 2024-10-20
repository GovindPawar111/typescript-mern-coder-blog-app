import { useNavigate } from 'react-router-dom'
import Button from './button'

interface IMainLayoutErrorFallbackProps {
    error: Error
    resetErrorBoundary: () => void
}

export const MainLayoutErrorFallback = ({ error, resetErrorBoundary }: IMainLayoutErrorFallbackProps) => {
    const navigate = useNavigate()

    return (
        <div className="w-full min-h-full flex justify-center items-center">
            <div className="flex flex-col">
                <h2 className="text-black font-semibold text-3xl capitalize">Something went wrong</h2>
                <p className="text-black py-4">{error.message}</p>
                <div className="flex">
                    <Button label={'Try again'} className="mr-2" onClick={() => resetErrorBoundary()} />
                    <Button
                        label={'Back to home'}
                        className="mr-2"
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
