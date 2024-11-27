import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";

const AddToMustWatchIcon = ({ movie }) => {
  const { mustWatch, addToMustWatch } = useContext(MoviesContext);

  const isMustWatch = mustWatch.includes(movie.id);

  return (
    <IconButton
      aria-label="toggle must watch"
      onClick={() => addToMustWatch(movie)}
    >
      {isMustWatch ? (
        <PlaylistAddCheckIcon color="primary" fontSize="large" /> // Filled icon for must watch
      ) : (
        <PlaylistAddIcon color="primary" fontSize="large" /> // Outlined icon for non-must watch
      )}
    </IconButton>
  );
};

export default AddToMustWatchIcon;
