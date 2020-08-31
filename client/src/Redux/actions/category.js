import api from '../../Api';

export const getCategories = () => async (dispatch) => {
  try {
    const categories = await api.getCategories();
    dispatch({ type: 'GET_CATEGORIES', payload: categories });
  } catch (error) {
    dispatch({ type: 'GET_CATEGORY_ERRORS', payload: error });
  }
};
