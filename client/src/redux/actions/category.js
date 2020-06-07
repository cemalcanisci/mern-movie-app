import axios from 'axios';

export const get = () => async dispatch =>{
    try {
        let categories = await axios.get('/api/category')
        dispatch({type:'GET_CATEGORIES',payload:categories});
    } catch (error) {
        console.log(error)
    }
}
export const set = (values) => async dispatch =>{
    try {
        let data =  {
            updated:[...values.fields.filter(q=>{return q.status})],
            removed:[...values.removedFields],
            added:[...values.newFields]
        }
        await axios.post('/api/category/set',data)

    } catch (error) {
        console.log(error)
    }
}