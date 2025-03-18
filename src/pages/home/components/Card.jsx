import { Card } from "react-bootstrap";

const CardComponent = ({ img, alt, commentar, name, username }) => {
  return (
    <>
      <Card data-aos="fade-left" className="card-testimonial mt-3">
        <div className="d-flex">
          <img src={img} alt={alt} className="img-card" />
          <div className="profile-user">
            <h1>{name}</h1>
            <p>@{username}</p>
          </div>
        </div>
        <p>{commentar}</p>
      </Card>
    </>
  );
};
export default CardComponent;
