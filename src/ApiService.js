import ax from 'axios';

const ENDPOINT = process.env.REACT_APP_ENDPOINT;
const IMAGES_ENDPOINT = process.env.REACT_APP_IMAGES_ENDPOINT;
const API_KEY = process.env.REACT_APP_API_KEY;

let axios = ax.create({
  baseURL: ENDPOINT,
});

export function search(query, page) {
  return axios.get("/search/movie", {
    params: {
      api_key: API_KEY,
      query: query,
      page: page
    },
  });
}

export function getMovie(id) {
  return axios.get("/movie/" + id, {
    params: {
      api_key: API_KEY,
    },
  });
}

export function getImagePath(uri, size="w500") {
  return IMAGES_ENDPOINT + size + "/" + uri 
}

export function getDefaultImage() {
  return "https://cloud.filmfed.com/defaults/movie-poster/l_movie_poster_default.png"
}