import axios from 'axios';

class Api {
  constructor() {
    this.api = axios.createInstance({
      baseUrl: 'https://cemal.herokuapp.com'
    });
  }

  getMoviles() {
    return this.api.get('/movies');
  }
}

export default new Api();