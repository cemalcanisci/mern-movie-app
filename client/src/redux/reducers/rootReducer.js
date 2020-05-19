import {combineReducers} from 'redux';
import movies from './movieReducer';
import detail from './detailReducer';
export default combineReducers({
    initialState:movies,
    movie:detail
})