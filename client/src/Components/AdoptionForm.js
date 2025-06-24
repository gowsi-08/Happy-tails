import { useState } from "react";
import Header from "./Header";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./Css/AdoptionForm.css";

function AdoptionForm() {
  const [Items, setItems] = useState([]);
  const [File, setFile] = useState(null);
  const location = useLocation();
  const petitem = location.state;
  const formData = new FormData();

  const handleInput = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setItems((i) => ({ ...i, [name]: value }));
  };

  const handleInputPDF = (event) => {
    setFile(event.target.files[0]);
  };
  const username=localStorage.getItem("username");
  const handleSubmit = async () => {
    formData.append("Items", JSON.stringify(Items));
    formData.append("pdf", File);
    formData.append("pet", JSON.stringify(petitem));
    formData.append("username", username);
  
    const response = await axios.post("http://localhost:5000/submitform", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  
    if (response.data.message) {
      alert("Form submitted successfully");
  
      // Reset form fields
      setItems({});
      setFile(null);
  
      // Optional: Also clear file input manually (because React doesn't control file inputs)
      document.getElementById("file").value = "";
    } else {
      console.log("Error while submitting the form");
    }
  };
  

  return (
    <div>
      <Header />
      <div className="form-container">
        <h2>Adoption Form</h2>
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
        <div className="input-group">
          <input
            type="text"
            placeholder="Enter the gender"
            name="gender"
            value={Items.gender||""}
            onChange={(event) => handleInput(event)}
            className="block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />
        </div>
        <div className="input-group">
          <input
            type="text"
            placeholder="Enter the breed"
            name="breed"
            value={Items.breed||""}
            onChange={(event) => handleInput(event)}
            className="block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />
        </div>
        <div className="input-group file-input-wrapper">
          <label htmlFor="file" className="file-input-label">
            Upload PDF File
          </label>
          <input
            type="file"
            id="file"
            accept="application/pdf"
            name="pdf"
            onChange={(event) => handleInputPDF(event)}
          />
        </div>
        <input
          type="submit"
          value="Submit"
          onClick={handleSubmit}
          className="rounded-md bg-indigo-600 px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        />
      </div>
    </div>
  );
}

export default AdoptionForm;
