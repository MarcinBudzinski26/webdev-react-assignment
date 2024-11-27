import React, { useState } from "react";
import { auth } from "../auth/firebaseConfig"; // Firebase configuration
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth"; // Firebase methods
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography, Paper, Snackbar, Alert } from "@mui/material";

const LoginPage = () => {
  const [email, setEmail] = useState(""); // Store email input
  const [password, setPassword] = useState(""); // Store password input
  const [error, setError] = useState(""); // Store error messages
  const [success, setSuccess] = useState(""); // Store success messages
  const [forgotEmail, setForgotEmail] = useState(""); // Email for password reset
  const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar visibility

  const navigate = useNavigate(); // For navigation between pages

  // Handle user login
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!"); // Notify user
      navigate("/dashboard"); // Redirect to dashboard
    } catch (error) {
      setError(error.message); // Capture error message
    }
  };

  // Handle password reset functionality
  const handleForgotPassword = async () => {
    if (!forgotEmail) {
      setError("Please enter your email to reset the password.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, forgotEmail);
      setSuccess("Password reset email sent successfully!");
      setOpenSnackbar(true);
      setForgotEmail(""); // Clear input after success
    } catch (error) {
      setError(error.message); // Capture error message
      setOpenSnackbar(true);
    }
  };

  // Close Snackbar notifications
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    setError("");
    setSuccess("");
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1c1c1c", // Dark background
      }}
    >
      <Paper
        elevation={10} // Adds shadow effect
        sx={{
          padding: "20px",
          maxWidth: "400px",
          backgroundColor: "#333333", // Dark card
          color: "#FFFFFF",
        }}
      >
        {/* Login Form */}
        <Typography
          variant="h4"
          sx={{
            marginBottom: "20px",
            textAlign: "center",
            color: "#FF8C00", // Orange text
            fontWeight: "bold",
          }}
        >
          Login
        </Typography>
        <Box sx={{ marginBottom: "20px" }}>
          {/* Email Input */}
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              input: { color: "#FFFFFF" },
              label: { color: "#FFA726" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#FF8C00" }, // Orange border
                "&:hover fieldset": { borderColor: "#FFA726" }, // Lighter orange on hover
                "&.Mui-focused fieldset": { borderColor: "#FFA726" }, // Focus state
              },
            }}
          />
        </Box>
        <Box sx={{ marginBottom: "20px" }}>
          {/* Password Input */}
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              input: { color: "#FFFFFF" },
              label: { color: "#FFA726" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#FF8C00" },
                "&:hover fieldset": { borderColor: "#FFA726" },
                "&.Mui-focused fieldset": { borderColor: "#FFA726" },
              },
            }}
          />
        </Box>
        <Button
          onClick={handleLogin}
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: "#FF8C00",
            "&:hover": { backgroundColor: "#FFA726" },
          }}
        >
          Login
        </Button>
        {/* Redirect to Sign Up */}
        <Typography
          variant="body2"
          sx={{ marginTop: "20px", textAlign: "center", cursor: "pointer", color: "#FFA726" }}
          onClick={() => navigate("/signup")}
        >
          Don't have an account? Sign Up
        </Typography>

        {/* Forgot Password Section */}
        <Box sx={{ marginTop: "20px", borderTop: "1px solid #555", paddingTop: "20px" }}>
          <Typography
            variant="h6"
            sx={{
              marginBottom: "10px",
              textAlign: "center",
              fontWeight: "bold",
              color: "#FF8C00",
            }}
          >
            Forgot Password
          </Typography>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={forgotEmail}
            onChange={(e) => setForgotEmail(e.target.value)}
            sx={{
              input: { color: "#FFFFFF" },
              label: { color: "#FFA726" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#FF8C00" },
                "&:hover fieldset": { borderColor: "#FFA726" },
                "&.Mui-focused fieldset": { borderColor: "#FFA726" },
              },
            }}
          />
          <Button
            onClick={handleForgotPassword}
            variant="contained"
            fullWidth
            sx={{
              marginTop: "10px",
              backgroundColor: "#FF8C00",
              "&:hover": { backgroundColor: "#FFA726" },
            }}
          >
            Reset Password
          </Button>
        </Box>
      </Paper>

      {/* Snackbar Notifications */}
      <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={handleCloseSnackbar}>
        {error ? (
          <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: "100%" }}>
            {error}
          </Alert>
        ) : (
          <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: "100%" }}>
            {success}
          </Alert>
        )}
      </Snackbar>
    </Box>
  );
};

export default LoginPage;
