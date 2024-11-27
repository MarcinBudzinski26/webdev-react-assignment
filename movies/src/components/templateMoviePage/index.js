import React from "react";
import MovieHeader from "../headerMovie"; // Header component to display movie details
import Grid from "@mui/material/Grid2";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { getMovieImages } from "../../api/tmdb-api"; // API call to fetch movie images
import { useQuery } from "react-query";
import Spinner from "../spinner"; // Loading spinner component

const TemplateMoviePage = ({ movie, children }) => {
  // Fetch movie images using React Query
  const { data, error, isLoading, isError } = useQuery(
    ["images", { id: movie.id }], // Query key for caching
    getMovieImages // Function to fetch images
  );

  // Show spinner while loading
  if (isLoading) {
    return <Spinner />;
  }

  // Show error message if API call fails
  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const images = data.posters; // Extract posters from API response

  return (
    <>
      {/* Movie header with back/forward navigation and movie info */}
      <MovieHeader movie={movie} />

      {/* Layout with two sections: Poster images and movie details */}
      <Grid container spacing={5} style={{ padding: "15px" }}>
        {/* Poster images section */}
        <Grid size={{ xs: 3 }}>
          <div
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-around",
            }}
          >
            <ImageList
              sx={{
                height: "100vh", // Make image list fill the height of the viewport
              }}
              cols={1} // Single column for vertical scrolling
            >
              {images.map((image) => (
                <ImageListItem key={image.file_path} cols={1}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${image.file_path}`} // Load poster images
                    alt={image.poster_path} // Accessibility fallback
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </div>
        </Grid>

        {/* Main content section (children passed from parent) */}
        <Grid size={{ xs: 9 }}>{children}</Grid>
      </Grid>
    </>
  );
};

export default TemplateMoviePage;
