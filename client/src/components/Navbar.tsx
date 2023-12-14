import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BsSearch } from 'react-icons/bs'
import { GiHamburgerMenu } from 'react-icons/gi'
import Menu from './Menu'
import { UserContext } from '../context/UserContext'
import axios, { AxiosError } from 'axios'
import { errorResponse } from '../pages/LoginPage'
import { apiBaseUrl } from '../config/url'

const Navbar: React.FC = () => {
    const { user, setUser } = useContext(UserContext)
    const isUserLoggedIn = user?.email && user.id ? true : false
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
    const navigate = useNavigate()

    const logoutUser = async () => {
        try {
            await axios.get(`${apiBaseUrl}/api/auth/logout`, { withCredentials: true })
            setUser(null)
            navigate('/')
        } catch (e) {
            const error = e as AxiosError<errorResponse>
        }
    }

    const handleMenuClick = () => {
        setIsMenuOpen((isMenuOpen) => !isMenuOpen)
    }

    return (
        <div className="flex justify-between items-center px-6 md:px-[200px] py-4">
            <h1 className="font-extrabold text-2xl md:text-xl">
                <Link to={'/'}>CoderBlog</Link>
            </h1>
            <div className="flex justify-center items-center space-x-0">
                <p>
                    <BsSearch />
                </p>
                <input className="outline-none px-3" type="text" placeholder="Search a post" />
            </div>
            <div className="hidden md:flex justify-center items-center space-x-2 md:space-x-6 ">
                {isUserLoggedIn && (
                    <>
                        <h3>
                            <Link to={'posts/create'}>Write</Link>
                        </h3>
                        <h3>
                            <Link to={'/profile/${id}'}>Profile</Link>
                        </h3>
                        <h3
                            onClick={() => {
                                logoutUser()
                            }}
                            className="hover:cursor-pointer"
                        >
                            Logout
                        </h3>
                    </>
                )}
                {!isUserLoggedIn && (
                    <>
                        <h3>
                            <Link to={'/register'}>Register</Link>
                        </h3>
                        <h3>
                            <Link to={'/login'}>Login</Link>
                        </h3>
                    </>
                )}
            </div>
            <div className="md:hidden text-xl">
                <GiHamburgerMenu onClick={handleMenuClick} />
            </div>
            {isMenuOpen && (
                <Menu isUserLoggedIn={isUserLoggedIn} onSetIsMenuOpen={handleMenuClick} onLogout={logoutUser} />
            )}
        </div>
    )
}

export default Navbar
