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
    const { update } = this.props;
    const { movies } = this.state;
    const newArr = [...movies];
    const spliced = newArr.splice(oldIndex, 1)[0];
    newArr.splice(newIndex, 0, spliced);
    this.setState({
      movies: newArr,
    });
    update(newArr);
  };

  render() {
    const { movies } = this.state;
    const SortableItem = SortableElement(({ value, sortIndex }) => (
      <li className="mt-2 text-center border p-1">
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
            <SortableList helperClass="active-sort bg-secondary text-white border border-success" key={movies._id} items={movies} onSortEnd={this.onSortEnd} />
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
