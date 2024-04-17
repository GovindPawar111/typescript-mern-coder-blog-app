import { ArrayCommentSchema, CommentSchema } from '../types/commentType'
import { apiClient } from './apiClient'

export const getAllCommentsOfPost = async (postId: string) => {
    const response = await apiClient.get(`comment/post/${postId}`, {
        withCredentials: true,
    })
    return ArrayCommentSchema.parse(response.data)
}

export const addComment = async (postId: string, userId: string, author: string, comment: string) => {
    const response = await apiClient.post(
        '/comment/',
        {
            postId,
            userId,
            author,
            comment,
        },
        {
            withCredentials: true,
        }
    )
    return CommentSchema.parse(response.data)
}

export const updateComment = async (commentId: string, comment: string) => {
    const response = await apiClient.put(
        `/comment/${commentId}`,
        {
            comment,
        },
        {
            withCredentials: true,
        }
    )
    return CommentSchema.parse(response.data)
}

export const deleteComment = async (commentId: string) => {
    const response = await apiClient.delete(`/comment/${commentId}`, {
        withCredentials: true,
    })
    return CommentSchema.parse(response.data)
}
