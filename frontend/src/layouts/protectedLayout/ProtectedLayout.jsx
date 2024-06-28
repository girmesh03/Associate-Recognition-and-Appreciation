import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import { Box, Container, useMediaQuery, useTheme } from "@mui/material";

import { NavDrawer, Navbar } from "../../components";
import { StyledMainContainer } from "../../components/styledComponents";
import { drawerWidth } from "../../utils/constants";

const ProtectedLayout = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const theme = useTheme();
  const isNoneMobile = useMediaQuery(theme.breakpoints.up("md"));

  useEffect(() => {
    setOpenDrawer(isNoneMobile);
  }, [isNoneMobile]);

  return (
    <StyledMainContainer sx={{ display: isNoneMobile ? "flex" : "block" }}>
      <NavDrawer
        open={openDrawer}
        setOpenDrawer={setOpenDrawer}
        isNoneMobile={isNoneMobile}
      />
      <Box
        sx={{
          flexGrow: 1,
          width: openDrawer ? `calc(100% - ${drawerWidth})` : "100%",
        }}
      >
        <Navbar setOpenDrawer={setOpenDrawer} />
        <Container
          maxWidth={false}
          disableGutters
          sx={{
            height: "calc(100vh - 4rem)",
            overflow: "auto",
          }}
        >
          <Outlet />
        </Container>
      </Box>
    </StyledMainContainer>
  );
};

export default ProtectedLayout;
