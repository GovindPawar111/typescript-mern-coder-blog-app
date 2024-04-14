import { UserSchema } from '../types/userType'
import { apiClient } from './apiClient'

export const loginUser = async (email: string, password: string) => {
    const response = await apiClient.post('/auth/login', { email, password }, { withCredentials: true })
    return UserSchema.parse(response.data)
}

export const registerUser = async (username: string, email: string, password: string) => {
    const response = await apiClient.post('/auth/register', { username, email, password }, { withCredentials: true })
    return UserSchema.parse(response.data)
}

export const refetchUserDetails = async () => {
    const response = await apiClient.get('/auth/refetch', { withCredentials: true })
    return UserSchema.parse(response.data)
}

export const logoutUser = async () => {
    await apiClient.get('/auth/logout', { withCredentials: true })
}
