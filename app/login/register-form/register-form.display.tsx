import { TextField, Button, FormHelperText } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import { motion } from "framer-motion";
import Link from "next/link";

type registerFormProps = {
  formState: any;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  register: any;
  checkPasswordOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  registerPasswordProps: any;
  checkConfirmPasswordOnChange: (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  registerConfirmPasswordProps: any;
  canSubmitFlag: boolean;
};

const RegisterFormDisplay = ({
  formState,
  onSubmit,
  register,
  checkPasswordOnChange,
  registerPasswordProps,
  checkConfirmPasswordOnChange,
  registerConfirmPasswordProps,
  canSubmitFlag,
}: registerFormProps) => {
  return (
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
  );
};

export default RegisterFormDisplay;
