"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardHeader, CardContent, Snackbar, Button } from "@mui/material";
import { useMemo, useCallback, useState } from "react";
import { useForm } from "react-hook-form";

import { registerSchema } from "@/lib/zod";

import { registerAccount } from "../actions";
import { motion } from "framer-motion";
import RegisterFormDisplay from "./register-form.display";
import Link from "next/link";

type registerData = typeof registerSchema._type;

const RegisterForm = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState,
    setError,
    clearErrors,
    getValues,
  } = useForm<registerData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
    mode: "all",
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      const newUser = await registerAccount(data);
      console.log(newUser);
      setSnackbarOpen(true);
    } catch (error) {
      const { message } = error as { message: string };
      setError("root", { message });
    }
  });

  const canSubmitFlag = useMemo(
    () => formState.isValid && !formState.isSubmitting,
    [formState.isSubmitting, formState.isValid],
  );

  // since zod does not give us reflection, we cannot get the passwords not matching as an error. We can fix that with a useEffect
  const checkPasswordConfirmation = useCallback(() => {
    const formValues = getValues();
    if (
      !formState.isValid &&
      formValues.password !== "" &&
      formValues.confirmPassword !== "" &&
      formValues.password !== formValues.confirmPassword
    ) {
      setError("confirmPassword", { message: "passwords do not match" });
    } else if (formState.errors.confirmPassword !== undefined) {
      clearErrors("confirmPassword");
    }
  }, [
    clearErrors,
    formState.errors.confirmPassword,
    formState.isValid,
    getValues,
    setError,
  ]);

  const { onChange: passwordOnChange, ...registerPasswordProps } =
    register("password");
  const checkPasswordOnChange = useCallback(
    (e: { target: any; type?: any }) => {
      checkPasswordConfirmation();
      passwordOnChange(e);
    },
    [checkPasswordConfirmation, passwordOnChange],
  );

  const { onChange: confirmPasswordOnChange, ...registerConfirmPasswordProps } =
    register("confirmPassword");
  const checkConfirmPasswordOnChange = useCallback(
    (e: { target: any; type?: any }) => {
      checkPasswordConfirmation();
      confirmPasswordOnChange(e);
    },
    [checkPasswordConfirmation, confirmPasswordOnChange],
  );

  return (
    <Card
      variant="outlined"
      sx={{
        width: "50%",
        position: "absolute",
      }}
      component={motion.div}
      initial={{
        opacity: 0,
        height: 0,
        transform: "translateX(-50%) translateY(-30%)",
        top: "30%",
        left: "50%",
      }}
      animate={{
        opacity: 1,
        height: "auto",
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
    >
      <CardHeader title="Register" />
      <CardContent>
        <RegisterFormDisplay
          formState={formState}
          onSubmit={onSubmit}
          register={register}
          checkPasswordOnChange={checkPasswordOnChange}
          registerPasswordProps={registerPasswordProps}
          checkConfirmPasswordOnChange={checkConfirmPasswordOnChange}
          registerConfirmPasswordProps={registerConfirmPasswordProps}
          canSubmitFlag={canSubmitFlag}
        />
      </CardContent>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snackbarOpen}
        autoHideDuration={6000}
        message="Account created successfully"
        action={
          <Link href="/login?action=login">
            <Button variant="text" color="primary">
              Login
            </Button>
          </Link>
        }
      />
    </Card>
  );
};

export default RegisterForm;
