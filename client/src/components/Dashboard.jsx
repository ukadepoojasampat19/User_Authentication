import React, { useEffect }  from 'react'
import Axios from "axios"
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();
    Axios.defaults.withCredentials = true;
    useEffect(() => {
        Axios.get('http://localhost:3000/auth/verify')
        .then((response) => {
            if(response.data.status)
            {
                console.log(res.data);
            }
            else
            {
                navigate('/')
            }
            console.log(response)
        })
    }, [])
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard