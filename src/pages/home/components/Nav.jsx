import React from "react";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const CustomNavbar = () => {
  return (
    <Navbar expand="lg" className="border-bottom">
      <Container>
        <Navbar.Brand href="#" className="fw-bold">
          Medroyale
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#">Feature</Nav.Link>
            <Nav.Link href="#">Pricing</Nav.Link>
            <Nav.Link href="#">Contact Us</Nav.Link>
          </Nav>
          <Button variant="dark" size="sm" className="ms-3">
            Downloads
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
