import { combineReducers } from 'redux';
import movies from './movieReducer';
import categories from './categoryReducer';

const rootReducer = combineReducers({
  categoriesDatas: categories,
  moviesDatas: movies,
});
export default rootReducer;
