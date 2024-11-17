import { useContext, useState } from "react";
import "../pagesCSS/CarDetails.css";
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

  const handleUpload = async (file, type) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "car_image");
      let api = `https://api.cloudinary.com/v1_1/dj5vb9guv/${type}/upload`;

      const response = await fetch(api, {
        method: "POST",
        body: formData,
      });
      const result = await response.json();

      const secure_url = result.secure_url;
      console.log(secure_url);

      return secure_url;
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const handleChange = async (e) => {
    e.preventDefault();
    const id = user.id;

    console.log("Cover Image: ", coverimage);
    const fileURL = await handleUpload(coverimage, "image");
    console.log(title);

    //logic to send data to backend
    fetch(
      "http://localhost:8000/car/CarDetails",

      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          price: price,
          car_type: car_type,
          company: company,
          address: address,
          additionalInfo: additionalInfo,
          id: id,
          fileURL: fileURL,
        }),
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
