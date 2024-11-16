import "../pagesCSS/SignUp.css";
import { useState } from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import signupImage from "../images/signup.png"; // Importing the image

const SignUp = () => {

  const [username , setusername] = useState('');
  const [email , setEmail] = useState('');
  const [password , setPassword] = useState('');
  const [confirmPassword , setConfirmPassword] = useState('');

  const navigate = useNavigate();


  const handleSubmit = async(e) => {
    e.preventDefault();

    if(password !== confirmPassword){
      alert("Invalid Password");
    }

    //signup logic to send to backend
    axios.post('http://localhost:8000/api/signup' ,{username, email, password})
    .then(result => {console.log(result)   
      navigate("/signin")}
    )
    .catch(err =>console.log(err))
   

    if(password === confirmPassword && password.length > 0){
      alert("SignUp successfully");
    }
  }

  return (
    <div className="signUpcontainer">
      
      <img src={signupImage} alt="" className="img"/>
      
      <form action="" className="signupform">
          <h1>SignUp</h1>

          <label htmlFor="">Full Name</label>
          <input type="text" placeholder="Enter username" value={username} 
          onChange = {(e) =>{setusername(e.target.value)}} />
          
          <label htmlFor="">Email</label>
          <input type="text" placeholder="Enter email" value={email}
          onChange={(e) =>{setEmail(e.target.value)}}
          />

          <label htmlFor="">Password</label>
          <input type="password" name="" id="" placeholder="Enter password" value={password}
          onChange={(e) =>setPassword(e.target.value)} />

          <label htmlFor="">Confirm Password</label>
          <input type="password"  placeholder="Confirm password" value={confirmPassword}
          onChange={(e) =>setConfirmPassword(e.target.value)} />

          <Link to="/signin" className="link">Already have an account? SignIn</Link>

          <button  onClick = {handleSubmit}>SignUp</button>
      </form>   
    </div>
    
  )
}

export default SignUp;
