import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { BsSearch } from 'react-icons/bs'
import { GiHamburgerMenu } from 'react-icons/gi'
import Menu from './Menu'
import { AppContext, PostResponse } from '../context/appContext'
import axios, { AxiosError } from 'axios'
import { errorResponse } from '../pages/LoginPage'
import { apiBaseUrl } from '../config/url'
import useSearchDebounce from '../hooks/useSearchDebounce'
import Overlay from './Overlay'
import Model from './Model'

const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [isModelOpen, setIsModelOpen] = useState<boolean>(false)

    const { user, setUser, setPosts } = useContext(AppContext)
    const isUserLoggedIn = user?.email && user.id ? true : false

    const navigate = useNavigate()
    const pathname = useLocation().pathname

    const logoutUser = async () => {
        try {
            await axios.get(`${apiBaseUrl}/api/auth/logout`, { withCredentials: true })
            setUser(null)
            navigate('/')
        } catch (e) {
            const error = e as AxiosError<errorResponse>
            console.log(error)
        }
    }

    const handleMenuClick = () => {
        setIsMenuOpen((isMenuOpen) => !isMenuOpen)
    }

    const debouncedQuery = useSearchDebounce(searchQuery)

    useEffect(() => {
        const getSearchedPost = async (query: string) => {
            if (query && query !== '/') {
                try {
                    const response = await axios.get<PostResponse[]>(`${apiBaseUrl}/api/post?search=${query}`)
                    setPosts(response.data)
                } catch (e) {
                    const error = e as AxiosError
                    console.log(error)
                }
            }
        }
        getSearchedPost(debouncedQuery)
        navigate(debouncedQuery ? '?search=' + debouncedQuery : '/')
    }, [debouncedQuery])

    return (
        <nav className="flex justify-between items-center px-6 md:px-[200px] py-4 sticky top-0 bg-white border-b shadow-lg">
            <Link to={'/'}>
                <h1 className="font-extrabold text-2xl flex justify-center items-center">CoderBlog</h1>
            </Link>
            {pathname === '/' && (
                <div className="flex justify-center items-center space-x-0 px-3">
                    <p>
                        <BsSearch />
                    </p>
                    <input
                        value={searchQuery}
                        onChange={(event) => setSearchQuery(event.target.value)}
                        className="outline-none px-3"
                        type="text"
                        placeholder="Search a post"
                    />
                </div>
            )}
            <div className="hidden md:flex justify-center text-gray-500 items-center space-x-2 md:space-x-6">
                {isUserLoggedIn && user && (
                    <>
                        <h3 className="hover:text-black hover:underline hover:underline-offset-4">
                            <Link to={'posts/create'}>Write</Link>
                        </h3>
                        <h3 className="hover:text-black hover:underline hover:underline-offset-4">
                            <Link to={`/profile/${user?.id}`}>Profile</Link>
                        </h3>
                        <h3
                            onClick={() => setIsModelOpen(true)}
                            className="hover:cursor-pointer hover:text-black hover:underline hover:underline-offset-4"
                        >
                            Logout
                        </h3>
                        <Overlay isOpen={isModelOpen} onClose={() => setIsModelOpen(false)}>
                            <Model
                                headerText={'Log Out?'}
                                description={'Are you sure want to logout?'}
                                onCancel={() => setIsModelOpen(false)}
                                onAction={() => logoutUser()}
                                actionLabel="Logout"
                            />
                        </Overlay>
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
        </nav>
    )
}

export default Navbar
