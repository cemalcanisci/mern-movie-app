import axios from 'axios';

export const getMovies = (query) => async (dispatch) => {
  try {
    const movies = await axios.get(`/api/movies?page=${query.page}&limit=${query.limit}`);
    dispatch({
      type: 'GET_MOVIES', payload: movies.data, page: query.page, limit: query.limit,
    });
  } catch (error) {
    dispatch({ type: 'GET_MOVIE_ERRORS', payload: error });
  }
};
export const getMoviesForOrder = () => async (dispatch) => {
  try {
    const movies = await axios.get('/api/movies/order');
    dispatch({ type: 'GET_MOVIES', payload: movies.data });
  } catch (error) {
    dispatch({ type: 'GET_MOVIE_ERRORS', payload: error });
  }
};
export const getMovie = (id) => async (dispatch) => {
  try {
    const movie = await axios.get(`/api/movie/${id}`);
    dispatch({ type: 'GET_MOVIE', payload: movie.data });
  } catch (error) {
    if (error.response && error.response.message) {
      dispatch({ type: 'GET_MOVIE_ERRORS', payload: error.response.message });
    } else {
      dispatch({ type: 'GET_MOVIE_ERRORS', payload: 'Bir Hata oluştu' });
    }
  }
};
export const getSearchedMovies = (query) => async (dispatch) => {
  try {
    const movies = await axios.get(`/api/movies/search?key=${query.value}&page=${query.page}&limit=${query.limit}`);
    dispatch({
      type: 'SEARCHED_MOVIES', payload: movies.data, value: query.value, page: query.page, limit: query.limit,
    });
  } catch (error) {
    dispatch({ type: 'GET_MOVIE_ERRORS', payload: 'Bir hata oluştu' });
  }
};
