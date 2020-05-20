import React, { Component } from 'react'
import Movielist from './Movielist';
import Moviedetail from './Moviedetail';
import AddEdit from './AddEdit'
import {
  Switch,
  Route
} from "react-router-dom";
export default class RouteComponent extends Component {
  updateMovieDetail = (id)=>{
    console.log(id);
  }

  render() {

    return (
      <div>
        <Switch>
        <Route path="/detay/:movieId">
        <Moviedetail  />
          </Route>
          <Route path="/duzenle/:movieId">
          <AddEdit />
          </Route>
          <Route path="/ekle">
          <AddEdit />
          </Route>
          <Route path="/about">
            About
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

