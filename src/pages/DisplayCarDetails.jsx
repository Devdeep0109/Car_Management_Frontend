import { MdOutlineLocationOn } from "react-icons/md";
import "../pagesCSS/DisplayCarDetails.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const DisplayCarDetails = () => {
  // Comment useState
  // const [commentinfo, setCommentInfo] = useState("");

  // const { user } = useContext(UserContext);

  // const user_id = user.id;

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const data = {
  //     carId: id,
  //     createdBy: user_id,
  //     content: commentinfo,
  //   };
  //   console.log("Data from handleSubmit", data);
  //   try {
  //     axios
  //       .post("http://localhost:8000/comment/createComments", { data })
  //       .then((res) => {
  //         if (res.status == 200) {
  //           console.log(res);
  //           // fetchComments()
  //         }
  //       })
  //       .catch((err) => console.log(err));
  //   } catch (error) {
  //     alert(error.message);
  //   }
  // };
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);

  //storing car data.........
  const [car, setCarDetails] = useState();

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:8000/car/single/${id}`)
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
      .post(`http://localhost:8000/car/deletecar/${id}`)
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
  );
};

export default DisplayCarDetails;
