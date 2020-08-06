import axios from 'axios';

export const getMovies = (query) => async (dispatch) => {
  try {
    const movies = await axios.get(`/api/movies?page=${query.page}&limit=${query.limit}`);
    dispatch({ type: 'GET_MOVIES', payload: movies.data, page: query.page });
  } catch (error) {
    dispatch({ type: 'GET_MOVIE_ERRORS', payload: error });
  }
};
export const getMoviesForOrder = () => async (dispatch) => {
  try {
    const movies = await axios.get('/api/movies/order');
    dispatch({ type: 'GET_MOVIES', payload: movies.data });
  } catch (error) {

  }
};
export const getMovie = (id) => async (dispatch) => {
  const movie = await axios.get(`/api/movie/${id}`);
  dispatch({ type: 'GET_MOVIE', payload: movie.data });
};
