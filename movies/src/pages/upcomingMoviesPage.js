import React from "react";
import PageTemplate from "../components/templateMovieListPage"; // Template for displaying a list of movies
import { useQuery } from "react-query"; // Hook for handling API data fetching
import { getUpcomingMovies } from "../api/tmdb-api"; // API function to fetch upcoming movies
import Spinner from "../components/spinner"; // Loading spinner component
import AddToMustWatchIcon from "../components/cardIcons/addToMustWatch"; // Action icon for adding movies to "Must Watch"

const UpcomingMoviesPage = () => {
  // Fetch upcoming movies using react-query
  const { data, isLoading, error } = useQuery(
    "upcomingMovies", // Unique query key
    getUpcomingMovies // API function to fetch data
  );

  if (isLoading) return <Spinner />; // Show spinner while fetching data
  if (error) return <h3>Error loading upcoming movies</h3>; // Show error message if fetching fails

  const movies = data.results; // Extract movies from API response

  return (
    <PageTemplate
      title="Upcoming Movies" // Page header title
      movies={movies} // Pass movie data to the template
      action={(movie) => <AddToMustWatchIcon movie={movie} />} // Provide action for each movie card
    />
  );
};

export default UpcomingMoviesPage;
