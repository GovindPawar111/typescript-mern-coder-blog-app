import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/generic/Button'
import useNotification, { ToastType } from '../hooks/useNotification'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEmailVerification } from '../api/queries/authQueries'
import { EmailVerificationFormSchema, EmailVerificationFormType } from '../types/EmailVerificationFromType'

const EmailVerificationPage = (): React.ReactElement => {
    const { createNotification } = useNotification()
    const { mutate: emailVerificationMutation } = useEmailVerification()

    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<EmailVerificationFormType>({
        defaultValues: {},
        resolver: zodResolver(EmailVerificationFormSchema),
    })

    const formSubmit = async ({ verificationToken }: EmailVerificationFormType): Promise<void> => {
        emailVerificationMutation(
            { verificationToken },
            {
                onSuccess() {
                    createNotification('Successfully verified your email, you can now log in', ToastType.Success)
                    navigate('/login')
                },
                onError: (error) => {
                    setError('root', {
                        message: error.response?.data.message || 'Something went wrong, please try after sometime.',
                    })
                    createNotification('Verification Failed, Please validate your entered code.', ToastType.Error)
                },
            }
        )
    }

    return (
        <section className="w-full flex justify-center items-center h-[70vh] bg-white">
            <div className="flex  flex-col justify-center items-center  w-[60%] sm:w-[400px]">
                <h1 className="text-xl font-bold text-left">Verify your email</h1>
                <p>Enter the 6-digit code sent to your email address.</p>
                <form noValidate onSubmit={handleSubmit(formSubmit)} className="flex flex-col w-full">
                    <input
                        placeholder="Enter your code"
                        className="w-full px-4 py-2 border-2 border-black outline-0 mt-4"
                        {...register('verificationToken')}
                        maxLength={6}
                        pattern="\d*"
                        autoFocus
                    />
                    {errors.verificationToken && (
                        <label htmlFor="verificationToken" className="text-red-500 text-xs">
                            {errors.verificationToken.message}
                        </label>
                    )}

                    <Button
                        label={'Submit'}
                        type="submit"
                        className="w-full py-3 text-lg font-bold rounded-lg hover:bg-gray-500 hover:text-black mt-4"
                    />
                </form>
                {errors.root && <p className="text-red-600 text-xs mt-2">{errors.root.message}</p>}
                <div className="flex justify-center items-center space-x-2 mt-2">
                    <p>Already have an account?</p>
                    <p className="text-gray-500 hover:text-black hover:underline">
                        <Link to="/login">Log in</Link>
                    </p>
                </div>
            </div>
        </section>
    )
}

export const Component = EmailVerificationPage

export default EmailVerificationPage
