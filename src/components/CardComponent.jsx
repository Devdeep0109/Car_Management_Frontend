import { Link } from "react-router-dom";
import "./CardComponent.css";
// import axios from "axios";



const CardComponent = (props) => {

  return (
    <div className="card">
      <img src={`http://localhost:8000/${props.data.coverImage.split('/')[1]}`} alt="not found"/>
      <h1>{props.data.title}</h1>
      <p className="price">Rs. {props.data.price}</p>
      <p>{props.data.additionalInfo}</p>
      <p><Link to={`/displaymess/${props.data._id}`}><button >More information</button></Link></p>
    </div>
  )
}

export default CardComponent
