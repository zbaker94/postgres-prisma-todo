import { z } from 'zod';

export const loginSchema = z.object({
    username: z.string().min(1, "username is required"),
    password: z.string().min(1, "password is required")
}); 

export const loginSchemaServer = z.object({
    username: z.string().min(1, "username is required").max(255, "username is too long"),
    password: z.string().min(1, "password is required").max(255, "password is too long")
})

export const registerSchema = z.object({
    name: z.string().min(1, "name is required").max(255, "name is too long"),
    email: z.string().email("invalid email").min(1, "email is required").max(255, "email is too long"),
    username: z.string().min(1, "username is required").max(255, "username is too long"),
    password: z.string().min(1, "password is required").max(255, "password is too long"),
    confirmPassword: z.string().min(1, "please confirm your password")
})
.refine(schema => schema.password === schema.confirmPassword, "passwords do not match")