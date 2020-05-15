import React, { Component } from 'react'
import Movielist from './Movielist';
import {
    Switch,
    Route,
  } from "react-router-dom";
export default class RouteComponent extends Component {
    render() {
        return (
            <div>
            <Switch>
            <Route path="/about">
              About
            </Route>
            <Route path="/users">
             Users
            </Route>
            <Route path="/">
              <Movielist />
            </Route>
          </Switch>
            </div>
        )
    }
}
