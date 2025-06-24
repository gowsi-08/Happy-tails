import { useEffect, useState } from "react";
import axios from "axios";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

function AdminRescue() {
  const [rescueItems, setrescueItems] = useState([]);
  const [response, setresponse] = useState([]);

  useEffect(() => {
    const fetchRescuefromUser = async () => {
      const res = await axios.post("http://localhost:5000/getrescueform");
      if (res.data) {
        setrescueItems(res.data);
      }
    };
    fetchRescuefromUser();
  }, []);

  const handleResponse = async (rescueid) => {
    const res = await axios.post("http://localhost:5000/updaterescueresponse", {
      response,
      rescueid,
    });

    if (res.data.message) {
      alert(res.data.message);
      setresponse("");
    } else {
      alert(res.data.error);
    }
  };

  return (
    <div>
      <div>
        <header>
          <div className="components" style={{backgroundColor:" #df56b6"}} >
            <a href="/notification" style={{marginLeft:"600px",padding:"5px",}}>Notification</a>
            <a href="/adminrescueresponse" style={{marginLeft:"200px",padding:"5px"}}>Rescue</a>
          </div>
        </header>
      </div>

      {rescueItems.map((rescue, i) => (
        <div
          key={i}
          className="adoption-item-parent"
          style={{ margin: "50px" }}
        >
          <div className="form-details-card">
            <h3>Rescue Details</h3>
            <p>
              <img
                src={"http://localhost:5000/uploads/" + rescue.Image}
                alt="Rescue"
              />
              <br />
              Name: {rescue.Name}
              <br />
              Mobile: {rescue.Mobile}
              <br />
              Occupation: {rescue.Occupation}
              <br />
              Address: {rescue.Address}
              <br />
              Location:{" "}
              <div>
                <MapContainer
                  center={[
                    rescue.Location.split(",")[0],
                    rescue.Location.split(",")[1],
                  ]}
                  zoom={16}
                  style={{ width: "100%", height: "400px" }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Marker
                    position={[
                      rescue.Location.split(",")[0],
                      rescue.Location.split(",")[1],
                    ]}
                  >
                    <Popup>Bus Location</Popup>
                  </Marker>
                </MapContainer>
              </div>
              <a
                href={`https://www.google.com/maps?q=${
                  rescue.Location.split(",")[0]
                },${rescue.Location.split(",")[1]}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on Map
              </a>
            </p>
          </div>
          <input
            type="text"
            name="response"
            placeholder="Enter your Response"
            onChange={(event) => setresponse(event.target.value)}
            value={response}
            style={{
              width: "80%",
              marginLeft: "30px",
              padding: "10px",
              marginBottom: "10px",
            }}
          />
          <input
            type="submit"
            value="submit"
            onClick={() => handleResponse(rescue._id)}
            style={{
              width: "130px",
              background: "aqua",
              marginLeft: "70px",
              padding: "5px",
              marginBottom: "10px",
            }}
          />
        </div>
      ))}
      {/* <div className="col-md-8">
              
            }
          </div> */}
    </div>
  );
}

export default AdminRescue;
