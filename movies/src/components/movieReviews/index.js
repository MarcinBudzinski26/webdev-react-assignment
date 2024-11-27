import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import { getMovieReviews } from "../../api/tmdb-api";
import { excerpt } from "../../util";
import { useQuery } from "react-query";
import Spinner from "../spinner";

export default function MovieReviews({ movie }) {
  // Fetch reviews using React Query
  const { data, error, isLoading, isError } = useQuery(
    ["reviews", { id: movie.id }],
    getMovieReviews
  );

  // Show a spinner while loading
  if (isLoading) {
    return <Spinner />;
  }

  // Display an error message if the request fails
  if (isError) {
    return <h1>{error.message}</h1>;
  }

  // Extract reviews data
  const reviews = data.results;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 550 }} aria-label="reviews table">
        <TableHead>
          <TableRow>
            {/* Table header for author, excerpt, and link */}
            <TableCell>Author</TableCell>
            <TableCell align="center">Excerpt</TableCell>
            <TableCell align="right">More</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* Render each review in a table row */}
          {reviews.map((r) => (
            <TableRow key={r.id}>
              {/* Display review author */}
              <TableCell component="th" scope="row">
                {r.author}
              </TableCell>
              {/* Show a short excerpt of the review content */}
              <TableCell>{excerpt(r.content)}</TableCell>
              {/* Link to the full review */}
              <TableCell>
                <Link
                  to={`/reviews/${r.id}`}
                  state={{
                    review: r,
                    movie: movie,
                  }}
                >
                  Full Review
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
