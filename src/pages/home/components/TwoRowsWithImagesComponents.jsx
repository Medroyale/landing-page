import React from "react";
import ChecklistIcon from "../../../assets/checklist_icon.svg";
import { Button, Col, Row } from "react-bootstrap";

const TwoRowsWithImagesRight = ({
  isShowChips = false,
  titleChips,
  title,
  description,
  isShowButton = false,

  buttonName,
  isDescription,
  body,

  isBody,

  alt,
  src,
  isShowListFeature,
  listFeature = [],
}) => {
  return (
    <div className="two-rows">
      <Row>
        <Col lg={6}>
          {isShowChips && (
            <h1 className="container-chips mt-5" data-aos="fade-left">
              {titleChips}
            </h1>
          )}
          <h1 className="text-two-rows-title mt-3" data-aos="fade-left">
            {title}
          </h1>
          {isDescription && (
            <p className="text-two-rows-description mt-3" data-aos="fade-left">
              {description}
            </p>
          )}

          {isBody && (
            <p className="text-body" data-aos="fade-left">
              {body}
            </p>
          )}
          {isShowButton && (
            <Button variant="dark" className="btn" data-aos="fade-left">
              {buttonName}
            </Button>
          )}
          {isShowListFeature && (
            <>
              {listFeature.map((feature, index) => (
                <div className="d-flex list-features" key={index}>
                  <img
                    className="img-icon"
                    src={ChecklistIcon}
                    data-aos="fade-left"
                  />
                  <p className="text-feature" data-aos="fade-left">
                    {feature}
                  </p>
                </div>
              ))}
            </>
          )}
        </Col>
        <Col lg={6}>
          <img
            className="img-fluid img-two-rows mt-5"
            data-aos="fade-right"
            src={src}
            alt={alt}
          />
        </Col>
      </Row>
    </div>
  );
};

export default TwoRowsWithImagesRight;
