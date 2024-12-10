import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'
import { ErrorType } from '../types/errorType'
import Button from '../components/generic/Button'
import useNotification, { ToastType } from '../hooks/useNotification'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { RegisterFormSchema, RegisterFormType } from '../types/registerFormType'
import { useRegisterUser } from '../api/queries/authQueries'

const RegisterPage = (): React.ReactElement => {
    const { createNotification } = useNotification()
    const { mutate: registerMutation } = useRegisterUser()

    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<RegisterFormType>({
        defaultValues: {},
        resolver: zodResolver(RegisterFormSchema),
    })

    const formSubmit = async ({ username, email, password }: RegisterFormType): Promise<void> => {
        registerMutation(
            { username, email, password },
            {
                onSuccess() {
                    createNotification('Registration Successful', ToastType.Success)
                    navigate('/login')
                },
                onError: (error) => {
                    setError('root', {
                        message: error.response?.data.message || 'Something went wrong, please try after sometime.',
                    })
                    createNotification('Registration Failed', ToastType.Error)
                },
            }
        )
    }

    return (
        <section className="w-full flex justify-center items-center h-[70vh] bg-white">
            <div className="flex  flex-col justify-center items-center  w-[80%] sm:w-[500px]">
                <h1 className="text-xl font-bold text-left">Create an account</h1>
                <form noValidate onSubmit={handleSubmit(formSubmit)} className="flex flex-col w-full">
                    <input
                        type="text"
                        placeholder="Enter your username"
                        className="w-full px-4 py-2 border-2 border-black outline-0 mt-4"
                        {...register('username')}
                    />
                    {errors.username && (
                        <label htmlFor="username" className="text-red-500 text-xs">
                            {errors.username.message}
                        </label>
                    )}
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full px-4 py-2 border-2 border-black outline-0 mt-4"
                        {...register('email')}
                    />
                    {errors.email && (
                        <label htmlFor="email" className="text-red-500 text-xs">
                            {errors.email.message}
                        </label>
                    )}
                    <input
                        type="password"
                        placeholder="Enter your password"
                        className="w-full px-4 py-2 border-2 border-black outline-0 mt-4"
                        {...register('password')}
                    />
                    {errors.password && (
                        <label htmlFor="password" className="text-red-500 text-xs">
                            {errors.password.message}
                        </label>
                    )}
                    <Button
                        label={'Register'}
                        type="submit"
                        className="w-full py-3 text-lg font-bold rounded-lg hover:bg-gray-500 hover:text-black mt-4"
                    />
                </form>
                {errors.root && <p className="text-red-600 text-xs mt-2">{errors.root.message}</p>}
                <div className="flex justify-center items-center space-x-3 mt-2">
                    <p>Already have an account?</p>
                    <p className="text-gray-500 hover:text-black hover:underline">
                        <Link to="/login">Log in</Link>
                    </p>
                </div>
            </div>
        </section>
    )
}

export const Component = RegisterPage

export default RegisterPage
