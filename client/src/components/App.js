import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/main.scss';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import Header from './Header';
import RouteComponent from './RouteComponent';

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>

          <Header />
          <RouteComponent />

        </Router>

      </div>
    );
  }
}
