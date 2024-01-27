import React from 'react'

interface IModelProps {
    headerText: string
    description: string
    onCancel: () => void
    onAction: () => void
    actionLabel?: string
    cancelLabel?: string
}

const Model = ({
    headerText,
    description,
    onCancel,
    onAction,
    actionLabel,
    cancelLabel,
}: IModelProps): React.ReactElement | null => {
    return (
        <div className="flex flex-col">
            <h2 className="text-black font-extrabold text-2xl capitalize">{headerText}</h2>
            <p className="text-black py-4">{description}</p>
            <div className="self-end">
                <button className="bg-black text-white px-4 py-2 ml-2 rounded-md" onClick={onCancel}>
                    {cancelLabel ? cancelLabel : 'Cancel'}
                </button>
                <button className="text-white bg-black px-4 py-2 ml-2 rounded-md" onClick={onAction}>
                    {actionLabel ? actionLabel : 'Continue'}
                </button>
            </div>
        </div>
    )
}

export default Model
