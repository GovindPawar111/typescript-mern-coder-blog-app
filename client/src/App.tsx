import React from 'react'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import PostDetailsPage from './pages/PostDetailsPage'
import CreatePostPage from './pages/CreatePostPage'
import EditPostPage from './pages/EditPostPage'
import ProfilePage from './pages/ProfilePage'
import Loader from './components/Loader'
import { UserContextProvider } from './context/UserContext'

const App: React.FC = () => {
    return (
        <UserContextProvider>
            <Navbar />
            <Routes>
                <Route index element={<HomePage />}></Route>
                <Route path="/register" element={<RegisterPage />}></Route>
                <Route path="/login" element={<LoginPage />}></Route>
                <Route path="/profile/:profileId" element={<ProfilePage />}></Route>
                <Route path="/loader" element={<Loader />}></Route>

                <Route path="/posts/:postId" element={<PostDetailsPage />}></Route>
                <Route path="/posts/edit/:postId" element={<EditPostPage />}></Route>
                <Route path="/posts/create" element={<CreatePostPage />}></Route>
            </Routes>
            <Footer />
        </UserContextProvider>
    )
}

export default App
