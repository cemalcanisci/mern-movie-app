const initialState = {
    movies: [],
    errors:''
}
export default function getMovies(state = initialState,action){
    switch(action.type){
        case 'GET_MOVIES':
            if(action.payload.data.length){
                return {
                    ...state,
                    movies:action.payload.data,
                    total:action.payload.total
            }
        }else{
            return {
                ...state,
                isDataNull:true
        }     
        }
        case 'UPDATE_STATUS':
            const updatedIndex = state.movies.findIndex(movie=>movie._id === action.payload);
        let changedMovie = state.movies[updatedIndex];
            changedMovie.watched =  !changedMovie.watched;
             return {
                 changedMovie,
                 ...state
            }
        case 'GET_ERRORS': 
        return{
            ...state,
            errors : action.payload.message
        }
        default: return state;
    }
}
