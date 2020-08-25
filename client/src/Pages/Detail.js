import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  Card, Container, Col, Row,
} from 'react-bootstrap';
import { getMovie } from '../Redux/Actions/getMovies';
import Null from './Null';

class Detail extends Component {
  componentDidMount() {
    const { get, match } = this.props;
    const { params } = match;
    const { movieId } = params;
    get(movieId);
  }

  render() {
    const { movieDetail } = this.props;
    const { error, movie } = movieDetail;
    const {
      addedBy, author, category, description, image, title, watched,
    } = movie;
    const detailImage = image === '/default.jpg' ? '/default.jpg' : `/assets${image}`;
    return (
      <div>
        {error ? <Null text={error} /> : (
          <Container className="mt-2 text-white">
            <Card className="bg-secondary">
              <h3 className="text-center p-1 border-bottom">{title}</h3>
              <Row>
                <Col sm={12} md={6} className="text-center"><img alt={title} src={detailImage} /></Col>
                <Col sm={12} md={6}>
                  <Row className="mx-0">
                    <h4>
                      Ekleyen :
                      {' '}
                      <span>{addedBy}</span>
                    </h4>
                  </Row>
                  <Row className="mx-0 mt-2">
                    <h4>
                      Kategori :
                      {' '}
                      <span>{category ? category.title : ''}</span>
                    </h4>
                  </Row>
                  <Row className="mx-0 mt-2">
                    <h4>
                      Yazar :
                      {' '}
                      <span>{author}</span>
                    </h4>
                  </Row>

                  <Row className="mx-0 mt-2">
                    <h4>
                      İzlenildi mi ? :
                      {' '}
                      <span>{watched ? 'Evet' : 'Hayır'}</span>
                    </h4>
                  </Row>
                </Col>
              </Row>
              <Row className="mx-0">
                <div className="editor-element" dangerouslySetInnerHTML={{ __html: description }} />
              </Row>
              <div />
            </Card>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Detail));
