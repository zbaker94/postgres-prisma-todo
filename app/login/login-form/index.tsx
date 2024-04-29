"use client";
import { useMemo } from "react";

import { Card, CardHeader, CardContent } from "@mui/material";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/zod";
import { motion } from "framer-motion";
import cookies from "js-cookie";

import LoginFormDisplay from "./login-form.display";
import { login } from "../actions";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/providers/auth.store.provider";
import { users } from "@prisma/client";

export const dynamic = "force-dynamic";

type loginData = typeof loginSchema._type;

const LoginForm = () => {
  const setGlobalAuthState = useAuthStore((store) => store.logIn);

  const { register, handleSubmit, formState, setError } = useForm<loginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "all",
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      const user = await login(data);
      setGlobalAuthState(
        user.token,
        new Date(user.expires),
        user.user as users,
      );
    } catch (error) {
      const { message } = error as { message: string };
      setError("root", { message });
    }
  });

  const canSubmitFlag = useMemo(
    () => formState.isValid && !formState.isSubmitting,
    [formState.isSubmitting, formState.isValid],
  );

  return (
    <Card
      variant="outlined"
      sx={{
        width: "25%",
        position: "absolute",
      }}
      component={motion.div}
      initial={{
        opacity: 0,
        transform: "translateX(-50%) translateY(-60%)",
        top: "60%",
        left: "50%",
      }}
      animate={{
        opacity: 1,
        transform: "translateX(-50%) translateY(-45%)",
        top: "45%",
        left: "50%",
      }}
      exit={{
        opacity: 0,
        transform: "translateX(-50%) translateY(-60%)",
        top: "60%",
        left: "50%",
      }}
      // layoutId="form-card"
    >
      <CardHeader title="Login" />
      <CardContent>
        <LoginFormDisplay
          onSubmit={onSubmit}
          formState={formState}
          register={register}
          canSubmitFlag={canSubmitFlag}
        />
      </CardContent>
    </Card>
  );
};

export default LoginForm;
