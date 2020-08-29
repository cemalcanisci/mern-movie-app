import api from '../../Api'

export const getMovies = (query) => async (dispatch) => {
  try {
    const movies = await api.getMovies(query);
    dispatch({
      type: 'GET_MOVIES', payload: movies.data, page: query.page, limit: query.limit,
    });
  } catch (error) {
    dispatch({ type: 'GET_MOVIE_ERRORS', payload: error });
  }
};
export const getMoviesForOrder = () => async (dispatch) => {
  try {
    const movies = await api.getMoviesForOrder();
    dispatch({ type: 'GET_MOVIES', payload: movies.data });
  } catch (error) {
    dispatch({ type: 'GET_MOVIE_ERRORS', payload: error });
  }
};
export const getMovie = (id) => async (dispatch) => {
  try {
    const movie = await api.getMovie(id);
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
    const movies = await api.getSearchedMovies(query);
    dispatch({
      type: 'SEARCHED_MOVIES', payload: movies.data, value: query.value, page: query.page, limit: query.limit,
    });
  } catch (error) {
    dispatch({ type: 'GET_MOVIE_ERRORS', payload: 'Bir hata oluştu' });
  }
};
