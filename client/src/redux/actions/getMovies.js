import axios from 'axios';

export function getMovies(){
    return dispatch=>{
        axios.get('/api/movies')
        .then(response=>console.log(response))
        .catch(err=>console.log(err));
    }
}