"use server";

import { registerSchema } from "@/lib/zod";
import prisma from "@/lib/prisma";

export const registerAccount = async (registerObject: typeof registerSchema._type) => {
    // validate username and password match expected validation
    try{
        registerSchema.parse(registerObject)
    }catch (error) {
        // if validation fails, return error
        throw new Error("Invalid Registration Data. Cannot Create Account")
    }
    // get account for username
    const account = await prisma.account.findUnique({
        where: {
            username: registerObject.username
        }
    })
    // if account already exists, return error
    if (account) {
        throw new Error("Account Already Exists")
    }
    // TODO hash and salt password

    // create user and account
    const newUser = await prisma.users.create({
        data: {
            name: registerObject.name,
            email: registerObject.email,
            image: "",
            createdAt: new Date(),
            account: {
                create: {
                    username: registerObject.username,
                    password: registerObject.password,
                    createdAt: new Date()
                }
            }
        },
        select: {
            id: true,
            name: true,
            email: true,
        }
    })

    return newUser;
}