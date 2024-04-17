import React from 'react'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import HomePage from './pages/HomePage'
import { AppContextProvider } from './context/appContext'
import AuthLayout from './pages/Layout/AuthLayout'
import MainLayout from './pages/Layout/MainLayout'
import { ErrorBoundary } from 'react-error-boundary'
import AppErrorFallback from './components/AppErrorFallback'

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
        <ErrorBoundary FallbackComponent={AppErrorFallback}>
            <AppContextProvider>
                <RouterProvider router={router} />
            </AppContextProvider>
        </ErrorBoundary>
    )
}

export default App
