import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";

import { StyledMainContainer } from "../../components/styledComponents";
import { PublicNavbar } from "../../components";

const PublicLayout = () => {
  return (
    <StyledMainContainer>
      <PublicNavbar />
      <Container
        disableGutters
        sx={{
          height: { xs: "calc(100vh - 4rem)", md: "calc(100vh - 6rem)" },
          overflow: "auto",
        }}
      >
        <Outlet />
      </Container>
    </StyledMainContainer>
  );
};

export default PublicLayout;
