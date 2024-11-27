import React, { useContext } from "react";
import { useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import PageTemplate from "../components/templateMoviePage";
import MovieDetails from "../components/movieDetails";
import Spinner from "../components/spinner";
import { getMovie, getMovieRecommendations, getMovieCredits } from "../api/tmdb-api";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { MoviesContext } from "../contexts/moviesContext";
import { Link } from "react-router-dom";

const MovieDetailsPage = () => {
  const { id } = useParams(); // Retrieve movie ID from the URL
  const navigate = useNavigate(); // Used for navigation between pages
  const {
    favorites,
    mustWatch,
    addToFavorites,
    removeFromFavorites,
    addToMustWatch,
    removeFromMustWatch,
  } = useContext(MoviesContext); // Access favorites and must-watch context

  // Fetch movie details using the ID
  const { data: movie, isLoading: isMovieLoading, isError: isMovieError } = useQuery(
    ["movie", { id }],
    getMovie
  );

  // Fetch recommended movies
  const {
    data: recommendations,
    isLoading: isRecommendationsLoading,
    isError: isRecommendationsError,
  } = useQuery(["recommendations", { id }], getMovieRecommendations);

  // Fetch cast and crew (credits) for the movie
  const {
    data: credits,
    isLoading: isCreditsLoading,
    isError: isCreditsError,
  } = useQuery(["credits", { id }], getMovieCredits);

  // Show spinner while data is loading
  if (isMovieLoading || isRecommendationsLoading || isCreditsLoading) {
    return <Spinner />;
  }

  // Display error if any of the fetch calls fail
  if (isMovieError || isRecommendationsError || isCreditsError) {
    return (
      <Typography variant="h5" style={{ color: "red" }}>
        Error loading movie details, recommendations, or credits.
      </Typography>
    );
  }

  // Check if the movie is in favorites or must-watch list
  const isFavorite = favorites.includes(movie.id);
  const isMustWatch = mustWatch.includes(movie.id);

  return (
    <div style={{ backgroundColor: "#1c1c1c", color: "#FFF", padding: "20px" }}>
      <PageTemplate movie={movie}>
        {/* Display movie details */}
        <MovieDetails movie={movie} />

        {/* Action buttons to add/remove from favorites or must-watch */}
        <Grid container spacing={2} sx={{ marginTop: "20px" }}>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              variant="contained"
              color={isFavorite ? "error" : "primary"}
              onClick={() =>
                isFavorite ? removeFromFavorites(movie) : addToFavorites(movie)
              }
              fullWidth
              sx={{
                backgroundColor: isFavorite ? "#FF5722" : "#FFA500",
                "&:hover": { backgroundColor: isFavorite ? "#E64A19" : "#FF8C00" },
              }}
            >
              {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              variant="contained"
              color={isMustWatch ? "error" : "primary"}
              onClick={() =>
                isMustWatch ? removeFromMustWatch(movie) : addToMustWatch(movie)
              }
              fullWidth
              sx={{
                backgroundColor: isMustWatch ? "#FF5722" : "#FFA500",
                "&:hover": { backgroundColor: isMustWatch ? "#E64A19" : "#FF8C00" },
              }}
            >
              {isMustWatch ? "Remove from Must Watch" : "Add to Must Watch"}
            </Button>
          </Grid>
        </Grid>

        {/* Recommendations Section */}
        <Typography variant="h5" sx={{ marginTop: "20px", color: "#FFA500" }}>
          Recommended Movies
        </Typography>
        <Grid container spacing={2} sx={{ marginTop: "10px" }}>
          {recommendations.results.map((rec) => (
            <Grid item xs={12} sm={6} md={3} key={rec.id}>
              <Card
                sx={{
                  backgroundColor: "#333",
                  color: "#FFF",
                  cursor: "pointer",
                  "&:hover": { boxShadow: "0px 0px 10px #FFA500" },
                }}
                onClick={() => navigate(`/movies/${rec.id}`)} // Navigate to recommended movie's detail page
              >
                <CardMedia
                  image={
                    rec.poster_path
                      ? `https://image.tmdb.org/t/p/w500/${rec.poster_path}`
                      : "https://via.placeholder.com/500x750"
                  }
                  sx={{ height: 300 }}
                />
                <CardContent>
                  <Typography variant="h6">{rec.title}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Production Companies Section */}
        <Typography variant="h6" sx={{ marginTop: "20px", color: "#FFA500" }}>
          Production Companies:
        </Typography>
        {movie.production_companies.map((company) => (
          <Typography key={company.id} variant="body2">
            <Link
              to={`/company/${company.id}`} // Navigate to company details page
              style={{ color: "#FFA500", textDecoration: "none" }}
            >
              {company.name}
            </Link>
          </Typography>
        ))}

        {/* Cast Section */}
        <Typography variant="h5" sx={{ marginTop: "20px", color: "#FFA500" }}>
          Cast
        </Typography>
        <Grid container spacing={2} sx={{ marginTop: "10px" }}>
          {credits.cast.map((member) => (
            <Grid item xs={12} sm={6} md={3} key={member.id}>
              <Card
                sx={{
                  backgroundColor: "#333",
                  color: "#FFF",
                  cursor: "pointer",
                  "&:hover": { boxShadow: "0px 0px 10px #FFA500" },
                }}
                onClick={() => navigate(`/actors/${member.id}`)} // Navigate to actor details page
              >
                <CardMedia
                  image={
                    member.profile_path
                      ? `https://image.tmdb.org/t/p/w500/${member.profile_path}`
                      : "https://via.placeholder.com/500x750"
                  }
                  sx={{ height: 300 }}
                />
                <CardContent>
                  <Typography variant="h6" sx={{ color: "#FFA500" }}>
                    {member.name}
                  </Typography>
                  <Typography variant="body2" sx={{ marginTop: "5px" }}>
                    as {member.character}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </PageTemplate>
    </div>
  );
};

export default MovieDetailsPage;
