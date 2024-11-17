import { useEffect, useState } from "react";
import "../pagesCSS/CarDetails.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
const EditCar = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [car_type, setCar_type] = useState("");
  const [company, setCompany] = useState("");
  const [address, setAddress] = useState("");
  const [additionalInfo, setAddInfo] = useState("");
  const [coverimage, setCoverimage] = useState("");

  const { id } = useParams();

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
    const fileURL = await handleUpload(coverimage, "image");

    //logic to send data to backend

    fetch(`https://car-management-backend-six.vercel.app/car/editcar/${id}`, {
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
        fileURL: coverimage == "" ? null : fileURL,
      }),
    })
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

  useEffect(() => {
    if (id) {
      axios
        .get(`https://car-management-backend-six.vercel.app/car/single/${id}`)
        .then(async (result) => {
          if (result.status == 200) {
            const car = result.data.data;
            setTitle(car && car.title ? car.title : "");
            setPrice(car && car.price ? car.price : "");
            setCar_type(car && car.car_type ? car.car_type : "");
            setCompany(car && car.company ? car.company : "");
            setAddress(car && car.address ? car.address : "");
            setAddInfo(car && car.additionalInfo ? car.additionalInfo : "");
          } else {
            alert(result.data.error);
          }
        })
        .catch((error) => {
          alert("eror from display car:", error.message);
        });
    }
  }, []);

  return (
    <div className="details">
      <div className="maindiv">
        <h1>
          Edit details for <u>{title}</u>
        </h1>

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

export default EditCar;
