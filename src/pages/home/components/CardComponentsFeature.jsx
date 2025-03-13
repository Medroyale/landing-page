import { Card } from "react-bootstrap";

const CardComponentFeature = ({ img, alt, title, description, isActive }) => {
  return (
    <>
      <Card className={isActive ? "active" : ""}>
        <img src={img} alt={alt} className="img-card" />

        <h1 className="card-title-feature">{title}</h1>
        <p className="card-description-feature">{description}</p>
      </Card>
    </>
  );
};
export default CardComponentFeature;
