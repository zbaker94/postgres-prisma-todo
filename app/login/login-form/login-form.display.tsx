import Link from "next/link";
import { TextField, Button, FormHelperText } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import { motion } from "framer-motion";

type loginFormProps = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  formState: any;
  register: any;
  canSubmitFlag: boolean;
};

const LoginFormDisplay = ({
  onSubmit,
  formState,
  register,
  canSubmitFlag,
}: loginFormProps) => {
  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onSubmit={onSubmit}
    >
      <Grid container spacing={2} flexDirection="column">
        <Grid textAlign="left">
          <TextField
            component={motion.div}
            transition={{ delay: 0.1 }}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            required
            fullWidth
            error={!!formState.errors?.username}
            label="Username"
            autoFocus
            type="text"
            FormHelperTextProps={{
              component: motion.span,
              layout: true,
              initial: { opacity: 0, y: 5, height: 0 },
              animate: { opacity: 1, y: 0, height: "100%" },
              exit: { opacity: 0, y: 5, height: 0 },
            }}
            helperText={formState.errors.username?.message}
            {...register("username")}
          />
        </Grid>
        <Grid textAlign="left">
          <TextField
            component={motion.div}
            transition={{ delay: 0.2 }}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            required
            fullWidth
            error={!!formState.errors?.password}
            label="Password"
            type="password"
            FormHelperTextProps={{
              component: motion.span,
              layout: true,
              initial: { opacity: 0, y: 5, height: 0 },
              animate: { opacity: 1, y: 0, height: "100%" },
              exit: { opacity: 0, y: 5, height: 0 },
            }}
            helperText={formState.errors.password?.message}
            {...register("password")}
          />
        </Grid>
        <Grid width="100%">
          <Grid container spacing={3} justifyContent="center">
            <Grid xs={4}>
              <Link href="/login?action=register">
                <Button
                  variant="outlined"
                  component={motion.button}
                  transition={{ delay: 0.2 }}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  color="secondary"
                >
                  Register
                </Button>
              </Link>
            </Grid>

            <Grid>
              <Button
                fullWidth
                component={motion.button}
                transition={{ delay: 0.3 }}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                disabled={!canSubmitFlag}
                variant="contained"
                color="primary"
                type="submit"
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid textAlign="right">
          <Link href="/forgot-password">
            <Button
              component={motion.button}
              transition={{ delay: 0.3 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              variant="text"
              color="info"
            >
              Need Help?
            </Button>
          </Link>
        </Grid>
        <Grid textAlign="right">
          {formState.errors.root?.message ? (
            <FormHelperText
              component={motion.p}
              initial={{ opacity: 0, y: 5, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "100%" }}
              exit={{ opacity: 0, y: -5, height: 0 }}
              layout
              error
            >
              {formState.errors.root?.message}
            </FormHelperText>
          ) : null}
        </Grid>
      </Grid>
    </motion.form>
  );
};

export default LoginFormDisplay;
