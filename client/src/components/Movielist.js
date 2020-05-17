import React, { Component } from 'react'
import {connect} from 'react-redux';
import Loading from './Loading';
import Error from './Error';
import NullData from './NullData';
import {getMovies} from '../redux/actions/getMovies';
import MovieTable from './Movietable';
import MoviePaginate from './MoviePaginate';
 class Movielist extends Component {
     state = {
         query : {
             limit:2,
             page:1,
             pageCount:2
         }
     }
    componentDidMount(){
        this.props.getMovies(this.state.query);
      }
      handlePageClick = data => {
          const query = {
              ...this.state.query,
              page:data.selected+1
          }
          this.props.getMovies(query)
      }
    render() {
      const isDataInitialized = this.props.initialState.errors === "" || 'undefined' ?
       (this.props.initialState.isDataNull ? <NullData /> : 
        (this.props.initialState.movies.length ?  
            <div>
        <MovieTable movies={this.props.initialState.movies}/>
        <div className="react-paginate">
            <MoviePaginate values = {this.props.initialState} 
            stateValues = {this.state.query} handleFunction={this.handlePageClick} />

</div>
            </div>

        :  
        <Loading />)) : <Error error={this.props.initialState.errors}/>;

        return (
            <div>
                {isDataInitialized}

            </div>
        )
    }
}
const mapStateToProps = (state)=>{
    return state;
}
const mapDispatchToProps = {
    getMovies
}
export default connect(mapStateToProps,mapDispatchToProps)(Movielist)