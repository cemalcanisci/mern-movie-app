import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import {connect} from 'react-redux';
import { getMovies } from '../redux/actions/getMovies';

 class Paginate extends Component {

  handlePageClick =  data => {
  const {moviesDatas,get} = this.props;
   const {limit} = moviesDatas;
   const page = (data.selected)+1;
   const query = {limit,page}
    get(query);
  };
  render() {
    const {moviesDatas} = this.props;
    const {limit,total} = moviesDatas;
    const count = Math.ceil(total/limit);
    
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
      />
    );
  }
}
const mapStateToProps = state => state;
const mapDispatchToProps = {
  get:getMovies
}
export default connect(mapStateToProps,mapDispatchToProps)(Paginate)