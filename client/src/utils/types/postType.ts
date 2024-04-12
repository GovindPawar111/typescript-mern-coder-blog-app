import z from 'zod'

export const PostSchema = z.object({
    _id: z.string().uuid(),
    title: z.string(),
    description: z.string(),
    content: z.string(),
    headerImageUrl: z.string().url(),
    catagories: z.array(z.string()),
    username: z.string(),
    userId: z.string().uuid(),
    createdAt: z.string(),
    updatedAt: z.string(),
})

export type PostType = z.infer<typeof PostSchema>
