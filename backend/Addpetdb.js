const express = require("express");
const bodyParser = require("body-parser");
const app = express.Router();
app.use(bodyParser.json());
const cors = require("cors");
const multer =require("multer");

app.use(cors());
const mongoose = require("mongoose");

const storage = multer.memoryStorage(); 
const upload = multer({ storage,limits: {
  fieldSize: 10 * 1024 * 1024, 
  fileSize: 5 * 1024 * 1024,   
}, }).single("image");

const petSchema = new mongoose.Schema({
  Photo: Buffer,
  Breed: String,
  Age: Number,
  Location: String,
  Gender: String,
  District: String,
});
const petModel = mongoose.model("petDetail", petSchema);

app.post("/addpet",upload, async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  console.log(req.file);
  
  const { Breed, Age, Location, Gender, District } = JSON.parse(req.body.Items);
  const {  buffer } = req.file;
  const username=req.body.username;
  const newPet = new petModel({
    Photo: buffer,
    Breed: Breed,
    Age: Age,
    Location: Location, 
    Gender: Gender,
    District: District,
    Username:username,
  });
  const saveNewPet = await newPet.save();
  if (saveNewPet) {
    res.json({ message: "Added Successfully" });
  } else {
    res.json({ message: "Pet Details not saved yet" });
  }
});
app.get("/getpet", async (req, res) => {
  const{Search}=req.query;
    try {
    const retrivePet = await petModel.find(
      {
        $or:[
          {Breed:{$regex:Search,$options:"i"}},
          {Location:{$regex:Search,$options:"i"}},
          {Gender:{$regex:Search,$options:"i"}},
          {District:{$regex:Search,$options:"i"}}
        ]
      }
    );
    const petsWithBase64Photo = retrivePet.map((pet) => {
      const base64Photo = pet.Photo ? pet.Photo.toString('base64') : null;
      return {
        ...pet._doc, 
        Photo: base64Photo ? `data:image/jpeg;base64,${base64Photo}` : null, 
      };
    });

    res.json({ alldata: petsWithBase64Photo });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving pets", error });
  }
});

app.post("/updatepet",upload, async (req, res) => {
 
  
  
  const { Breed, Age, Location, Gender, District } = JSON.parse(req.body.Items);
  const editId=req.body.editId;
  const {  buffer } = req.file;
  const editItems = await petModel.findByIdAndUpdate(
    editId,
    { Photo: buffer,Breed:Breed,Age: Age,Location: Location,Gender: Gender,District: District },
    { new: true }
  );
  if (editItems) {
    res.json({ message: "Updated Successfully" });
  } else {
    res.json({ message: "Not updated yet" });
  }
});

app.delete("/deletepet", async (req, res) => {
  const { id } = req.query;
  const deletedItems = await petModel.findByIdAndDelete(id);
  if (deletedItems) res.json("Deleted Successfully");
  else res.json("Not deleted yet");
});


module.exports = app;
