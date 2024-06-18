import React, { useState } from "react";
import "../App.css";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const [userEmail, setUserEmail] = useState("");

  const navigate = useNavigate();
  const handelSubmit = (e) => {
    e.preventDefault(); //it will prevnt the default submisssion
    Axios.post("http://localhost:3000/auth/forgetpassword", { userEmail })
      .then((response) => {
        if (response.data.status) {
          alert("check your email for reset password link");
          navigate("/login");
        }
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
        <h2>Forget Password</h2>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          autoComplete="off"
          placeholder="Email"
          onChange={(e) => setUserEmail(e.target.value)}
        />

        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ForgetPassword;
