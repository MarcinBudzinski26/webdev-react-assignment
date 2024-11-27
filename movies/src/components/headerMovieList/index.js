import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useLocation, useNavigate } from "react-router-dom";

const Header = ({ title }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Define the circular navigation order
  const pages = [
    { path: "/", label: "Home" },
    { path: "/movies/favorites", label: "Favorites" },
    { path: "/movies/upcoming", label: "Upcoming Movies" },
    { path: "/movies/mustwatch", label: "Must Watch" },
    { path: "/movies/trending", label: "Trending Movies" }, // Added Trending Movies
  ];

  // Find the current page's index in the order
  const currentIndex = pages.findIndex((page) => page.path === location.pathname);

  // Ensure navigation works even if the current page is not in the pages array
  const nextPage =
    currentIndex !== -1 ? pages[(currentIndex + 1) % pages.length].path : "/";
  const prevPage =
    currentIndex !== -1
      ? pages[(currentIndex - 1 + pages.length) % pages.length].path
      : "/";

  return (
    <Paper
      component="div"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "15px",
        padding: "10px",
        backgroundColor: "#2E2E2E",
        color: "#FF8C00", // Orange text on black background
      }}
    >
      {/* Left Arrow (Back) */}
      <IconButton
        aria-label="go back"
        onClick={() => navigate(prevPage)} // Navigate to the previous page
        sx={{ color: "#FF8C00" }}
      >
        <ArrowBackIcon fontSize="large" />
      </IconButton>

      {/* Page Title */}
      <Typography
        variant="h5"
        sx={{
          textAlign: "center",
          flexGrow: 1,
          color: "#FF8C00",
          fontWeight: "bold",
        }}
      >
        {title}
      </Typography>

      {/* Right Arrow (Forward) */}
      <IconButton
        aria-label="go forward"
        onClick={() => navigate(nextPage)} // Navigate to the next page
        sx={{ color: "#FF8C00" }}
      >
        <ArrowForwardIcon fontSize="large" />
      </IconButton>
    </Paper>
  );
};

export default Header;
