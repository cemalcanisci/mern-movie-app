import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import Null from './Null';
import { getMovie } from '../../redux/actions/getMovies';

class AddEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: 'Hayır',
      movie: {
        title: '',
      },
    };
  }

  componentDidMount() {
    const { match, get, movieDetail } = this.props;
    const { path, params } = match;
    const { movieId } = params;
    if (path === '/duzenle/:movieId') {
      get(movieId);
    }
  }

  submit=() => {
    console.log(this.state);
  }

    changeThis = (e) => {
      const { value, name } = e.target;
      this.setState({
        movie: {
          [name]: value,
        },
      });
    }

    componentDidUpdate(prevProps) {
      console.log(this.props.match.path, prevProps.match.props);
      if ((prevProps.movieDetail.movie.title !== this.props.movieDetail.movie.title) || this.props.match.path !== prevProps.match.path) {
        this.setState({
          movie: {
            ...this.state.movie,
            title: this.props.movieDetail.movie.title,
          },
        });
      }
    }

    render() {
      const { isEdit } = this.state;
      const { movieDetail, match } = this.props;
      const { path } = match;
      console.log(path);
      const edit = path === '/duzenle/:movieId';
      const { error, movie } = movieDetail;
      return (
        <div>
          {error ? <Null text={error} /> : (
            <div className="mt-2 container">
              <InputGroup size="sm" className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="movie-name">{isEdit}</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl name="title" onChange={this.changeThis} type="text" value={edit ? this.state.movie.title : ''} aria-label="Film Adı" aria-describedby="movie-name" />
              </InputGroup>
              <Button onClick={this.submit} variant="outline-primary" size="lg">Cemal</Button>
            </div>
          )}

        </div>
      );
    }
}
const mapStateToProps = (state) => state;
const mapDispatchToProps = {
  get: getMovie,
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddEdit));
