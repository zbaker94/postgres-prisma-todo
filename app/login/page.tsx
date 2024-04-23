"use client";

import { useSearchParams } from "next/navigation";

import { AnimatePresence } from "framer-motion";

import LoginForm from "./login-form";
import RegisterForm from "./register-form";

export default function Login() {
  const searchParams = useSearchParams();
  const action = searchParams.get("action");

  return (
    <AnimatePresence>
      {action === "login" ? <LoginForm /> : null}
      {action === "register" ? <RegisterForm /> : null}
    </AnimatePresence>
  );
}
