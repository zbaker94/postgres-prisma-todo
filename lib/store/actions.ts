"use server";
import jwtEncode from "jwt-encode";

import { users } from "@prisma/client";
import { JwtPayload, jwtDecode } from "jwt-decode";

export const refreshLogin = async (token: string) => {
  // get exising token data
  const tokenData = jwtDecode(token) as JwtPayload & users;
  // validate existing token data

  // re-encode existing token data
  const reEncodedToken = jwtEncode(
    tokenData,
    process.env.AUTH_SECRET as string,
  );
  // compare new token data with existing token data
  if (reEncodedToken !== token) {
    // token is still valid
    throw new Error("Token is not valid");
  }
  // update token expiry date
  tokenData.exp = new Date().getTime() + 1000 * 60 * 10;
  // encode new token data with new expiry date
  const newToken = jwtEncode(tokenData, process.env.AUTH_SECRET as string);

  const user = await prisma?.users.findUnique({
    where: {
      id: tokenData.id,
    },
  });

  return { token: newToken, expires: new Date(tokenData.exp), user };
};
