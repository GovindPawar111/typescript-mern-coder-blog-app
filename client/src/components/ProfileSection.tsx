import React, { useContext, useEffect, useState } from 'react'
import { AppContext, UserResponse } from '../context/appContext'
import { getFormattedDate } from './Post'
import { FaRegUser } from 'react-icons/fa6'
import { LuCake } from 'react-icons/lu'
import axios from 'axios'
import { apiBaseUrl } from '../config/url'

interface IProfileSectionProps {
    id?: string
}

type userProfile = {
    username: string
    createdAt: string
}

const ProfileSection: React.FC<IProfileSectionProps> = ({ id }: IProfileSectionProps) => {
    const { user } = useContext(AppContext)
    const [userProfile, setUserProfile] = useState<userProfile>({ username: '', createdAt: '' })

    if (!id && user && user.createdAt) {
        setUserProfile({
            username: user.username,
            createdAt: user.createdAt,
        })
    }

    const userDetails = async (id: string) => {
        try {
            const response = await axios.get<UserResponse>(`${apiBaseUrl}/api/user/${id}`)

            if (response.data && response.data.createdAt) {
                setUserProfile({
                    username: response.data.username,
                    createdAt: response.data.createdAt,
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
                    <FaRegUser className="text-xl" />
                </div>
                <h2 className="text-lg font-bold flex ml-2">{userProfile.username}</h2>
            </div>
            <div className="flex items-center text-gray-500">
                <div>
                    <LuCake className="text-xl" />
                </div>
                <h2 className="text-lg font-medium ml-2">{`Joined on ${getFormattedDate(userProfile.createdAt)}`}</h2>
            </div>
        </div>
    )
}

export default ProfileSection
