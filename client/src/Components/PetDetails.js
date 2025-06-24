import { useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";

function PetDetails() {
  const location = useLocation();
  const item = location.state;
  const navigate = useNavigate();

  const handleAdoptionForm = () => {
    navigate("/adoptionform", { state: item });
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <Header />
      <div className="card h-100" style={{ width: "50%", height: "450px" ,marginLeft:"90px",marginTop:"50px"}}>
        {item.Photo ? (
          <img
            src={item.Photo}
            className="card-img-top"
            alt={item.Breed}
            style={{
              width: "100%",
              height: "60%",
              objectFit: "cover",
            }}
          />
        ) : (
          <div
            className="card-img-top"
            style={{
              width: "100%",
              height: "60%",
              backgroundColor: "#f0f0f0",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            No Image Available
          </div>
        )}
        <div className="card-body">
          <h5 className="card-title">{item.Breed}</h5>
          <p className="card-text">
            Age: {item.Age} <br />
            Location: {item.Location} <br />
            Gender: {item.Gender} <br />
            District: {item.District}
          </p>
          <div className="button-group">
            <input
              type="submit"
              value="Adopt"
              onClick={handleAdoptionForm}
              className="btn btn-primary"
              style={{ marginRight: "10px" ,marginTop:"10px",width:"100px"}}
            />
            <button
              onClick={handleBack}
              className="btn btn-secondary"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default PetDetails;
