import Header from "./Header";
import "./Css/About.css";

function About() {
  return (
    <div>
        <Header />
    <div className="about-container">
      
         
      <div className="about-content">
       
        <h5>
          Welcome to <span>Happy Tails</span>, a platform dedicated to connecting
          loving families with pets in need. Our mission is to ensure every pet
          finds a safe and caring home. We believe in creating a world where no
          pet is left behind. Whether you're looking to adopt a new companion or
          rescue a pet in distress, we're here to help.
        </h5>
        <h4 className="adopt">
          Adopt a Pet: Browse through our list of adorable pets waiting for a forever home 
          and send us your adoption request form.
        </h4>
        <h4 className="rescue">
          Rescue a Pet: Help a pet in need by sharing details about them and their 
          location. Together, we can ensure they receive the care and attention they deserve.
        </h4>
        <h5>
          At <span>Happy Tails</span>, we are passionate about animal welfare and are committed 
          to making a difference one pet at a time. Thank you for being a part of our journey 
          to create a better future for pets everywhere.
        </h5>
      </div>
    </div>
    </div>
  );
}

export default About;
