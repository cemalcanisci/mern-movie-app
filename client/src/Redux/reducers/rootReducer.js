import { combineReducers } from 'redux';
import movies from './movieReducer';
import categories from './categoryReducer';
import detail from './detailReducer';

const rootReducer = combineReducers({
  categoriesDatas: categories,
  moviesDatas: movies,
  movieDetail: detail,
});
export default rootReducer;
