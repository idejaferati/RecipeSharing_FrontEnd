import * as Yup from "yup";
import * as React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

export default function SignUp() {
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    gender: Yup.string().required("Gender is required"),
    phoneNumber: Yup.string().required("Phone Number is required"),
    // roleId: Yup.string().required("Role is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number"
    ),
  });

  const signUpAsync = async (values) => {
    const {
      firstName,
      lastName,
      gender,
      email,
      roleId,
      phoneNumber,
      password,
    } = values;

    const jsonData = {
      FirstName: firstName,
      LastName: lastName,
      Gender: gender,
      Email: email,
      RoleId: "24bade73-46d0-40dd-95e7-42352504fe2d",
      PhoneNumber: phoneNumber.toString(), // Convert the phone number to a string
      Password: password,
    };

    try {
      await axios.post("https://localhost:7164/api/Users/register", jsonData);
      console.log(jsonData);
      navigate("/login");
    } catch (error) {
      console.log(jsonData);
      console.error(error);
    }
  };

  // useEffect(() => {
  //   const fetchRoles = async () => {
  //     try {
  //       const response = await axios.get(
  //         "https://localhost:7164/api/Auth/getRoles"
  //       );
  //       setRoles(response.data);
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   };

  //   fetchRoles();
  // }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              gender: "female",
              phoneNumber: "",
              roleId: "",
              email: "",
              password: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => signUpAsync(values)}
          >
            {({ isSubmitting }) => (
              <Form sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Field
                      as={TextField}
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                    />
                    <ErrorMessage
                      name="firstName"
                      component="div"
                      className="error-message"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      as={TextField}
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"
                    />
                    <ErrorMessage
                      name="lastName"
                      component="div"
                      className="error-message"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormLabel id="gender-label">Gender</FormLabel>
                    <Field
                      as={RadioGroup}
                      aria-labelledby="gender-label"
                      name="gender"
                    >
                      <FormControlLabel
                        value="female"
                        control={<Radio />}
                        label="Female"
                      />
                      <FormControlLabel
                        value="male"
                        control={<Radio />}
                        label="Male"
                      />
                    </Field>
                    <ErrorMessage
                      name="gender"
                      component="div"
                      className="error-message"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      required
                      fullWidth
                      id="phoneNumber"
                      label="Phone Number"
                      name="phoneNumber"
                      autoComplete="phoneNumber"
                      type="number"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <ErrorMessage
                      name="phoneNumber"
                      component="div"
                      className="error-message"
                    />
                  </Grid>
                  {/* <Grid item xs={12}>
                    <FormControl required fullWidth>
                      <InputLabel id="roleId-label">Select Role</InputLabel>
                      <Field
                        as={Select}
                        labelId="roleId-label"
                        id="roleId"
                        name="roleId"
                      >
                        {roles.map((role) => (
                          <MenuItem key={role.id} value={role.id}>
                            {role.name}
                          </MenuItem>
                        ))}
                      </Field>
                    </FormControl>
                    <ErrorMessage
                      name="roleId"
                      component="div"
                      className="error-message"
                    />
                  </Grid> */}
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="error-message"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="error-message"
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={isSubmitting}
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="/login" variant="body2">
                      Already have an account? Log in
                    </Link>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
