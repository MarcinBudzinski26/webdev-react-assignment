import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";

const MovieHeader = (props) => {
  const movie = props.movie; // Access the movie object passed as a prop
  const navigate = useNavigate(); // Hook for navigation

  return (
    <Paper
      component="div"
      sx={{
        display: "flex", // Layout as a flex container
        justifyContent: "space-around", // Even spacing between elements
        flexWrap: "wrap", // Allow wrapping for responsive design
        padding: 1.5, // Inner padding for spacing
        margin: 0, // Remove default margin
      }}
    >
      {/* Backward Navigation Button */}
      <IconButton aria-label="go back" onClick={() => navigate(-1)}>
        <ArrowBackIcon color="primary" fontSize="large" />
      </IconButton>

      {/* Movie Title and Tagline */}
      <Typography variant="h4" component="h3">
        {movie.title}
        {/* Link to the movie's official homepage */}
        <a href={movie.homepage} target="_blank" rel="noopener noreferrer">
          <HomeIcon color="primary" />
        </a>
        <br />
        {/* Display the movie tagline in smaller font */}
        <span sx={{ fontSize: "1.5rem" }}>{`"${movie.tagline}"`}</span>
      </Typography>

      {/* Forward Navigation Button */}
      <IconButton aria-label="go forward" onClick={() => navigate(+1)}>
        <ArrowForwardIcon color="primary" fontSize="large" />
      </IconButton>
    </Paper>
  );
};

export default MovieHeader;
