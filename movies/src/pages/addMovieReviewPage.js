import React, { useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import { getMovie } from "../api/tmdb-api";
import PageTemplate from "../components/templateMoviePage";
import Spinner from "../components/spinner";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import { MoviesContext } from "../contexts/moviesContext";

const ratings = [
  { value: 5, label: "Excellent" },
  { value: 4, label: "Good" },
  { value: 3, label: "Average" },
  { value: 2, label: "Poor" },
  { value: 1, label: "Terrible" },
];

const WriteReviewPage = () => {
  const location = useLocation(); // Get movieId from the location state
  const movieId = location.state.movieId;

  // Fetch movie details using react-query
  const { data: movie, error, isLoading, isError } = useQuery(
    ["movie", { id: movieId }],
    getMovie
  );

  const { addReview } = useContext(MoviesContext); // Access context to add reviews
  const [author, setAuthor] = useState(""); // Author input state
  const [review, setReview] = useState(""); // Review text state
  const [rating, setRating] = useState(3); // Rating dropdown state
  const [open, setOpen] = useState(false); // Snackbar visibility state

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const newReview = { movieId: movie.id, author, review, rating };
    addReview(movie, newReview); // Add the review to the context
    setOpen(true); // Show success notification
    setAuthor(""); // Reset the author input
    setReview(""); // Reset the review text
    setRating(3); // Reset the rating
  };

  // Close snackbar
  const handleClose = () => {
    setOpen(false);
  };

  if (isLoading) {
    return <Spinner />; // Show spinner while movie data is loading
  }

  if (isError) {
    return <h1>{error.message}</h1>; // Display error message if data fetching fails
  }

  return (
    <div
      style={{
        backgroundColor: "#1c1c1c", // Dark theme background
        color: "#ffffff",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <PageTemplate movie={movie}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            backgroundColor: "#333333",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          {/* Form Title */}
          <Typography variant="h5" sx={{ color: "#FF8C00" }}>
            Write Your Review
          </Typography>

          {/* Author Input Field */}
          <TextField
            label="Author"
            variant="outlined"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            sx={{
              backgroundColor: "#1c1c1c",
              input: { color: "#FFFFFF" },
              label: { color: "#FFA726" },
            }}
            required
          />

          {/* Review Text Field */}
          <TextField
            label="Review"
            variant="outlined"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            sx={{
              backgroundColor: "#1c1c1c",
              input: { color: "#FFFFFF" },
              label: { color: "#FFA726" },
            }}
            required
            multiline
            minRows={4}
          />

          {/* Rating Dropdown */}
          <TextField
            select
            label="Rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            sx={{
              backgroundColor: "#1c1c1c",
              input: { color: "#FFFFFF" },
              label: { color: "#FFA726" },
            }}
          >
            {ratings.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#FF8C00",
              color: "#1c1c1c",
              "&:hover": { backgroundColor: "#FFA726" },
            }}
          >
            Submit
          </Button>

          {/* Success Snackbar */}
          <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
            <MuiAlert severity="success" onClose={handleClose}>
              Review Submitted!
            </MuiAlert>
          </Snackbar>
        </Box>
      </PageTemplate>
    </div>
  );
};

export default WriteReviewPage;
