import React, { Component } from 'react'
import Movielist from './Movielist';
import Moviedetail from './Moviedetail';
import Edit from './Edit';
import Add from './Add';
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
          <Edit />
          </Route>
          <Route path="/ekle">
          <Add />
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

