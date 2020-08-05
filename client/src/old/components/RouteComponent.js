import React, { Component } from 'react'
import Movielist from './Movielist';
import Moviedetail from './Moviedetail';
import Edit from './Edit';
import Add from './Add';
import CategoryList from './CategoryList';
import Order from './Order';
import ChangeCategory from './ChangeCategory';
import {
  Switch,
  Route
} from "react-router-dom";
export default class RouteComponent extends Component {
  render() {
    return (
      <div>
        <Switch>
        <Route path="/detay/:movieId">
        <Moviedetail  />
          </Route>
          <Route path="/kategori">
            <CategoryList />
          </Route>
          <Route path="/duzenle/:movieId">
          <Edit />
          </Route>
          <Route path="/ekle">
          <Add />
          </Route>
          <Route path="/siralama">
            <Order />
            </Route>
          <Route path="/kategori-degistir">
            <ChangeCategory />
            </Route>
          <Route path="/users">
            Users
            </Route>
          <Route path="/">
            <Movielist/>
          </Route>
 
        </Switch>
      </div>
    )
  }
}

