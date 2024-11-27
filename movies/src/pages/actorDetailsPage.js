import React from "react";
import { useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import { getActorDetails, getActorMovies } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";

const ActorDetailsPage = () => {
  const { id } = useParams(); // Extract actor ID from URL parameters
  const navigate = useNavigate(); // Programmatic navigation

  // Fetch actor details
  const { data: actor, isLoading: isActorLoading, isError: isActorError } = useQuery(
    ["actor", { id }],
    () => getActorDetails(id)
  );

  // Fetch movies the actor is known for
  const { data: movies, isLoading: isMoviesLoading, isError: isMoviesError } = useQuery(
    ["actorMovies", { id }],
    () => getActorMovies(id)
  );

  // Show loading spinner while data is being fetched
  if (isActorLoading || isMoviesLoading) return <Spinner />;
  
  // Show error message if data fetching fails
  if (isActorError || isMoviesError) {
    return (
      <Typography variant="h5" color="error">
        Error loading actor details or movies.
      </Typography>
    );
  }

  return (
    <div style={{ backgroundColor: "#1c1c1c", color: "#FFF", padding: "20px" }}>
      <Grid container spacing={4}>
        {/* Display actor's profile image and name */}
        <Grid item xs={12} sm={4}>
          <Card
            sx={{
              backgroundColor: "#333",
              color: "#FFF",
              boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
              textAlign: "center",
            }}
          >
            <CardMedia
              component="img"
              image={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
                  : "https://via.placeholder.com/500x750"
              }
              alt={actor.name}
              sx={{
                height: 300,
                objectFit: "cover",
                marginBottom: "10px",
              }}
            />
            <CardContent>
              <Typography
                variant="h5"
                sx={{ fontWeight: "bold", color: "#FFA500" }}
              >
                {actor.name}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Display actor's biography */}
        <Grid item xs={12} sm={8}>
          <Typography
            variant="h4"
            sx={{ marginBottom: "20px", color: "#FFA500", fontWeight: "bold" }}
          >
            Biography
          </Typography>
          <Typography
            variant="body1"
            sx={{ marginBottom: "20px", lineHeight: "1.6" }}
          >
            {actor.biography || "Biography not available."}
          </Typography>
        </Grid>
      </Grid>

      {/* Section for movies the actor is known for */}
      <Typography
        variant="h6"
        sx={{ marginTop: "30px", marginBottom: "10px", color: "#FFA500", fontWeight: "bold" }}
      >
        Known For:
      </Typography>

      <Grid container spacing={2}>
        {/* Iterate through the actor's movies and display them as cards */}
        {movies.cast.map((movie) => (
          <Grid item xs={12} sm={6} md={3} key={movie.id}>
            <Card
              sx={{
                backgroundColor: "#333",
                color: "#FFF",
                cursor: "pointer",
                "&:hover": { boxShadow: "0px 0px 10px #FFA500" },
              }}
              onClick={() => navigate(`/movies/${movie.id}`)} // Navigate to the Movie Details Page
            >
              <CardMedia
                image={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                    : "https://via.placeholder.com/500x750"
                }
                sx={{ height: 300 }}
              />
              <CardContent>
                {/* Display movie title */}
                <Typography
                  variant="h6"
                  sx={{
                    color: "#FFA500",
                    fontWeight: "bold",
                    textAlign: "center",
                    marginBottom: "8px",
                  }}
                >
                  {movie.title}
                </Typography>

                {/* Display movie release year */}
                <Typography
                  variant="body2"
                  sx={{ color: "#FFF", textAlign: "center" }}
                >
                  {movie.release_date
                    ? new Date(movie.release_date).getFullYear()
                    : "N/A"}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ActorDetailsPage;
