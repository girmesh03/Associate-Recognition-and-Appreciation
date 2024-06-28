import propTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import {
  Home as HomeIcon,
  Person as PersonIcon,
  Logout as LogoutIcon,
  EmojiEvents as AwardIcon,
  PostAdd as PostAddIcon,
  VolunteerActivism as RecognitionsIcon,
  Dashboard as DashboardIcon,
} from "@mui/icons-material";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setLogout } from "../../context/features/auth/authSlice";

import { makeRequest } from "../../api/makeRequest";

const Navigations = ({ isNoneMobile, setOpenDrawer }) => {
  const { currentUser } = useSelector((state) => state.auth);
  const selected = useLocation().pathname.split("/")[1];

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNavigation = (pageName) => {
    if (pageName === "home") {
      navigate("/home");
    } else if (pageName === "profile") {
      navigate(`/profile/${currentUser._id}`);
    } else {
      navigate(`/${pageName}`);
    }
    setOpenDrawer(isNoneMobile ? true : false);
  };

  const handleLogout = async () => {
    const url = "/auth/logout";
    try {
      await makeRequest.delete(url);
      dispatch(setLogout());
      navigate("/");
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <List
      component="nav"
      sx={{
        py: 2,
        "& .MuiListItemButton-root": {
          borderRadius: "8px",
          border: "1px solid",
          borderColor: "primary.light",
          mx: 1,
          my: 1,
          "& .MuiListItemIcon-root": {
            color: "text.primary",
          },
          "& .MuiListItemText-primary": {
            fontWeight: 500,
            fontSize: "1rem",
          },

          "&.Mui-selected": {
            color: "white",
            backgroundColor: "primary.main",
            "& .MuiListItemIcon-root": {
              color: "white",
            },
          },
          "&:hover": {
            backgroundColor: "primary.light",
          },
        },
      }}
    >
      {currentUser?.role === "admin" && (
        <ListItemButton
          onClick={() => handleNavigation("admin")}
          selected={selected === "admin"}
        >
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
      )}

      <ListItemButton
        onClick={() => handleNavigation("home")}
        selected={selected === "home"}
      >
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItemButton>
      <ListItemButton
        onClick={() => handleNavigation("profile")}
        selected={selected === "profile"}
      >
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </ListItemButton>
      <ListItemButton
        onClick={() => handleNavigation("recognitions")}
        selected={selected === "recognitions"}
      >
        <ListItemIcon>
          <RecognitionsIcon />
        </ListItemIcon>
        <ListItemText primary="Recognitions" />
      </ListItemButton>
      <ListItemButton
        onClick={() => handleNavigation("nominations")}
        selected={selected === "nominations"}
      >
        <ListItemIcon>
          <PostAddIcon />
        </ListItemIcon>
        <ListItemText primary="Nominations" />
      </ListItemButton>
      <ListItemButton
        onClick={() => handleNavigation("winners")}
        selected={selected === "winners"}
      >
        <ListItemIcon>
          <AwardIcon />
        </ListItemIcon>
        <ListItemText primary="Winners" />
      </ListItemButton>
      <Divider sx={{ my: 1 }} />
      <ListItemButton onClick={handleLogout}>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
    </List>
  );
};

Navigations.propTypes = {
  isNoneMobile: propTypes.bool,
  setOpenDrawer: propTypes.func,
  selected: propTypes.string,
};

export default Navigations;
