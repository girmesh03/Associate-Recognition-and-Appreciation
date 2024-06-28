import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import { AppBar, Badge, IconButton, Toolbar, Typography } from "@mui/material";
import {
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  Menu as MenuIcon,
  NotificationsOutlined as NotificationsIcon,
  SearchOutlined as SearchIcon,
  EmojiEventsOutlined as EmojiEventsIcon,
} from "@mui/icons-material";

import { useSelector, useDispatch } from "react-redux";
import { toggleMode } from "../../context/features/auth/authSlice";

import { FlexBox } from "../styledComponents";

const Navbar = ({ setOpenDrawer }) => {
  const { mode } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <AppBar position="sticky" sx={{ background: "none" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <FlexBox>
          <IconButton
            aria-label="open drawer"
            onClick={() => setOpenDrawer(true)}
            sx={{
              display: { xs: "inline-flex", md: "none" },
              mr: 1,
            }}
          >
            <MenuIcon sx={{ color: "text.primary" }} />
          </IconButton>
          <FlexBox
            gap="0.5rem"
            onClick={() => navigate("/home")}
            sx={{
              cursor: "pointer",
              color: mode === "light" ? "primary.main" : "text.primary",
              display: { xs: "none", sm: "inline-flex" },
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
              }}
            >
              Monthmaster
            </Typography>
          </FlexBox>
        </FlexBox>

        <FlexBox
          gap="1.5rem"
          sx={{
            "& .MuiSvgIcon-root": {
              color: "text.primary",
            },
          }}
        >
          <IconButton onClick={() => {}}>
            <SearchIcon
              sx={{
                transform: "translateX(2px) translateY(1.5px)",
              }}
            />
          </IconButton>
          <IconButton onClick={() => {}}>
            <Badge>
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <IconButton onClick={() => dispatch(toggleMode())}>
            {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>
        </FlexBox>
      </Toolbar>
    </AppBar>
  );
};

Navbar.propTypes = {
  setOpenDrawer: PropTypes.func,
};

export default Navbar;
