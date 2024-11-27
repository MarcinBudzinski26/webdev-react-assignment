import React from "react";
import { Navigate } from "react-router-dom"; // Used for redirection
import { useAuthState } from "react-firebase-hooks/auth"; // Firebase hook to track auth state
import { auth } from "./firebaseConfig"; // Firebase configuration

const PrivateRoute = ({ children }) => {
  // `useAuthState` returns the current user and loading state
  const [user, loading] = useAuthState(auth);

  // While authentication state is loading, show a placeholder message
  if (loading) return <p>Loading...</p>;

  // If the user is authenticated, allow access to the child components
  // Otherwise, redirect to the login page
  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
