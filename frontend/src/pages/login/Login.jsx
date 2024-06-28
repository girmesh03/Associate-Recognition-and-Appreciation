import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  InputAdornment,
  IconButton,
  Stack,
  useTheme,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { makeRequest } from "../../api/makeRequest";
import { login } from "../../context/features/auth/authSlice";

const Login = () => {
  const dispatch = useDispatch();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const theme = useTheme();
  const primaryMain = theme.palette.primary.main;

  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      const response = await makeRequest.post("/auth/login", values);
      console.log("resposne", response.data);
      dispatch(login(response.data));
      reset();
      navigate("/recognitions");
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100%",
        maxWidth: 600,
        p: 1,
        mx: "auto",
      }}
    >
      <Paper
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{
          width: "100%",
          px: { xs: 1, sm: 3 },
          borderRadius: 4,
          boxShadow: 12,
          backgroundColor: "background.paper",
        }}
      >
        <Typography
          variant="h4"
          textAlign="center"
          sx={{
            fontWeight: "bold",
            letterSpacing: 3,
            my: 4,
          }}
        >
          Login
        </Typography>

        <Stack direction="column" rowGap={3} sx={{ mx: 1 }}>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{
              required: "Please enter your email",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                id="email"
                name="email"
                label="Email"
                variant="outlined"
                size="small"
                fullWidth
                autoComplete="off"
                error={!!errors.email}
                helperText={errors.email?.message || ""}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{
              required: "Please enter your password",
            }}
            render={({ field }) => (
              <TextField
                {...field}
                id="password"
                name="password"
                label="Password"
                variant="outlined"
                fullWidth
                size="small"
                type={showPassword ? "text" : "password"}
                error={!!errors.password}
                helperText={errors.password?.message || ""}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </Stack>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            my: 4,
            mx: 1,
          }}
        >
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ alignSelf: "center" }}
          >
            Submit
          </Button>
          <Typography sx={{ my: 3 }}>
            Don not have an account?
            <Link
              to="/signup"
              style={{
                color: primaryMain,
                marginLeft: "0.5rem",
              }}
            >
              Signup
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
