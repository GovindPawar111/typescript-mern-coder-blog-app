import { useQuery } from '@tanstack/react-query'
import { getUserWithId } from '../userApi'
import { UserType } from '../../types/userType'

// Key constants for user queries
const USER_QUERY_KEY = 'User'

// Custom hook to get user with id
export const useGetUserWithId = (userId: string) => {
    return useQuery<UserType, Error>({ queryKey: [USER_QUERY_KEY, userId], queryFn: () => getUserWithId(userId) })
}
