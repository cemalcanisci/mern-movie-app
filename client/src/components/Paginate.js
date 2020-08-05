import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';

export default class Paginate extends Component {
  render() {
    return (
      <ReactPaginate
        previousLabel="Önceki"
        nextLabel="Sonraki"
        breakLabel="..."
        breakClassName="break-me"
        pageCount={10}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={this.handlePageClick}
        containerClassName="pagination"
        subContainerClassName="pages pagination"
        activeClassName="active"
      />
    );
  }
}
