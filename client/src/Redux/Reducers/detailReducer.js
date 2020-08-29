const initialState = {
  movie: {},
  newImageUrl: null,
  error: '',
};
export default function getMovie(state = initialState, action) {
  switch (action.type) {
    case 'GET_MOVIE':
      return {
        ...state,
        movie: { ...action.payload },
        error: '',
      };

    case 'GET_ERRORS':
      return {
        ...state,
        error: action.payload,
      };

    default: return state;
  }
}
