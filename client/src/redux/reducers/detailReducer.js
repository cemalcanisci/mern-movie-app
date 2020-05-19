const initialState = {
    movie: {}
}
export default function getMovie(state = initialState,action){
    switch(action.type){
        case 'GET_MOVIE':
        return {...action.payload }
        case 'GET_ERRORS': 
        return{
            ...state,
            errors : action.payload.message
        }
        default: return state;
    }
}
