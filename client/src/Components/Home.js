import Header from "./Header";
import "./home.css";

function Home() {
  return (
    <div>
      <Header />
      <div className="home-content">
        <h2>Find Your Perfect Pet!</h2>
        <p>
          We are dedicated to helping you find a loving companion. Explore our
          selection of pets waiting for a forever home. 
        </p>
        <img src="homepage.jpg" width='400px' height='400px' className="homeimg"  />
      </div>
    </div>
  );
}

export default Home;
