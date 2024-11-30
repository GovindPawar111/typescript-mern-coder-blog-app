import React from 'react'
import Button from './Button'

interface IModelProps {
    headerText: string
    description: string
    onClose: () => void
    onAction: () => void
    actionLabel?: string
    cancelLabel?: string
}

const Model = ({
    headerText,
    description,
    onClose,
    onAction,
    actionLabel,
    cancelLabel,
}: IModelProps): React.ReactElement | null => {
    return (
        <div className="flex flex-col">
            <h2 className="text-black font-extrabold text-2xl capitalize">{headerText}</h2>
            <p className="text-black py-4">{description}</p>
            <div className="self-end">
                <Button label={cancelLabel ? cancelLabel : 'Cancel'} className="ml-2" onClick={onClose} />
                <Button
                    label={actionLabel ? actionLabel : 'Continue'}
                    className="ml-2"
                    onClick={() => {
                        // after performing an action it will close a model
                        onAction()
                        onClose()
                    }}
                />
            </div>
        </div>
    )
}

export default Model
