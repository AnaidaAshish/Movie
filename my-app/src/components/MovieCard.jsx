import React from "react";
import { Link } from "react-router-dom";
import { IMAGE_BASE_URL } from "../utils/constants";
import "../styles/moviecard.css";

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.id}`}>
        <img src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt={movie.title} />
        <div className="movie-card-content">
          <h3 className="movie-title">{movie.title}</h3>
          <p className="movie-date">{movie.release_date}</p>
          <div className="movie-rating">
            <span className="rating-star">★</span>
            <span>{movie.vote_average}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
