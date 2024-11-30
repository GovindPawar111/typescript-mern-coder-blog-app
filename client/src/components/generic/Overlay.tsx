import React, { ReactNode, useEffect } from 'react'
import { createPortal } from 'react-dom'

interface IOverlayProps {
    isOpen: boolean
    onClose: () => void
    children: ReactNode
}

const Overlay = ({ isOpen, onClose, children }: IOverlayProps): React.ReactElement | null => {
    useEffect(() => {
        isOpen && (document.body.style.overflow = 'hidden')
        !isOpen && (document.body.style.overflow = 'auto')
    }, [isOpen])

    if (!isOpen) return null

    return createPortal(
        <>
            <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white p-8 rounded-lg z-20 shadow-xl text-black w-[30%]">
                {children}
            </div>
            <div
                className="bg-opacity-30 bg-black backdrop-blur-sm fixed top-0 left-0 w-full h-full z-10"
                onClick={() => {
                    onClose()
                }}
            ></div>
        </>,
        document.getElementById('overlay') as Element
    )
}

export default Overlay
