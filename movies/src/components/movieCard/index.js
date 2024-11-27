import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarRateIcon from "@mui/icons-material/StarRate";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import RateReviewIcon from "@mui/icons-material/RateReview";
import IconButton from "@mui/material/IconButton";
import { MoviesContext } from "../../contexts/moviesContext";
import imgPlaceholder from "../../images/film-poster-placeholder.png";

export default function MovieCard({ movie }) {
  const {
    favorites,
    mustWatch,
    addToFavorites,
    removeFromFavorites,
    addToMustWatch,
    removeFromMustWatch,
  } = useContext(MoviesContext);

  const isFavorite = favorites.includes(movie.id); // Check if movie is in favorites
  const isMustWatch = mustWatch.includes(movie.id); // Check if movie is in must-watch

  // Toggle favorite status
  const handleFavoriteToggle = () => {
    isFavorite ? removeFromFavorites(movie) : addToFavorites(movie);
  };

  // Toggle must-watch status
  const handleMustWatchToggle = () => {
    isMustWatch ? removeFromMustWatch(movie) : addToMustWatch(movie);
  };

  return (
    <Card
      sx={{
        backgroundColor: "#333333", // Card background color
        color: "#FFFFFF", // Text color
        boxShadow: "0 4px 8px rgba(0,0,0,0.2)", // Shadow for a clean look
        borderRadius: "8px", // Rounded corners
        padding: "10px",
      }}
    >
      {/* Movie Poster */}
      <CardMedia
        sx={{ height: 300 }}
        image={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : imgPlaceholder}
        title={movie.title}
      />

      <CardContent>
        {/* Movie Title (clickable to go to Movie Details) */}
        <Typography
          component={Link}
          to={`/movies/${movie.id}`}
          variant="h6"
          sx={{
            textAlign: "center",
            fontSize: "18px",
            fontWeight: "bold",
            color: "#FFFFFF",
            textDecoration: "none",
            display: "-webkit-box", // Show only two lines
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            overflow: "hidden", // Hide overflow text
            "&:hover": {
              color: "#FF8C00", // Highlight color on hover
            },
          }}
        >
          {movie.title}
        </Typography>

        {/* Movie Release Date and Rating */}
        <Grid container justifyContent="space-between" sx={{ marginTop: "10px" }}>
          <Grid item>
            <Typography variant="body2" color="#FF8C00">
              <CalendarTodayIcon fontSize="small" sx={{ verticalAlign: "middle", marginRight: "4px" }} />
              {movie.release_date}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2" color="#FF8C00">
              <StarRateIcon fontSize="small" sx={{ verticalAlign: "middle", marginRight: "4px" }} />
              {movie.vote_average.toFixed(1)}
            </Typography>
          </Grid>
        </Grid>

        {/* Action Buttons */}
        <Grid container justifyContent="space-between" alignItems="center" sx={{ marginTop: "10px" }}>
          {/* Write Review Button */}
          <Link
            to={`/reviews/form`}
            state={{ movieId: movie.id }} // Pass movie ID for review
            style={{ textDecoration: "none" }}
          >
            <IconButton
              aria-label="write review"
              sx={{
                color: "#FF8C00",
                "&:hover": { color: "#FFA726" },
              }}
            >
              <RateReviewIcon />
            </IconButton>
          </Link>

          {/* Add/Remove from Favorites */}
          <IconButton
            aria-label="add to favorites"
            onClick={handleFavoriteToggle}
            sx={{
              color: isFavorite ? "#FF0000" : "#FFFFFF", // Red if in favorites
              "&:hover": { color: "#FF8C00" },
            }}
          >
            {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>

          {/* Add/Remove from Must Watch */}
          <IconButton
            aria-label="add to must watch"
            onClick={handleMustWatchToggle}
            sx={{
              color: isMustWatch ? "#FF0000" : "#FFFFFF", // Red if in must-watch
              "&:hover": { color: "#FF8C00" },
            }}
          >
            {isMustWatch ? <RemoveCircleIcon /> : <AddCircleIcon />}
          </IconButton>
        </Grid>
      </CardContent>
    </Card>
  );
}
