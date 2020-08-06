import React, { Component } from 'react';
import { connect } from 'react-redux';
import MovieList from '../MovieList';
import Null from './Null';
import { get } from '../../redux/actions/category';
import { getMovies } from '../../redux/actions/getMovies';

class Movies extends Component {
  componentDidMount() {
    const { getCategories, moviesDatas, movies } = this.props;
    const { limit, page } = moviesDatas;
    const query = { limit, page };
    getCategories();
    movies(query);
  }

  render() {
    const { categoriesDatas, moviesDatas } = this.props;
    const { categories } = categoriesDatas;
    const {
      movies, movieErrors,
    } = moviesDatas;
    const checkMovies = movies.length ? <MovieList /> : <Null text="Henüz hiç film eklemediniz" />;
    const checkError = movieErrors === '' ? checkMovies : <Null text="Filmlerle ilgili bir hata oluştu.." />;
    const checkCategory = categories.length ? checkError : <Null text="Henüz hiç kategori yüklemediniz. Film ekleyebilmek ve görüntüleyebilmek için önce kategori yüklemelisiniz." />;

    return (
      <div>
        {checkCategory}
      </div>
    );
  }
}
const mapStateToProps = (state) => state;
const mapDispatchToProps = {
  getCategories: get,
  movies: getMovies,
};
export default connect(mapStateToProps, mapDispatchToProps)(Movies);
