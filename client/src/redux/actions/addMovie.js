import axios from 'axios';

export const add = (data, image,history,movies) => async dispatch => {
    try {
        let newData;
        const order = movies.length ? movies.length+1 : 1;
        if (image) {
            newData = { ...data, image: `/${image.name}` ,order:order }

            const formData = new FormData();
            formData.append("file", image)
            let res = await axios.post('/api/upload-image', formData)
            if (res) {

            }
        } else {
            newData = { ...data,order:order }

        }
        axios.post('/api/movie/add', newData)
            .then(res => {
                // dispatch({ type: 'GET_MOVIES', payload: res.data })
                console.log(res)
                history.push('/')
            })

    } catch (err) {
        dispatch({ type: 'GET_ERRORS', payload: err })
    }

}