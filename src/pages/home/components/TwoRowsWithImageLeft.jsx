import React from "react";
import ChecklistIcon from "../../../assets/checklist_icon.png";
import { Button, Col, Row } from "react-bootstrap";

const TwoRowsWithImagesLeft = ({
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
          <img
            className="img-fluid"
            data-aos="fade-right"
            src={src}
            alt={alt}
          />
        </Col>
        <Col lg={6}>
          {isShowChips && (
            <h1 className="chips mt-3" data-aos="fade-left">
              {titleChips}
            </h1>
          )}
          <h1 className="text-title mt-3" data-aos="fade-left">
            {title}
          </h1>
          {isDescription && (
            <p className="text-description mt-5" data-aos="fade-left">
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
      </Row>
    </div>
  );
};

export default TwoRowsWithImagesLeft;
