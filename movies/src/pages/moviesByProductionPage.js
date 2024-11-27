import React from "react";
import { useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import { getMoviesByCompany } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";

const MoviesByProductionPage = () => {
  const { id } = useParams(); // Get production company ID from the URL
  const navigate = useNavigate(); // Navigate to other pages

  // Fetch movies produced by the company
  const { data, isLoading, isError } = useQuery(["moviesByProduction", { id }], () =>
    getMoviesByCompany(id)
  );

  if (isLoading) return <Spinner />; // Show spinner while data is loading

  if (isError || !data.results || data.results.length === 0) {
    return (
      <Typography
        variant="h5"
        color="error"
        sx={{ textAlign: "center", marginTop: "20px" }}
      >
        No movies found for this production company.
      </Typography> // Display message if no movies are found
    );
  }

  return (
    <div style={{ backgroundColor: "#1c1c1c", color: "#FFF", padding: "20px" }}>
      <Typography variant="h4" sx={{ color: "#FFA500", marginBottom: "20px" }}>
        Movies by Production Company
      </Typography>
      <Grid container spacing={2}>
        {data.results.map((movie) => (
          <Grid item xs={12} sm={6} md={3} key={movie.id}>
            <Card
              sx={{
                backgroundColor: "#333",
                color: "#FFF",
                cursor: "pointer",
                "&:hover": { boxShadow: "0px 0px 10px #FFA500" },
              }}
              onClick={() => navigate(`/movies/${movie.id}`)} // Navigate to movie details
            >
              <CardMedia
                image={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` // Display movie poster
                    : "https://via.placeholder.com/500x750" // Fallback image
                }
                sx={{ height: 300 }}
              />
              <CardContent>
                <Typography variant="h6" sx={{ color: "#FFA500" }}>
                  {movie.title} {/* Movie title */}
                </Typography>
                <Typography variant="body2">
                  {movie.release_date ? movie.release_date.split("-")[0] : "N/A"} {/* Release year */}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default MoviesByProductionPage;
