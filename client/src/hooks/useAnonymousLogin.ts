import { AxiosError } from 'axios'
import { useAnonymousLoginUser } from '../api/queries/authQueries'
import { UserType } from '../types/userType'
import { ErrorType } from '../types/errorType'

export const useAnonymousLogin = (
    onSuccess: (data: UserType) => void,
    onError: (error: AxiosError<ErrorType>) => void
) => {
    const { mutate } = useAnonymousLoginUser()

    const anonymousLogin = () => {
        mutate(undefined, {
            onSuccess(data) {
                onSuccess(data)
            },
            onError(error) {
                onError(error)
            },
        })
    }

    return anonymousLogin
}
