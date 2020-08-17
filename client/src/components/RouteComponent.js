import React, { Component } from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import Movies from './Pages/Movies';
import AddEdit from './Pages/AddEdit';
import Detail from './Pages/Detail';

export default class RouteComponent extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/detay/:movieId">
            <Detail />
          </Route>

          <Route path="/kategori">
            <Movies />
          </Route>

          <Route path="/duzenle/:movieId">
            <AddEdit />
          </Route>

          <Route path="/ekle">
            <AddEdit />
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
