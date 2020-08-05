import React from 'react';
import {
  Navbar, Nav, InputGroup, FormControl, Button,
} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <Navbar bg="dark" expand="lg" className="text-center">
      <Navbar.Brand className="text-white" to="/">MERN Movie App</Navbar.Brand>
      <Navbar.Toggle aria-controls="mern-movie-app-navbar" />
      <Navbar.Collapse id="mern-movie-app-navbar">
        <Nav className="mr-auto header">
          <NavLink className="text-white" to="/">Film Listesi</NavLink>
          <NavLink className="text-white" to="/ekle">Yeni Film</NavLink>
          <NavLink className="text-white" to="/kategori">Kategoriler</NavLink>
          <NavLink className="text-white" to="/siralama">Sıralama</NavLink>
          <NavLink className="text-white" to="/kategori-degistir">Kategori Değiştir</NavLink>
        </Nav>
        <InputGroup className="my-3 w-100">
          <FormControl
            placeholder="Ara..."
            aria-label="Ara..."
          />
          <InputGroup.Append>
            <Button variant="secondary">asd</Button>
          </InputGroup.Append>
        </InputGroup>
      </Navbar.Collapse>
    </Navbar>
  );
}
