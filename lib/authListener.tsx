"use client";

import { useEffect, useRef } from "react";
import { useAuthStore } from "./providers/auth.store.provider";

import { useRouter } from "next/navigation";
import usePrevious from "./hooks/usePrevious";
const AuthListener = () => {
  const { token, expires, logOut } = useAuthStore((store) => ({
    token: store.token,
    expires: store.expires,
    logOut: store.logOut,
  }));

  const router = useRouter();
  const previousToken = usePrevious(token);

  const IntervalIDRef = useRef<NodeJS.Timeout | null>(null);
  const expireTimeRef = useRef<number | null>(null);

  useEffect(() => {
    debugger;
    const intervalId = IntervalIDRef.current;
    // if we have a token and expiration date, we have either logged in or refreshed somehow
    if (token && expires) {
      if (intervalId) {
        clearInterval(intervalId);
      }

      expireTimeRef.current = expires.getTime() - Date.now();
      IntervalIDRef.current = setInterval(() => {
        if (expireTimeRef.current && expireTimeRef.current <= 0) {
          logOut();
        } else if (expireTimeRef.current) {
          console.log(`expireTimeRef.current`, expireTimeRef.current);
          expireTimeRef.current = expireTimeRef.current - 1000;
        }
      }, 1000);

      if (previousToken === null && token !== null) {
        router.push("/");
      }
    }
    // if we have a previous token but no token, we have logged out
    if (previousToken !== null && token === null) {
      router.push("/login?action=login");
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [token, expires, logOut, previousToken, router]);

  return null;
};

export default AuthListener;
