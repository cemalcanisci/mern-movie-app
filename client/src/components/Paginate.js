import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getMovies, getSearchedMovies } from '../Redux/Actions/getMovies';

class Paginate extends Component {
  constructor(props) {
    super(props);
    this.state = { pageNumber: 0 };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { moviesDatas, location } = nextProps;
    const { search } = location;
    const { page, searchedPage } = moviesDatas;
    const pageData = search === '?search' ? searchedPage : page;
    const pre = pageData - 1;
    const next = (prevState.pageNumber);
    if (pre !== next) {
      return {
        pageNumber: pre,
      };
    }

    return null;
  }

  handlePageClick = (data) => {
    const {
      moviesDatas, get, searched, location,
    } = this.props;
    const { search } = location;
    const { limit, searchedLimit, searchedValue } = moviesDatas;
    const limitData = search === '?search' ? searchedLimit : limit;
    const page = (data.selected) + 1;
    const query = { limit: limitData, page };
    const searchedQuery = {
      value: searchedValue,
      limit: limitData,
      page,
    };
    if (search === '?search') {
      searched(searchedQuery);
    } else {
      get(query);
    }
  };

  render() {
    const { moviesDatas, location } = this.props;
    const { search } = location;
    const {
      limit, total, searchedLimit, searchedTotal,
    } = moviesDatas;
    const totalData = search === '?search' ? searchedTotal : total;
    const limitData = search === '?search' ? searchedLimit : limit;
    const count = Math.ceil(totalData / limitData);
    const { pageNumber } = this.state;
    return (
      <ReactPaginate
        previousLabel="Önceki"
        nextLabel="Sonraki"
        breakLabel="..."
        breakClassName="break-me"
        pageCount={count}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={this.handlePageClick}
        containerClassName="pagination"
        subContainerClassName="pages pagination"
        activeClassName="active"
        forcePage={pageNumber}
      />
    );
  }
}
const mapStateToProps = (state) => state;
const mapDispatchToProps = {
  get: getMovies,
  searched: getSearchedMovies,
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Paginate));
