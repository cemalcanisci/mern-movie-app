import React, { Component } from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import Movies from './Pages/Movies';

export default class RouteComponent extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/detay/:movieId">
            <Movies />
          </Route>
          <Route path="/kategori">
            <Movies />
          </Route>
          <Route path="/duzenle/:movieId">
            <Movies />
          </Route>
          <Route path="/ekle">
            <Movies />
          </Route>
          <Route path="/siralama">
            <Movies />
          </Route>
          <Route path="/kategori-degistir">
            <Movies />
          </Route>
          <Route path="/users">
            Users
          </Route>
          <Route path="/">
            <Movies />
          </Route>

        </Switch>
      </div>
    );
  }
}
