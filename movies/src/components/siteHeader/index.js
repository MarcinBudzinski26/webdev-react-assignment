import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import { useNavigate, useLocation } from "react-router-dom";
import { auth } from "../../auth/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar); // Offset for AppBar spacing

const menuOptions = [
  { label: "Home", path: "/" },
  { label: "Favorites", path: "/movies/favorites" },
  { label: "Upcoming Movies", path: "/movies/upcoming" },
  { label: "Must Watch", path: "/movies/mustwatch" },
  { label: "Trending Movies", path: "/movies/trending" },
  { label: "Top Rated", path: "/movies/toprated" },
];

const SiteHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [user] = useAuthState(auth); // Check user authentication state
  const [anchorEl, setAnchorEl] = useState(null); // Manage dropdown menu state
  const open = Boolean(anchorEl);

  // Open the dropdown menu
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Close the dropdown menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Handle navigation when a menu option is clicked
  const handleMenuSelect = (path) => {
    setAnchorEl(null); // Close menu after selection
    navigate(path); // Navigate to the selected page
  };

  // Handle logout action
  const handleLogout = () => {
    auth.signOut(); // Sign out the user
    navigate("/login"); // Redirect to login page
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#333333", // Header background
          color: "#FF8C00", // Text color
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Toolbar>
          {/* Hamburger Menu Icon */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            sx={{ marginRight: 2 }}
          >
            <MenuIcon />
          </IconButton>

          {/* Dropdown Menu */}
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            {menuOptions.map((option) => (
              <MenuItem
                key={option.label}
                onClick={() => handleMenuSelect(option.path)}
                sx={{
                  fontWeight: location.pathname === option.path ? "bold" : "normal",
                  color: location.pathname === option.path ? "#FF8C00" : "#FFFFFF",
                  "&:hover": {
                    backgroundColor: "#444444",
                    color: "#FF8C00",
                  },
                }}
              >
                {option.label}
              </MenuItem>
            ))}
          </Menu>

          {/* App Title */}
          <Typography
            variant="h5"
            sx={{
              flexGrow: 1,
              fontWeight: 700,
              color: "#FF8C00",
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          >
            Reel World
          </Typography>

          {/* Section Names as Navigation Buttons */}
          <div style={{ flexGrow: 1, display: "flex", gap: "15px" }}>
            {menuOptions.map((option) => (
              <Button
                key={option.label}
                onClick={() => navigate(option.path)}
                sx={{
                  color: location.pathname === option.path ? "#FF8C00" : "#FFFFFF",
                  fontWeight: location.pathname === option.path ? "bold" : "normal",
                  textDecoration: location.pathname === option.path ? "underline" : "none",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                {option.label}
              </Button>
            ))}
          </div>

          {/* User Authentication Display */}
          {user ? (
            <>
              {/* Display User Email */}
              <Button
                onClick={() => navigate("/dashboard")}
                sx={{
                  color: "#FF8C00",
                  textTransform: "none",
                  fontWeight: "bold",
                  marginRight: 2,
                }}
              >
                {user.email}
              </Button>
              {/* Logout Button */}
              <Button
                onClick={handleLogout}
                sx={{
                  color: "#FFFFFF",
                  backgroundColor: "#FF8C00",
                  "&:hover": { backgroundColor: "#FF6F00" },
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              {/* Login and Sign-Up Buttons */}
              <Button
                onClick={() => navigate("/login")}
                sx={{
                  color: "#FF8C00",
                  marginRight: 2,
                }}
              >
                Login
              </Button>
              <Button
                onClick={() => navigate("/signup")}
                sx={{
                  color: "#FFFFFF",
                  backgroundColor: "#FF8C00",
                  "&:hover": { backgroundColor: "#FF6F00" },
                }}
              >
                Sign Up
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Offset /> {/* Ensures page content is not overlapped by AppBar */}
    </>
  );
};

export default SiteHeader;
