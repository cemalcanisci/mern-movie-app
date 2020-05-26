import axios from 'axios';

export const add = (data, image,history) => async dispatch => {
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
        axios.post('/api/movie/add', newData)
            .then(res => {
                // dispatch({ type: 'GET_MOVIES', payload: res.data })

                history.push('/')
            })

    } catch (err) {
        dispatch({ type: 'GET_ERRORS', payload: err })
    }

}