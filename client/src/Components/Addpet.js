import axios from "axios";
import "./Css/AdminAddPet.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function Addpet() {
  const [Items, setItems] = useState([]);
  const [allitems, setAllItems] = useState([]);
  const [editId, seteditId] = useState(null);
  const [File, setFile] = useState();
  const [search, setSearch] = useState("");
  const [forms, setforms] = useState([]);
  const formdata = new FormData();


  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setItems((values) => ({ ...values, [name]: value }));
  };
  const username=localStorage.getItem("username");
  const handleSubmit = async (e) => {
    formdata.append("image", File);
    formdata.append("Items", JSON.stringify(Items));
    formdata.append("editId", editId);
    formdata.append("username",username)
    if (editId == null) {
      const response = await axios.post(
        "http://localhost:5000/addpet",
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if(response.data){
        alert(response.data.message);
      }
     
    } else {
      const response = await axios.post("http://localhost:5000/updatepet",formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if(response.data){
          alert("Edited Successfully");
          setItems([]);
        }
    }
    seteditId(null);
  };

  useEffect(() => {
    const handleFetch = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/getpet?Search=${search}`
        );
        const petData = response.data.alldata;
        setAllItems(petData);
      } catch (err) {
        console.log(err);
      }
    };
    handleFetch();
   
  }, [search]);

  const handleEdit = async (i) => {
    seteditId(allitems[i]._id);
    setItems(allitems[i]);
  };

  const handleDelete = async (id) => {
    const response = await axios.delete(
      `http://localhost:5000/deletepet?id=${id}`
    );
    alert(response.data);
  };

  const handleImage = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="addpet-container">
      <div>
        <div >
          <header>
            <div class="components">
              
              <a href="/notification">Notification</a>
              <a href="/adminrescueresponse">Rescue</a>
            
            </div>
          </header>
        </div>
      </div>

      <div className="form-card">
        <input type="file" onChange={handleImage} />
        <input
          type="text"
          onChange={handleChange}
          name="Breed"
          placeholder="Enter the dog breed"
          value={Items.Breed || ""}
        />
        <input
          type="text"
          onChange={handleChange}
          name="Age"
          placeholder="Enter the dog Age"
          value={Items.Age || ""}
        />
        <input
          type="text"
          onChange={handleChange}
          name="Location"
          placeholder="Pet care center location"
          value={Items.Location || ""}
        />
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="Gender"
              value="Male"
              className="radio"
              onChange={handleChange}
              checked={Items.Gender === "Male"}
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="Gender"
              className="radio"
              value="Female"
              onChange={handleChange}
              checked={Items.Gender === "Female"}
            />
            Female
          </label>
        </div>
        <input
          type="text"
          onChange={handleChange}
          name="District"
          placeholder="District"
          value={Items.District || ""}
        />
        <button className="btn-submit" onClick={handleSubmit}>
          Submit
        </button>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search..."
          onChange={handleSearch}
          className="search-input"
          style={{margin:"25px"}}
        />
      </div>

      <h2  style={{padding:"20px",marginTop:"10px"}}>Pet Details</h2>
      <div className="pet-cards">
        {allitems.map((item, i) => (
          <div className="card-admin" key={i}>
            <div className="card-img-container">
              {item.Photo ? (
                <img src={item.Photo} alt={item.Breed} className="card-img" />
              ) : (
                <div className="card-placeholder">No Image Available</div>
              )}
            </div>
            <div className="card-body">
              <h5>{item.Breed}</h5>
              <p>
                Age: {item.Age}
                <br />
                Location: {item.Location}
                <br />
                Gender: {item.Gender}
                <br />
                District: {item.District}
              </p>
              <div className="card-buttons">
                <button className="btn btn-edit" onClick={() => handleEdit(i)}>
                  Edit
                </button>
                <button
                  className="btn btn-delete"
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

     
      
    </div>
  );
}

export default Addpet;
