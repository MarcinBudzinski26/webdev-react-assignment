import React, { useState, createContext, useEffect } from "react";
import { Snackbar, Alert } from "@mui/material";

// Create the context to hold global movie-related state
export const MoviesContext = createContext(null);

const MoviesContextProvider = (props) => {
  const [favorites, setFavorites] = useState([]); // List of favorite movies (IDs only)
  const [mustWatch, setMustWatch] = useState([]); // List of must-watch movies (IDs only)
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success", // Notification type (success, info, etc.)
  });

  // Load favorites and must-watch lists from localStorage when the app starts
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const storedMustWatch = JSON.parse(localStorage.getItem("mustWatch")) || [];
    setFavorites(storedFavorites);
    setMustWatch(storedMustWatch);
  }, []);

  // Save the favorites list to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Save the must-watch list to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("mustWatch", JSON.stringify(mustWatch));
  }, [mustWatch]);

  // Add a movie to favorites or remove it if already in the list
  const addToFavorites = (movie) => {
    if (!favorites.includes(movie.id)) {
      const updatedFavorites = [...favorites, movie.id];
      setFavorites(updatedFavorites);
      triggerNotification(`${movie.title} added to Favorites!`, "success");
    } else {
      removeFromFavorites(movie); // Remove if already in favorites
    }
  };

  const removeFromFavorites = (movie) => {
    const updatedFavorites = favorites.filter((mId) => mId !== movie.id);
    setFavorites(updatedFavorites);
    triggerNotification(`${movie.title} removed from Favorites.`, "info");
  };

  // Add a movie to the must-watch list or remove it if already there
  const addToMustWatch = (movie) => {
    if (!mustWatch.includes(movie.id)) {
      const updatedMustWatch = [...mustWatch, movie.id];
      setMustWatch(updatedMustWatch);
      triggerNotification(`${movie.title} added to Must Watch!`, "success");
    } else {
      removeFromMustWatch(movie); // Remove if already in must-watch
    }
  };

  const removeFromMustWatch = (movie) => {
    const updatedMustWatch = mustWatch.filter((mId) => mId !== movie.id);
    setMustWatch(updatedMustWatch);
    triggerNotification(`${movie.title} removed from Must Watch.`, "info");
  };

  // Show a notification with a given message and severity (e.g., success or info)
  const triggerNotification = (message, severity) => {
    setNotification({ open: true, message, severity });
  };

  // Close the notification
  const closeNotification = () => {
    setNotification({ ...notification, open: false });
  };

  return (
    <MoviesContext.Provider
      value={{
        favorites, // Expose the favorites list
        mustWatch, // Expose the must-watch list
        addToFavorites, // Add to favorites function
        removeFromFavorites, // Remove from favorites function
        addToMustWatch, // Add to must-watch function
        removeFromMustWatch, // Remove from must-watch function
      }}
    >
      {props.children}
      {/* Snackbar for showing notifications */}
      <Snackbar
        open={notification.open}
        autoHideDuration={3000}
        onClose={closeNotification}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={closeNotification}
          severity={notification.severity}
          sx={{ width: "100%" }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;
