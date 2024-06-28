import { useNavigate } from "react-router-dom";
import { Box, Button, Container, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const NotFound = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  return (
    <Container>
      <Box
        component="header"
        sx={{
          top: 0,
          left: 0,
          width: 1,
          lineHeight: 0,
          position: "fixed",
          p: (theme) => ({
            xs: theme.spacing(3, 3, 0),
            sm: theme.spacing(5, 5, 0),
          }),
        }}
      >
        {/* TODO: change this to log */}
        <Button
          variant="contained"
          onClick={() => navigate(currentUser ? "/home" : "/")}
        >
          Go to Home
        </Button>
      </Box>
      <Box
        sx={{
          py: 12,
          maxWidth: 480,
          mx: "auto",
          display: "flex",
          minHeight: "100vh",
          textAlign: "center",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography variant="h3" sx={{ mb: 3 }}>
          Sorry, page not found!
        </Typography>

        <Typography sx={{ color: "text.secondary" }}>
          Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve
          mistyped the URL? Be sure to check your spelling.
        </Typography>

        <Box
          component="img"
          src="/assets/notFound_404.svg"
          sx={{
            mx: "auto 0",
            height: 260,
            my: { xs: 5, sm: 10 },
          }}
        />
        <Button
          size="large"
          variant="contained"
          onClick={() => navigate(currentUser ? "/home" : "/")}
        >
          Go to Home
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound;
