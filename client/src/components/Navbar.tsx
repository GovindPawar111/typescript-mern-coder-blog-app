import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MenuIcon from '../assets/svgs/menu.svg?react'
import Menu from './Menu'
import { useUserContext } from '../context/appContext'
import Overlay from './generic/Overlay'
import Model from './generic/Model'
import SearchBox from './generic/SearchBox'
import { useLogoutUser } from '../api/queries/authQueries'
import useNotification, { ToastType } from '../hooks/useNotification'

const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
    const [isModelOpen, setIsModelOpen] = useState<boolean>(false)
    const { user, setUser } = useUserContext()
    const navigate = useNavigate()
    const { mutate: logout } = useLogoutUser()
    const { createNotification } = useNotification()

    const isUserLoggedIn = user?.email && user.id ? true : false

    const logoutUserHandler = () => {
        /**
         * Trigger the logout mutation, If you don't have first argument,
         * but if you need the second parameter (object with callbacks), you need to provide the first one as undefined.
         * https://github.com/TanStack/query/discussions/3974
         */
        logout(undefined, {
            onSuccess() {
                setUser(null)
                navigate('/')
                sessionStorage.removeItem('user')
                createNotification('Successfully logged out', ToastType.Success)
            },
            onError() {
                createNotification('Failed to logout', ToastType.Error)
            },
        })
    }

    const handleMenuClick = () => {
        setIsMenuOpen((isMenuOpen) => !isMenuOpen)
    }

    return (
        <nav className="flex justify-center items-center bg-white border-b shadow-lg z-10 w-full">
            <div className="flex justify-between items-center py-4 px-4 sm:px-8 w-full lg:w-[90%] min-[1400px]:w-[1240px]">
                <Link to={'/'}>
                    <h1 className="font-extrabold text-2xl flex justify-center items-center">CoderBlog</h1>
                </Link>
                <div className="hidden md:block">
                    <SearchBox />
                </div>
                <div className="hidden md:flex justify-center text-gray-500 items-center space-x-2 md:space-x-6">
                    {isUserLoggedIn && user && (
                        <>
                            <div className="hover:text-black hover:underline hover:underline-offset-4">
                                <Link to={'posts/create'}>Write</Link>
                            </div>
                            <div className="hover:text-black hover:underline hover:underline-offset-4">
                                <Link to={`/profile/${user?.id}`}>Profile</Link>
                            </div>
                            <div
                                onClick={() => setIsModelOpen(true)}
                                className="hover:cursor-pointer hover:text-black hover:underline hover:underline-offset-4"
                            >
                                Logout
                            </div>
                            <Overlay isOpen={isModelOpen} onClose={() => setIsModelOpen(false)}>
                                <Model
                                    headerText={'Log Out?'}
                                    description={'Are you sure want to logout?'}
                                    onClose={() => setIsModelOpen(false)}
                                    onAction={() => logoutUserHandler()}
                                    actionLabel="Logout"
                                />
                            </Overlay>
                        </>
                    )}
                    {!isUserLoggedIn && (
                        <>
                            <div className="hover:cursor-pointer hover:text-black hover:underline hover:underline-offset-4">
                                <Link to={'/register'}>Register</Link>
                            </div>
                            <div className="hover:cursor-pointer hover:text-black hover:underline hover:underline-offset-4">
                                <Link to={'/login'}>Login</Link>
                            </div>
                        </>
                    )}
                </div>
                <div className="md:hidden text-xl">
                    <MenuIcon onClick={handleMenuClick} />
                </div>
                {isMenuOpen && (
                    <Menu
                        isUserLoggedIn={isUserLoggedIn}
                        onSetIsMenuOpen={handleMenuClick}
                        onLogout={logoutUserHandler}
                    />
                )}
            </div>
        </nav>
    )
}

export default Navbar
