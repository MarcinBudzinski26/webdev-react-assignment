import React from "react";
import RateReviewIcon from "@mui/icons-material/RateReview"; // Icon for review
import { Link } from "react-router-dom"; // Navigation for linking to the review form

const WriteReviewIcon = ({ movie }) => {
  return (
    <Link
      to={`/reviews/form`} // Navigate to the review form page
      state={{
        movieId: movie.id, // Pass the movie ID as state
      }}
    >
      {/* Review Icon */}
      <RateReviewIcon color="primary" fontSize="large" />
    </Link>
  );
};

export default WriteReviewIcon;
