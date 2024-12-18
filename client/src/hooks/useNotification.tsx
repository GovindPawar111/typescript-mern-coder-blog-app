import toast from 'react-hot-toast'
import CloseIcon from '../assets/svgs/close.svg?react'
import CheckIcon from '../assets/svgs/check.svg?react'
import InfoIcon from '../assets/svgs/info.svg?react'

export enum ToastType {
    Default = 'default',
    Info = 'info',
    Success = 'success',
    Error = 'error',
    Loading = 'loading',
}

const useNotification = () => {
    const createNotification = (message: string, toastType: ToastType, duration: number = 3000) => {
        // set duration to 2 seconds if toast type is error
        duration = toastType === ToastType.Error ? 2000 : duration

        toast.custom(
            (t) => (
                <div
                    className={
                        'max-w-[20rem] w-full flex bg-white rounded-lg items-center shadow-md ring-1 ring-black ring-opacity-5 hover:scale-105 hover:shadow-lg hover:shadow-gray-200'
                    }
                >
                    <div className={'flex p-4 flex-grow justify-start gap-2 items-center'}>
                        <div className="flex justify-center items-center w-[20px]">
                            {toastType === ToastType.Success && (
                                <div className="animate-fadeIn animate-duration-1000 w-[18px] h-[18px] bg-green-400 rounded-full flex justify-center items-center">
                                    <CheckIcon className="w-[14px] h-[14px] text-white text-lg" />
                                </div>
                            )}
                            {toastType === ToastType.Error && (
                                <div className="animate-fadeIn animate-duration-1000 w-[18px] h-[18px] bg-red-500 rounded-full flex justify-center items-center">
                                    <CloseIcon className="w-[14px] h-[14px] text-white text-lg" />
                                </div>
                            )}
                            {toastType === ToastType.Info && (
                                <div className="animate-fadeIn animate-duration-1000 w-[18px] h-[18px] bg-blue-500 rounded-full flex justify-center items-center">
                                    <InfoIcon className="w-[14px] h-[14px] text-white text-lg" />
                                </div>
                            )}
                        </div>
                        <div className="flex items-start">
                            <p className="text-sm font-medium text-gray-900">{message}</p>
                        </div>
                    </div>
                    <div className={'flex border-l border-gray-200'}>
                        <button
                            onClick={() => toast.remove(t.id)}
                            className="w-full border-none rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium"
                        >
                            Close
                        </button>
                    </div>
                </div>
            ),
            { duration }
        )
    }

    return { createNotification }
}

export default useNotification
