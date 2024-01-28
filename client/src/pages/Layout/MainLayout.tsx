import { Outlet } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

const MainLayout: React.FC = () => {
    return (
        <div className="flex flex-col justify-between min-h-screen">
            <Navbar />
            <main className="flex-grow bg-[#f5f5f5ff] flex">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default MainLayout
