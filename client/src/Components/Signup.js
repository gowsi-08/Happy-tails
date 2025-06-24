import { useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Signup() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Repassword, setRepassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/signup", {
        Email,
        Password,
        Repassword,
      });
      console.log(response.data);

      setError(response.data.error);
      if (response.data.message) {
        alert(response.data.message);
        navigate("/signin");
      }
    } catch (error) {
      console.error("Error Occurs while Genering sign in!");
    }
  };
  return (
    <div>
      <Header />
      <div className="card1">
        <h1>Signup</h1>
        <div className="signin">
          <input
            type="email"
            name="email"
            placeholder="Enter your Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            name="Repassword"
            placeholder="Enter your Re-password"
            onChange={(e) => setRepassword(e.target.value)}
          />
          <input type="submit" className="submit" onClick={handleSubmit} />
        </div>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
}

export default Signup;
