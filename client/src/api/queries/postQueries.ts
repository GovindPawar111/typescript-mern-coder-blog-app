import { useMutation, useQuery } from '@tanstack/react-query'
import { createPost, deletePost, getAllSearchedPosts, getPostWithId, getUsersPosts, updatePost } from '../postApi'
import { PostType } from '../../types/postType'
import { queryClient } from './queryClient'
import { AxiosError } from 'axios'
import { ErrorType } from '../../types/errorType'

// Key constants for post queries
export const POST_QUERY_KEY = 'Post'

// Custom hook to get all posts
export const useGetAllPost = () => {
    return useQuery<PostType[], AxiosError<ErrorType>>({
        queryKey: [POST_QUERY_KEY, { search: '' }],
        queryFn: () => getAllSearchedPosts(''),
    })
}

// Custom hook to get all searched posts
export const useGetAllSearchedPosts = (searchQuery: string) => {
    return useQuery<PostType[], AxiosError<ErrorType>>({
        queryKey: [POST_QUERY_KEY, { search: searchQuery }],
        queryFn: () => getAllSearchedPosts(searchQuery),
    })
}

// Custom hook to get post with id
export const useGetPostWithId = (postId: string, enabled?: boolean) => {
    return useQuery<PostType, AxiosError<ErrorType>>({
        queryKey: [POST_QUERY_KEY, postId],
        queryFn: () => getPostWithId(postId),
        enabled: enabled,
    })
}

// Custom hook to get users posts
export const useGetUsersPosts = (userId: string) => {
    return useQuery<PostType[], AxiosError<ErrorType>>({
        queryKey: [POST_QUERY_KEY, userId],
        queryFn: () => getUsersPosts(userId),
    })
}

// Custom hook to create post
export const useCreatePost = () => {
    return useMutation<PostType, AxiosError<ErrorType>, any>({
        mutationFn: createPost,

        onError: (error) => {
            console.error(error.response?.data.message)
        },
    })
}

// Custom hook to update post
export const useUpdatePost = (postId: string) => {
    return useMutation<PostType, AxiosError<ErrorType>, { postId: string; data: any }>({
        mutationFn: (data: { postId: string; data: any }) => updatePost(data.postId, data.data),

        onSuccess: () => {
            // Invalidate and refetch
            queryClient.removeQueries({ queryKey: [POST_QUERY_KEY, postId], exact: true })
        },

        onError: (error) => {
            console.error(error.response?.data.message)
        },
    })
}

// Custom hook to delete post
export const useDeletePost = (postId: string) => {
    return useMutation<PostType, AxiosError<ErrorType>, string>({
        mutationFn: (postId: string) => deletePost(postId),
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.removeQueries({ queryKey: [POST_QUERY_KEY, postId], exact: true })
        },
        onError: (error) => {
            console.error(error.response?.data.message)
        },
    })
}
