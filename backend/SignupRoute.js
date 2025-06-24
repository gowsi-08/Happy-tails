var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var router = express.Router();
require("dotenv").config();
var mongoose = require("mongoose");
const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');



const loginschema = new mongoose.Schema({
  Email: {type:String,unique:true,required:true},
  Password:{type:String,required:true}
});

const loginmodel = mongoose.model("login", loginschema);

router.post("/signup", async (req, res) => {
  const { Email, Password, Repassword } = req.body;
  console.log(Email, Password, Repassword);

  const user = await loginmodel.findOne({
    Email: Email,
  });
  if (user) {
    return res.json({ error: "Already Email exist! Please Sign in" });
  }
  if (Password === Repassword) {
    const newLogin = new loginmodel({
      Email: Email,
      Password: Password,
    });
    const loginsave = await newLogin.save();
    console.log(loginsave);

    res.json({ message: "Register Successful" });
  } else {
    res.json({ error: "Passwords are not same!" });
  }
});

router.post("/signin", async (req, res) => {
  const { Email, Password } = req.body;
  const user = await loginmodel.findOne({
    Email: Email,
  });
  if (!user) {
    return res.json({ error: "Not found!" });
  } else {
    if (user.Password === Password) {
      const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
        expiresIn: "1h",
      });
      res
        .status(200)
        .json({ token, email: Email,message:"success" });
    } else {
      res.json({ error: "Password is incorrect" });
    }
  }
});

router.get("/protected", async(req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(403).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.status(200).json({ message: "Access granted", user: decoded });
  } catch (err) {
    res.status(401).json({ error: "Unauthorized" });
  }
});
module.exports = router;
