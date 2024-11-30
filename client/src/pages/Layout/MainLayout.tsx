import { Outlet } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { ErrorBoundary } from 'react-error-boundary'
import { MainLayoutErrorFallback } from '../../components/MainLayoutErrorFallback'

const MainLayout: React.FC = () => {
    return (
        <div className="flex flex-col justify-between min-h-screen">
            <Navbar />
            <main className="flex bg-white ">
                <ErrorBoundary FallbackComponent={MainLayoutErrorFallback}>
                    <Outlet />
                </ErrorBoundary>
            </main>
            <Footer />
        </div>
    )
}

export default MainLayout
