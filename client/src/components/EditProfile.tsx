import React, { useContext } from 'react'
import { AppContext } from '../context/appContext'
import { getFormattedDate } from './Post'

interface IProfileProps {
    id?: string
}

const Profile: React.FC<IProfileProps> = ({ id }: IProfileProps) => {
    const { user } = useContext(AppContext)

    return (
        <div className="flex flex-col space-y-4">
            <h1 className="text-xl font-bold mb-4 md:mt-6">Profile</h1>
            {user && user.createdAt && (
                <>
                    <h2>{user.username}</h2>
                    <p>{`joined on ${getFormattedDate(user.createdAt)}`}</p>
                </>
            )}
        </div>
    )
}

export default Profile
