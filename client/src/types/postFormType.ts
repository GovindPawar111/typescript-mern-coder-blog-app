import { z } from 'zod'

export const PostFormSchema = z.object({
    title: z.string().min(1, 'Title is required').min(3, 'Title must be at least 3 characters long'),
    description: z
        .string()
        .min(1, 'Description is required')
        .min(3, 'Description must be at least of 3 characters long'),
    categories: z
        .array(z.string().min(1, 'Category cannot be empty'))
        .min(1, 'At least one category is required')
        .max(3, 'Maximum of 3 categories are allowed')
        .refine((categories) => new Set(categories).size === categories.length, {
            message: 'Duplicate categories are not allowed',
        }),
    content: z.string().min(1, 'Content is required').min(40, 'Content must be at least of 40 characters long'),
})

export type PostFormType = z.infer<typeof PostFormSchema>
