import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";

import {
  EmojiEventsOutlined as EmojiEventsIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
} from "@mui/icons-material";

import { useSelector, useDispatch } from "react-redux";
import { toggleMode } from "../../context/features/auth/authSlice";

import { FlexBox } from "../styledComponents";

const PublicNavbar = () => {
  const dispatch = useDispatch();
  const { mode } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const isExtraSmall = useMediaQuery("(max-width: 480px)");

  return (
    <AppBar
      position="sticky"
      sx={{
        boxShadow: 0,
        bgcolor: "transparent",
        "& .MuiToolbar-root": {
          minHeight: "4rem",
        },
      }}
    >
      <Container maxWidth="lg" sx={{ padding: { xs: 0, md: 2 } }}>
        <Toolbar
          variant="regular"
          sx={{
            justifyContent: "space-between",
            px: { xs: 3, md: 6 },
            borderRadius: { xs: 0, md: "999px" },
            flexShrink: 0,
            bgcolor:
              mode === "light"
                ? "rgba(255, 255, 255, 0.4)"
                : "rgba(0, 0, 0, 0.4)",
            backdropFilter: "blur(24px)",
            maxHeight: 40,
            border: "1px solid",
            borderColor: "divider",
            boxShadow:
              mode === "light"
                ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                : "0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)",
          }}
        >
          <FlexBox
            gap="0.5rem"
            onClick={() => navigate("/")}
            sx={{
              cursor: "pointer",
              color: mode === "light" ? "primary.main" : "text.primary",
            }}
          >
            <EmojiEventsIcon
              fontSize="large"
              sx={{ transform: "translateY(-1.5px)" }}
            />
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                letterSpacing: 3,
                fontSize: "clamp(1.5rem, 2vw, 2rem)",
                display: isExtraSmall ? "none" : "inline-block",
              }}
            >
              Monthmaster
            </Typography>
          </FlexBox>
          <FlexBox gap="1rem">
            <IconButton
              onClick={() => dispatch(toggleMode())}
              sx={{ color: "text.primary" }}
            >
              {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
            <Button
              color="primary"
              variant="contained"
              size="small"
              component="a"
              href="/login"
            >
              Login
            </Button>
          </FlexBox>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default PublicNavbar;
