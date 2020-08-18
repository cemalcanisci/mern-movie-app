import React, { Component } from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { connect } from 'react-redux';

import { getMoviesForOrder } from '../../redux/actions/getMovies';
import { updateOrder } from '../../redux/actions/updateMovie';

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      isFirstLoad: true,
    };
  }

  componentDidMount() {
    const { get } = this.props;
    get();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.moviesDatas.movies.length && prevState.isFirstLoad) {
      return {
        movies: [...nextProps.moviesDatas.movies],
        isFirstLoad: false,
      };
    }
    return null;
  }

  render() {
    console.log(this.state);
    return (
      <div>
        Order sayfası
      </div>
    );
  }
}
const mapStateToProps = (state) => state;
const mapDispatchToProps = {
  get: getMoviesForOrder,
  update: updateOrder,
};
export default connect(mapStateToProps, mapDispatchToProps)(Order);
