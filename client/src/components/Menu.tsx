import { Link } from 'react-router-dom'
import CloseIcon from '../assets/svgs/close.svg?react'
import { useContext, useState } from 'react'
import { AppContext } from '../context/appContext'
import Overlay from './generic/Overlay'
import Model from './generic/Model'

interface IMenuProps {
    isUserLoggedIn: boolean
    onSetIsMenuOpen: () => void
    onLogout: () => Promise<void>
}

const Menu = (props: IMenuProps): JSX.Element => {
    const { isUserLoggedIn, onSetIsMenuOpen, onLogout } = props
    const [isModelOpen, setIsModelOpen] = useState<boolean>(false)
    const { user } = useContext(AppContext)

    return (
        <aside className="fixed top-0 left-0 z-10 w-[100vw] h-[100vh] flex flex-col bg-white text-black overflow-hidden">
            <div className="flex flex-row px-6 py-4 justify-between">
                <h1 className="font-extrabold text-2xl">
                    <Link to={'/'} onClick={onSetIsMenuOpen}>
                        CoderBlog
                    </Link>
                </h1>
                <div onClick={onSetIsMenuOpen} className="flex justify-center items-center space-x-0 text-2xl">
                    <CloseIcon />
                </div>
            </div>
            <div className="flex flex-col px-6 font-semibold ">
                {!isUserLoggedIn && (
                    <>
                        <Link to={'/login'} onClick={onSetIsMenuOpen}>
                            <div className="text-black hover:underline text-xl mt-6 cursor-pointer">Login</div>
                        </Link>
                        <Link to={'/register'} onClick={onSetIsMenuOpen}>
                            <div className="text-black hover:underline text-xl mt-6 cursor-pointer">Register</div>
                        </Link>
                    </>
                )}
                {isUserLoggedIn && user && (
                    <>
                        <Link to={'/posts/create'} onClick={onSetIsMenuOpen}>
                            <div className="text-black hover:underline text-xl mt-6 cursor-pointer">Write blog</div>
                        </Link>
                        <Link to={`/profile/${user.id}`} onClick={onSetIsMenuOpen}>
                            <div className="text-black hover:underline text-xl mt-6 cursor-pointer">Profile</div>
                        </Link>
                        <div
                            onClick={() => {
                                setIsModelOpen(true)
                            }}
                            className="text-black hover:underline text-xl mt-6 cursor-pointer"
                        >
                            Logout
                        </div>
                        <Overlay isOpen={isModelOpen} onClose={() => setIsModelOpen(false)}>
                            <Model
                                headerText={'Log Out?'}
                                description={'Are you sure want to logout?'}
                                onClose={() => setIsModelOpen(false)}
                                onAction={() => {
                                    onLogout()
                                    onSetIsMenuOpen()
                                }}
                                actionLabel="Logout"
                            />
                        </Overlay>
                    </>
                )}
            </div>
        </aside>
    )
}

export default Menu
