import React, { useState } from "react";
import "../App.css";
import Axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const navigate = useNavigate();

  const handelSubmit = (e) => {
    e.preventDefault(); //it will prevnt the default submisssion
    Axios.post("http://localhost:3000/auth/signup", {
      userName,
      userEmail,
      userPassword,
    }).then(response =>
      {
        if(response.data.status)
          {
            navigate('/login');
          }
      }
    ).catch(error =>
      {
        if(error.response)
          {
            //server responded with a status code outside the 2xx range
            console.error("error response:",error.response.data);
            console.error("status code:",error.response.status);
            console.error("header:",error.response.headers);
          }
          else if(error.request)
            {
              //request was made but no response received
              console.error("No response received :",error.request);
            }
            else
            {
              //something happen with setting up the request
              console.error("error setting up the request:", error.message);
            }
            console.error("config:",error.config);
          
      }
    );
  };
  return (
    <div className="sign-up-container">
      <form className="sign-up-form" onSubmit={handelSubmit}>
     
        <h2>Sign Up</h2>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUserName(e.target.value)}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          autoComplete="off"
          placeholder="Email"
          onChange={(e) => setUserEmail(e.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          placeholder="******"
          autoComplete="off"
          onChange={(e) => setUserPassword(e.target.value)}
        />

        <button type="submit">Sign Up</button>
        <p>Have an Account? <Link to="/login">Login</Link></p>
      </form>
    </div>
  );
};

export default Signup;
