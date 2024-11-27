import React from "react";
import { useLocation } from "react-router-dom";
import PageTemplate from "../components/templateMoviePage";
import ReviewForm from "../components/reviewForm";

const AddReviewPage = () => {
  const location = useLocation(); // Get the current location
  const { movieId } = location.state; // Extract movie ID passed via state

  return (
    <div
      style={{
        backgroundColor: "#1c1c1c", // Set the page's background to match the theme
        color: "#ffffff", // White text for contrast
        minHeight: "100vh", // Ensure the page covers the full viewport
        padding: "20px",
      }}
    >
      <PageTemplate movie={{ id: movieId }}> {/* Use the template for layout */}
        <div
          style={{
            backgroundColor: "#1c1c1c", // Keep the section's background consistent
            color: "#ffffff", // Ensure text is readable
            padding: "20px", // Add spacing for better readability
            borderRadius: "8px", // Rounded corners for styling
          }}
        >
          <h2 style={{ color: "#FF8C00" }}>Write Your Review</h2> {/* Section title */}
          <ReviewForm /> {/* Render the review form component */}
        </div>
      </PageTemplate>
    </div>
  );
};

export default AddReviewPage;
