import React from 'react'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import HomePage from './pages/HomePage'
import { AppContextProvider } from './utils/context/appContext'
import AuthLayout from './pages/Layout/AuthLayout'
import MainLayout from './pages/Layout/MainLayout'

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: '/posts/:postId',
                lazy: () => import('./pages/PostDetailsPage'),
            },
            {
                path: '/posts/edit/:postId',
                lazy: () => import('./pages/EditPostPage'),
            },
            {
                path: '/posts/create',
                lazy: () => import('./pages/CreatePostPage'),
            },
            {
                path: '/profile/:profileId',
                lazy: () => import('./pages/ProfilePage'),
            },
        ],
    },
    {
        path: '/',
        element: <AuthLayout />,
        children: [
            {
                path: '/register',
                lazy: () => import('./pages/RegisterPage'),
            },
            {
                path: '/login',
                lazy: () => import('./pages/LoginPage'),
            },
        ],
    },
    {
        path: '/*',
        element: <Navigate to="/" />,
    },
])

const App: React.FC = () => {
    return (
        <AppContextProvider>
            <RouterProvider router={router} />
        </AppContextProvider>
    )
}

export default App
