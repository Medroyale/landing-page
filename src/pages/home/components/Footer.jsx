import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
  return (
    <footer>
      <Row>
        <Col lg={6}>
          <h3 className="text-footer-title">Medroyale</h3>
          <p className="text-footer-body">
            Copyright 2025-2030 MedRoyale Ltd. <br /> Manchester, United
            Kingdom.
          </p>
        </Col>
      </Row>
    </footer>
  );
};

export default Footer;
