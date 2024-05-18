const key = import.meta.env.VITE_TMDB_KEY;
const baseURL = "https://api.themoviedb.org/3";

const endpoints = {
  popular: `${baseURL}/movie/popular?api_key=${key}`,
  topRated: `${baseURL}/movie/top_rated?api_key=${key}`,
  trending: `${baseURL}/trending/movie/week?api_key=${key}`,
  upcoming: `${baseURL}/movie/upcoming?api_key=${key}`,
  comedy: `${baseURL}/discover/movie?api_key=${key}&with_genres=35&language=en-US&page=1`,
};

export const createImageUrl = (filename, size) => {
  return `https://image.tmdb.org/t/p/${size}${filename}`;
};

export default endpoints;
