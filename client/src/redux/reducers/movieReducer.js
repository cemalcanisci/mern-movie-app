const initialState = {
    movies: [],
    errors:''
}
export default function getMovies(state = initialState,action){
    switch(action.type){
        case 'GET_MOVIES': return {
            ...state,
            movies:action.payload
        };
        case 'GET_ERRORS': 
        return{
            ...state,
            errors : action.payload.message
        }
        default: return state;
    }
}