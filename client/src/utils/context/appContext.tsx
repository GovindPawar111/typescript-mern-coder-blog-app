import axios, { AxiosError } from 'axios'
import { ReactNode, createContext, useEffect, useState } from 'react'
import { apiBaseUrl } from '../config/url'
import { UserType } from '../types/userType'
import { PostType } from '../types/postType'
import { ErrorType } from '../types/errorType'

export type appContextType = {
    user: UserType | null
    posts: PostType[] | null
    setUser: React.Dispatch<React.SetStateAction<UserType | null>>
    setPosts: React.Dispatch<React.SetStateAction<PostType[] | null>>
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
    const [user, setUser] = useState<UserType | null>(null)
    const [posts, setPosts] = useState<PostType[] | null>(null)

    // check whether token is present or not, If it is then refetch the data.
    const refetchUser = async () => {
        try {
            if (!document.cookie.indexOf('token=')) {
                const response = await axios.get<UserType>(`${apiBaseUrl}/api/auth/refetch`, {
                    withCredentials: true,
                })
                setUser(response.data)
            }
        } catch (e) {
            const error = e as AxiosError<ErrorType>
            console.error(error.response?.data.message)
        }
    }

    useEffect(() => {
        refetchUser()
    }, [])

    return <AppContext.Provider value={{ user, posts, setUser, setPosts }}>{children}</AppContext.Provider>
}
