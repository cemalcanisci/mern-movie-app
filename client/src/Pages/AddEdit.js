import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  InputGroup, FormControl, Button, Container, Row, Col,
} from 'react-bootstrap';
import Editor from '../Components/Editor';
import Croppie from '../Components/Croppie';
import Null from './Null';

import { getMovie } from '../Redux/Actions/getMovies';
import { getCategories } from '../Redux/Actions/category';
import { update } from '../Redux/Actions/updateMovie';
import addMovie from '../Redux/Actions/addMovie';

class AddEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: undefined,
      isCroppedImage: false,
      isFirstLoad: true,
      path: '/ekle',
      movie: {
        addedBy: '',
        category: '',
        author: '',
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
    const { match, get, getCategory } = this.props;
    const { path, params } = match;
    const { movieId } = params;
    getCategory();
    if (path === '/duzenle/:movieId') {
      get(movieId);
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.match.path !== state.path) {
      if (props.match.path === '/ekle') {
        return {
          path: '/ekle',
          isCroppedImage: false,
          isFirstLoad: false,
          movie: {
            addedBy: '',
            category: '',
            author: '',
            description: 'İçerik giriniz..',
            image: '/default.jpg',
            order: 0,
            title: '',
            watched: true,
          },
        };
      }
      if (props.movieDetail.movie && props.movieDetail.movie._id
        && state.isFirstLoad) {
        return {
          isFirstLoad: false,
          path: '/duzenle/:movieId',
          movie: { ...props.movieDetail.movie },
        };
      }
    } else if (props.match.path !== '/ekle' && props.match.path === state.path
      && props.movieDetail.movie && props.movieDetail.movie._id
      && (state.isFirstLoad
      )) {
      return {
        isFirstLoad: false,
        path: '/duzenle/:movieId',
        movie: { ...props.movieDetail.movie },
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
        movie: {
          ...movie,
          [name]: value,
        },
      });
    }

    setDescrpition = (description) => {
      const { movie } = this.state;
      this.setState({
        movie: {
          ...movie,
          description,
        },
      });
    }

    setNewImage = (image) => {
      const { movie } = this.state;
      this.setState({
        isCroppedImage: true,
        movie: {
          ...movie,
          image,
        },
      });
    }

  setFile = (file) => {
    this.setState({
      file,
    });
  }

  check=() => {
    const { movie } = this.state;
    const errors = [];
    Object.keys(movie).forEach((value) => {
      if (!movie[value] && value !== 'order' && value !== '__v' && value !== 'category') {
        errors.push(`${value} alanının girilmesi zorunludur..`);
      }
    });
    this.setState({
      errors: [...errors],
    });
    if (!errors.length) {
      this.submit();
    }
  }

  submit=() => {
    const {
      add, history, categoriesDatas, match, updateMovie,
    } = this.props;
    const { categories } = categoriesDatas;
    const { movie, file } = this.state;
    const { path } = match;

    if (path === '/duzenle/:movieId') {
      updateMovie(movie, file, history);
    } else {
      if (!movie.category) movie.category = categories[0]._id;
      add(movie, file, history);
    }
  }

  render() {
    const { movie, errors, isCroppedImage } = this.state;
    const { movieDetail, match, categoriesDatas } = this.props;
    const { path } = match;
    const edit = path === '/duzenle/:movieId';
    const { error } = movieDetail;
    const cropped = isCroppedImage ? '' : '/assets';
    const image = movie.image && movie.image !== '/default.jpg' ? `${cropped}${movie.image}` : '/default.jpg';
    const { categories } = categoriesDatas;
    const addPageImage = isCroppedImage ? image : '/default.jpg';
    const defaultImage = edit ? image : addPageImage;
    const data = (
      <Container className="mt-2">
        {errors.length ? (
          <div>
            <h4 className="text-center">Lütfen girilmesi zorunlu alanları doldurunuz..</h4>
            <Row className="mb-3">
              {errors.map((err, index) => (
                <Col sm={12} md={6} className="d-flex justify-content-center p-2 border border-light rounded-sm" key={index}>
                  <span className="text-danger">{err}</span>
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
              <FormControl name="addedBy" onChange={this.changeThis} type="text" value={movie.addedBy} aria-label="Ekleyen" aria-describedby="movie-addedBy" />
            </InputGroup>
          </Col>
        </Row>
        <Row>
          <Col sm={12} md={6}>
            <InputGroup size="sm" className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="movie-author">Yazar</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl name="author" onChange={this.changeThis} type="text" value={movie.author} aria-label="Yazar" aria-describedby="movie-author" />
            </InputGroup>
          </Col>
          <Col sm={12} md={6}>
            <InputGroup size="sm" className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="movie-watched">İzlenildi Mi</InputGroup.Text>
              </InputGroup.Prepend>

              <FormControl name="watched" onChange={this.changeThis} value={movie.watched} as="select" aria-describedby="movie-watched">
                <option value>Evet</option>
                <option value={false}>Hayır</option>
              </FormControl>

            </InputGroup>
          </Col>

          <Col sm={12} md={6}>
            <InputGroup size="sm" className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="movie-category">Kategori</InputGroup.Text>
              </InputGroup.Prepend>

              <FormControl name="category" onChange={this.changeThis} value={movie.category._id} as="select" aria-describedby="movie-category">
                {categories.map((category) => (
                  <option
                    key={category._id}
                    value={category._id}
                  >
                    {category.title}
                  </option>
                ))}

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

        <Button onClick={this.check} variant="outline-primary mt-3" size="lg">Kaydet</Button>
      </Container>
    );
    const hasError = !error ? data : <Null text={error} />;
    const hasCategories = categories.length ? hasError : <Null text="Lütfen önce kategori ekleyiniz.." />;
    return (
      <div>
        {error ? <Null text={error} /> : hasCategories}

      </div>
    );
  }
}
const mapStateToProps = (state) => state;
const mapDispatchToProps = {
  get: getMovie,
  getCategory: getCategories,
  updateMovie: update,
  add: addMovie,
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddEdit));
