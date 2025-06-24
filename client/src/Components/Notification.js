import { useEffect, useState } from "react";
import axios from "axios";
import "./Css/Notification.css";

function Notification() {
  const [forms, setforms] = useState([]);
  const [response, setresponse] = useState("");
  useEffect(() => {
    const handleFetchForm = async () => {
      try {
        const response = await axios.get("http://localhost:5000/getform");
        setforms(response.data.formItems);
      } catch (error) {
        console.log(error);
      }
    };
    handleFetchForm();
  }, []);
  const handleResponse = async (petid) => {
    const res = await  axios.post("http://localhost:5000/updateresponse", {
      response,
      petid,
    });
    if (res.data.message) {
      alert(res.data.message);
      setresponse(" ");
    } else {
      alert(res.data.error);
    }
  };
 
  return (
    <div>
      <header>
        <div className="components" style={{ backgroundColor:" #df56b6"}}>
        <a href="/notification" style={{marginLeft:"600px",padding:"5px",}}>Notification</a>
            <a href="/adminrescueresponse" style={{marginLeft:"200px",padding:"5px"}}>Rescue</a>
        </div>
      </header>

      <div className="adoption-forms">
        {forms.map((petform, i) => (
          <div key={i} className="adoption-item-parent" >
            <div className="form-details-card">
              <h3>Form Details</h3>
              <p>
                Name: {petform.name}
                <br />
                Mobile: {petform.mobile}
                <br />
                Occupation: {petform.occupation}
                <br />
                Address: {petform.address}
                <br />
                Gender: {petform.gender}
                <br />
                Breed Interested: {petform.breed}
                <br />
                Aadhar: {petform.aadhar}
              </p>
            </div>

            <div className="pet-details-card">
              <img
                src={petform.petitem.Photo || "placeholder-image-url.jpg"}
                alt={petform.petitem.Breed}
                className="adoption-img"
              />
              <h3>Pet Details</h3>
              <p>
                Breed: {petform.petitem.Breed}
                <br />
                Age: {petform.petitem.Age}
                <br />
                Location: {petform.petitem.Location}
                <br />
                Gender: {petform.petitem.Gender}
                <br />
                District: {petform.petitem.District}
              </p>
            </div>
            <input
              type="text"
              name="response"
              placeholder="Enter your Response"
              onChange={(event) => setresponse(event.target.value)}
              
              style={{width:"80%",marginLeft:"30px",padding:"10px",marginBottom:"10px"}}
            />
            <input
              type="submit"
              value="submit"
              onClick={() => handleResponse(petform._id)}
              style={{width:"130px", background:"aqua", marginLeft:"70px", padding:"5px",marginBottom:"10px"}}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notification;
