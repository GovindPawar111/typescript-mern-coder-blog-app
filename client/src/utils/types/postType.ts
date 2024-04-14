import z from 'zod'

export const PostSchema = z.object({
    _id: z.string(),
    title: z.string(),
    description: z.string(),
    content: z.string().optional(),
    headerImageUrl: z.union([z.string().url(), z.string()]),
    catagories: z.array(z.string()),
    username: z.string(),
    userId: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
})

export const ArrayPostSchema = z.array(PostSchema)

export type PostType = z.infer<typeof PostSchema>
