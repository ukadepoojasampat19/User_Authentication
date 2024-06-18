
import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import cors from 'cors'
import cookieParser from 'cookie-parser'
dotenv.config() //load environment variable into file

import {UserRouter} from './routes/user.js'

const app = express()
app.use(express.json())
/*origin: ["http://localhost:5173"],  
    Credentials: true,
    Access_Control_Allow_Credentials: true*/
app.use(cors({
  origin: "http://localhost:5173",  
  credentials: true,
}));
app.use(cookieParser())

  //data that we parse from frontend into json format
app.use('/auth',UserRouter)

//const mongouri="mongodb+srv://sahil:tTrdc84h27pkeDZD@mern-estate.0kbe7wk.mongodb.net/?retryWrites=true&w=majority&appName=mern-estate";
mongoose.connect('mongodb+srv://sahil:tTrdc84h27pkeDZD@mern-estate.0kbe7wk.mongodb.net/?retryWrites=true&w=majority&appName=mern-estate');

 
//const PORT = "3000"
app.listen(process.env.PORT, () =>  //it is used to start the server
{
    console.log("server is running");
})
