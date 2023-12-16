import axios, { AxiosError } from 'axios'
import { ReactNode, createContext, useEffect, useState } from 'react'
import { errorResponse } from '../pages/LoginPage'
import { apiBaseUrl } from '../config/url'

type UserResponse = {
    username: string
    email: string
    id: string
}
export interface PostResponse {
    _id: string
    title: string
    description: string
    photo: string
    catagories: string[]
    username: string
    userId: string
    createdAt: string
    updatedAt: string
}

export type appContextType = {
    user: UserResponse | null
    posts: PostResponse[] | null
    setUser: React.Dispatch<React.SetStateAction<UserResponse | null>>
    setPosts: React.Dispatch<React.SetStateAction<PostResponse[] | null>>
}

export const AppContext = createContext<appContextType>({
    user: null,
    posts: null,
    setUser: () => {},
    setPosts: () => {},
})

type AppContextProviderProps = {
    children: ReactNode
}

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
    const [user, setUser] = useState<UserResponse | null>(null)
    const [posts, setPosts] = useState<PostResponse[] | null>(null)

    // check whether token is present or not, If it is then refetch the data.
    const refetchUser = async () => {
        try {
            if (!document.cookie.indexOf('token=')) {
                const response = await axios.get<UserResponse>(`${apiBaseUrl}/api/auth/refetch`, {
                    withCredentials: true,
                })
                setUser(response.data)
            }
        } catch (e) {
            const error = e as AxiosError<errorResponse>
            console.error(error.response?.data.message)
        }
    }

    useEffect(() => {
        refetchUser()
    }, [])

    return <AppContext.Provider value={{ user, posts, setUser, setPosts }}>{children}</AppContext.Provider>
}
