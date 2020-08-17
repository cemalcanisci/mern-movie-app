import axios from 'axios';

export const updateMovie = (id, watched, query) => (dispatch) => {
  try {
    axios.put(`/api/movie/change-status/${id}`, { watched })
      .then(async (res) => {
        dispatch({ type: 'UPDATE_STATUS', payload: res.data._id });
        const movies = await axios.get(`/api/movies?page=${query.page}&limit=${query.limit}`);
        dispatch({ type: 'GET_MOVIES', payload: movies.data, page: query.page });
      });
  } catch (err) {
    dispatch({ type: 'GET_ERRORS', payload: err });
  }
};
export const updateOrder = (data) => async (dispatch) => {
  const orderedData = [...data];
  orderedData.forEach((q, key) => {
    q.order = key;
  });
  const movies = axios.put('/api/movies/order', orderedData);
};
export const update = (data, image, history) => async (dispatch) => {
  try {
    let newData;
    if (image) {
      newData = { ...data, image: `/${image.name}` };

      const formData = new FormData();
      formData.append('file', image);
      await axios.post('/api/upload-image', formData);
    } else {
      newData = { ...data };
    }
    axios.put(`/api/movie/update/${newData._id}`, { newData });
    const allMovies = await axios.get('/api/movies?page=1&limit=2');
    dispatch({ type: 'GET_MOVIES', payload: allMovies.data, page: 1 });
    const movie = await axios.get(`/api/movie/${newData._id}`);
    dispatch({ type: 'GET_MOVIE', payload: movie.data });
    history.push('/');
  } catch (err) {
    dispatch({ type: 'GET_ERRORS', payload: err });
  }
};
