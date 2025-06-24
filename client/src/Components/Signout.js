import { useEffect } from "react";
import Header from "./Header";
import "./Css/Signout.css";

function Signout() {
  const username = localStorage.getItem("username");

  useEffect(() => {
    if (username) {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("email");
    }
  }, [username]);

  return (
    <div>
      <Header />
      <div className="signout-container">
        <h1 className="signout-message">
          {username ? `${username}, your account has been signed out successfully.` : "You are already signed out."}
        </h1>
        <p className="signout-subtext">
          Thank you for visiting! We hope to see you again soon.
        </p>
        <a href="/" className="go-home-button">
          Go to Home
        </a>
      </div>
    </div>
  );
}

export default Signout;
