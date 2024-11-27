import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const AddToFavoritesIcon = ({ movie }) => {
  const { favorites, addToFavorites } = useContext(MoviesContext);

  const isFavorite = favorites.includes(movie.id);

  return (
    <IconButton
      aria-label="toggle favorite"
      onClick={() => addToFavorites(movie)}
    >
      {isFavorite ? (
        <FavoriteIcon color="error" fontSize="large" /> // Filled icon for favorite
      ) : (
        <FavoriteBorderIcon color="error" fontSize="large" /> // Outlined icon for non-favorite
      )}
    </IconButton>
  );
};

export default AddToFavoritesIcon;
