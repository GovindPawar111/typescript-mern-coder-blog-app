import React, { useContext, useEffect, useState } from 'react'
import EditIcon from '../assets/svgs/edit.svg?react'
import DeleteIcon from '../assets/svgs/Delete.svg?react'
import { AxiosError } from 'axios'
import { AppContext } from '../context/appContext'
import { useNavigate } from 'react-router-dom'
import Overlay from './generic/Overlay'
import Model from './generic/Model'
import { CommentType } from '../types/commentType'
import { ErrorType } from '../types/errorType'
import { getFormattedDate, getFormattedTime } from '../utils/formattedDateTime'
import { addComment, deleteComment, getAllCommentsOfPost, updateComment } from '../api/commentApi'
import Button from './generic/button'

interface ICommentSectionProps {
    postId: string
}

const CommentSection: React.FC<ICommentSectionProps> = ({ postId }: ICommentSectionProps) => {
    const [comments, setComments] = useState<CommentType[]>([])
    const [newComment, setNewComment] = useState<string>('')
    const [updatedComment, setUpdatedComment] = useState<string>('')
    const [editCommentId, setEditCommentId] = useState<string | undefined>(undefined)
    const [isModelOpen, setIsModelOpen] = useState<boolean>(false)

    const { user } = useContext(AppContext)
    const navigate = useNavigate()

    const getComments = async (postId: string) => {
        try {
            const response = await getAllCommentsOfPost(postId)
            response && setComments(response)
        } catch (e) {
            const error = e as AxiosError<ErrorType>
            console.log(error)
        }
    }

    const AddComments = async (comment: string, postId: string, userId: string, author: string) => {
        try {
            const response = await addComment(postId, userId, author, comment)
            response && (await getComments(postId))
        } catch (e) {
            const error = e as AxiosError<ErrorType>
            console.log(error)
        }
    }

    const deleteComments = async (id: string) => {
        try {
            await deleteComment(id)
            await getComments(postId)
        } catch (e) {
            const error = e as AxiosError<ErrorType>
            console.log(error)
        }
    }

    const updateComments = async (id: string, updatedComment: string) => {
        try {
            const response = await updateComment(id, updatedComment)
            response && (await getComments(postId))
        } catch (e) {
            const error = e as AxiosError<ErrorType>
            console.log(error)
        }
    }

    const handleAddComment = () => {
        !user && navigate('/login')
        user && newComment && AddComments(newComment, postId, user.id, user.username)
        setNewComment('')
    }

    const handleCommentEdit = (id: string, comment: string) => {
        setEditCommentId(id)
        setUpdatedComment(comment)
    }

    const handleCommentUpdate = () => {
        editCommentId && updateComments(editCommentId, updatedComment)
        setEditCommentId('')
    }

    const handleCommentDelete = (id: string) => {
        deleteComments(id)
    }

    useEffect(() => {
        getComments(postId)
    }, [])

    return (
        <section className="flex flex-col mt-8">
            <h3 className="mt-8 mb-4 font-semibold">Comments:</h3>
            {/* commentbox */}
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
                                    <p className="text-graycomment-500 text-sm">
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
                                <div className="m-4 flex">
                                    <input
                                        type="text"
                                        placeholder="Update a comment"
                                        className="flex-grow outline-none px-4 py-2 mt-4 md:mt-0"
                                        value={updatedComment}
                                        onChange={(e) => setUpdatedComment(e.target.value)}
                                    />
                                    <div className="flex justify-between">
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

            <div className="w-full flex flex-col md:flex-row mt-4">
                <input
                    type="text"
                    placeholder="Write a comment"
                    className="w-[80%] outline-none px-4 py-2 mt-4 md:mt-0"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <Button label={'Add comment'} className="mt-4 md:mt-0 md:w-[20%]" onClick={handleAddComment} />
            </div>
        </section>
    )
}

export default CommentSection
