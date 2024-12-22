import React, { useState, useEffect } from "react";
import movieAPI from "../services/api";
import MovieGrid from "../components/MovieGrid";
import Pagination from "../components/Pagination";
import "../styles/homepage.css";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const data = await movieAPI.getPopularMovies(currentPage);
        setMovies(data.results);
        setTotalPages(data.total_pages);
        setError(null);
      } catch (error) {
        console.error("Error fetching popular movies:", error);
        setError("Failed to fetch movies. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [currentPage]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="home-container">
      <h1 className="title">Popular Movies</h1>
      <MovieGrid movies={movies} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default HomePage;
