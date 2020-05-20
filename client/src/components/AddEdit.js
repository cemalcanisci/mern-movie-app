import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import { getMovie } from '../redux/actions/getMovies'

class AddEdit extends Component {
        componentDidMount() {
            if(this.props.match.params.movieId){
                this.props.getMovie(this.props.match.params.movieId);
            }
        }
    render() {
        console.log(this.props);
        return (
            <div>
                {this.props.match.path === '/ekle' ? 'Ekle' : 'Düzenle'}
            </div>
        )
    }
}
const mapStateToProps = state=>state;
const mapDispatchToProps = {
    getMovie
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(AddEdit))
