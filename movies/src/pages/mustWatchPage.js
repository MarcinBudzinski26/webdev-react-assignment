import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import IconButton from "@mui/material/IconButton";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

const MustWatchPage = () => {
  const { mustWatch, removeFromMustWatch } = useContext(MoviesContext); // Access context values

  // Fetch details for all "must-watch" movies
  const mustWatchQueries = useQueries(
    mustWatch.map((id) => ({
      queryKey: ["movie", { id }],
      queryFn: getMovie, // API call to fetch movie details
    }))
  );

  const isLoading = mustWatchQueries.some((q) => q.isLoading); // Check if any query is still loading
  if (isLoading) return <Spinner />; // Show spinner if loading

  const movies = mustWatchQueries.map((q) => q.data); // Extract movie data from queries

  const handleRemoveFromMustWatch = (movie) => {
    removeFromMustWatch(movie); // Remove movie from "must-watch" list
  };

  return (
    <PageTemplate
      title="Must Watch Movies" // Page title
      movies={movies} // Pass movies to template
      action={(movie) => (
        <IconButton
          aria-label="remove from must watch" // Accessibility label
          onClick={() => handleRemoveFromMustWatch(movie)} // Remove movie from list
        >
          <RemoveCircleIcon color="error" fontSize="large" /> {/* Remove icon */}
        </IconButton>
      )}
    />
  );
};

export default MustWatchPage;
