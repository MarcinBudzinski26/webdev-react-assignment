import React, { useState } from "react";
import Header from "../headerMovieList";
import FilterMoviesCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid";

const TemplateMovieListPage = ({ movies, title, action }) => {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [sortOption, setSortOption] = useState(""); // Default is no sorting

  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else if (type === "genre") setGenreFilter(value);
    else if (type === "sort") setSortOption(value);
  };

  const genreId = Number(genreFilter);

  // Filter movies based on search and genre
  let displayedMovies = movies
    .filter((m) =>
      m.title.toLowerCase().includes(nameFilter.toLowerCase())
    )
    .filter((m) =>
      genreId > 0 ? m.genre_ids.includes(genreId) : true
    );

  // Sorting logic
  displayedMovies = displayedMovies.sort((a, b) => {
    if (sortOption === "rating") {
      return b.vote_average - a.vote_average; // Sort by highest rating
    }
    if (sortOption === "release_date") {
      return new Date(b.release_date) - new Date(a.release_date); // Sort by most recent release
    }
    if (sortOption === "popularity") {
      return b.popularity - a.popularity; // Sort by most popular
    }
    return 0; // No sorting by default
  });

  return (
    <Grid container spacing={4} sx={{ padding: "20px", backgroundColor: "#1C1C1C" }}>
      <Grid item xs={12}>
        <Header title={title} />
      </Grid>
      <Grid item xs={12} sm={4} md={3}>
        <FilterMoviesCard
          onUserInput={handleChange}
          titleFilter={nameFilter}
          genreFilter={genreFilter}
          sortOption={sortOption}
        />
      </Grid>
      <Grid item xs={12} sm={8} md={9}>
        <Grid container spacing={2}>
          {displayedMovies.map((movie) => (
            <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
              <MovieList action={action} movies={[movie]} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TemplateMovieListPage;
