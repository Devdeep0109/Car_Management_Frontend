import { MdOutlineLocationOn } from "react-icons/md";
import "../pagesCSS/DisplayCarDetails.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const DisplayCarDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);

  //storing car data.........
  const [car, setCarDetails] = useState();

  useEffect(() => {
    if (id) {
      axios
        .get(`https://car-management-backend-six.vercel.app/car/single/${id}`)
        .then((result) => {
          if (result.status == 200) {
            setCarDetails(result.data.data);
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
      <div className="details">
        <div className="innerdiv1">
          <h2>{car.title}</h2>
          <Link to={`/editcar/${car._id}`}>Edit</Link> &nbsp;
          <button onClick={handleDelete}>Delete</button>
          <div>
            <MdOutlineLocationOn />
            <b>{car.address}</b>
          </div>
        </div>

        <div className="innerdiv2">
          <div className="information">
            <p>
              Additional Information: <b>{car.additionalInfo}</b>
            </p>
          </div>
        </div>
      </div>

      {/* right */}
      <div className="photos"></div>
    </div>
  );
};

export default DisplayCarDetails;
