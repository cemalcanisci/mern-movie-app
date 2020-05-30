import axios from 'axios';

export const get = () => async dispatch =>{
    try {
        let categories = await axios.get('/api/category')
        dispatch({type:'GET_CATEGORIES',payload:categories});
    } catch (error) {
        console.log(error)
    }
}