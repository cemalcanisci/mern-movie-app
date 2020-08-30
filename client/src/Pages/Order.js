import React, { Component } from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { connect } from 'react-redux';
import { Card } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';
import { ToastContainer, toast } from 'react-toastify';
import Null from './Null';

import { Button } from 'react-bootstrap';

import { getMoviesForOrder } from '../Redux/Actions/getMovies';
import api from '../Api';

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
    const { movies } = this.state;
    const newArr = [...movies];
    const spliced = newArr.splice(oldIndex, 1)[0];
    newArr.splice(newIndex, 0, spliced);
    this.setState({
      movies: newArr,
    });
  };
  callToast = (type,cemoji,text)=>{
    return (() => toast[type](`${cemoji} ${text}`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      }))();
  }

  check = ()=>{
    confirmAlert({
      title: 'Emin misin?',
      message: 'Film sıralamasını değiştirmek istediğinize emin misiniz?',
      buttons: [
        {
          label: 'Evet',
          onClick: () => this.submit()
        },
        {
          label: 'Hayır',
          onClick: () => this.callToast('error','😑','işleminiz iptal edildi')
        }
      ],
      closeOnEscape: true,
      closeOnClickOutside: true,
    });
  }

  submit = ()=>{
    const {movies} = this.state;
    const orderedData = [...movies];
    orderedData.forEach((q, key) => {
      q.order = key;
    });
    api.updateMoviesOrder(orderedData).then(cb=>{
      this.callToast('info','😎','İşleminiz başarıyla gerçekleştirildi!');
    }).catch(err=>{
      this.callToast('err','😓','Bir hata oluştu..')
    })
  }

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
            <ToastContainer />
            <Button onClick={this.check} variant="outline-dark mt-3 align-self-center" size="lg">Kaydet</Button>
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
};
export default connect(mapStateToProps, mapDispatchToProps)(Order);
