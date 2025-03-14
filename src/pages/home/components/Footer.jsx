import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
  return (
    <footer className="border-bottom">
      <Container>
        <Row>
          <Col lg={6}>
            <h3 className="text-title">Medroyale</h3>
            <p className="text-body">
              Sed ut perspiciatis undmnis iste natus error sit voluptatem
              accusantium dolore udantiyu totam.
            </p>
          </Col>
          <Col lg={6}>
            <Row>
              <Col>
                <h6>Company</h6>
                <ul className="list-unstyled">
                  <li>Feature</li>
                  <li>Pricing</li>
                  <li>Contact Us</li>
                </ul>
              </Col>
              <Col>
                <h6 className="fw-bold">Resource</h6>
                <ul className="list-unstyled">
                  <li>Help Center</li>
                  <li>Partner Program</li>
                  <li>SaaS Software</li>
                </ul>
              </Col>
              <Col>
                <h6 className="fw-bold">Contact Us</h6>
                <ul className="list-unstyled">
                  <li>Location</li>
                  <li>Email</li>
                  <li>Telephone</li>
                </ul>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
