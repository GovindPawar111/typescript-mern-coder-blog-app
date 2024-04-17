import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/appContext'
import UserIcon from '../assets/svgs/user.svg?react'
import CakeIcon from '../assets/svgs/cake.svg?react'
import { getFormattedDate } from '../utils/formattedDateTime'
import { getUserWithId } from '../api/userApi'

interface IProfileSectionProps {
    id?: string
}

const ProfileSection: React.FC<IProfileSectionProps> = ({ id }: IProfileSectionProps) => {
    const { user } = useContext(AppContext)
    const [userProfile, setUserProfile] = useState<{
        username: string
        createdAt: string
    }>({ username: '', createdAt: '' })

    if (!id && user && user.createdAt) {
        setUserProfile({
            username: user.username,
            createdAt: user.createdAt,
        })
    }

    const userDetails = async (id: string) => {
        try {
            const response = await getUserWithId(id)

            if (response && response.createdAt) {
                setUserProfile({
                    username: response.username,
                    createdAt: response.createdAt,
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (id) {
            userDetails(id)
        }
    }, [id])

    return (
        <div className="flex flex-col">
            <h1 className="text-xl font-bold mb-8 md:mb-6">Profile</h1>

            <div className="flex items-center text-gray-800 mb-4">
                <div>
                    <UserIcon className="text-xl" />
                </div>
                <h2 className="text-lg font-bold flex ml-2">{userProfile.username}</h2>
            </div>
            <div className="flex items-center text-gray-500">
                <div>
                    <CakeIcon className="text-xl" />
                </div>
                <h2 className="text-lg font-medium ml-2">{`Joined on ${getFormattedDate(userProfile.createdAt)}`}</h2>
            </div>
        </div>
    )
}

export default ProfileSection
