import React from 'react'
import UserIcon from '../assets/svgs/user.svg?react'
import CakeIcon from '../assets/svgs/cake.svg?react'
import { getFormattedDate } from '../utils/formattedDateTime'
import { useErrorBoundary } from 'react-error-boundary'
import { useGetUserWithId } from '../api/queries/userQueries'
import Loader from './generic/Loader'

interface IProfileSectionProps {
    id: string
}

const ProfileSection: React.FC<IProfileSectionProps> = ({ id }: IProfileSectionProps) => {
    const { showBoundary } = useErrorBoundary()
    const { data: userData, isError: userIsError, error: userError, isLoading: userLoading } = useGetUserWithId(id)

    if (userIsError) {
        showBoundary(userError)
    }

    if (userLoading || userData === undefined) {
        return (
            <div className="w-full flex flex-grow">
                <Loader></Loader>
            </div>
        )
    }

    return (
        <div className="flex flex-col">
            <h1 className="text-xl font-bold mb-4 sm:mb-8 lg:mb-6">Profile</h1>
            <div className="flex items-center text-gray-800 mb-2 sm:mb-4">
                <div className="h-[24px] flex items-center justify-center">
                    <UserIcon className="text-xl block w-[18px] h-[18px]" />
                </div>
                <p className="text-lg font-bold flex ml-2">{userData.username}</p>
            </div>
            <div className="flex items-start text-gray-500 ">
                <div className="h-[24px] flex items-center justify-center">
                    <CakeIcon className="text-xl block w-[18px] h-[18px]" />
                </div>
                <p className="font-normal ml-2">{`Joined on ${getFormattedDate(userData.createdAt || '')}`}</p>
            </div>
        </div>
    )
}

export default ProfileSection
