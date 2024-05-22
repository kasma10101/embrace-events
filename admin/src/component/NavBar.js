import React from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import embraceLogo from '../assets/embraceLogo.png';

const NavBar = () => {
  return (
    <Navbar bg="light" variant="light" expand="lg" style={{ fontFamily: 'Ubuntu Sans, sans-serif' }} className="sticky-top">
      <Container className="justify-content-between">
        <Navbar.Brand href="#home">
          <img src={embraceLogo} alt="Embrace Logo" style={{ maxWidth: '120px', maxHeight: '100px', marginRight: '10px' }} />
          <span>Events.</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="m-auto text-dark">
            <Nav.Link href="#schedule">Events</Nav.Link>
            <Nav.Link href="/blogs">Blog</Nav.Link>
            <Button variant="outline-dark">Buy ticket</Button>
            <Nav.Link href="/login">Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
