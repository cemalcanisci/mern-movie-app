import React,{Component} from 'react';
import {getMovie} from '../redux/actions/getMovies'
import {connect} from 'react-redux';
import {
     withRouter
  } from "react-router-dom";

 class Moviedetail extends Component {
     componentDidMount() {
         this.props.getMovie(this.props.match.params.movieId);
     }
    render() {

        return (
            <div>
                {this.props.initialState.description}
                <br/>
                {this.props.initialState.title}
                <br/>
                {this.props.initialState.addedBy}
            </div>
        )
    }
}
const mapStateToProps = (state)=>{
    return state;
}
const mapDispatchToProps = {
    getMovie:getMovie
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Moviedetail))

