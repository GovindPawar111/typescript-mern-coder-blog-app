import { ArrayPostSchema, PostSchema } from '../types/postType'
import { apiClient } from './apiClient'

export const getAllPosts = async () => {
    const response = await apiClient.get('/post')
    return ArrayPostSchema.parse(response.data)
}

export const getPostWithId = async (postId: string) => {
    const response = await apiClient.get(`/post/${postId}`)
    return PostSchema.parse(response.data)
}

export const getAllSearchedPosts = async (query: string) => {
    const response = await apiClient.get(`post?search=${query}`)
    return ArrayPostSchema.parse(response.data)
}

export const getUsersPosts = async (userId: string) => {
    const response = await apiClient.get(`/post/user/${userId}`, {
        withCredentials: true,
    })
    return ArrayPostSchema.parse(response.data)
}

export const createPost = async (data: any) => {
    const response = await apiClient.post('/post', data, {
        withCredentials: true,
    })
    return PostSchema.parse(response.data)
}

export const updatePost = async (postId: string, data: any) => {
    const response = await apiClient.put(`/post/${postId}`, data, {
        withCredentials: true,
    })
    return PostSchema.parse(response.data)
}

export const deletePost = async (postId: string) => {
    const response = await apiClient.delete(`/post/${postId}`, {
        withCredentials: true,
    })
    return PostSchema.parse(response.data)
}
