import React, { useState, useEffect } from "react";
import api from "../services/api";
import MovieGrid from "../components/MovieGrid";
import Pagination from "../components/Pagination";

const TopRatedPage = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopRatedMovies = async () => {
      try {
        setLoading(true);
        const data = await api.getTopRatedMovies(currentPage);
        setMovies(data.results);
        setTotalPages(data.total_pages);
        setError(null);
      } catch (error) {
        console.error("Error fetching top rated movies:", error);
        setError("Failed to load movies. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTopRatedMovies();
  }, [currentPage]);

  if (loading) {
    return (
      <div className="loading">
        <div>Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <div>{error}</div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">Top Rated Movies</h1>
        <div className="results-count">Total Results: {movies.length}</div>
      </div>

      <MovieGrid movies={movies} />

      <Pagination
        currentPage={currentPage}
        totalPages={Math.min(totalPages, 500)}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default TopRatedPage;
