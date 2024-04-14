import z from 'zod'

export const CommentSchema = z.object({
    _id: z.string(),
    comment: z.string(),
    author: z.string(),
    postId: z.string(),
    userId: z.string(),
    updatedAt: z.string(),
})

export const ArrayCommentSchema = z.array(CommentSchema)

export type CommentType = z.infer<typeof CommentSchema>
