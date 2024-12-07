import { z } from 'zod'

export const loginFormSchema = z.object({
    email: z
        .string()
        .min(1, 'Email is required') // Ensures it's not empty
        .email('Please enter a valid email address'), // Ensures the value is a valid email format
    password: z
        .string()
        .min(1, 'Password is required') // Ensures it's not empty
        .min(8, 'Password must be at least 8 characters long') // Minimum length
        .max(100, 'Password cannot exceed 100 characters') // Optional: Maximum length
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter') // At least one uppercase letter
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter') // At least one lowercase letter
        .regex(/[0-9]/, 'Password must contain at least one number') // At least one number
        .regex(/[\W_]/, 'Password must contain at least one special character'), // At least one special character
})

export type LoginFormType = z.infer<typeof loginFormSchema>
