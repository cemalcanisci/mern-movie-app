import axios from 'axios';


export const updateMovie = (id, watched) => dispatch => {
    try {
        axios.put('/api/movie/change-status/' + id, { watched: watched })
            .then(res => {
                dispatch({ type: 'UPDATE_STATUS', payload: res.data._id })
            })
    } catch (err) {
        dispatch({ type: 'GET_ERRORS', payload: err })
    }

}
export const update = (data, image,history) => async dispatch => {
    try {
        let newData;
        if (image) {
            newData = { ...data, image: `/${image.name}` }

            const formData = new FormData();
            formData.append("file", image)
            let res = await axios.post('/api/upload-image', formData)
            if (res) {

            }
        } else {
            newData = { ...data }
        }
        axios.put('/api/movie/update/' + newData._id, { newData })
            .then(res => {
                dispatch({ type: 'GET_MOVIE', payload: res.data })

                history.push('/')
            })

    } catch (err) {
        dispatch({ type: 'GET_ERRORS', payload: err })
    }

}