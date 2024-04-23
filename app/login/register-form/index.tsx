"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardHeader,
  CardContent,
  TextField,
  Button,
  FormHelperText,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useMemo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { registerSchema } from "@/lib/zod";

import { registerAccount } from "../actions";
import { motion } from "framer-motion";
import Link from "next/link";

type registerData = typeof registerSchema._type;

const RegisterForm = () => {
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

  console.log(formState);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const newUser = await registerAccount(data);
      console.log(newUser);
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
      //   layoutId="form-card"
    >
      <CardHeader title="Register" />
      <CardContent>
        <form onSubmit={onSubmit}>
          <Grid container spacing={2} flexDirection="column">
            <Grid>
              <Grid container spacing={2} flexDirection="column">
                <Grid>
                  <TextField
                    component={motion.div}
                    transition={{ delay: 0.2 }}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    required
                    fullWidth
                    autoFocus
                    type="text"
                    FormHelperTextProps={{
                      component: motion.span,
                      layout: true,
                      initial: { opacity: 0, y: 5, height: 0 },
                      animate: { opacity: 1, y: 0, height: "100%" },
                      exit: { opacity: 0, y: 5, height: 0 },
                    }}
                    error={!!formState.errors?.name}
                    label="Name"
                    helperText={formState.errors.name?.message}
                    {...register("name")}
                  />
                </Grid>
                <Grid>
                  <TextField
                    component={motion.div}
                    transition={{ delay: 0.25 }}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    required
                    fullWidth
                    type="email"
                    FormHelperTextProps={{
                      component: motion.span,
                      layout: true,
                      initial: { opacity: 0, y: 5, height: 0 },
                      animate: { opacity: 1, y: 0, height: "100%" },
                      exit: { opacity: 0, y: 5, height: 0 },
                    }}
                    error={!!formState.errors?.email}
                    label="Email"
                    helperText={formState.errors.email?.message}
                    {...register("email")}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid>
              <Grid container spacing={2} flexDirection="column">
                <Grid>
                  <TextField
                    component={motion.div}
                    transition={{ delay: 0.28 }}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    required
                    fullWidth
                    type="text"
                    FormHelperTextProps={{
                      component: motion.span,
                      layout: true,
                      initial: { opacity: 0, y: 5, height: 0 },
                      animate: { opacity: 1, y: 0, height: "100%" },
                      exit: { opacity: 0, y: 5, height: 0 },
                    }}
                    error={!!formState.errors?.username}
                    label="Username"
                    helperText={formState.errors.username?.message}
                    {...register("username")}
                  />
                </Grid>
                <Grid>
                  <TextField
                    component={motion.div}
                    transition={{ delay: 0.4 }}
                    initial={{ opacity: 0, x: 25 }}
                    animate={{ opacity: 1, x: 0 }}
                    FormHelperTextProps={{
                      component: motion.span,
                      layout: true,
                      initial: { opacity: 0, y: 5, height: 0 },
                      animate: { opacity: 1, y: 0, height: "100%" },
                      exit: { opacity: 0, y: 5, height: 0 },
                    }}
                    required
                    fullWidth
                    label="Password"
                    type="password"
                    error={!!formState.errors?.password}
                    onChange={checkPasswordOnChange}
                    helperText={formState.errors.password?.message}
                    {...registerPasswordProps}
                  />
                </Grid>
                <Grid>
                  <TextField
                    component={motion.div}
                    transition={{ delay: 0.47 }}
                    initial={{ opacity: 0, x: 25 }}
                    animate={{ opacity: 1, x: 0 }}
                    FormHelperTextProps={{
                      component: motion.span,
                      layout: true,
                      initial: { opacity: 0, y: 5, height: 0 },
                      animate: { opacity: 1, y: 0, height: "100%" },
                      exit: { opacity: 0, y: 5, height: 0 },
                    }}
                    required
                    fullWidth
                    label="Confirm Password"
                    type="password"
                    error={!!formState.errors?.confirmPassword}
                    onChange={checkConfirmPasswordOnChange}
                    helperText={formState.errors.confirmPassword?.message}
                    {...registerConfirmPasswordProps}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid>
              <FormHelperText error>
                {formState.errors.root?.message}
              </FormHelperText>
            </Grid>
            <Grid container spacing={2} justifyContent={"space-between"}>
              <Grid>
                <Button
                  component={motion.button}
                  transition={{ delay: 0.5 }}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  color="primary"
                  variant="contained"
                  type="submit"
                  disabled={!canSubmitFlag}
                >
                  Register
                </Button>
              </Grid>
              <Grid>
                <Link href="/login?action=login">
                  <Button
                    color="info"
                    variant="text"
                    component={motion.button}
                    transition={{ delay: 0.4 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    Already Have An Account?
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default RegisterForm;
