import React, { Component } from 'react';
import MovieTable from './MovieTable';
import Paginate from './Paginate';

export default class MovieList extends Component {
  render() {
    return (
      <div>
        <MovieTable />
        <Paginate />
      </div>
    );
  }
}
