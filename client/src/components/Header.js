import React, { useEffect, useRef } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Navbar, Nav, InputGroup, FormControl, Button,
} from 'react-bootstrap';
import { getSearchedMovies } from '../Redux/Actions/getMovies';

function Header({ props, get }) {
  const searchInput = useRef(null);
  const history = useHistory();
  const submitSearch = (value) => {
    const query = {
      value,
      page: 1,
      limit: 10,
    };
    get(query);
    history.push('/?search');
    searchInput.current.value = '';
  };
  const setSearch = () => {
    if (searchInput.current.value) {
      submitSearch(searchInput.current.value.trim());
    }
  };
  const ifEnterPressed = (event) => {
    if (event.key === 'Enter') {
      setSearch();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', ifEnterPressed);
    return () => {
      window.removeEventListener('keydown', ifEnterPressed);
    };
  });
  return (
    <Navbar bg="dark" expand="lg" className="text-center">
      <Navbar.Brand className="text-white" to="/">
        MERN Movie App
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="mern-movie-app-navbar" />
      <Navbar.Collapse id="mern-movie-app-navbar">
        <Nav className="mr-auto header">
          <NavLink className="text-white text-nowrap" to="/">
            Film Listesi
          </NavLink>
          <NavLink className="text-white text-nowrap" to="/ekle">
            Yeni Film
          </NavLink>
          <NavLink className="text-white text-nowrap" to="/kategori">
            Kategoriler
          </NavLink>
          <NavLink className="text-white text-nowrap" to="/siralama">
            Sıralama
          </NavLink>
        </Nav>
        <InputGroup className="my-3 w-100">
          <FormControl
            placeholder="Filmlerde Ara..."
            aria-label="Filmlerde Ara..."
            ref={searchInput}
          />
          <InputGroup.Append>
            <Button onClick={setSearch} variant="secondary">
              Ara
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Navbar.Collapse>
    </Navbar>
  );
}

function mapStateToProps(state) {
  return { state };
}
const mapDispatchToProps = {
  get: getSearchedMovies,
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
