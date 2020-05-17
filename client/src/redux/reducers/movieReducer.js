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
export function getMovie(state = {},action){
    switch(action.type){
        case 'GET_MOVIE':
        return {
            ...state,
            movie : action.payload.data
        }
        case 'GET_ERRORS': 
        return{
            ...state,
            errors : action.payload.message
        }
        default: return state;
    }
}