import { useMutation, useQuery } from '@tanstack/react-query'
import { CommentType } from '../../types/commentType'
import { addComment, deleteComment, getAllCommentsOfPost, updateComment } from '../commentApi'
import { AxiosError } from 'axios'
import { ErrorType } from '../../types/errorType'

// Key constants for comment queries
export const COMMENT_QUERY_KEY = 'Comment'

export const useGetAllCommentsOfPost = (postId: string) => {
    return useQuery<CommentType[], AxiosError<ErrorType>>({
        queryKey: [COMMENT_QUERY_KEY, postId],
        queryFn: () => getAllCommentsOfPost(postId),
    })
}

// Custom hook to add comment
export const useAddComment = () => {
    return useMutation<
        CommentType,
        AxiosError<ErrorType>,
        { postId: string; userId: string; author: string; comment: string }
    >({
        mutationFn: (data: { postId: string; userId: string; author: string; comment: string }) =>
            addComment(data.postId, data.userId, data.author, data.comment),
        onError: (error) => {
            console.error(error.response?.data.message)
        },
    })
}

// custom hook to update comment
export const useUpdateComment = () => {
    return useMutation<CommentType, AxiosError<ErrorType>, { commentId: string; updatedComment: string }>({
        mutationFn: (data: { commentId: string; updatedComment: string }) =>
            updateComment(data.commentId, data.updatedComment),
        onError: (error) => {
            console.error(error.response?.data.message)
        },
    })
}

// custom hook to delete comment
export const useDeleteComment = () => {
    return useMutation<CommentType, AxiosError<ErrorType>, string>({
        mutationFn: (commentId: string) => deleteComment(commentId),
        onError: (error) => {
            console.error(error.response?.data.message)
        },
    })
}
