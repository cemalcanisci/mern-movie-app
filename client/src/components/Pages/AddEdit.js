import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import Null from './Null';
import { getMovie } from '../../redux/actions/getMovies';

class AddEdit extends Component {
  constructor(props) {
    super(props);
    this.title = React.createRef();
    this.state = {
      isEdit: 'Hayır',
      movie: {

      },
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { match, movieDetail } = props;
    const { error } = movieDetail;
    const { path } = match;
    if (path === '/duzenle/:movieId' && !error) {
      return {
        isEdit: 'Evet',
        movie: {
          ...props.movieDetail.movie,
        },
      };
    }
    return {
      isEdit: 'Hayır',
      movie: {},
    };
  }

  componentDidMount() {
    const { match, get } = this.props;
    const { path, params } = match;
    const { movieId } = params;
    this.title.current.value = '';
    if (path === '/duzenle/:movieId') {
      get(movieId);
    }
  }

  submit=() => {
    console.log(this.title.current.value);
  }

  render() {
    const { isEdit } = this.state;
    const { movieDetail } = this.props;
    const { error } = movieDetail;
    const { movie } = this.state;
    console.log(movie);
    if (movie && movie.title) {
      this.title.current.value = movie.title;
    }
    return (
      <div>
        {error ? <Null text={error} /> : (
          <div>
            <InputGroup size="sm" className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="movie-name">{isEdit}</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl ref={this.title} aria-label="Film Adı" aria-describedby="movie-name" />
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
