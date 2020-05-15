import {combineReducers} from 'redux';
import movies from './movieReducer';
export default combineReducers({
    initialState:movies
})