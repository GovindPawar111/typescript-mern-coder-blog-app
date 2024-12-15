import React, { useState } from 'react'
import EditIcon from '../assets/svgs/edit.svg?react'
import DeleteIcon from '../assets/svgs/delete.svg?react'
import { useUserContext } from '../context/appContext'
import { useNavigate } from 'react-router-dom'
import Overlay from './generic/Overlay'
import Model from './generic/Model'
import { CommentType } from '../types/commentType'
import { getFormattedDate, getFormattedTime } from '../utils/formattedDateTime'
import Button from './generic/Button'
import {
    COMMENT_QUERY_KEY,
    useAddComment,
    useDeleteComment,
    useGetAllCommentsOfPost,
    useUpdateComment,
} from '../api/queries/commentQueries'
import Loader from './generic/Loader'
import { useErrorBoundary } from 'react-error-boundary'
import { queryClient } from '../api/queryClient'
import useNotification, { ToastType } from '../hooks/useNotification'

interface ICommentSectionProps {
    postId: string
}

const CommentSection: React.FC<ICommentSectionProps> = ({ postId }: ICommentSectionProps) => {
    const [newComment, setNewComment] = useState<string>('')
    const [updatedComment, setUpdatedComment] = useState<string>('')
    const [editCommentId, setEditCommentId] = useState<string | undefined>(undefined)
    const [isModelOpen, setIsModelOpen] = useState<boolean>(false)

    const { user } = useUserContext()
    const navigate = useNavigate()
    const { showBoundary } = useErrorBoundary()
    const { createNotification } = useNotification()

    const {
        data: comments,
        isLoading: isCommentsLoading,
        isError: isCommentsError,
        error: commentsError,
    } = useGetAllCommentsOfPost(postId)

    const { mutate: addCommentMutation } = useAddComment()
    const { mutate: deleteCommentMutation } = useDeleteComment()
    const { mutate: updateCommentMutation } = useUpdateComment()

    if (isCommentsError) {
        showBoundary(commentsError)
    }

    if (isCommentsLoading || !comments) {
        return (
            <div className="w-full flex flex-grow">
                <Loader></Loader>
            </div>
        )
    }

    const AddComments = async (comment: string, postId: string, userId: string, author: string) => {
        if (user?.isAnonymous) {
            createNotification('You need to log in as a real user to add comment.', ToastType.Info, Infinity)
            return
        }
        addCommentMutation(
            { postId, userId, author, comment },
            {
                onSuccess: (data) => {
                    // Add the comment to the cache
                    queryClient.setQueryData<CommentType[]>([COMMENT_QUERY_KEY, postId], (oldData) =>
                        oldData ? oldData.concat(data) : [data]
                    )
                    createNotification('Successfully Added the comment', ToastType.Success)
                },

                onError: () => {
                    createNotification('Failed to add comment', ToastType.Error)
                },
            }
        )
    }

    const deleteComments = async (commentId: string) => {
        if (user?.isAnonymous) {
            createNotification('You need to log in as a real user to delete comment.', ToastType.Info)
            return
        }
        deleteCommentMutation(commentId, {
            onSuccess: () => {
                // Add the comment to the cache
                queryClient.setQueryData<CommentType[]>([COMMENT_QUERY_KEY, postId], (oldData) =>
                    oldData ? oldData.filter((comment) => comment._id !== commentId) : []
                )
                createNotification('Successfully deleted the comment', ToastType.Success)
            },

            onError: () => {
                createNotification('Failed to delete comment', ToastType.Error)
            },
        })
    }

    const updateComments = async (commentId: string, updatedComment: string = '') => {
        if (user?.isAnonymous) {
            createNotification('You need to log in as a real user to edit comment.', ToastType.Info)
            return
        }
        updateCommentMutation(
            { commentId, updatedComment },
            {
                onSuccess: (data) => {
                    // Add the comment to the cache
                    queryClient.setQueryData<CommentType[]>([COMMENT_QUERY_KEY, postId], (oldData) => {
                        if (!oldData) return []

                        return [...oldData.filter((comment) => comment._id !== commentId), data]
                    })
                    createNotification('Successfully updated the comment', ToastType.Success)
                },

                onError: () => {
                    createNotification('Failed to update comment', ToastType.Error)
                },
            }
        )
    }

    const handleAddComment = () => {
        !user && navigate('/login')
        user && newComment && AddComments(newComment, postId, user.id, user.username)
        setNewComment('')
    }

    const handleCommentEdit = (commentId: string, comment: string) => {
        setEditCommentId(commentId)
        setUpdatedComment(comment)
    }

    const handleCommentUpdate = () => {
        editCommentId && updateComments(editCommentId, updatedComment)
        setEditCommentId('')
    }

    const handleCommentDelete = (commentId: string) => {
        deleteComments(commentId)
    }

    return (
        <section className="flex flex-col">
            <h3 className="mt-6 mb-4 font-semibold">Comments:</h3>
            {/* comment box */}
            {comments.length > 0 &&
                comments.map((comment) => {
                    return (
                        <div
                            key={comment._id}
                            className={`w-full py-2 px-2 rounded-lg bg-gray-300 my-2 self-end ${
                                user?.id && user.id === comment.userId ? 'bg-gray-100 self-end ' : 'bg-gray-250 '
                            }`}
                        >
                            <div className="flex items-center justify-between">
                                <h3 className="font-bold text-gray-600">{`@${comment.author}`}</h3>
                                <div className="flex justify-center items-center space-x-4">
                                    <p className="text-gray-500 text-sm">{getFormattedDate(comment.updatedAt)}</p>
                                    <p className="text-gray-500 text-sm hidden min-[450px]:block">
                                        {getFormattedTime(comment.updatedAt)}
                                    </p>
                                    {user?.id && user.id === comment.userId && !(editCommentId === comment._id) && (
                                        <div className="flex items-center justify-center space-x-2">
                                            <EditIcon
                                                onClick={() => handleCommentEdit(comment._id, comment.comment)}
                                                className="cursor-pointer"
                                            />
                                            <DeleteIcon
                                                onClick={() => setIsModelOpen(true)}
                                                className="cursor-pointer"
                                            />
                                            <Overlay isOpen={isModelOpen} onClose={() => setIsModelOpen(false)}>
                                                <Model
                                                    headerText={'Are you sure you want to delete this Comment?'}
                                                    description={
                                                        'This will delete the Comment permanently. You cannot undo this action.'
                                                    }
                                                    onClose={() => setIsModelOpen(false)}
                                                    onAction={() => handleCommentDelete(comment._id)}
                                                    actionLabel="Delete"
                                                />
                                            </Overlay>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {editCommentId === comment._id ? (
                                <div className="mt-1 mb-4 sm:m-4 flex flex-col min-[450px]:flex-row">
                                    <input
                                        type="text"
                                        placeholder="Update a comment"
                                        className="flex-grow outline-none px-4 py-2 mt-4 md:mt-0"
                                        value={updatedComment}
                                        onChange={(e) => setUpdatedComment(e.target.value)}
                                    />
                                    <div className="flex justify-end min-[450px]:justify-between">
                                        <Button
                                            label={'Update'}
                                            className="mt-4 md:mt-0 ml-2"
                                            onClick={handleCommentUpdate}
                                        />

                                        <Button
                                            label={'Close'}
                                            className="mt-4 md:mt-0 ml-2"
                                            onClick={() => setEditCommentId('')}
                                        />
                                    </div>
                                </div>
                            ) : (
                                <p className="px-4 mt-2">{comment.comment}</p>
                            )}
                        </div>
                    )
                })}

            <div className="w-full flex flex-col mt-4 min-[450px]:flex-row">
                <input
                    type="text"
                    placeholder="Write a comment"
                    className="w-full outline-none px-4 py-2 mt-0 border border-gray-300"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <Button
                    label={'Add comment'}
                    className="mt-4 min-[450px]:mt-0 w-full min-[450px]:w-[200px]"
                    onClick={handleAddComment}
                />
            </div>
        </section>
    )
}

export default CommentSection
