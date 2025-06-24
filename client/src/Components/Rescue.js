import React, { useState, useEffect } from "react";
import Header from "./Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { FaMapMarkerAlt } from 'react-icons/fa';

function Rescue() {
  const [Items, setItems] = useState({});
  const [File, setFile] = useState(null);
  const [showMapModal, setShowMapModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [userLocation, setUserLocation] = useState(null); // User's initial location
  const navigate = useNavigate();
  const formdata = new FormData();

  useEffect(() => {
    // Get user's current location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Error getting location: ", error);
        // Fallback to a default location if location access is denied
        setUserLocation({ lat:9.6728, lng: 77.9658 });
      }
    );
  }, []);

  const handleInput = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setItems((i) => ({ ...i, [name]: value }));
  };

  const handleInputPDF = (event) => {
    setFile(event.target.files[0]);
  };

  const handleLocationClick = () => {
    setShowMapModal(true);
  };

  const handleMapClose = () => {
    setShowMapModal(false);
  };

  const handleMapClick = (latlng) => {
    setSelectedLocation(latlng);
    setItems((i) => ({ ...i, location: `${latlng.lat}, ${latlng.lng}` }));
    setShowMapModal(false);
  };
  const username=localStorage.getItem("username");
  const handleSubmit = async () => {
    formdata.append("rescueItem", JSON.stringify(Items));
    formdata.append("pdf", File);
    formdata.append("username",username);
    const response = await axios.post("http://localhost:5000/submitrescue", formdata, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.data.message) {
      alert("Your Rescue form submitted successfully");
    } else {
      alert("Error while submitting rescue");
    }
  };

  return (
    <div>
      <Header />
      <div className="form-container">
        <h2>Rescue</h2>
        <div className="input-group">
          <input
            type="text"
            placeholder="Enter the name"
            name="name"
            value={Items.name||""}
            onChange={(event) => handleInput(event)}
            className="block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />
        </div>
        <div className="input-group">
          <input
            type="text"
            placeholder="Enter the mobile no"
            name="mobile"
            value={Items.mobile||""}
            onChange={(event) => handleInput(event)}
            className="block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />
        </div>
        <div className="input-group">
          <input
            type="text"
            placeholder="Enter the occupation"
            name="occupation"
            value={Items.occupation||""}
            onChange={(event) => handleInput(event)}
            className="block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />
        </div>
        <div className="input-group">
          <input
            type="text"
            placeholder="Enter the address"
            name="address"
            value={Items.address||""}
            onChange={(event) => handleInput(event)}
            className="block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />
        </div>

        <div className="input-group relative">
          <input
            type="text"
            placeholder="Choose location"
            name="location"
            value={selectedLocation ? `${selectedLocation.lat}, ${selectedLocation.lng}` : ""}
            onClick={handleLocationClick}
            className="block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />
          <FaMapMarkerAlt
            className="map-icon absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
            onClick={handleLocationClick}
          />
        </div>

        <div className="input-group file-input-wrapper">
          <label htmlFor="file" className="file-input-label">
            Upload Pet Image        
            </label>
          <input
            type="file"
            id="file"
            name="pdf"
            onChange={(event) => handleInputPDF(event)}
          />
        </div>
        <div className="input-group">
          <input
            type="submit"
            value="Submit"
            onClick={(event) => handleSubmit(event)}
            style={{marginLeft:"60px"}}
            className="block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />
        </div>
      </div>

      {/* Map Modal */}
      {showMapModal && (
        <div className="modal-overlay " style={{marginLeft:"200px",marginBottom:"50px"}}>
          <div className="modal-content">
            <div className="modal-header">
              <button className="close-btn" onClick={handleMapClose}>&times;</button>
              <h3>Select Location</h3>
            </div>
            <div className="modal-body">
              <MapContainer
                center={userLocation || { lat: 51.505, lng: -0.09 }}
                zoom={13}
                style={{ height: "400px", width: "80%" }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {selectedLocation && (
                  <Marker position={selectedLocation}>
                    <Popup>
                      Latitude: {selectedLocation.lat}, Longitude: {selectedLocation.lng}
                    </Popup>
                  </Marker>
                )}
                <MapEvents onClick={handleMapClick} />
              </MapContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const MapEvents = ({ onClick }) => {
  useMapEvents({
    click(e) {
      onClick(e.latlng);
    },
  });
  return null;
};

export default Rescue;
