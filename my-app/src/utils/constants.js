import axios from 'axios';
export const API_KEY = '673994af7e35bfc62210423ef8f88fd7';
export const BASE_URL = 'https://api.themoviedb.org/3';
export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';


const api = {
  getPopularMovies: (page = 1) => 
    axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`),
  
  getTopRatedMovies: (page = 1) =>
    axios.get(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`),
  
  getUpcomingMovies: (page = 1) =>
    axios.get(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${page}`),
  
  getMovieDetails: (movieId) =>
    axios.get(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`),
  
  getMovieCast: (movieId) =>
    axios.get(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`),
  
  searchMovies: (query, page = 1) =>
    axios.get(`${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=${page}`)
};

export default api;