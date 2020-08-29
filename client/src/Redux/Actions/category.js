import api from '../../Api';

export const getCategories = () => async (dispatch) => {
  try {
    const categories = await api.getCategories();
    dispatch({ type: 'GET_CATEGORIES', payload: categories });
  } catch (error) {
    dispatch({ type: 'GET_CATEGORY_ERRORS', payload: error });
  }
};
export const set = (values, removedFields) => async () => {
  try {
    const data = {
      updated: [...values.filter((q) => q._id && q.modified)],
      removed: [...removedFields],
      added: [...values.filter((q) => !q._id)],
    };
    await api.setCategories(data);
  } catch (error) {

  }
};
