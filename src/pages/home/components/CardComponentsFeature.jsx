import { Card } from "react-bootstrap";

const CardComponentFeature = ({
  img,
  alt,
  title,
  description,
  isActive = false,
}) => {
  return (
    <>
      <Card className={isActive ? "active-card" : ""} data-aos="fade-left">
        <img src={img} alt={alt} className="img-card-feature" />

        <h1 className="card-title-feature">{title}</h1>
        <p className="card-description-feature">{description}</p>
      </Card>
    </>
  );
};
export default CardComponentFeature;
