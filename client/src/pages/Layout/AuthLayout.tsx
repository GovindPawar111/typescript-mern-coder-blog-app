import { Outlet } from 'react-router-dom'
import AuthNavbar from '../../components/AuthNavBar'
import { ErrorBoundary } from 'react-error-boundary'
import { MainLayoutErrorFallback } from '../../components/MainLayoutErrorFallback'

const AuthLayout: React.FC = () => {
    return (
        <>
            <AuthNavbar />
            <ErrorBoundary FallbackComponent={MainLayoutErrorFallback}>
                <Outlet />
            </ErrorBoundary>
        </>
    )
}

export default AuthLayout
