import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { useErrorBoundary } from 'react-error-boundary'
import { useRefetchUserDetails } from '../api/queries/authQueries'
import { UserType } from '../types/userType'

export type appContextType = {
    user: UserType | null
    setUser: React.Dispatch<React.SetStateAction<UserType | null>>
    search: string
    setSearch: React.Dispatch<React.SetStateAction<string>>
}

export const AppContext = createContext<appContextType>({
    user: null,
    search: '',
    setUser: () => {},
    setSearch: () => {},
})

type AppContextProviderProps = {
    children: ReactNode
}

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
    const [user, setUser] = useState<UserType | null>(null)
    const [search, setSearch] = useState<string>('')
    const { showBoundary } = useErrorBoundary()

    // check whether token is present or not, If it is then refetch the data.}
    const {
        data: userData,
        isError: userIsError,
        error: userError,
    } = useRefetchUserDetails(Boolean(sessionStorage.getItem('user')))

    if (userIsError) {
        showBoundary(userError)
    }

    useEffect(() => {
        if (userData) {
            setUser(userData)
        }
    }, [userData])

    return <AppContext.Provider value={{ user, search, setUser, setSearch }}>{children}</AppContext.Provider>
}

export const useUserContext = () => useContext(AppContext)
