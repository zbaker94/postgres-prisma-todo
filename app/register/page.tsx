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
import { useMemo, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { registerSchema } from "@/lib/zod";

import { registerAccount } from "./actions";

type registerData = typeof registerSchema._type;

const Register = () => {
  const { register, handleSubmit, formState, setError, clearErrors, getValues } =
    useForm<registerData>({
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
      registerAccount(data);
    } catch (error) {
      const { message } = error as { message: string };
      setError("root", { message });
    }
  });

  const canSubmitFlag = useMemo(
    () => formState.isValid && !formState.isSubmitting,
    [formState.isSubmitting, formState.isValid]
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
    }else if(formState.errors.confirmPassword !== undefined){
      clearErrors("confirmPassword")
    }
 }, [clearErrors, formState.errors.confirmPassword, formState.isValid, getValues, setError])
  console.log({ formState });

  return (
    <Card
      variant="outlined"
      sx={{
        width: "50%",
        position: "absolute",
        top: "45%",
        left: "50%",
        transform: "translateX(-50%) translateY(-45%)",
      }}
    >
      <CardHeader title="Register" />
      <CardContent>
        <form onSubmit={onSubmit}>
          <Grid container spacing={2} flexDirection="column">
            <Grid>
              <Grid container spacing={2} flexDirection="column">
                <Grid>
                  <TextField
                    required
                    fullWidth
                    label="Name"
                    autoFocus
                    type="text"
                    error={!!formState.errors?.name}
                    helperText={formState.errors.name?.message}
                    {...register("name")}
                  />
                </Grid>
                <Grid>
                  <TextField
                    required
                    fullWidth
                    label="Email"
                    type="email"
                    error={!!formState.errors?.email}
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
                    required
                    fullWidth
                    label="Username"
                    type="text"
                    error={!!formState.errors?.username}
                    helperText={formState.errors.username?.message}
                    {...register("username")}
                  />
                </Grid>
                <Grid>
                  <TextField
                    required
                    fullWidth
                    label="Password"
                    type="password"
                    error={!!formState.errors?.password}
                    onChange={checkPasswordConfirmation}
                    helperText={formState.errors.password?.message}
                    {...register("password")}
                  />
                </Grid>
                <Grid>
                  <TextField
                    required
                    fullWidth
                    label="Confirm Password"
                    type="password"
                    error={!!formState.errors?.confirmPassword}
                    onChange={checkPasswordConfirmation}
                    helperText={formState.errors.confirmPassword?.message}
                    {...register("confirmPassword")}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid>
              <FormHelperText error>{formState.errors.root?.message}</FormHelperText>
            </Grid>
            <Grid container spacing={2} justifyContent={"space-between"}>
              <Grid>
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  disabled={!canSubmitFlag}
                >
                  Register
                </Button>
              </Grid>
              <Grid>
                <Button color="info" variant="text">
                  Already Have An Account?
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default Register;
