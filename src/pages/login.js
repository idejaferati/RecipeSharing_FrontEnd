import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useAuth from "../components/hooks/use-auth";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

const theme = createTheme();

export default function Login() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  async function loginAsync(event, setAuth) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const jsonData = {
      email: data.get("email"),
      password: data.get("password"),
    };

    try {
      await axios
        .post(
          "https://localhost:7164/api/Auth/Login",
          JSON.stringify(jsonData),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          const accessToken = res.data.token;
          Cookies.set("jwtToken", accessToken, { expires: 7 });
          const role = res.data.role;
          setAuth({
            user: jsonData.email,
            password: jsonData.password,
            role,
            accessToken,
          });
          navigate(from, { replace: true });
          console.log(jsonData);
        });
    } catch (error) {
      console.error(error);
    }
  }

  const handleSubmit = async (event) => {
    await loginAsync(event, setAuth);
  };

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
          }}>
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}>
              Login
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/changePassword" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
