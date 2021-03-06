import api from '../../Api';

const addMovie = (data, image, history) => async (dispatch) => {
  try {
    let newData;
    const movies = await api.getMovies({})
    const order = movies.data.total ? movies.data.total + 1 : 1;
    if (image) {
      newData = { ...data, image: `/${image.name}`, order };

      const formData = new FormData();
      formData.append('file', image);
      await api.uploadImage(formData)
    } else {
      newData = { ...data, order };
    }
    await api.addMovie(newData);
    const allMovies = await api.getMovies({page:1,limit:15});
    dispatch({ type: 'GET_MOVIES', payload: allMovies.data, page: 1 });
    history.push('/');
  } catch (err) {
    dispatch({ type: 'GET_ERRORS', payload: err });
  }
};
export default addMovie;
