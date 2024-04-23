"use server";

import { loginSchemaServer } from "@/lib/zod";
import prisma from "@/lib/prisma";

export const login = async ({
  username,
  password,
}: typeof loginSchemaServer._type) => {
  // validate username and password match expected validation
  try {
    await loginSchemaServer.parseAsync({ username, password });
  } catch (error) {
    // if validation fails, return error
    throw new Error("Invalid Credentials");
  }

  // get account for username
  const account = await prisma.account.findUnique({
    where: {
      username: username,
    },
  });

  // if account does not exist, return error
  if (!account) {
    throw new Error("Invalid Credentials");
  }

  // TODO hash and salt sent in password

  // TODO compare hashed password with stored password

  // if match, return user
  if (account.password === password) {
    const user = await prisma.users.findUnique({
      where: {
        id: account.userId,
      },
    });

    return user;
  }
};

import { registerSchema } from "@/lib/zod";

export const registerAccount = async (
  registerObject: typeof registerSchema._type,
) => {
  // validate username and password match expected validation
  try {
    registerSchema.parse(registerObject);
  } catch (error) {
    // if validation fails, return error
    throw new Error("Invalid Registration Data. Cannot Create Account");
  }
  // get account for username
  const account = await prisma.account.findUnique({
    where: {
      username: registerObject.username,
    },
  });
  // if account already exists, return error
  if (account) {
    throw new Error("Account Already Exists");
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
          createdAt: new Date(),
        },
      },
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  return newUser;
};
