import React, { Component } from 'react'
import Movielist from './Movielist';
import {connect} from 'react-redux';
import Loading from './Loading';
import Error from './Error';
import {
    Switch,
    Route,
  } from "react-router-dom";
  import {getMovies} from '../redux/actions/getMovies';
 class RouteComponent extends Component {
  componentDidMount(){
    this.props.getMovies();
  }
  
    render() {
      const isDataInitialized = this.props.initialState.errors === "" ? (this.props.initialState.movies.length ?  <Movielist /> :  <Loading />) : <Error error={this.props.initialState.errors}/>;

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
        {isDataInitialized}
          
              
            </Route>
          </Switch>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
  return state
  }
  const mapDispatchToProps = {
    getMovies
  }
export default connect(mapStateToProps,mapDispatchToProps)(RouteComponent)
