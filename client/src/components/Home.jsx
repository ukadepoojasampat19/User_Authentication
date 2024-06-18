//rafce
import React from 'react'
import Axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

const Home = () => {

  const navigate = useNavigate();
  Axios.defaults.withCredentials = true;
  const handleLogout = () => {
    Axios.get("http://localhost:3000/auth/logout")
    .then((response) =>
    {
      if(response.data.status)
      {
        navigate('/login')
      }
      
    
    }).catch((error) =>
    {
      console.log(err);
    })
  }
  return (
    <div>
      
     <button><Link to="/dashboard">Dashboard</Link></button>
     <br /> <br />
     <button onClick={ handleLogout}>Logout</button>

    </div>
  )
}

export default Home
