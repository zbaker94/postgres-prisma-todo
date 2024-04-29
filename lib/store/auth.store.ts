"use client";

import { createStore } from "zustand/vanilla";
import { users } from "@prisma/client";
import Cookies from "js-cookie";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { refreshLogin } from "./actions";

export type authState = {
  token: string | null;
  expires: Date | null;
  user: users | null;
};

export type authActions = {
  logIn: (token: string, expires: Date, user: users) => void;
  logOut: () => void;
  refreshToken: () => void;
};

export type AuthStoreType = authState & authActions;

let token = null;
let expires = null;
let user = null;

token = Cookies.get("token") || null;
if (token) {
  const tokenData = jwtDecode(token) as JwtPayload & users;
  let expiresMS = tokenData.exp;
  if (!expiresMS) {
    console.warn("Token expires is invalid");
    // TODO make reusable function to set new expires date
    expiresMS = new Date().getDate() + 1000 * 60 * 10;
  }
  expires = new Date(expiresMS);
  user = {
    id: tokenData.id,
    email: tokenData.email,
    name: tokenData.name,
    createdAt: tokenData.createdAt,
    image: tokenData.image,
  };
}

export const authInitState: authState = {
  token,
  expires,
  user,
};

const logIn =
  (set: Function, get: Function) =>
  (token: string, expires: Date, user: users) => {
    Cookies.set("token", token, { expires: new Date(expires) });
    set({ token, expires, user });
  };
const logOut = (set: Function, get: Function) => () => {
  Cookies.remove("token");
  set({ token: null, expires: null, user: null });
};
const refreshToken = (set: Function, get: Function) => async () => {
  const newState = await refreshLogin(get().token);
  Cookies.set("token", newState.token, { expires: newState.expires });
  set(newState);
};

const initializeStore = (
  set: Function,
  get: Function,
  initState: authState,
) => ({
  ...initState,
  logIn: logIn(set, get),
  logOut: logOut(set, get),
  refreshToken: refreshToken(set, get),
});

export const createAuthStore = (initState: authState = authInitState) => {
  return createStore<AuthStoreType>()((set, get) =>
    initializeStore(set, get, initState),
  );
};
