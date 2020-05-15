export default function getMovies(state = [],action){
    switch(action.type){
        case 'GET_MOVIES': return state;
        default: return state;
    }
}