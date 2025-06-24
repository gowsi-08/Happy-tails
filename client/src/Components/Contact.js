import React from "react";
import Header from "./Header";
import "./Css/Contact.css";

function Contact() {
  return (
    <div>
      <Header />
      <div className="contact-container">
        <h1 className="contact-heading">Contact Us</h1>
        <p className="contact-description">
          We’d love to hear from you! Fill out the form below or use the contact details to reach out.
        </p>

        <form className="contact-form">
          <div className="input-group">
            <input
              type="text"
              placeholder="Your Name"
              name="name"
              required
              className="form-input"
            />
          </div>
          <div className="input-group">
            <input
              type="email"
              placeholder="Your Email"
              name="email"
              required
              className="form-input"
            />
          </div>
          <div className="input-group">
            <textarea
              placeholder="Your Message"
              name="message"
              required
              className="form-textarea"
            ></textarea>
          </div>
          <div className="input-group">
            <button type="submit" className="form-submit-button">
              Submit
            </button>
          </div>
        </form>

        <div className="contact-details">
          <h2>Contact Information</h2>
          <p>Email: <a href="mailto:info@yourwebsite.com">info@yourwebsite.com</a></p>
          <p>Phone: <a href="tel:+123456789">+123 456 789</a></p>
          <p>Address: 123 Your Street, Your City, Your Country</p>
        </div>
      </div>
    </div>
  );
}

export default Contact;
