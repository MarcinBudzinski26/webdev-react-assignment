import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import { getTopRatedMovies } from "../api/tmdb-api";

const TopRatedMoviesPage = () => {
  // Fetch top-rated movies from the API using react-query
  const { data, error, isLoading, isError } = useQuery(
    "topRatedMovies", // Unique query key
    getTopRatedMovies // API function
  );

  if (isLoading) return <Spinner />; // Show spinner during loading
  if (isError) 
    return <h1>Error fetching Top Rated Movies: {error.message}</h1>; // Handle API errors

  const movies = data.results; // Extract movies from API response

  return (
    <PageTemplate
      title="Top Rated Movies" // Page title
      movies={movies} // Pass movies to the template
      action={(movie) => null} // No actions needed for top-rated movies
    />
  );
};

export default TopRatedMoviesPage;
