import z from 'zod'

export const CommentSchema = z.object({
    _id: z.string().uuid(),
    comment: z.string(),
    author: z.string(),
    postId: z.string().uuid(),
    userId: z.string().uuid(),
    updatedAt: z.string(),
})

export type CommentType = z.infer<typeof CommentSchema>
