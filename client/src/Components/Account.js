import Header from "./Header";
import axios from "axios";
import { useEffect, useState } from "react";
import "./Css/Account.css"

function Account() {
  const username = localStorage.getItem("username");
  const [account, setaccount] = useState([]);
  const [rescue,setrescue]=useState([]);
  useEffect(() => {
    const handleFetchUser = async () => {
      const response = await axios.post("http://localhost:5000/getaccount", {
        Username: username,
      });

      if (response.data) {
        setaccount(response.data.account);
        setrescue(response.data.rescue);
      } else {
        alert("error");
      }
    };
    handleFetchUser();
  }, []);

  return (
    <div>
      <Header />
      <h2>Hello, {username}</h2>
      <h2>Your Adoption requests</h2>
      <div className="card-container" style={{marginTop:"10px"}}>
        {account.map((item, i) => (
          <div className="card" key={i}>
            {item.petitem.Photo ? (
              <img
                src={item.petitem.Photo}
                className="card-img-top"
                alt={item.petitem.Breed}
              />
            ) : (
              <div className="placeholder-image">No Image Available</div>
            )}
            <hr /> 
            <div className="card-body">
              <h5 className="card-title">{item.petitem.Breed}</h5>
              <p className="card-text">
                Age: {item.petitem.Age} <br />
                Location: {item.petitem.Location} <br />
                Gender: {item.petitem.Gender} <br />
                District: {item.petitem.District}
              </p>
              <p>Status: {item.Response}</p>
            </div>
          </div>
        ))}
      </div>
      <h5 className="card-title" style={{marginLeft:"585px"}}>Rescue Details</h5>
      <div className="card-container" style={{marginTop:"10px"}}>
     
        {rescue.map((rescue,i)=>(
          <div className="card">
            {rescue.Image ? (
              <img 
                src={"http://localhost:5000/uploads/"+rescue.Image}
                className="card-img-top"
              
              />
            ) : (
              <div className="placeholder-image">No Image Available</div>
            )}
            <div className="card-body">
              
              <p className="card-text">
                 Name: {rescue.Name} <br />
                Address: {rescue.Address} <br />
                Mobile: {rescue.Mobile} <br />
              
              </p>
              <p>Status: {rescue.Response}</p>
            </div>
            
          </div>

         ) )}

        </div>
    </div>
  );
}

export default Account;
