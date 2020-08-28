import axios from 'axios';
import api from '../../api';

const addMovie = (data, image, history) => async (dispatch) => {
  try {
    let newData;
    const movies = await api.getMoviles();
    const order = movies.data.total ? movies.data.total + 1 : 1;
    if (image) {
      newData = { ...data, image: `/${image.name}`, order };

      const formData = new FormData();
      formData.append('file', image);
      await axios.post('/api/upload-image', formData);
    } else {
      newData = { ...data, order };
    }
    await axios.post('/api/movie/add', newData);
    const allMovies = await axios.get('/api/movies?page=1&limit=2');
    dispatch({ type: 'GET_MOVIES', payload: allMovies.data, page: 1 });
    history.push('/');
  } catch (err) {
    dispatch({ type: 'GET_ERRORS', payload: err });
  }
};
export default addMovie;
