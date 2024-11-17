// import { Link } from "react-router-dom";
import CardComponent from "../components/CardComponent";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import "../pagesCSS/Home.css";

const Home = () => {
  const [data, setData] = useState([]);
  const [searchVal, setSearchVal] = useState("");

  const getAllCar = async () => {
    try {
      axios
        .get("https://car-management-backend-six.vercel.app/car/allcar", {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        })
        .then((res) => {
          console.log(res.data.data);
          setData(res.data.data);
        });
    } catch (error) {
      console.log(error.essage);
    }
  };

  useEffect(() => {
    getAllCar();
  }, []);
  return (
    <div className="home">
      <input
        className="search"
        value={searchVal}
        onChange={(e) => setSearchVal(e.target.value)}
        placeholder="Search any character"
      />

      <div className="mainComponent">
        {data.length > 0 &&
          data &&
          data
            .filter((val) => {
              if (searchVal === "") {
                return val;
              } else if (
                val.title.toLowerCase().includes(searchVal.toLowerCase())
              ) {
                return searchVal;
              } else if (
                val.additionalInfo
                  .toLowerCase()
                  .includes(searchVal.toLowerCase())
              ) {
                return searchVal;
              }
            })
            .map((mess, key) => <CardComponent key={key} data={mess} />)}
      </div>
    </div>
  );
};

export default Home;
