import React, { Component } from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import Movies from './Pages/Movies';
import AddEdit from './Pages/AddEdit';
import Detail from './Pages/Detail';
import Categories from './Pages/Categories';
import Order from './Pages/Order';
import ChangeCategory from './Pages/ChangeCategory';
import Null from './Pages/Null';

export default class RouteComponent extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/detay/:movieId">
            <Detail />
          </Route>

          <Route exact path="/kategori">
            <Categories />
          </Route>

          <Route exact path="/duzenle/:movieId">
            <AddEdit />
          </Route>

          <Route exact path="/ekle">
            <AddEdit />
          </Route>

          <Route exact path="/siralama">
            <Order />
          </Route>

          <Route exact path="/kategori-degistir">
            <ChangeCategory />
          </Route>

          <Route exact path="/users">
            Users
          </Route>

          <Route exact path="/">
            <Movies />
          </Route>
          <Route exact>
            <Null text="Aradığınız sayfa bulunamadı" />
          </Route>

        </Switch>
      </div>
    );
  }
}
