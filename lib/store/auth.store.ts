"use client";

import { createStore } from "zustand/vanilla";
import { users } from "@prisma/client";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";

export type authState = {
  token: string | null;
  expires: Date | null;
  user: users | null;
};

export type authActions = {
  logIn: (token: string, expires: Date, user: users) => void;
  logOut: () => void;
};

export type AuthStoreType = authState & authActions;

export const authInitState: authState = {
  token: null,
  expires: null,
  user: null,
};

const logIn =
  (set: Function) => (token: string, expires: Date, user: users) => {
    Cookies.set("token", token, { expires: new Date(expires) });
    set({ token, expires, user });
  };
const logOut = (set: Function) => () => {
  Cookies.remove("token");
  set({ token: null, expires: null, user: null });
};

const initializeStore = (set: Function, initState: authState) => ({
  ...initState,
  logIn: logIn(set),
  logOut: logOut(set),
});

export const createAuthStore = (initState: authState = authInitState) => {
  return createStore<AuthStoreType>()((set) => initializeStore(set, initState));
};
