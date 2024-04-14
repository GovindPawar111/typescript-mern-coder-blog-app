import { AxiosError } from 'axios'
import { ReactNode, createContext, useEffect, useState } from 'react'
import { UserType } from '../types/userType'
import { PostType } from '../types/postType'
import { ErrorType } from '../types/errorType'
import { useErrorBoundary } from 'react-error-boundary'
import { refetchUserDetails } from '../api/authApi'

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
    const { showBoundary } = useErrorBoundary()

    // check whether token is present or not, If it is then refetch the data.
    const refetchUser = async () => {
        try {
            if (!document.cookie.indexOf('token=')) {
                const response = await refetchUserDetails()
                setUser(response)
            }
        } catch (e) {
            const error = e as AxiosError<ErrorType>
            console.error(error.response?.data.message)
            showBoundary(error)
        }
    }

    useEffect(() => {
        refetchUser()
    }, [])

    return <AppContext.Provider value={{ user, posts, setUser, setPosts }}>{children}</AppContext.Provider>
}
