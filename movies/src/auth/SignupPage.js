import React, { useState } from "react";
import { auth } from "./firebaseConfig"; // Firebase configuration
import { createUserWithEmailAndPassword } from "firebase/auth"; // Firebase method for signup
import { useNavigate } from "react-router-dom"; // Navigation between routes
import { Box, TextField, Button, Typography, Paper } from "@mui/material"; // Material UI components

const SignupPage = () => {
  // State for email, password, and error messages
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate(); // Hook for navigation

  // Handle user signup
  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password); // Create user in Firebase
      alert("Signup successful!"); // Confirmation
      navigate("/dashboard"); // Redirect to dashboard
    } catch (error) {
      setError(error.message); // Display error message
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Full height
        backgroundColor: "#1c1c1c", // Dark background
        color: "#FFF", // White text
      }}
    >
      <Paper
        sx={{
          padding: "30px",
          maxWidth: "400px",
          width: "100%", // Responsive width
          backgroundColor: "#2E2E2E", // Dark gray
        }}
        elevation={3} // Subtle shadow
      >
        {/* Header */}
        <Typography variant="h4" sx={{ marginBottom: "20px", color: "#FF8C00" }}>
          Signup
        </Typography>

        {/* Error Message */}
        {error && (
          <Typography variant="body2" sx={{ color: "red", marginBottom: "10px" }}>
            {error}
          </Typography>
        )}

        {/* Email Input */}
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Update email state
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#FF8C00" }, // Orange border
              "&:hover fieldset": { borderColor: "#FFA500" }, // Lighter orange on hover
            },
          }}
        />

        {/* Password Input */}
        <TextField
          fullWidth
          label="Password"
          variant="outlined"
          margin="normal"
          type="password" // Hide input text
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Update password state
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#FF8C00" },
              "&:hover fieldset": { borderColor: "#FFA500" },
            },
          }}
        />

        {/* Signup Button */}
        <Button
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: "#FF8C00", // Orange button
            "&:hover": { backgroundColor: "#FFA500" }, // Lighter orange on hover
            marginTop: "20px",
          }}
          onClick={handleSignup} // Trigger signup
        >
          Signup
        </Button>
      </Paper>
    </Box>
  );
};

export default SignupPage;
