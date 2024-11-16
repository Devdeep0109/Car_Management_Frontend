import "../pagesCSS/SignIn.css";
import { useContext, useState } from "react";
// import { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import UserContext from "../UseContext";
// import UserContext from "../UseContext";
import signupImage from "../images/signup.png"; // Importing the image


const SignIn = () => {

  const [email ,setEmail] = useState('');
  const [password ,setPassword] = useState('');
  const navigate = useNavigate();

  const {getUser} = useContext(UserContext)

  // const user = useContext(UserContext); //userContext...

  //HANDLE LOGIN.......
  const handleLogin = (e) =>{

    e.preventDefault();

    //logic to send data to backend
    
    axios.post("http://localhost:8000/api/signin" ,{email,password}
      // , 
      // {
      // headers: {
      //   Authorization: `Bearer ${Cookies.get("token")}`,
      // }
    // }
  )
    .then((result) =>{
      
      if(result.status == 200){
        Cookies.set("token" ,result.data, { expires: 365 });
        getUser()
        navigate("/");
      }
      else{
        alert(result.data)
      }
    
    }).catch(err => {
      alert(err.message)
    })
    }

  return (
    <div className="signIncontainer">
     <img src={signupImage} alt="" className="img"/>
        <form  className="signinform">
            <h1>Login</h1>
            
            <label htmlFor="">Email</label>
            <input type="text" placeholder="Enter email"  
              value={email} onChange = {(e) =>{
              setEmail(e.target.value)}}
            />

            <label htmlFor="">Password</label>
            <input type="password" name="" id="" placeholder="Enter password" 
              value={password} onChange={(e) =>{
                setPassword(e.target.value)
              }}
            />
            <Link className="link" to="/signup">Already have an account? SignUp</Link>
            <button className="btn" onClick={handleLogin}>Login</button>
        </form>
        
          
      </div>
    
  )
}

export default SignIn
