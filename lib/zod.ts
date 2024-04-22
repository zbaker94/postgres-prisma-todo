import { z } from 'zod';

export const loginSchema = z.object({
    username: z.string().min(1, "username is required"),
    password: z.string().min(1, "password is required")
}); 

export const loginSchemaServer = z.object({
    username: z.string().min(1, "username is required").max(255, "username is too long"),
    password: z.string().min(1, "password is required").max(255, "password is too long")
})