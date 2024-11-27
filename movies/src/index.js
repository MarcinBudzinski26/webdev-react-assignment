import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "@fontsource/lexend"; // Import Lexend font

// Contexts and Pages
import MoviesContextProvider from "./contexts/moviesContext";
import HomePage from "./pages/homePage";
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import MustWatchPage from "./pages/mustWatchPage";
import MovieDetailsPage from "./pages/movieDetailsPage";
import AddMovieReviewPage from "./pages/addMovieReviewPage";
import MovieReviewPage from "./pages/movieReviewPage";
import TopRatedMoviesPage from "./pages/topRatedMoviesPage";
import ActorDetailsPage from "./pages/actorDetailsPage";
import TrendingMoviesPage from "./pages/trendingMoviesPage";
import MoviesByProductionPage from "./pages/moviesByProductionPage";

// Authentication and Dashboard
import LoginPage from "./auth/LoginPage";
import SignupPage from "./auth/SignupPage";
import PrivateRoute from "./auth/PrivateRoute";
import DashboardPage from "./user/DashboardPage";


// Components
import SiteHeader from "./components/siteHeader";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false,
    },
  },
});

const theme = createTheme({
  palette: {
    primary: { main: "#FF8C00" }, // Orange
    secondary: { main: "#333333" }, // Dark gray
    background: { default: "#1C1C1C", paper: "#2E2E2E" }, // Dark background
    text: {
      primary: "#FFFFFF", // Default text color (white on dark)
      secondary: "#FF8C00", // Orange text
    },
  },
  typography: {
    fontFamily: "'Lexend', Arial, sans-serif", // Apply Lexend globally
    h5: { fontWeight: 700, color: "#FF8C00" }, // Orange headers
    h6: { fontWeight: 600 },
    body1: { fontSize: "1rem", color: "#FFFFFF" }, // White body text
    body2: { fontSize: "0.9rem", color: "#AAAAAA" }, // Muted gray text
  },
});

const App = () => (
  <ThemeProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SiteHeader />
        <MoviesContextProvider>
          <Routes>
            {/* Static Pages */}
            <Route path="/" element={<HomePage />} />
            <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
            <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
            <Route path="/movies/mustwatch" element={<MustWatchPage />} />
            <Route path="/movies/trending" element={<TrendingMoviesPage />} />
            <Route path="/movies/toprated" element={<TopRatedMoviesPage />} />

            {/* Parameterized Routes */}
            <Route path="/movies/:id" element={<MovieDetailsPage />} />
            <Route path="/reviews/:id" element={<MovieReviewPage />} />
            <Route path="/reviews/form" element={<AddMovieReviewPage />} />
            <Route path="/actors/:id" element={<ActorDetailsPage />} />
            <Route path="/company/:id" element={<MoviesByProductionPage />} />

            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />

          </Routes>
        </MoviesContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </ThemeProvider>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
