import { useQuery, useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { UserType } from '../../types/userType'
import {
    anonymousLoginUser,
    emailVerification,
    loginUser,
    logoutUser,
    refetchUserDetails,
    registerUser,
} from '../authApi'
import { ErrorType } from '../../types/errorType'

// Key constants for auth queries
const AUTH_QUERY_KEY = 'auth'

// Custom hook to login a user
export const useLoginUser = () => {
    return useMutation<UserType, AxiosError<ErrorType>, { email: string; password: string }>({
        mutationFn: ({ email, password }) => loginUser(email, password),
        onError: (error) => {
            console.error(error.response?.data.message)
        },
    })
}

// Custom hook to register a user
export const useRegisterUser = () => {
    return useMutation<UserType, AxiosError<ErrorType>, { username: string; email: string; password: string }>({
        mutationFn: ({ username, email, password }) => registerUser(username, email, password),
        onError: (error) => {
            console.error(error.response?.data.message)
        },
    })
}

// Custom hook to register a user
export const useEmailVerification = () => {
    return useMutation<UserType, AxiosError<ErrorType>, { verificationToken: string }>({
        mutationFn: ({ verificationToken }) => emailVerification(verificationToken),
        onError: (error) => {
            console.error(error.response?.data.message)
        },
    })
}

// Custom hook to refetch user details
export const useRefetchUserDetails = (enable?: boolean) => {
    return useQuery<UserType, AxiosError<ErrorType>>({
        queryKey: [AUTH_QUERY_KEY],
        queryFn: refetchUserDetails,
        staleTime: 1000 * 60 * 10,
        enabled: enable,
    })
}

// Custom hook to logout a user
export const useLogoutUser = () => {
    return useMutation<UserType, AxiosError<ErrorType>>({
        mutationFn: logoutUser,
        onError: (error) => {
            console.error(error.response?.data.message)
        },
    })
}

// Custom hook to anonymous login a user
export const useAnonymousLoginUser = () => {
    return useMutation<UserType, AxiosError<ErrorType>>({
        mutationFn: anonymousLoginUser,
        onError: (error) => {
            console.error(error.response?.data.message)
        },
    })
}
