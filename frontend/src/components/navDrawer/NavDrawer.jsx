import propTypes from "prop-types";
import { IconButton, Toolbar, Divider, Drawer } from "@mui/material";
import { ChevronLeft as ChevronLeftIcon } from "@mui/icons-material";
import { Navigations } from "../../components";
import { drawerWidth } from "../../utils/constants";

const NavDrawer = ({ open, setOpenDrawer, isNoneMobile }) => {
  return (
    <Drawer
      open={open}
      onClose={() => setOpenDrawer(false)}
      variant="persistent"
      anchor="left"
      sx={{
        "& .MuiDrawer-paper": {
          backgroundColor: "background.paper",
          backgroundImage: (theme) =>
            theme.palette.mode === "light" &&
            "linear-gradient(180deg, #CEE5FD, #FFF)",
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          width: drawerWidth,
          boxSizing: "border-box",
          op: "unset",
          position: (theme) => ({
            [theme.breakpoints.up("md")]: {
              position: "relative",
            },
          }),
        },
        ...(open && {
          transition: (theme) =>
            theme.transitions.create("width", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
        }),
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          justifyContent: "flex-end",
          padding: "1rem 0.5rem",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        {!isNoneMobile && (
          <IconButton onClick={() => setOpenDrawer(false)}>
            <ChevronLeftIcon />
          </IconButton>
        )}
      </Toolbar>
      <Divider />
      <Navigations isNoneMobile={isNoneMobile} setOpenDrawer={setOpenDrawer} />
    </Drawer>
  );
};

NavDrawer.propTypes = {
  open: propTypes.bool,
  setOpenDrawer: propTypes.func,
  isNoneMobile: propTypes.bool,
};

export default NavDrawer;
