import { UserSchema } from '../types/userType'
import { apiClient } from './apiClient'

export const getUserWithId = async (userId: string) => {
    const response = await apiClient.get(`/user/${userId}`)
    return UserSchema.parse(response.data)
}
