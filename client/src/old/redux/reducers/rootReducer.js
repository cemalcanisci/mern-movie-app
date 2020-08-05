import {combineReducers} from 'redux';
import movies from './movieReducer';
import detail from './detailReducer';
import category from './categoryReducer'
export default combineReducers({
    initialState:movies,
    movie:detail,
    initialCategories:category
})