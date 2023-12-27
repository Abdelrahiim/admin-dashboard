import { Container, Typography } from "@mui/material";

const NotFoundPage = () => {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        my: "15rem",
      }}
    >
      <Typography variant="h1" sx={{ fontSize: "4rem", fontWeight: "bold" }}>
        404
      </Typography>
      <Typography variant="h5" sx={{ marginBottom: 4 }}>
        Oops! Page not found.
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 4 }}>
        The page you are looking for might be in another castle.
      </Typography>
    </Container>
  );
};

export default NotFoundPage;
