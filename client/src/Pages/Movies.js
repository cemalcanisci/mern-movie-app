import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import MovieList from '../Components/MovieList';
import Null from './Null';
import { getCategories } from '../Redux/Actions/category';
import { getMovies, getSearchedMovies } from '../Redux/Actions/getMovies';

class Movies extends Component {
  componentDidMount() {
    const {
      categories, moviesDatas, movies, location, searched,
    } = this.props;
    const { search } = location;
    const {
      limit, page, searchedValue, searchedLimit, searchedPage,
    } = moviesDatas;
    const query = { limit, page };
    const searchQuery = {
      value: searchedValue,
      page: searchedPage,
      limit: searchedLimit,
    };
    categories();
    if (search === '?search' && searchedValue) {
      searched(searchQuery);
    }
    movies(query);
  }

  render() {
    const { categoriesDatas, moviesDatas, location } = this.props;
    const { search } = location;
    const { categories } = categoriesDatas;
    const {
      movies, movieErrors, searchedMovies, searchedValue,
    } = moviesDatas;
    const checkMovies = movies.length ? <MovieList /> : <Null text="Henüz hiç film eklemediniz" />;
    const searchData = searchedMovies.length ? <MovieList /> : <Null text={`${searchedValue} için hiç film bulunamadı`} />;
    const searchIsNull = searchedValue ? searchData : <Null text="Lütfen arama yapmak istediğiniz filmin adını giriniz" />;
    const checkSearch = search === '?search' ? searchIsNull : checkMovies;
    const checkError = movieErrors === '' ? checkSearch : <Null text="Filmlerle ilgili bir hata oluştu.." />;
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
  categories: getCategories,
  movies: getMovies,
  searched: getSearchedMovies,
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Movies));
