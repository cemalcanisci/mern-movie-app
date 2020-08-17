import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import { connect } from 'react-redux';
import { getMovies } from '../redux/actions/getMovies';

class Paginate extends Component {
  constructor(props) {
    super(props);
    this.state = { pageNumber: 0 };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { moviesDatas } = nextProps;
    const { page } = moviesDatas;
    const pre = page - 1;
    const next = (prevState.pageNumber);
    if (pre !== next) {
      return {
        pageNumber: pre,
      };
    }

    return null;
  }

  handlePageClick = (data) => {
    const { moviesDatas, get } = this.props;
    const { limit } = moviesDatas;
    const page = (data.selected) + 1;
    const query = { limit, page };
    get(query);
  };

  render() {
    const { moviesDatas } = this.props;
    const { limit, total } = moviesDatas;
    const count = Math.ceil(total / limit);
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
};
export default connect(mapStateToProps, mapDispatchToProps)(Paginate);
