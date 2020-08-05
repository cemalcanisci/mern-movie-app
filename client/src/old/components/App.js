import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/main.scss';
import Header from './Header';
import RouteComponent from './RouteComponent';
import {
  BrowserRouter as Router
} from "react-router-dom";
export default class App extends Component {
  isDataInitialized = false;

  render() {
    const links = [
      {path:'/',name:'Filmler'},
      {path:'/order',name:'Sıralama'},
    ]
    return (
      <div className="container">
      <Router>
      <Header props={links} />
      <RouteComponent />
        </Router>

      </div>
    )
  }
}

