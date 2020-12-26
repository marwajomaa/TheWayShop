import React from "react";
import { useHistory } from "react-router-dom";
import { Grid, makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import axios from "axios";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useForm } from "../../hooks/useForm";

const useStyles = makeStyles(() => ({
  container: {
    width: "100%",
    maxWidth: "400px",
    margin: "0 auto",
    justifyContent: "center",
    minHeight: "80vh",
    alignItems: "center",
  },
  Typography: {
    textAlign: "center",
    fontSize: "32px",
    fontWeight: "bold",
  },
}));

const initialValues = {
  email: "",
  password: "",
};

function Login() {
  const history = useHistory();
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("email" in fieldValues)
      temp.email = /$^|.+@.+..+/.test(fieldValues.email)
        ? ""
        : "Email is not valid.";
    if ("password" in fieldValues)
      temp.password =
        fieldValues.password.length >= 6
          ? ""
          : "Password should be at least 6 characters";
    setErrors({
      ...temp,
    });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };
  const {
    values,
    handleInputChange,
    clearInputs,
    errors,
    setErrors,
    submitError,
    setSubmitError,
  } = useForm(initialValues, true, validate);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(values);
    if (!validate()) {
      window.alert("form is not valid");
    }
    clearInputs();

    try {
      const res = await axios.post("/api/users/login", { ...values });
      console.log(res.data.user, "user");
      localStorage.setItem("user", res.data.user);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("firstLogin", true);
      history.push("/");
    } catch (err) {
      setSubmitError(err.response.data.error);
    }
  };

  const { container, Typography } = useStyles();
  return (
    <form onSubmit={handleSubmit}>
      <Grid
        container
        spacing={0}
        justify="center"
        direction="row"
        xs={12}
        className={container}
      >
        <Grid item xs={12} className={Typography}>
          <Typography component="h1" variant="h1">
            Sign in
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <form>
            <Grid container direction="column" spacing={2}>
              <Grid item xs={12}>
                <Input
                  label="Email"
                  name="email"
                  value={values.email}
                  onChange={handleInputChange}
                  error={errors.email}
                />
              </Grid>
              <Grid item xs={12} ms={12}>
                <Input
                  label="Password"
                  name="password"
                  value={values.password}
                  onChange={handleInputChange}
                  error={errors.password}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  style={{ width: "100%" }}
                  color="secondary"
                  type="submit"
                  text="Login"
                />
              </Grid>
              {submitError && (
                <Typography
                  style={{
                    color: "red",
                    padding: "10px 0",
                    textAlign: "center",
                  }}
                >
                  {submitError}
                </Typography>
              )}
            </Grid>
          </form>
        </Grid>
        <Grid item>
          <Button text="Register" type="outlined" href="/signup" />
        </Grid>
      </Grid>
    </form>
  );
}

export default Login;
