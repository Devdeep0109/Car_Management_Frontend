import { Link } from "react-router-dom";
import "./CardComponent.css";
// import axios from "axios";

const CardComponent = (props) => {
  return (
    <div className="card">
      <img src={props.data.coverImage} alt="not found" />
      <h3>{props.data.title}</h3>
      <p className="price">Rs. {props.data.price}</p>
      <p>{props.data.additionalInfo}</p>
      <Link to={`/displaymess/${props.data._id}`}>
        <button>More info</button>
      </Link>
    </div>
  );
};

export default CardComponent;
