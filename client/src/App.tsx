import React from 'react'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import HomePage from './pages/HomePage'
import { AppContextProvider } from './context/appContext'
import AuthLayout from './pages/Layout/AuthLayout'
import MainLayout from './pages/Layout/MainLayout'
import { ErrorBoundary } from 'react-error-boundary'
import AppErrorFallback from './components/AppErrorFallback'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './api/queryClient'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'react-hot-toast'

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
                path: '/verify-email',
                lazy: () => import('./pages/EmailVerificationPage'),
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
            <QueryClientProvider client={queryClient}>
                <AppContextProvider>
                    <RouterProvider router={router} />
                    <Toaster position="bottom-right" reverseOrder={true} />
                </AppContextProvider>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </ErrorBoundary>
    )
}

export default App
