var express = require("express");
const signupRoute = require("./SignupRoute");
const Addpetdb=require("./Addpetdb");
const Detailsdb=require("./Detailsdb");
var app = express();
var bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path=require("path");
app.use(bodyParser.json());
var cors = require("cors");

app.use(cors({
  origin: "http://localhost:3000"
}));
mongoose
  .connect("mongodb://localhost:27017/Miniproject", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDb"))
  .catch((err) => console.log("Error while connecting to MongoDb:", err));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(signupRoute);
app.use(Addpetdb);
app.use(Detailsdb);

app.listen(5000, function () {
  console.log("Hii Everyone");  
});
