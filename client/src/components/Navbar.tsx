import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BsSearch } from 'react-icons/bs'
import { GiHamburgerMenu } from 'react-icons/gi'
import Menu from './Menu'
import { AppContext, PostResponse } from '../context/appContext'
import axios, { AxiosError } from 'axios'
import { errorResponse } from '../pages/LoginPage'
import { apiBaseUrl } from '../config/url'
import useSearchDebounce from '../hooks/useSearchDebounce'

const Navbar: React.FC = () => {
    const { user, setUser, setPosts } = useContext(AppContext)
    const isUserLoggedIn = user?.email && user.id ? true : false
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
    const [searchQuery, setSearchQuery] = useState<string>('')
    const navigate = useNavigate()

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
            try {
                const response = await axios.get<PostResponse[]>(`${apiBaseUrl}/api/post?search=${query}`)
                setPosts(response.data)
                console.log(response)
            } catch (e) {
                const error = e as AxiosError
                console.log(error)
            }
        }
        getSearchedPost(debouncedQuery)
        navigate(debouncedQuery ? '?search=' + debouncedQuery : '/')
    }, [debouncedQuery])

    return (
        <div className="flex justify-between items-center px-6 md:px-[200px] py-4">
            <h1 className="font-extrabold text-2xl md:text-xl">
                <Link to={'/'}>CoderBlog</Link>
            </h1>
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
