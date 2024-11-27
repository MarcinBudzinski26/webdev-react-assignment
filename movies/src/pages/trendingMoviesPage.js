import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import { getTrendingMovies } from "../api/tmdb-api";

const TrendingMoviesPage = () => {
  // Fetch trending movies from the API using react-query
  const { data, isLoading, isError } = useQuery(
    "trendingMovies", // Unique query key
    getTrendingMovies // API function to fetch trending movies
  );

  if (isLoading) return <Spinner />; // Display spinner during loading
  if (isError) return <h3>Error loading trending movies.</h3>; // Handle errors gracefully

  const movies = data.results; // Extract the movies from API response

  return (
    <PageTemplate
      title="Trending Movies" // Page header title
      movies={movies} // Pass movies data to the template
      action={(movie) => <></>} // No specific action for this page
    />
  );
};

export default TrendingMoviesPage;
