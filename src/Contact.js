import React from "react";
import './contact.css'

const ContactUs = () => {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      {/* Header */}
      <header style={{ textAlign: "center", marginBottom: "30px" }}>
        <h1>Contact Us</h1>
        <p>We’re here to help. Reach out to us anytime!</p>
      </header>

      {/* Main Content */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "30px" }}>
        {/* Contact Details */}
        <div style={{ flex: "1", minWidth: "300px" }}>
          <h2>Contact Information</h2>
          <p>
            <strong>Address:</strong> 123 University Road, Cityville, State, 456789
          </p>
          <p>
            <strong>Phone:</strong> +1 234-567-890
          </p>
          <p>
            <strong>Email:</strong>{" "}
            <a href="mailto:info@university.edu">info@university.edu</a>
          </p>
          <h2>Follow Us</h2>
          <p>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              Facebook
            </a>{" "}
            |{" "}
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              Twitter
            </a>{" "}
            |{" "}
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
          </p>
        </div>

        {/* Google Maps */}
        <div style={{ flex: "1", minWidth: "300px" }}>
          <h2>Find Us</h2>
          <iframe
            title="University Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3947.414684061172!2d80.50076197501116!3d8.360803391676285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3afc8a63370239cb%3A0xfde408ba97b0d4d3!2sRajarata%20University%20of%20Sri%20Lanka!5e0!3m2!1sen!2slk!4v1732179422558!5m2!1sen!2slk"
            width="100%"
            height="250"
            style={{ border: "0" }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>

      {/* Contact Form */}
      <div style={{ marginTop: "30px" }}>
        <h2>Send Us a Message</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("Message sent successfully!");
          }}
          style={{ display: "flex", flexDirection: "column", gap: "15px", maxWidth: "500px" }}
        >
          <input
            type="text"
            placeholder="Your Name"
            required
            style={{ padding: "10px", fontSize: "16px" }}
          />
          <input
            type="email"
            placeholder="Your Email"
            required
            style={{ padding: "10px", fontSize: "16px" }}
          />
          <textarea
            placeholder="Your Message"
            required
            style={{ padding: "10px", fontSize: "16px", height: "100px" }}
          ></textarea>
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              backgroundColor: "#007BFF",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
