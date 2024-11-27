import React, { useState, createContext, useEffect } from "react";
import { Snackbar, Alert } from "@mui/material";

export const MoviesContext = createContext(null);

const MoviesContextProvider = (props) => {
  const [favorites, setFavorites] = useState([]);
  const [mustWatch, setMustWatch] = useState([]);
  const [reviews, setReviews] = useState([]); // Add reviews state
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Load data from localStorage on initialization
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const storedMustWatch = JSON.parse(localStorage.getItem("mustWatch")) || [];
    const storedReviews = JSON.parse(localStorage.getItem("reviews")) || []; // Load reviews
    setFavorites(storedFavorites);
    setMustWatch(storedMustWatch);
    setReviews(storedReviews); // Initialize reviews state
  }, []);

  // Update localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
    localStorage.setItem("mustWatch", JSON.stringify(mustWatch));
    localStorage.setItem("reviews", JSON.stringify(reviews)); // Save reviews
  }, [favorites, mustWatch, reviews]);

  // Favorites functions
  const addToFavorites = (movie) => {
    if (!favorites.includes(movie.id)) {
      const updatedFavorites = [...favorites, movie.id];
      setFavorites(updatedFavorites);
      triggerNotification(`${movie.title} added to Favorites!`, "success");
    } else {
      removeFromFavorites(movie);
    }
  };

  const removeFromFavorites = (movie) => {
    const updatedFavorites = favorites.filter((mId) => mId !== movie.id);
    setFavorites(updatedFavorites);
    triggerNotification(`${movie.title} removed from Favorites.`, "info");
  };

  // Must Watch functions
  const addToMustWatch = (movie) => {
    if (!mustWatch.includes(movie.id)) {
      const updatedMustWatch = [...mustWatch, movie.id];
      setMustWatch(updatedMustWatch);
      triggerNotification(`${movie.title} added to Must Watch!`, "success");
    } else {
      removeFromMustWatch(movie);
    }
  };

  const removeFromMustWatch = (movie) => {
    const updatedMustWatch = mustWatch.filter((mId) => mId !== movie.id);
    setMustWatch(updatedMustWatch);
    triggerNotification(`${movie.title} removed from Must Watch.`, "info");
  };

  // Reviews functions
  const addReview = (movie, review) => {
    const updatedReviews = [...reviews, { ...review, movieId: movie.id }];
    setReviews(updatedReviews);
    triggerNotification(`Review added for ${movie.title}!`, "success");
  };

  // Snackbar functions
  const triggerNotification = (message, severity) => {
    setNotification({ open: true, message, severity });
  };

  const closeNotification = () => {
    setNotification({ ...notification, open: false });
  };

  return (
    <MoviesContext.Provider
      value={{
        favorites,
        mustWatch,
        reviews,
        addToFavorites,
        removeFromFavorites,
        addToMustWatch,
        removeFromMustWatch,
        addReview, // Include addReview in context
      }}
    >
      {props.children}
      <Snackbar
        open={notification.open}
        autoHideDuration={3000}
        onClose={closeNotification}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={closeNotification} severity={notification.severity} sx={{ width: "100%" }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;
