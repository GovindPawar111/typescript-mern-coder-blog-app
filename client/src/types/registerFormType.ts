import { z } from 'zod'
import { loginFormSchema } from '../types/loginFormType'

export const RegisterFormSchema = loginFormSchema.extend({
    username: z
        .string()
        .min(1, 'Username is required') // Ensures it's not empty
        .min(3, 'Username must be at least 3 characters long'),
})

export type RegisterFormType = z.infer<typeof RegisterFormSchema>
