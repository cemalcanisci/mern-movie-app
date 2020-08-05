import React, { Component } from 'react';
import MovieList from '../MovieList';
import Null from './Null';

export default class Movies extends Component {
  render() {
    return (
      <div>
        <Null text="Boş" />
      </div>
    );
  }
}
