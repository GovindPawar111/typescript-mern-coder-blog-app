import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useUserContext } from '../context/appContext'
import Button from '../components/generic/Button'
import useNotification, { ToastType } from '../hooks/useNotification'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginFormSchema, LoginFormType } from '../types/loginFormType'
import { useLoginUser } from '../api/queries/authQueries'
import { useAnonymousLogin } from '../hooks/useAnonymousLogin'

const LoginPage: React.FC = () => {
    const navigate = useNavigate()
    const { setUser } = useUserContext()
    const { createNotification } = useNotification()

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<LoginFormType>({
        defaultValues: {},
        resolver: zodResolver(LoginFormSchema),
    })

    const { mutate: loginMutation } = useLoginUser()

    const formSubmit = async ({ email, password }: LoginFormType) => {
        loginMutation(
            { email, password },
            {
                onSuccess(response) {
                    setUser({
                        id: response.id,
                        username: response.username,
                        email: response.email,
                        createdAt: response.createdAt,
                        updatedAt: response.updatedAt,
                    })
                    createNotification('Login Successful', ToastType.Success)
                    navigate('/')
                    sessionStorage.setItem('user', JSON.stringify({ id: response.id, name: response.username }))
                },
                onError: (error) => {
                    setError('root', {
                        message: error.response?.data.message || 'Something went wrong, please try after sometime.',
                    })
                    createNotification('Login Failed', ToastType.Error)
                },
            }
        )
    }

    const anonymousLogin = useAnonymousLogin(
        (response) => {
            setUser({
                id: response.id,
                username: response.username,
                email: response.email,
                createdAt: response.createdAt,
                updatedAt: response.updatedAt,
                isAnonymous: true,
            })
            createNotification('Login Successful as Guest', ToastType.Success)
            navigate('/')
            sessionStorage.setItem('user', JSON.stringify({ id: response.id, name: response.username }))
        },
        () => {
            createNotification('Failed to login as Guest', ToastType.Error)
        }
    )

    return (
        <section className="w-full flex justify-center items-center h-[70vh] bg-white">
            <div className="flex flex-col justify-center items-center w-[80%] sm:w-[500px]">
                <h1 className="text-xl font-bold text-left">Log in to your account</h1>
                <form noValidate onSubmit={handleSubmit(formSubmit)} className="flex flex-col w-full mt-4">
                    <input
                        type="email"
                        {...register('email')}
                        placeholder="Enter your email"
                        className="w-full px-4 py-2 border-2 border-black outline-0"
                    />
                    {errors.email && (
                        <label htmlFor="email" className="text-red-500 text-xs">
                            {errors.email.message}
                        </label>
                    )}
                    <input
                        type="password"
                        {...register('password')}
                        placeholder="Enter your password"
                        className="w-full px-4 py-2 border-2 border-black outline-0 mt-4"
                    />
                    {errors.password && (
                        <label htmlFor="password" className="text-red-500 text-xs">
                            {errors.password.message}
                        </label>
                    )}
                    <Button
                        type="submit"
                        label={'Log in'}
                        className="w-full py-3 text-lg font-bold rounded-lg hover:bg-gray-500 hover:text-black mt-4"
                    />
                </form>
                {errors.root && <p className="text-red-600 text-xs mt-2">{errors.root.message}</p>}
                <div className="flex justify-center items-center space-x-2 mt-1">
                    <p>New here?</p>
                    <p className="text-gray-500 hover:text-black hover:underline">
                        <Link to="/register">Register</Link>
                    </p>
                    <p>or</p>
                    <p className="text-gray-500 hover:text-black hover:underline" onClick={anonymousLogin}>
                        Login as Guest
                    </p>
                </div>
            </div>
        </section>
    )
}

export const Component = LoginPage

export default LoginPage
