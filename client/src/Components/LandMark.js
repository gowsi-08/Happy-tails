// LocationPicker.js

import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useMapEvents } from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css'; // Import leaflet styles
import Header from './Header';
// Custom Hook for handling map click
const LocationMap = ({ setLocation }) => {
  useMapEvents({
    click(e) {
      setLocation(e.latlng);
    },
  });
  return null;
};

function LandMark() {
  const [location, setLocation] = useState(null); // Initially set to null

  // Get the user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Set the location to user's latitude and longitude
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setLocation(userLocation);
        },
        (error) => {
          console.error("Error getting user location", error);
          // Fallback to a default location if geolocation fails
          setLocation({ lat: 51.505, lng: -0.09 }); // Default to London
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
      // Fallback to a default location
      setLocation({ lat: 9.6728, lng: 77.9658 }); // Default to London
    }
  }, []);

  // Submit the location to the server
  const submitLocation = async () => {
    if (!location) {
      alert("Location is not available");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/submit-location', {
        latitude: location.lat,
        longitude: location.lng,
      });
      console.log('Location submitted:', response.data);
      alert('Location submitted successfully');
    } catch (error) {
      console.error('Error submitting location:', error);
      alert('Error submitting location');
    }
  };

  if (!location) {
    return <div>Loading map...</div>; // Show loading text while location is being fetched
  }

  return (
    <div>
      <Header/>
      <MapContainer
        center={location}
        zoom={16}
        style={{ height: '400px', width: '100%',marginTop:"60px" }} // Ensure map has height and width
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={location}>
          <Popup>
            Latitude: {location.lat}, Longitude: {location.lng}
          </Popup>
        </Marker>
        <LocationMap setLocation={setLocation} />
      </MapContainer>

      <button onClick={submitLocation}>Submit Location</button>
    </div>
  );
}

export default LandMark;
