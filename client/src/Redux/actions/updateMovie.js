import api from '../../Api';

export const updateMovie = (id, watched, query, querySearch, type) => (dispatch) => {
  try {
    api.changeMovieStatus(id, watched)
      .then(async (res) => {
        dispatch({ type: 'UPDATE_STATUS', payload: res.data._id });
        const movies = await api.getMovies(query);
        if (type === 'search') {
          const searchedMovies = await api.getSearchedMovies(querySearch);
          dispatch({
            type: 'SEARCHED_MOVIES', payload: searchedMovies.data, value: querySearch.value, page: querySearch.page, limit: querySearch.limit,
          });
        }
        dispatch({ type: 'GET_MOVIES', payload: movies.data, page: query.page });
      });
  } catch (err) {
    dispatch({ type: 'GET_ERRORS', payload: err });
  }
};

export const update = (data, image, history) => async (dispatch) => {
  try {
    let newData;
    if (image) {
      newData = { ...data, image: `/${image.name}` };

      const formData = new FormData();
      formData.append('file', image);
      await api.uploadImage(formData);
    } else {
      newData = { ...data };
    }
    api.updateMovie(newData._id, newData);
    const allMovies = await api.getMovies({ page: 1, limit: 15 });
    dispatch({ type: 'GET_MOVIES', payload: allMovies.data, page: 1 });
    const movie = await api.getMovie(newData._id);
    dispatch({ type: 'GET_MOVIE', payload: movie.data });
    history.push('/');
  } catch (err) {
    dispatch({ type: 'GET_ERRORS', payload: err });
  }
};
