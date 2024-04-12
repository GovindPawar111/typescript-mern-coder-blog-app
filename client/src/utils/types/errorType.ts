import z from 'zod'

export const ErrorSchema = z.object({
    message: z.string().optional(),
    code: z.string().optional(),
})

export type ErrorType = z.infer<typeof ErrorSchema>
