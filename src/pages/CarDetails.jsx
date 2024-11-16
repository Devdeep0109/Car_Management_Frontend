import { useContext, useState } from "react";
import "../pagesCSS/CarDetails.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import UserContext from "../UseContext";

const CarDetails = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [car_type, setCar_type] = useState("");
  const [company, setCompany] = useState("");
  const [address, setAddress] = useState("");
  const [additionalInfo, setAddInfo] = useState("");
  const [coverimage, setCoverimage] = useState("");

  const { user } = useContext(UserContext);
  console.log("User: ", user);

  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    const id = user.id;

    let data = {
      title,
      price,
      car_type,
      company,
      address,
      additionalInfo,
      id,
    };

    console.log(data);

    console.log("Cover Image: ", coverimage);

    //logic to send data to backend
    axios
      .post(
        "http://localhost:8000/car/CarDetails",
        { coverimage, data },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((result) => {
        console.log("Car: ", result);
        if (result.status == 200) {
          navigate("/");
        } else {
          alert(result.err);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className="details">
      <div className="maindiv">
        <h1>Add details</h1>

        <form action="" className="container5">
          <label htmlFor="">Cover Image</label>
          <input
            type="file"
            name="coverimage"
            onChange={(e) => setCoverimage(e.target.files[0])}
          />

          <label htmlFor="">Title</label>
          <input
            type="text"
            name=""
            id=""
            placeholder="Tesla"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />

          <label htmlFor="">Price</label>
          <input
            type="number"
            placeholder="0"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />

          <label htmlFor="">Address</label>
          <input
            type="text"
            placeholder="Station Road, raipur-chhattisgarh"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />

          <label htmlFor="">Type</label>
          <input
            type="text"
            placeholder="xyz"
            value={car_type}
            onChange={(e) => {
              setCar_type(e.target.value);
            }}
          />

          <label htmlFor="">Company</label>
          <input
            type="text"
            placeholder="Station Road, raipur-chhattisgarh"
            value={company}
            onChange={(e) => {
              setCompany(e.target.value);
            }}
          />

          <label htmlFor="">Additional Information</label>
          <input
            type="text"
            placeholder="clean and cheap food"
            value={additionalInfo}
            onChange={(e) => {
              setAddInfo(e.target.value);
            }}
          />

          <button onClick={handleChange}>Add</button>
        </form>
      </div>
    </div>
  );
};

export default CarDetails;
