import { z } from 'zod'

export const EmailVerificationFormSchema = z.object({
    verificationToken: z
        .string()
        .length(6, { message: 'Verification code must be 6 digits.' })
        .regex(/^\d{6}$/, { message: 'Code must be numeric.' }),
})

export type EmailVerificationFormType = z.infer<typeof EmailVerificationFormSchema>
