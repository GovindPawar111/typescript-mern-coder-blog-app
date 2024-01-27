import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios, { AxiosError } from 'axios'
import { apiBaseUrl } from '../config/url'
import { errorResponse } from './LoginPage'

interface RegisterResponse {
    id: string
    username: string
    email: string
    updatedAt: string
}

const RegisterPage = (): React.ReactElement => {
    const [username, setUsername] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState<string>('')

    const navigate = useNavigate()

    const handleRegisterBtnClick = async (): Promise<void> => {
        try {
            const response = await axios.post<RegisterResponse>(
                `${apiBaseUrl}/api/auth/register`,
                {
                    username,
                    email,
                    password,
                },
                { withCredentials: true }
            )
            setUsername('')
            setEmail('')
            setPassword('')

            navigate('/')
        } catch (e) {
            const error = e as AxiosError<errorResponse>
            setError(error.response?.data.message || 'Something went wrong, please try after sometime.')
            console.error(error.response?.data.message)
        }
    }

    return (
        <section className="w-full flex justify-center items-center h-[70vh] bg-white">
            <div className="flex  flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]">
                <h1 className="text-xl font-bold text-left">Create an account</h1>
                <input
                    type="text"
                    placeholder="Enter your username"
                    className="w-full px-4 py-2 border-2 border-black outline-0"
                    value={username}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 border-2 border-black outline-0"
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Enter your password"
                    className="w-full px-4 py-2 border-2 border-black outline-0"
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                />
                <button
                    onClick={handleRegisterBtnClick}
                    className="w-full px-4 py-3 bg-black text-white text-lg font-bold rounded-lg hover:bg-gray-500 hover:text-black"
                >
                    Register
                </button>
                {error && <h3 className="text-red-600">{error}</h3>}
                <div className="flex justify-center items-center space-x-3 ">
                    <p>Already have an account?</p>
                    <p className="text-gray-500 hover:text-black">
                        <Link to="/login">Log in</Link>
                    </p>
                </div>
            </div>
        </section>
    )
}

export default RegisterPage
