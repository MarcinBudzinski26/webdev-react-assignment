import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import SearchIcon from "@mui/icons-material/Search";
import Grid from "@mui/material/Grid";

const FilterMoviesCard = ({ titleFilter, genreFilter, sortOption, onUserInput }) => {
  // Handle input changes for filtering/sorting
  const handleTextChange = (e) => onUserInput("name", e.target.value); // Filter by title
  const handleGenreChange = (e) => onUserInput("genre", e.target.value); // Filter by genre
  const handleSortChange = (e) => onUserInput("sort", e.target.value); // Sort movies

  return (
    <Card
      sx={{
        backgroundColor: "#333333", // Dark gray background
        color: "#FFFFFF", // White text
        borderRadius: "16px", // Rounded corners
        padding: "16px", // Inner padding
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Slight shadow for depth
      }}
    >
      <CardContent>
        {/* Section title with search icon */}
        <Typography
          variant="h5"
          sx={{
            color: "#FF8C00", // Orange text color
            fontWeight: "bold",
            marginBottom: "16px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <SearchIcon fontSize="large" />
          Filter the movies
        </Typography>
        <Grid container spacing={2}>
          {/* Search Field */}
          <Grid item xs={12}>
            <TextField
              label="Search by Title" // Placeholder for search input
              variant="outlined"
              value={titleFilter} // Bind to titleFilter prop
              onChange={handleTextChange} // Trigger filter on change
              fullWidth
              sx={{
                input: { color: "#FFFFFF" }, // White input text
                label: { color: "#FFA726" }, // Orange label
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#FF8C00" }, // Orange border
                  "&:hover fieldset": { borderColor: "#FFA726" }, // Lighter orange on hover
                  "&.Mui-focused fieldset": { borderColor: "#FFA726" }, // Lighter orange when focused
                },
              }}
            />
          </Grid>
          {/* Genre Dropdown */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel
                sx={{
                  color: "#FFA726", // Orange label
                  "&.Mui-focused": { color: "#FFA726" }, // Lighter orange when focused
                }}
              >
                Genre
              </InputLabel>
              <Select
                value={genreFilter} // Bind to genreFilter prop
                onChange={handleGenreChange} // Trigger filter on change
                sx={{
                  backgroundColor: "#1c1c1c", // Dark background
                  color: "#FFFFFF", // White text
                  marginTop: "14px",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#FF8C00", // Orange border
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#FFA726" }, // Lighter orange on hover
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#FFA726" }, // Lighter orange when focused
                }}
              >
                {/* Genre options */}
                <MenuItem value="0">All</MenuItem>
                <MenuItem value="28">Action</MenuItem>
                <MenuItem value="35">Comedy</MenuItem>
                <MenuItem value="18">Drama</MenuItem>
                <MenuItem value="878">Sci-Fi</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {/* Sort By Dropdown */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel
                sx={{
                  color: "#FFA726", // Orange label
                  "&.Mui-focused": { color: "#FFA726" }, // Lighter orange when focused
                }}
              >
                Sort By
              </InputLabel>
              <Select
                value={sortOption} // Bind to sortOption prop
                onChange={handleSortChange} // Trigger sort on change
                sx={{
                  backgroundColor: "#1c1c1c", // Dark background
                  color: "#FFFFFF", // White text
                  marginTop: "14px",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#FF8C00", // Orange border
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#FFA726" }, // Lighter orange on hover
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#FFA726" }, // Lighter orange when focused
                }}
              >
                {/* Sorting options */}
                <MenuItem value="">None</MenuItem>
                <MenuItem value="popularity">Popularity</MenuItem>
                <MenuItem value="release_date">Release Date</MenuItem>
                <MenuItem value="rating">Highest Rating</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default FilterMoviesCard;
