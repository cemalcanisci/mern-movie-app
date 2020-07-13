import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import { getMovie } from '../redux/actions/getMovies'
import { connect } from 'react-redux';
import {Html5Entities} from 'html-entities';
import {
    withRouter
} from "react-router-dom";
const htmlEntities = new Html5Entities();
class Moviedetail extends Component {
    componentDidMount() {
        this.props.getMovie(this.props.match.params.movieId);
    }
    render() {
        //Bakılacak
const description = htmlEntities.decode(this.props.movie.description);

        return (
            <div>
                <Card>
                    <div className="border d-flex flex-row mb-2 justify-content-around align-items-center">
                        <Card.Img className="detailImage" src={'/assets/'+this.props.movie.image} />
                        <Card.Title> <strong className="text-danger"> <h3> {this.props.movie.title}</h3> </strong> </Card.Title>
                    </div>
                    <div>
                        <div className="d-flex flex-column  border-bottom mb-2">
                            <div className="d-flex flex-row align-items-center justify-content-start">
                                <h4 className="border-bottom">Ekleyen : </h4> <h5>{this.props.movie.addedBy}</h5>
                            </div>
                            <div className="d-flex flex-row align-items-center justify-content-start">
                                <h4 className="border-bottom">Kategori : </h4> <h5>{this.props.movie.category && this.props.movie.category.title ? this.props.movie.category.title : ''}</h5>
                            </div>
                        </div>
                        <div className="blockquote-footer"><cite title="Source Title">{this.props.movie.author}</cite></div>

                        <div>{}</div>
                        <div dangerouslySetInnerHTML={{ __html: description }} ></div>


                    </div>
                </Card>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return state;
}
const mapDispatchToProps = {
    getMovie: getMovie
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Moviedetail))

