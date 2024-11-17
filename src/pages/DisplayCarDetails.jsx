import { MdOutlineLocationOn } from "react-icons/md";
import "../pagesCSS/DisplayCarDetails.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import UserContext from "../UseContext";
import { IoLocationOutline } from "react-icons/io5";
import { IoLogoModelS } from "react-icons/io";
import { GrOrganization } from "react-icons/gr";
import { FaInfo } from "react-icons/fa";

const DisplayCarDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useContext(UserContext);

  //storing car data.........
  const [car, setCarDetails] = useState();

  useEffect(() => {
    if (id) {
      axios
        .get(`https://car-management-backend-six.vercel.app/car/single/${id}`)
        .then((result) => {
          if (result.status == 200) {
            setCarDetails(result.data.data);
            console.log(result.data.data);
          } else {
            alert(result.data.error);
          }
        })
        .catch((error) => {
          alert("eror from display car:", error.message);
        });
    }
  }, [id]);

  // if no car details are there........
  if (!car) {
    return <div>Loading...</div>;
  }

  const handleDelete = () => {
    axios
      .post(`https://car-management-backend-six.vercel.app/car/deletecar/${id}`)
      .then((result) => {
        console.log(result);

        if (result.status == 200) {
          alert(result.data.message);
          navigate("/");
        } else {
          alert(result.data.error);
        }
      })
      .catch((error) => {
        alert("error from display car:", error.message);
      });
  };

  return (
    <div className="displayDetails">
      <div className="single">
        <h1 className="">{car.title}</h1>
        <div className="display">
          <div className="image">
            <img src={car.coverImage} alt="" />
          </div>
          <div className="details">
            <p>Rs. {car.price}</p>
            <p>
              <IoLocationOutline /> &nbsp;&nbsp;
              {car.address}
            </p>
            <p>
              <IoLogoModelS /> &nbsp;&nbsp;
              {car.car_type}
            </p>
            <p>
              <GrOrganization /> &nbsp;&nbsp;
              {car.company}
            </p>
            <p>
              <FaInfo /> &nbsp;&nbsp;
              {car.additionalInfo}
            </p>

            {user.id == car.createdBy._id && (
              <div className="action">
                <Link to={`/editcar/${car._id}`}>Edit</Link>
                <button onClick={handleDelete}>Delete</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayCarDetails;
