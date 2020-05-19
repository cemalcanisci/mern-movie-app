import axios from 'axios';


export const updateMovie = (id,watched) => dispatch =>{
    try{
       axios.put('/api/movie/change-status/' + id,{watched : watched})
        .then(res=>{
            dispatch({type:'UPDATE_STATUS',payload:res.data._id})
        })
    }catch(err){
        dispatch({type:'GET_ERRORS',payload:err})
    }

}