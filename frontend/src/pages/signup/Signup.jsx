import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
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

import { Visibility, VisibilityOff } from "@mui/icons-material";

import { OptionSelectField } from "../../components";
import { departments, positions } from "../../utils/constants";

import { makeRequest } from "../../api/makeRequest";
import { useDispatch } from "react-redux";
import { signup } from "../../appStates/features/auth/authSlice";

const Signup = () => {
  const dispatch = useDispatch();
  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
    reset,
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const theme = useTheme();
  const primaryMain = theme.palette.primary.main;

  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      const response = await makeRequest.post("/auth/signup", values);
      console.log("resposne", response.data);
      dispatch(signup(response.data));
      reset();
      navigate("/login");
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
        maxWidth: 700,
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
          Sign Up
        </Typography>

        <Stack
          rowGap={3}
          columnGap={2}
          sx={{
            px: 1,
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Controller
            name="firstName"
            control={control}
            defaultValue=""
            rules={{ required: "Please enter your first name" }}
            render={({ field }) => (
              <TextField
                {...field}
                id="firstName"
                label="First Name"
                variant="outlined"
                size="small"
                fullWidth
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
              />
            )}
          />

          <Controller
            name="lastName"
            control={control}
            defaultValue=""
            rules={{ required: "Please enter your last name" }}
            render={({ field }) => (
              <TextField
                {...field}
                id="lastName"
                label="Last Name"
                variant="outlined"
                size="small"
                fullWidth
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
              />
            )}
          />
        </Stack>

        <Stack
          rowGap={3}
          columnGap={2}
          sx={{
            px: 1,
            mt: 3,
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <OptionSelectField
            id="department"
            name="department"
            label="Department"
            variant="outlined"
            size="small"
            fullWidth
            options={departments}
            control={control}
            errors={errors}
          />

          <OptionSelectField
            id="position"
            name="position"
            label="Position"
            variant="outlined"
            size="small"
            fullWidth
            options={positions}
            control={control}
            errors={errors}
          />
        </Stack>

        <Stack
          direction="row"
          sx={{
            px: 1,
            my: 3,
          }}
        >
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
                autoComplete="off"
                fullWidth
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />
        </Stack>

        <Stack
          rowGap={3}
          columnGap={2}
          sx={{
            px: 1,
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{ required: "Please enter your password" }}
            render={({ field }) => (
              <TextField
                {...field}
                id="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                size="small"
                error={!!errors.password}
                helperText={errors.password?.message}
                fullWidth
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

          <Controller
            name="confirmPassword"
            control={control}
            defaultValue=""
            rules={{
              required: "Please confirm your password",
              validate: (fieldValue) => {
                return (
                  fieldValue === getValues().password ||
                  "Passwords do not match"
                );
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                id="confirmPassword"
                label="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                variant="outlined"
                size="small"
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
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
            mt: 4,
            mx: 1,
            mb: 6,
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
          <Typography sx={{ mt: 3 }}>
            Already have an account?
            <Link
              to="/login"
              style={{
                color: primaryMain,
                marginLeft: "0.5rem",
              }}
            >
              Login
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Signup;
