import axios from 'axios';

export const getMovies = ()=> async dispatch =>{
    try {
        let movies = await axios.get('/api/movies');
        dispatch({type:'GET_MOVIES',payload:movies.data})
    } catch (error) {
        dispatch({type:'GET_ERRORS',payload:error})

    }
    
}