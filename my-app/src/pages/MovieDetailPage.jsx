import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { IMAGE_BASE_URL } from "../utils/constants";
import "../styles/moviedetail.css";

const MovieDetailPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const [movieDetails, castDetails] = await Promise.all([
          api.getMovieDetails(id),
          api.getMovieCast(id),
        ]);

        if (!movieDetails || !movieDetails.title) {
          throw new Error("Movie details not found.");
        }

        if (!castDetails || !Array.isArray(castDetails.cast)) {
          throw new Error("Cast details not found.");
        }

        setMovie(movieDetails);
        setCast(castDetails.cast.slice(0, 10));
      } catch (err) {
        console.error("Error fetching movie details:", err.message || err);
        setError(
          "An error occurred while fetching movie details. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return <div className="text-center p-6">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center p-6 text-red-500">
        {error}
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="movie-detail container">
      <div className="movie-detail-grid">
        <img
          src={`${IMAGE_BASE_URL}${movie.poster_path}`}
          alt={movie.title}
          className="movie-poster"
        />
        <div className="movie-info">
          <h1>{movie.title}</h1>
          <p className="movie-overview">{movie.overview}</p>
          <div className="movie-meta">
            <div className="meta-item">
              <h2>Release Date</h2>
              <p>{movie.release_date}</p>
            </div>
            <div className="meta-item">
              <h2>Rating</h2>
              <p>{movie.vote_average} / 10</p>
            </div>
          </div>
        </div>
      </div>

      <div className="cast-section">
        <h2>Cast</h2>
        <div className="cast-grid">
          {cast.map((member) => (
            <div key={member.id} className="cast-card">
              <img
                src={
                  member.profile_path
                    ? `${IMAGE_BASE_URL}${member.profile_path}`
                    : "/placeholder.png"
                }
                alt={member.name}
              />
              <div className="cast-info">
                <p className="cast-name">{member.name}</p>
                <p className="cast-character">{member.character}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
