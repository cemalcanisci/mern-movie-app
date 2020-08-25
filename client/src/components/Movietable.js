import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faMinus } from '@fortawesome/free-solid-svg-icons';
import { updateMovie } from '../Redux/Actions/updateMovie';

class MovieTable extends Component {
  updateMovieStatus = (id, watched) => {
    const { moviesDatas, update } = this.props;
    const { limit, page } = moviesDatas;
    const query = { limit, page };
    update(id, watched, query);
  }

  render() {
    const { moviesDatas } = this.props;
    const { movies, page, limit } = moviesDatas;
    return (
      <Table className="mb-0" responsive striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Filmin Adı</th>
            <th>Yazar</th>
            <th>Ekleyen</th>
            <th>Tür</th>
            <th>İzlenildi mi?</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie, index) => (
            <tr key={movie._id}>
              <td>{(index + 1) + ((page - 1) * (limit))}</td>
              <td>{movie.title}</td>
              <td>{movie.author}</td>
              <td>{movie.addedBy}</td>
              <td>{movie.category.title}</td>
              <td>{movie.watched ? 'Evet' : 'Hayır'}</td>
              <td className="d-flex justify-content-start align-items-center">
                <Button className="mr-1" onClick={() => this.updateMovieStatus(movie._id, movie.watched)} size="sm" variant={movie.watched ? 'outline-primary' : 'outline-danger'}><FontAwesomeIcon icon={movie.watched ? faCheck : faMinus} /></Button>
                <Link to={`/duzenle/${movie._id}`}><Button variant="outline-success mr-1" size="sm">Düzenle</Button></Link>
                <Link to={`/detay/${movie._id}`}><Button variant="outline-warning" size="sm">Detay</Button></Link>
              </td>
            </tr>
          ))}

        </tbody>
      </Table>
    );
  }
}
const mapStateToProps = (state) => state;
const mapDispatchToProps = {
  update: updateMovie,
};
export default connect(mapStateToProps, mapDispatchToProps)(MovieTable);
