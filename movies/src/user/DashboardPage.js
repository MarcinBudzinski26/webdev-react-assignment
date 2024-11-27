import React, { useState } from "react";
import { auth } from "../auth/firebaseConfig";
import { updatePassword, deleteUser } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Button, Typography, Box, TextField, Snackbar, Alert } from "@mui/material";

const DashboardPage = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState({ open: false, message: "", severity: "info" });

  const user = auth.currentUser;

  // Handle Password Change
  const handlePasswordChange = async () => {
    try {
      await updatePassword(user, password);
      setNotification({ open: true, message: "Password updated successfully!", severity: "success" });
    } catch (error) {
      setNotification({ open: true, message: error.message, severity: "error" });
    }
  };

  // Handle Account Deletion
  const handleDeleteAccount = async () => {
    try {
      await deleteUser(user);
      setNotification({ open: true, message: "Account deleted successfully.", severity: "success" });
      navigate("/signup"); // Redirect to signup after account deletion
    } catch (error) {
      setNotification({ open: true, message: error.message, severity: "error" });
    }
  };

  return (
    <Box sx={{ padding: "20px", color: "#FFF", backgroundColor: "#1c1c1c", minHeight: "100vh" }}>
      <Typography variant="h4" sx={{ marginBottom: "20px", color: "#FFA500" }}>
        Welcome, {user?.email || "User"}
      </Typography>

      <Typography variant="h5" sx={{ marginBottom: "10px", color: "#FFFFFF" }}>
        Account Settings
      </Typography>

      {/* Change Password Section */}
      <Box sx={{ marginBottom: "20px" }}>
        <Typography variant="body1" sx={{ marginBottom: "10px" }}>
          Change Password
        </Typography>
        <TextField
          variant="outlined"
          type="password"
          label="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ marginBottom: "10px", width: "100%" }}
        />
        <Button variant="contained" color="primary" onClick={handlePasswordChange}>
          Update Password
        </Button>
      </Box>

      {/* Delete Account Section */}
      <Box>
        <Typography variant="body1" sx={{ marginBottom: "10px" }}>
          Danger Zone
        </Typography>
        <Button variant="contained" color="error" onClick={handleDeleteAccount}>
          Delete Account
        </Button>
      </Box>

      {/* Snackbar for Notifications */}
      <Snackbar
        open={notification.open}
        autoHideDuration={3000}
        onClose={() => setNotification({ ...notification, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={notification.severity} onClose={() => setNotification({ ...notification, open: false })}>
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default DashboardPage;
