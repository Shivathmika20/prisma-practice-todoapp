import {z} from 'zod'

export const signupSchema=z.object({
    username:z.string().min(5).max(20),
    password:z.string().min(6)
})

export type userInput=z.infer<typeof signupSchema>;

export const todoSchema=z.object({
    title:z.string().min(4),
    description:z.string(),
    done:z.boolean().optional()
})

