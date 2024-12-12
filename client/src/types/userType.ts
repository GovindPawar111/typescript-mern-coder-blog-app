import z from 'zod'

export const UserSchema = z.object({
    id: z.string(),
    username: z.string(),
    email: z.string().email(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
    isVerified: z.boolean().optional(),
    verificationToken: z.string().nullable().optional(),
    isAnonymous: z.boolean().optional(),
})

export type UserType = z.infer<typeof UserSchema>
