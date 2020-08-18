const initialState = {
  movies: [],
  total: 0,
  searchTotal: 0,
  movieErrors: '',
  page: 1,
  limit: 2,
};

export default function getMovies(state = initialState, action) {
  switch (action.type) {
    case 'GET_MOVIES':
      return {
        ...state,
        page: action.page ? action.page : state.page,
        movies: action.payload.data,
        total: action.payload.total ? action.payload.total : action.payload.data.length,
      };

    case 'GET_MOVIE_ERRORS':
      return {
        ...state,
        errors: action.payload,
      };
    default: return state;
  }
}
