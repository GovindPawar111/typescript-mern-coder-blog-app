import React from 'react'

interface IButtonProps {
    label: string
    onClick?: () => void
    className?: string
    type?: 'button' | 'submit' | 'reset'
}

const Button = ({ label, onClick, className, type = 'button' }: IButtonProps): React.ReactElement | null => {
    return (
        <button
            type={type}
            className={`text-white bg-black px-4 py-2 font-semibold cursor-pointer ${className}`}
            onClick={() => {
                onClick?.()
            }}
        >
            {label}
        </button>
    )
}

export default Button
