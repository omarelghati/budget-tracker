import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm, useField } from "react-final-form-hooks";
import {
  Box,
  Typography,
  Button,
  Avatar,
  CssBaseline,
  TextField,
  Container,
  Card,
  CardContent,
  FormControlLabel,
  Checkbox,
  Grid,
} from "@material-ui/core";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
// import { Copyright } from "../shared/Copyright";
import { useFormStyles, ErrorText, useLoader, Loader } from "../utils";
import { LoginAction } from "../redux/slices/user";

export default function Login() {
  const classes = useFormStyles();
  const dispatch = useDispatch();
  const { loading, setLoading, formError } = useLoader();
  const validate = ({ email, password }) => {
    const errors = {};
    if (!email) {
      errors.email = "email is required.";
    }
    if (!password) {
      errors.password = "Password is required.";
    }

    return errors;
  };
  const onSubmit = (values) => {
    dispatch(LoginAction(values));
    setLoading(true);
  };

  const { form, handleSubmit, submitting, submitFailed, errors } = useForm({
    onSubmit,
    validate,
  });

  const email = useField("email", form);
  const password = useField("password", form);

  const emailProps = {
    ...email.input,
    error: email.meta.error && email.meta.submitFailed,
    fullWidth: true,
    variant: "filled",
    label: "email",
    className: classes.textField,
    autoComplete: "email",
  };
  const passwordProps = {
    ...password.input,
    error: password.meta.error && password.meta.submitFailed,
    fullWidth: true,
    variant: "filled",
    label: "Password",
    type: "password",
    className: classes.textField,
    autoComplete: "current-password",
  };
  const buttonProps = {
    disabled:
      email.meta.pristine || password.meta.pristine || submitting || loading,
    variant: "contained",
    fullWidth: true,
    color: "primary",
    className: classes.button,
    type: "submit",
  };

  return (
    <Container component="main" maxWidth="xs">
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
          </div>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField {...emailProps} />
            <TextField {...passwordProps} />
            {submitFailed && (
              <ErrorText
                text={Object.values(errors)[0]}
                className={classes.typography}
              />
            )}
            {formError && (
              <ErrorText text={formError} className={classes.typography} />
            )}
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button {...buttonProps}>
              {!formError && loading && <Loader />}
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="/forgotpassword">Forgot password?</Link>
              </Grid>
              <Grid item>
                <Link to="/register">Register</Link>
              </Grid>
            </Grid>
          </form>
          <Box mt={8}>{/* <Copyright /> */}</Box>
        </CardContent>
      </Card>
    </Container>
  );
}
// export default connect(mapStateToProps, actions)(Login);
