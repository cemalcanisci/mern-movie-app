const initialCategories = {
  categories: [],
  categoryErrors: '',
};

export default function categories(state = initialCategories, action) {
  switch (action.type) {
    case 'GET_CATEGORIES':
      return {
        ...state,
        categories: [...action.payload.data],
      };
    default: return state;
  }
}
