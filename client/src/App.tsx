import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import PostDetailsPage from './pages/PostDetailsPage'
import CreatePostPage from './pages/CreatePostPage'
import EditPostPage from './pages/EditPostPage'
import ProfilePage from './pages/ProfilePage'
import { AppContextProvider } from './context/appContext'
import AuthLayout from './pages/Layout/AuthLayout'
import MainLayout from './pages/Layout/MainLayout'

const App: React.FC = () => {
    return (
        <AppContextProvider>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<HomePage />}></Route>

                    <Route path="/posts/:postId" element={<PostDetailsPage />}></Route>
                    <Route path="/posts/edit/:postId" element={<EditPostPage />}></Route>
                    <Route path="/posts/create" element={<CreatePostPage />}></Route>

                    <Route path="/profile/:profileId" element={<ProfilePage />}></Route>
                </Route>

                <Route path="/" element={<AuthLayout />}>
                    <Route path="/register" element={<RegisterPage />}></Route>
                    <Route path="/login" element={<LoginPage />}></Route>
                </Route>

                <Route path="/*" element={<Navigate to="/" />}></Route>
            </Routes>
        </AppContextProvider>
    )
}

export default App
