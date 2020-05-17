import axios from 'axios';

export const getMovies = (query)=> async dispatch =>{
    try {
        let movies = await axios.get(`/api/movies?page=${query.page}&limit=${query.limit}`);
        dispatch({type:'GET_MOVIES',payload:movies.data})
    } catch (error) {
        dispatch({type:'GET_ERRORS',payload:error})

    }
}
export const getMovie = (id) => async dispatch =>{
    let movie = await axios.get(`/api/movie/${id}`);
    dispatch({type:'GET_MOVIE',payload:movie.data})
}