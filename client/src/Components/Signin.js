import Header from "./Header";
import "./Css/Signin.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
function Signin() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/signin", {
        Email,
        Password,
      });
      setError(response.data.error);
      if (response.data.message) {
        alert(response.data.message);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("email", response.data.email);
        const username = response.data.email.split("@")[0];
        console.log(username);
        localStorage.setItem("username", username);
        navigate("/");
      }
    } catch (error) {
      console.error("Error Occurs while Genering sign in!");
    }
  };
  return (
    <div>
      <Header />

      <div className="card1">
        <h1>Sign in</h1>
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
          <input type="submit" className="submit" onClick={handleSubmit} />
          <p>
            New Account?<Link to="/Signup">Sign Up</Link>
          </p>
        </div>
        <p>{Error && <p>{Error}</p>}</p>
      </div>
    </div>
  );
}

export default Signin;
