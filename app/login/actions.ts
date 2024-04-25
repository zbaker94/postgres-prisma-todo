"use server";

import { loginSchemaServer } from "@/lib/zod";
import prisma from "@/lib/prisma";

import bcrypt from "bcrypt";
import jwtEncode from "jwt-encode";

import { cookies } from "next/headers";

export const login = async ({
  username,
  password,
}: typeof loginSchemaServer._type) => {
  // validate username and password match expected validation
  try {
    await loginSchemaServer.parseAsync({ username, password });
  } catch (error) {
    console.log(error);
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
    console.error("Account Not Found for Username: ", username);
    throw new Error("Invalid Credentials");
  }

  if (!(await bcrypt.compare(password, account.password))) {
    console.error("Password Mismatch for Username: ", username);
    throw new Error("Invalid Credentials");
  }

  // if match, get user
  const user = await prisma.users.findUnique({
    where: {
      id: account.userId,
    },
  });

  // create token from user
  const iat = Date.now();
  const exp = iat + 1000 * 60 * 10;
  const token = jwtEncode(
    { ...user, iat, exp },
    process.env.AUTH_SECRET as string,
  );
  cookies().set("token", token, {
    expires: exp,
  });
  return { user, expires: exp, token };
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
    console.log(error);
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
    console.error(
      "Account Already Exists for Username: ",
      registerObject.username,
    );
    throw new Error("Account Already Exists");
  }

  const hashedPassword = await bcrypt.hash(registerObject.password, 10);

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
          password: hashedPassword,
          createdAt: new Date(),
        },
      },
    },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      createdAt: true,
    },
  });

  return newUser;
};
