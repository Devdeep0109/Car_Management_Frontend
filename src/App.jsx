import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS here
import UserContext from "./UseContext";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import NavbarComponent from "./components/NavbarComponent";
import CarDetails from "./pages/CarDetails";
import DisplayCarDetails from "./pages/DisplayCarDetails";
import EditCar from "./pages/EditCar";

function App() {
  const [user, setUser] = useState({
    name: "",
    id: "",
    email: "",
    state: false,
  });

  const getUser = async () => {
    try {
      axios
        .get("https://car-management-backend-six.vercel.app/api/profile", {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        })
        .then((res) => {
          console.log("Before json res: ", res.data);
          if (!res.data.success) {
            alert(res.data.error);
          } else {
            console.log("name: ", res.data.data.username);

            setUser({
              name: res.data.data.username,
              state: true,
              id: res.data.data._id,
            });
            console.log("User instance", user);
          }
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, getUser }}>
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/addcar" element={<CarDetails />} />
        <Route path="/editcar/:id" element={<EditCar />} />
        <Route path="/deletecar/:id" element={<DisplayCarDetails />} />
        <Route path="/displaymess" element={<DisplayCarDetails />} />
        <Route path="/displaymess/:id" element={<DisplayCarDetails />} />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
