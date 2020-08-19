import React, { Component } from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { connect } from 'react-redux';
import { Card } from 'react-bootstrap';
import Null from './Null';

import { getMoviesForOrder } from '../../redux/actions/getMovies';
import { updateOrder } from '../../redux/actions/updateMovie';

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
    };
  }

  componentDidMount() {
    const { get } = this.props;
    get();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.moviesDatas.movies.length
      && (nextProps.moviesDatas.movies.length !== prevState.movies.length)) {
      return {
        movies: [...nextProps.moviesDatas.movies],
      };
    }
    return null;
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    console.log(oldIndex);
    console.log(newIndex);
  };

  render() {
    const { movies } = this.state;
    const SortableItem = SortableElement(({ value, sortIndex }) => (
      <li className="mt-2 text-center ">
        {value}
      </li>
    ));
    const SortableList = SortableContainer(({ items }) => (
      <ul className="no-dot p-0">
        {items.map((value, index) => (
          <SortableItem

            key={`item-${value._id}`}
            index={index}
            sortIndex={index}
            value={value.title}
          />
        ))}
      </ul>
    ));
    return (
      <div>
        {movies.length ? (
          <Card>
            {' '}
            <SortableList helperClass="active-sort bg-secondary text-white border border-success rounded-pill" key={movies._id} items={movies} onSortEnd={this.onSortEnd} />
          </Card>
        ) : <Null text="Henüz hiç film yüklemediniz" />}
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
