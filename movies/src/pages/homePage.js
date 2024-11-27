import React from "react";
import { useQuery } from "react-query";
import PageTemplate from "../components/templateMovieListPage";
import Spinner from "../components/spinner";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import { getMovies } from "../api/tmdb-api";

const HomePage = () => {
  // Fetch only the first page of movies
  const { data, error, isLoading, isError } = useQuery("discover", () => getMovies(1));

  if (isLoading) return <Spinner />;
  if (isError) return <h1>Error: {error.message}</h1>;

  const movies = data.results;

  return (
    <PageTemplate
      title="Discover Movies"
      movies={movies}
      action={(movie) => <AddToFavoritesIcon movie={movie} />}
    />
  );
};

export default HomePage;
