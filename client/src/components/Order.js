import React, { Component } from 'react'
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { connect } from 'react-redux';
import { getMoviesForOrder } from '../redux/actions/getMovies';
import {  Card } from 'react-bootstrap';
import {updateOrder} from '../redux/actions/updateMovie';
const SortableItem = SortableElement(({ value }) => <li>{value}</li>);

const SortableList = SortableContainer(({ items }) => {
  return (
    <ul>
      {items.map((value, index) => (
        <SortableItem key={`item-${value}`} index={index} value={value} />
      ))}
    </ul>
  );
});

class Order extends Component {
  state = {
    movies: [],
  };
  componentDidMount() {
    this.props.get();
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.initialState.movies.length && nextProps.initialState.movies.length !== prevState.movies.length) {
      return { movies: [...nextProps.initialState.movies] }
    }
    return null;
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    let newArr = [...this.state.movies];
    let spliced = newArr.splice(oldIndex, 1)[0];
    //  newArr.splice(oldIndex,1);
    newArr.splice(newIndex, 0, spliced);
    this.props.update(newArr);
    this.setState({
      movies: newArr
    })

  };
  render() {
    const SortableItem = SortableElement(({ value, sortIndex }) => (
      <li onClick={this.active} className="mt-2 text-center">
        {value}
      </li>
    ));
    const SortableList = SortableContainer(({ items }) => {

      return (
        <ul className="no-dot">
          {items.map((value, index) => (
            <SortableItem
            
              key={`item-${value._id}`}
              index={index}
              sortIndex={index}
              value={value.title}
            />
          ))}
        </ul>
      );
    });
    const sortable = this.state.movies.length ? <Card> <SortableList helperClass="active-sort" key={this.state.movies._id} items={this.state.movies} onSortEnd={this.onSortEnd} /></Card> : <div>Yoh</div>
    return (
      <Card >
        <Card.Body>
          <Card.Title className="d-flex justify-content-center">Sıralama</Card.Title>
          {sortable}
        </Card.Body>
      </Card>
    );


  }
}
const mapStateToProps = state => state;
const mapDispatchToProps = {
  get: getMoviesForOrder,
  update:updateOrder
}
export default connect(mapStateToProps, mapDispatchToProps)(Order)