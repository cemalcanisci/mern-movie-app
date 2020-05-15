import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/main.scss';
import Header from './Header';
import RouteComponent from './RouteComponent';
import {connect} from 'react-redux';
import {getMovies} from '../redux/actions/getMovies';
import {
  BrowserRouter as Router
} from "react-router-dom";class App extends Component {
  componentDidMount(){
    this.props.getMovies();
  }
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

const mapStateToProps = function(state){
return state
}
const mapDispatchToProps = {
  getMovies
}
export default connect(mapStateToProps,mapDispatchToProps)(App)