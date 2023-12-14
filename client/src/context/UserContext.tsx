import axios, { AxiosError } from 'axios'
import { ReactNode, createContext, useEffect, useState } from 'react'
import { errorResponse } from '../pages/LoginPage'
import { apiBaseUrl } from '../config/url'

type user = {
    username: string
    email: string
    id: string
}

export type userContextType = {
    user: user | null
    setUser: React.Dispatch<React.SetStateAction<user | null>>
}

export const UserContext = createContext<userContextType>({ user: null, setUser: () => {} })

type UserContextProviderProps = {
    children: ReactNode
}

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
    const [user, setUser] = useState<user | null>(null)

    const refetchUser = async () => {
        try {
            const response = await axios.get<user>(`${apiBaseUrl}/api/auth/refetch`, { withCredentials: true })
            setUser(response.data)
        } catch (e) {
            const error = e as AxiosError<errorResponse>
            console.error(error.response?.data.message)
        }
    }

    useEffect(() => {
        refetchUser()
    }, [])

    return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
}
