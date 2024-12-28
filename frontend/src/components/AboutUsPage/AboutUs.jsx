// src/pages/AboutUs.js
import React from "react";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <header className="header-section">
        <h1>About InstaGo</h1>
        <p>Revolutionizing university transportation for students.</p>
      </header>

      <section className="mission-section">
        <h2>Our Mission</h2>
        <p>
          At Insta Go, our mission is to empower university students with a convenient, affordable, and reliable rental
          system. We aim to address the transportation challenges faced by students, ensuring they can freely access
          vehicles directly from their university campus.
        </p>
      </section>

      <section className="features-section">
        <h2>Why Choose Insta Go?</h2>
        <ul>
          <li><strong>Seamless Rentals:</strong> Access vehicles in just a few clicks using our easy-to-navigate platform.</li>
          <li><strong>Affordable Pricing:</strong> Specially designed for students, our pricing plans are budget-friendly and transparent.</li>
          <li><strong>Safety First:</strong> Helmets are provided with every vehicle to ensure student safety.</li>
          <li><strong>Eco-Friendly:</strong> Choose from a fleet of bicycles, scooters, and electric vehicles that reduce your carbon footprint.</li>
          <li><strong>Supportive Team:</strong> Dedicated customer support to address any rental issues or concerns.</li>
        </ul>
      </section>

      <section className="how-it-works-section">
        <h2>How It Works</h2>
        <ol>
          <li><strong>Sign Up:</strong> Create an account using your university credentials.</li>
          <li><strong>Browse Vehicles:</strong> Explore a variety of vehicles available for rent directly on campus.</li>
          <li><strong>Book Instantly:</strong> Reserve your vehicle for a specific time and duration.</li>
          <li><strong>Pickup & Go:</strong> Collect your vehicle from the designated Insta Go location and hit the road.</li>
        </ol>
      </section>

      <section className="testimonials-section">
        <h2>What Students Say</h2>
        <blockquote>
          "Insta Go made my daily commute so much easier! The convenience and affordability are unmatched."
          <span>— Priya Sharma, Computer Science</span>
        </blockquote>
        <blockquote>
          "I love that Insta Go provides helmets. It's great to see a rental system that prioritizes safety."
          <span>— Aman Gupta, Engineering</span>
        </blockquote>
      </section>

      <section className="contact-section">
        <h2>Get In Touch</h2>
        <p>
          Have questions or feedback? We'd love to hear from you! Email us at{" "}
          <a href="mailto:Mayankbansal51351.com">Mayankbansal51351.com</a> or visit our office on campus.
        </p>
      </section>
    </div>
  );
};

export default AboutUs;
