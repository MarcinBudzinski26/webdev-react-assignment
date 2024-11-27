import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import IconButton from "@mui/material/IconButton";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

const FavoriteMoviesPage = () => {
  const { favorites, removeFromFavorites } = useContext(MoviesContext); // Access favorite movies and removal function from context

  // Fetch details of all favorite movies using their IDs
  const favoriteMovieQueries = useQueries(
    favorites.map((id) => ({
      queryKey: ["movie", { id }], // Create a query key for each movie
      queryFn: getMovie, // Fetch movie details
    }))
  );

  // Check if any queries are still loading
  const isLoading = favoriteMovieQueries.some((q) => q.isLoading);

  if (isLoading) return <Spinner />; // Show spinner while data is loading

  // Extract movie data from successful queries
  const movies = favoriteMovieQueries.map((q) => q.data);

  return (
    <PageTemplate
      title="Favorite Movies" // Page title
      movies={movies} // Pass movie data to the template
      action={(movie) => (
        <IconButton
          aria-label="remove from favorites"
          onClick={() => removeFromFavorites(movie)} // Remove movie from favorites on click
        >
          <RemoveCircleIcon color="error" fontSize="large" /> {/* Red icon for removal */}
        </IconButton>
      )}
    />
  );
};

export default FavoriteMoviesPage;
