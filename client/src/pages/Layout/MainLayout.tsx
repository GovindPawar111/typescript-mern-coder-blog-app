import { Outlet } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { ErrorBoundary } from 'react-error-boundary'
import { MainLayoutErrorFallback } from '../../components/MainLayoutErrorFallback'

const MainLayout: React.FC = () => {
    return (
        <section className="flex flex-col justify-between h-screen overflow-hidden">
            <Navbar />
            <div className="flex flex-col h-full overflow-auto">
                <main className="flex bg-white">
                    <ErrorBoundary FallbackComponent={MainLayoutErrorFallback}>
                        <Outlet />
                    </ErrorBoundary>
                </main>
                <Footer />
            </div>
        </section>
    )
}

export default MainLayout
