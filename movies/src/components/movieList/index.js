import React from "react";
import Movie from "../movieCard/"; // Import the MovieCard component
import Grid from "@mui/material/Grid2"; // Use MUI Grid for layout

const MovieList = (props) => {
  // Map over the movies prop to generate movie cards
  let movieCards = props.movies.map((m) => (
    <Grid
      key={m.id} // Unique key for each movie to help React manage the DOM
      size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }} // Responsive grid sizing
      sx={{ padding: "20px" }} // Add spacing between grid items
    >
      <Movie key={m.id} movie={m} action={props.action} /> {/* Render individual movie cards */}
    </Grid>
  ));

  return movieCards; // Return the generated list of movie cards
};

export default MovieList;
