import React from "react";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const CustomNavbar = () => {
  return (
    <Navbar expand="lg" className="border-bottom">
      <Container>
        <Navbar.Brand href="#" className="navbar-brand">
          Medroyale
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#" className="nav-text">
              Feature
            </Nav.Link>
            <Nav.Link href="#" className="nav-text">
              Pricing
            </Nav.Link>
            <Nav.Link href="#" className="nav-text">
              Contact Us
            </Nav.Link>
          </Nav>
          <Button variant="dark" size="sm" className="ms-3 nav-button">
            Downloads
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
