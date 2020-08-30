import axios from 'axios';

class Api {
  constructor() {
    this.api = axios.create({});
  }

  uploadImage(data){
    return this.api.post('/api/upload-image',data)
  }

  getMovies(query){
    if(query.page && query.limit){
      return this.api.get(`/api/movies?page=${query.page}&limit=${query.limit}`)
    }
    else{
      return this.api.get('/api/movies')
    }
  }

  getMoviesForOrder(){
    return this.api.get('/api/movies/order')
  }

  getMovie(id){
    return this.api.get(`/api/movie/${id}`)
  }

  getSearchedMovies(query){
    return this.api.get(`/api/movies/search?key=${query.value}&page=${query.page}&limit=${query.limit}`)
  }

  changeMovieStatus(id,watched){
    return this.api.put(`/api/movie/change-status/${id}`, { watched })
  }

  updateMoviesOrder(data){
    return this.api.put('/api/movies/order', data);
  }

  updateMovie(id,newData){
    return this.api.put(`/api/movie/update/${id}`, { newData });
  }

  addMovie(data){
    return this.api.post('/api/movie/add', data)
  }

  getCategories(){
    return this.api.get('/api/category')
  }

  setCategories(data){
    return this.api.post('/api/category/set',data)
  }
}

export default new Api();