const express = require("express");
const multer=require("multer");
const app=express.Router();

const mongoose=require("mongoose");
app.use(express.json());

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null,file.originalname);
  },
});
const upload = multer({ storage,
  limits: {
    fieldSize: 10 * 1024 * 1024, 
    fileSize: 5 * 1024 * 1024,   
  },}).single("pdf");
const formSchema=new mongoose.Schema({
  name:String,
  mobile:String,
  occupation:String,
  address:String,
  gender:String,
  breed:String,
  aadhar:String,
  petitem:Object,   
  Username:String,
  Response:String,
});
const  formmodel=mongoose.model("forms",formSchema);
app.post("/submitform",upload,async (req,res)=>{
  const {name,mobile,occupation,address,gender,breed}=JSON.parse(req.body.Items);
  const username=req.body.username;
  
  const petitem=JSON.parse(req.body.pet);
  const newform=new formmodel({
    name:name,
    mobile:mobile,
    pccupation:occupation,
    address:address,
    gender:gender,
    breed:breed,
    aadhar:req.file.originalname,
    petitem:petitem,
    Username:username,
    Response:"pending",
  });
  const savenewform=await newform.save();
  if(savenewform){
    res.json({message:"Form submitted successfully"});
  }
  else{
    res.json({error:"error while submitting the form"});
  }
});
app.get("/getform",async(req,res)=>{
  const formItems=await formmodel.find({});
  if(formItems){
    res.json({"formItems":formItems});
  }
  else{
      res.json({error:"error while submitting the form"});
  }
});
const rescueSchema=new mongoose.Schema(
  {Name:String,
  Mobile:String,
  Occupation:String,
  Address:String,
  Location:String,
  Image:String,
  UserName:String,
  Response:String,
  }
);
const rescueModel=mongoose.model("rescue",rescueSchema);

app.post("/submitrescue",upload,async(req,res)=>{
  const {name,mobile,occupation,address,location}=JSON.parse(req.body.rescueItem);
   const username=req.body.username;
   const newrescue= new rescueModel(
    {
      Name:name,
      Mobile:mobile,
      Occupation:occupation,
      Address:address,
      Location:location,
      Image:req.file.originalname,
      UserName:username,
      Response:"pending",
    }
   );
   const saverescue= await newrescue.save();
   if(saverescue){
    res.json({message:"success"})
   }
   else{
    res.json({error:"rescue document not saved"});
   }
   
});
app.post("/getaccount",async(req,res)=>{
  const username=req.body.Username; 
  
  
  const account = await formmodel.find({ Username: username }).select('petitem Response');
  const rescue=await rescueModel.find({UserName:username});
  
  if(account || rescue){
    res.json({account,rescue}); 
  }

});


app.post("/updateresponse",async (req,res)=>{
  const response=req.body.response;
  const petid=req.body.petid;
  const updateres=await formmodel.findOneAndUpdate(
    {_id:petid},
    {Response:response},
    {new:true},
  );
  if(updateres){
    res.json({message:"Response submitted to the user"});
  }
  else{
    res.json({error:"response not submitted"});
  }
});
app.post("/getrescueform",async (req,res)=>{
  const rescueDetails=await rescueModel.find({});
  if(rescueDetails){
    res.json(rescueDetails);
  }
});
app.post("/updaterescueresponse",async (req,res)=>{
  const response=req.body.response;
  const rescueid=req.body.rescueid;
  const updateres=await rescueModel.findOneAndUpdate(
    {_id:rescueid},
    {Response:response},
    {new:true},
  );
  if(updateres){
    res.json({message:"Rescue form submitted to the member",updateres});
  }
  else{
    res.json({error:"response not submitted"});
  }
});
module.exports = app;
