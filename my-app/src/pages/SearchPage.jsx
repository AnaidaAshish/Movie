import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import MovieGrid from "../components/MovieGrid";
import Pagination from "../components/Pagination";
import "../styles/searchpage.css";
const SearchPage = () => {
  const { query } = useParams();
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const searchMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.searchMovies(query, currentPage);

        if (response && response.results) {
          setMovies(response.results);
          setTotalPages(response.total_pages || 0);
        } else {
          throw new Error("Invalid API response structure");
        }
      } catch (error) {
        console.error("Error searching movies:", error);
        setError("Failed to load search results. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (query) searchMovies();
  }, [query, currentPage]);

  if (loading) return <div className="loading">Loading...</div>;

  if (error)
    return (
      <div className="error">
        {error}
        <button
          onClick={() => window.location.reload()}
          className="retry-button"
        >
          Retry
        </button>
      </div>
    );

  return (
    <div className="search-container">
      <h1 className="title">Search Results for "{query}"</h1>
      {movies.length > 0 ? (
        <>
          <MovieGrid movies={movies} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      ) : (
        <p className="no-results">No results found.</p>
      )}
    </div>
  );
};

export default SearchPage;
