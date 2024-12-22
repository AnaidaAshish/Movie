import React, { useState, useEffect } from "react";
import api from "../services/api";
import MovieGrid from "../components/MovieGrid";
import Pagination from "../components/Pagination";
import "../styles/upcomingpage.css";
const UpcomingPage = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dates, setDates] = useState(null);

  useEffect(() => {
    const fetchUpcomingMovies = async () => {
      try {
        setLoading(true);
        const response = await api.getUpcomingMovies(currentPage);

        console.log("API Response:", response);

        if (response.results) {
          setMovies(response.results);
          setTotalPages(response.total_pages || 0);
          setDates(response.dates || null);
        } else {
          throw new Error("Invalid API response structure");
        }

        setError(null);
      } catch (error) {
        console.error("Error fetching upcoming movies:", error);
        setError("Failed to load movies. Please try again later.");
        setMovies([]);
        setTotalPages(0);
        setDates(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUpcomingMovies();
  }, [currentPage]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-text">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-text">
          {error}
          <button
            onClick={() => window.location.reload()}
            className="retry-button"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="upcoming-page-container">
      <div className="header-section">
        <div className="header-title">
          <h1 className="total-results">Upcoming Movies</h1>
          <div className="text-gray-600">Total Results: {movies.length}</div>
        </div>

        {dates && (
          <div className="release-dates-container">
            <p className="release-dates-text">
              Release Dates: {new Date(dates.minimum).toLocaleDateString()} -{" "}
              {new Date(dates.maximum).toLocaleDateString()}
            </p>
          </div>
        )}
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

export default UpcomingPage;
