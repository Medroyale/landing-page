import { Card } from "react-bootstrap";

const CardComponent = ({ img, alt }) => {
  return (
    <>
      <Card>
        <h1 className="card-title">
          “I can’t say enough about Level. Thanks for the great service. We have
          no regrets!”
        </h1>
        <img src={img} alt={alt} className="img-card" />
      </Card>
    </>
  );
};
export default CardComponent;
