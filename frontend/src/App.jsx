import { lazy, Suspense } from "react";
import PropTypes from "prop-types";

import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Box, CircularProgress } from "@mui/material";

import { useSelector } from "react-redux";

import PublicLayout from "./layouts/publicLayout/PublicLayout";
import ProtectedLayout from "./layouts/protectedLayout/ProtectedLayout";

import { themeSettings } from "./theme";

const Home = lazy(() => import("./pages/home/Home"));
const Login = lazy(() => import("./pages/login/Login"));
const Signup = lazy(() => import("./pages/signup/Signup"));
const Profile = lazy(() => import("./pages/profile/Profile"));
const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"));
const Nominations = lazy(() => import("./pages/nominations/Nominations"));
const Recognitions = lazy(() => import("./pages/recognitions/Recognitions"));
const Winners = lazy(() => import("./pages/winners/Winners"));
const NotFound = lazy(() => import("./pages/notFound/NotFound"));

function App() {
  const { mode, currentUser } = useSelector((state) => state.auth);
  const theme = createTheme(themeSettings(mode));

  const PublicRoute = ({ children }) => {
    if (currentUser) {
      return <Navigate to="/recognitions" replace />;
    }
    return children;
  };

  PublicRoute.propTypes = {
    children: PropTypes.node.isRequired,
  };

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <PublicRoute>
          <PublicLayout />
        </PublicRoute>
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/login",
          element: <Login />,
          caseSensitive: true,
        },
        {
          path: "/signup",
          element: <Signup />,
          caseSensitive: true,
        },
      ],
    },
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <ProtectedLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/home",
          element: <Home />,
          caseSensitive: true,
        },
        {
          path: "/profile/:userId",
          element: <Profile />,
          caseSensitive: true,
        },
        {
          path: "/recognitions",
          element: <Recognitions />,
          caseSensitive: true,
        },
        {
          path: "/nominations",
          element: <Nominations />,
          caseSensitive: true,
        },
        {
          path: "/winners",
          element: <Winners />,
          caseSensitive: true,
        },
        {
          path: "/admin",
          element: <Dashboard />,
          caseSensitive: true,
        },
      ],
    },
    {
      path: "404",
      element: <NotFound />,
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Suspense
        fallback={
          <Box
            sx={{
              width: "100%",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "transparent",
            }}
          >
            <CircularProgress size={40} />
          </Box>
        }
      >
        <RouterProvider router={router} />
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
