import axios from 'axios';

export const get = () => async (dispatch) => {
  try {
    const categories = await axios.get('/api/category');
    dispatch({ type: 'GET_CATEGORIES', payload: categories });
  } catch (error) {
    dispatch({ type: 'GET_CATEGORY_ERRORS', payload: error });
  }
};
export const set = (values) => async (dispatch) => {
  try {
    const data = {
      updated: [...values.fields.filter((q) => q.status)],
      removed: [...values.removedFields],
      added: [...values.newFields],
    };
    await axios.post('/api/category/set', data);
  } catch (error) {
    console.log(error);
  }
};
