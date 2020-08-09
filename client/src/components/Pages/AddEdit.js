import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  InputGroup, FormControl, Button, Container, Row, Col,
} from 'react-bootstrap';
import Editor from '../Editor';
import Croppie from '../Croppie';
import Null from './Null';

import { getMovie } from '../../redux/actions/getMovies';

class AddEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChanged: false,
      file: undefined,
      movie: {
        addedBy: '',
        author: '',
        category: '',
        description: 'İçerik giriniz..',
        image: '/default.jpg',
        order: 0,
        title: '',
        watched: true,
      },
      errors: [],
    };
  }

  componentDidMount() {
    const { match, get } = this.props;
    const { path, params } = match;
    const { movieId } = params;
    if (path === '/duzenle/:movieId') {
      get(movieId);
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (!state.isChanged) {
      if (props.match.path === '/ekle') {
        console.log('burda');
        return {
          movie: {
            title: '',
            ...state.movie,
            image: '/default.jpg',
          },
        };
      }
      if (props.movieDetail.movie && props.movieDetail.movie._id
        && state.movie._id !== props.movieDetail.movie._id) {
        return {
          ...state,
          movie: { ...props.movieDetail.movie },
        };
      }
    } if (props.match.path === '/ekle') {
      return {
        ...state,
        file: undefined,
        movie: {
          title: '',
          ...state.movie,
          image: '/default.jpg',
        },
      };
    }
    return null;
  }

    changeThis = (e) => {
      let { value } = e.target;
      const { name } = e.target;
      const { movie } = this.state;
      if (name === 'watched') {
        // eslint-disable-next-line no-unused-expressions
        value === 'true' ? value = true : value = false;
      }
      this.setState({
        isChanged: true,
        movie: {
          ...movie,
          [name]: value,
        },
      });
    }

    setDescrpition = (description) => {
      const { movie } = this.state;
      this.setState({
        isChanged: true,
        movie: {
          ...movie,
          description,
        },
      });
    }

    setNewImage = (image) => {
      const { movie } = this.state;
      this.setState({
        isChanged: true,
        movie: {
          ...movie,
          image,
        },
      });
    }

  setFile = (file) => {
    this.setState({
      isChanged: true,
      file,
    });
  }

  check=() => {
    const { movie } = this.state;
    const errors = [];

    Object.keys(movie).forEach((value) => {
      if (!movie[value] && value !== 'order') {
        errors.push(`${value} alanının girilmesi zorunludur..`);
      }
    });
    this.setState({
      errors: [...errors],
    });
  }

  submit=() => {
    console.log(this.state);
  }

  render() {
    const { movie, errors } = this.state;
    const { movieDetail, match } = this.props;
    const { path } = match;
    const edit = path === '/duzenle/:movieId';
    const { error } = movieDetail;
    const image = movie.image ? movie.image : '/default.jpg';
    const defaultImage = edit ? image : '/default.jpg';
    console.log(movie);
    return (
      <div>
        {error ? <Null text={error} /> : (
          <Container className="mt-2">
            {errors.length ? (
              <div>
                <h4 className="text-center">Lütfen girilmesi zorunlu alanları doldurunuz..</h4>
                <Row className="mb-3">
                  {errors.map((error, index) => (
                    <Col sm={12} md={6} className="d-flex justify-content-center p-2 border border-light rounded-sm" key={index}>
                      <span className="text-danger">{error}</span>
                    </Col>
                  ))}
                </Row>
              </div>

            ) : ''}
            <Row>
              <Col sm={12} md={6}>
                <InputGroup size="sm" className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="movie-name">Film Adı</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl name="title" onChange={this.changeThis} type="text" value={movie.title} aria-label="Film Adı" aria-describedby="movie-name" />
                </InputGroup>
              </Col>
              <Col sm={12} md={6}>
                <InputGroup size="sm" className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="movie-addedBy">Ekleyen</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl name="addedBy" onChange={this.changeThis} type="text" value={edit ? movie.addedBy : ''} aria-label="Ekleyen" aria-describedby="movie-addedBy" />
                </InputGroup>
              </Col>
            </Row>
            <Row>
              <Col sm={12} md={6}>
                <InputGroup size="sm" className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="movie-author">Yazar</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl name="author" onChange={this.changeThis} type="text" value={edit ? movie.author : ''} aria-label="Yazar" aria-describedby="movie-author" />
                </InputGroup>
              </Col>
              <Col sm={12} md={6}>
                <InputGroup size="sm" className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="movie-watched">İzlenildi Mi</InputGroup.Text>
                  </InputGroup.Prepend>

                  <FormControl name="watched" onChange={this.changeThis} value={edit ? movie.watched : ''} as="select" aria-describedby="movie-watched">
                    <option value>Evet</option>
                    <option value={false}>Hayır</option>
                  </FormControl>

                </InputGroup>
              </Col>
              <Col sm={12} md={12}>
                <h4 className="my-3">İçerik</h4>
                <Editor
                  className="my-3"
                  description={edit ? movie.description : 'Lütfen içerik giriniz...'}
                  setDescription={this.setDescrpition}
                />

              </Col>
              <Col className="d-flex justify-content-between align-items-center mt-3">
                <Croppie setFile={this.setFile} setNewImage={this.setNewImage} />
                <img alt={movie.title} className="detailImage" src={defaultImage} />
              </Col>

            </Row>

            <Button onClick={this.check} variant="outline-primary mt-3" size="lg">Cemal</Button>
          </Container>
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
