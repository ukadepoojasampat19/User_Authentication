import express from "express";
import bcrypt from "bcrypt";
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();
router.post("/signup", async (req, res) => {
  const { userName, userEmail, userPassword } = req.body;
  const user = await User.findOne({ userEmail });

  if (user) {
    return res.json({ message: "User already exits" });
  }
  const hashpassword = await bcrypt.hash(userPassword, 10);
  const newuser = new User({
    userName,
    userEmail,
    userPassword: hashpassword,
  });
  await newuser.save();
  return res.json({ status: true, message: "User created succesfully" });
});

router.post("/login", async (req, res) => {
  const { userEmail, userPassword } = req.body;
  const user = await User.findOne({ userEmail });

  if (!user) {
    return res.json({ message: "user is not registered" });
  }
  const validpassword = await bcrypt.compare(userPassword, user.userPassword);
  if (!validpassword) {
    return res.json({ message: "Invalid password" });
  }
  //generate token and store it in user cookie for authentication
  //const KEY="hgvgh";
  const token = jwt.sign({ userName: user.userName }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  //store the token in user cookie
  const cookieOptions = {
    httpOnly: true, // The cookie is only accessible via HTTP(S), not via JavaScript
    maxAge: 360000, // The cookie will expire after 360,000 milliseconds (6 minutes)
    secure: process.env.NODE_ENV === "development", // The cookie will only be sent over HTTPS in development mode
    sameSite: "Strict", // The cookie will only be sent in a first-party context (not with cross-site requests)
  };

  res.cookie("token", token, cookieOptions);
  //to used the above cookie we should configure the cors
  return res.json({ status: true, message: "login sucessfully" });
});

router.post("/forgetpassword", async (req, res) => {
  const { userEmail } = req.body;
  try {
    const user = await User.findOne({ userEmail });
    if (!user) {
      console.log("User not found in the database");
      return res.json({ message: "user not register" });
    }
    console.log("User found, proceeding to send email");

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "5m",
    });
    //we will used nodemailer to send the email

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    var mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: "Reset Password",
      text: `http://localhost:5173/resetpassword/${token}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return res.json({ message: "error email sending" });
      } else {
        return res.json({ status: true, message: "email sent sucessfully" });
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
});
//reset password

router.post("/resetpassword/:token", async (req, res) => {
  const { token } = req.params;
  const { userPassword } = req.body;
  try {
    console.log("Token received:", token);
    //decode the token
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token received:", token);

    const id = decoded.id;

    const hashPassword = await bcrypt.hash(userPassword, 10);
    await User.findByIdAndUpdate({ _id: id }, { userPassword: hashPassword });
    console.log("password reset sucessfully");

    return res.json({ status: true, message: "password reset sucessfully" });
  } catch (err) {
    console.error("Invalid token or server error:", err);
    return res.status(400).json({ message: "Invalid token or server error" });
  }
});

// dashboard
const verifyUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.json({ status: false, message: "no token" });
    }
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    return res.json(err);
  }
};

router.get("/verify",verifyUser,  (req, res) => {
  return res.json({status: true, message: "authorized"});
});
//logout

router.get("/logout", (req,res) =>
{
  res.clearCookie('token');
  return res.json({status: true, message: "logout sucessfully"});
})
export { router as UserRouter };
