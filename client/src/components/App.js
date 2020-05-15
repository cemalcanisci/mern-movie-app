import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/main.scss';
import Header from './Header';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
export default class App extends Component {
  render() {
    const links = [
      {path:'/',name:'Filmler'},
      {path:'/order',name:'Sıralama'},
    ]
    return (
      <div className="container">
      <Router>
      <Header props={links} />

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about">
            About
          </Route>
          <Route path="/users">
           Users
          </Route>
          <Route path="/">
            Anasayfa
          </Route>
        </Switch>

        </Router>
      </div>
    )
  }
}

