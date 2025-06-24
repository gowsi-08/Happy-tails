import axios from "axios";
import "./Css/Addpet.css";
import { useEffect, useState } from "react";
import Header from "./Header";
import { Link } from "react-router-dom";

function Details() {
  const [allitems, setAllItems] = useState([]);
  const [Search, setSearch] = useState("");

  useEffect(() => {
    const handleFetch = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/getpet?Search=${Search}`
        );
        const petData = response.data.alldata;
        setAllItems(petData);
      } catch (err) {
        console.log(err);
      }
    };

    handleFetch();
  }, [Search]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <Header />
      <div className="search-container">
        <input
          type="text"
          onChange={(e) => handleSearch(e)}
          placeholder="Search for pets"
          className="search-input"
          style={{marginTop:"20px"}}
        />
      </div>
      
      <div className="grid-container">
        {allitems.map((item, i) => (
          <div className="card-wrapper" key={i}>
            <Link to="/petdetails" state={item}>
              {item.Photo ? (
                <img
                  src={item.Photo}
                  className="card-img-top"
                  alt={item.Breed}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <div className="placeholder-image">
                  No Image Available
                </div>
              )}
            </Link>
            <div className="card-body">
              <h5 className="card-title">{item.Breed}</h5>
              <p className="card-text">
                Age: {item.Age} <br />
                Location: {item.Location} <br />
                Gender: {item.Gender} <br />
                District: {item.District}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Details;
