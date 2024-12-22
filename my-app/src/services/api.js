import axios from "axios";

const API_KEY = "c45a857c193f6302f2b5061c3b85e743";
const BASE_URL = "https://api.themoviedb.org/3";

const movieAPI = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: "en-US",
  },
});

const handleError = (error) => {
  console.error("API Error:", error);
  if (error.response) {
    throw new Error(error.response.data.message || "Server Error");
  } else if (error.request) {
    throw new Error(
      "No response from server. Please check your internet connection."
    );
  } else {
    throw new Error("Error setting up request");
  }
};

const api = {
  // Get top rated movies
  getTopRatedMovies: async (page = 1) => {
    try {
      const response = await movieAPI.get("/movie/top_rated", {
        params: { page },
      });
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  // Get popular movies
  getPopularMovies: async (page = 1) => {
    try {
      const response = await movieAPI.get("/movie/popular", {
        params: { page },
      });
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  // Get upcoming movies
  getUpcomingMovies: async (page = 1) => {
    try {
      const response = await movieAPI.get("/movie/upcoming", {
        params: { page },
      });
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  // Get movie details
  getMovieDetails: async (movieId) => {
    try {
      const response = await movieAPI.get(`/movie/${movieId}`);
      if (response && response.data) {
        return response.data;
      } else {
        throw new Error("Movie details response is invalid");
      }
    } catch (error) {
      console.error(
        `Error fetching movie details for ID ${movieId}:`,
        error.message || error
      );
      throw new Error("Failed to fetch movie details. Please try again later.");
    }
  },

  // Get movie cast
  getMovieCast: async (movieId) => {
    try {
      const response = await movieAPI.get(`/movie/${movieId}/credits`);
      if (response && response.data) {
        return response.data;
      } else {
        throw new Error("Movie cast response is invalid");
      }
    } catch (error) {
      console.error(
        `Error fetching movie cast for ID ${movieId}:`,
        error.message || error
      );
      throw new Error("Failed to fetch movie cast. Please try again later.");
    }
  },

  // Search movies
  searchMovies: async (query, page = 1) => {
    try {
      const response = await movieAPI.get("/search/movie", {
        params: {
          query,
          page,
        },
      });
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },
};

export default api;
