import React, { useState } from "react";
import "../App.css";
import Axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const [userPassword, setUserPassword] = useState("");
 const { token } = useParams();
 //useParams wiill store the token from url 

  const navigate = useNavigate();
  const handelSubmit = (e) => {
    e.preventDefault(); //it will prevnt the default submisssion
    Axios.post(`http://localhost:3000/auth/resetpassword/${token}`, { userPassword })
      .then((response) => {
        if (response.data.status) {
         alert("Password reset successfully")
          navigate("/login");
        }
        console.log(response.data)
      })
      .catch((error) => {
        if (error.response) {
          //server responded with a status code outside the 2xx range
          console.error("error response:", error.response.data);
          console.error("status code:", error.response.status);
          console.error("header:", error.response.headers);
        } else if (error.request) {
          //request was made but no response received
          console.error("No response received :", error.request);
        } else {
          //something happen with setting up the request
          console.error("error setting up the request:", error.message);
        }
        console.error("config:", error.config);
      });
  };

  return (
    <div className="sign-up-container">
      <form className="sign-up-form" onSubmit={handelSubmit}>

        <h2>Reset Password</h2>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          placeholder="******"
          autoComplete="off"
          onChange={(e) => setUserPassword(e.target.value)}
        />

        <button type="submit">Reset</button>
      </form>
    </div>
  );
};

export default ResetPassword;
