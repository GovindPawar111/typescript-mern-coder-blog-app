import React, { useContext, useState } from 'react'
import { ErrorResponse, Link, useNavigate } from 'react-router-dom'
import { apiBaseUrl } from '../config/url'
import axios, { AxiosError } from 'axios'
import { AppContext } from '../context/appContext'

export interface LoginResponse {
    id: string
    username: string
    email: string
    updatedAt: string
    createdAt: string
}

export type errorResponse = {
    error: ErrorResponse
    message: string
}

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState<string>('')
    const navigate = useNavigate()
    const { setUser } = useContext(AppContext)

    const handleLoginBtnClick = async () => {
        try {
            const response = await axios.post<LoginResponse>(
                `${apiBaseUrl}/api/auth/login`,
                {
                    email,
                    password,
                },
                { withCredentials: true }
            )

            setUser({
                id: response.data.id,
                username: response.data.username,
                email: response.data.email,
                createdAt: response.data.createdAt,
                updatedAt: response.data.updatedAt,
            })
            setPassword('')
            navigate('/')
        } catch (e) {
            const error = e as AxiosError<errorResponse>
            setError(error.response?.data.message || 'Something went wrong, please try after sometime.')
        }
    }

    return (
        <section className="w-full flex justify-center items-center h-[70vh] bg-white">
            <div className="flex  flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]">
                <h1 className="text-xl font-bold text-left">Log in to your account</h1>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 border-2 border-black outline-0"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full px-4 py-2 border-2 border-black outline-0"
                />
                <button
                    onClick={handleLoginBtnClick}
                    className="w-full px-4 py-3 bg-black text-white text-lg font-bold rounded-lg hover:bg-gray-500 hover:text-black"
                >
                    Log in
                </button>
                {error.length > 0 && <h3 className="text-red-500">{error}</h3>}
                <div className="flex justify-center items-center space-x-3 ">
                    <p>New here?</p>
                    <p className="text-gray-500 hover:text-black">
                        <Link to="/register">Register</Link>
                    </p>
                </div>
            </div>
        </section>
    )
}

export default LoginPage
