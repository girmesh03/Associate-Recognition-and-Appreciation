import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { alpha } from "@mui/material";

// import { drawerWidth } from "../utils/constants";

export const StyledMainContainer = styled(Box)(({ theme }) => ({
  maxWidth: theme.breakpoints.values.xl,
  margin: "0 auto",
  backgroundImage:
    theme.palette.mode === "light"
      ? "linear-gradient(180deg, #CEE5FD, #FFF)"
      : `linear-gradient(#02294F, ${alpha("#090E10", 0.0)})`,
  backgroundSize: "100% 20%",
  backgroundRepeat: "no-repeat",
}));

export const FlexBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));
