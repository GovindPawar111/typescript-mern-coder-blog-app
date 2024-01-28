import { Outlet } from 'react-router-dom'
import AuthNavbar from '../../components/AuthNavBar'

const AuthLayout: React.FC = () => {
    return (
        <>
            <AuthNavbar />
            <Outlet />
        </>
    )
}

export default AuthLayout
