import React from "react";
import Typography from "@mui/material/Typography";

const MovieReview = ({ review }) => {
  return (
    <>
      {/* Display the review's author */}
      <Typography variant="h5" component="h3">
        Review By: {review.author}
      </Typography>

      {/* Display the review content */}
      <Typography variant="h6" component="p">
        {review.content}
      </Typography>
    </>
  );
};

export default MovieReview;
