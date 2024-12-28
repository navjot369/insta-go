// src/pages/AboutUs.js
import React from "react";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <header className="header-section">
        <h1 className="header-title">About InstaGo</h1>
        <p className="header-description">Revolutionizing university transportation for students.</p>
      </header>

      <section className="mission-section">
        <h2 className="mission-title">Our Mission</h2>
        <p className="mission-description">
          At Insta Go, our mission is to empower university students with a convenient, affordable, and reliable rental
          system. We aim to address the transportation challenges faced by students, ensuring they can freely access
          vehicles directly from their university campus.
        </p>
      </section>

      <section className="features-section">
        <h2 className="features-title">Why Choose Insta Go?</h2>
        <ul className="features-list">
          <li className="features-item">
            <strong className="features-item-title">Seamless Rentals:</strong> Access vehicles in just a few clicks using our easy-to-navigate platform.
          </li>
          <li className="features-item">
            <strong className="features-item-title">Affordable Pricing:</strong> Specially designed for students, our pricing plans are budget-friendly and transparent.
          </li>
          <li className="features-item">
            <strong className="features-item-title">Safety First:</strong> Helmets are provided with every vehicle to ensure student safety.
          </li>
          <li className="features-item">
            <strong className="features-item-title">Eco-Friendly:</strong> Choose from a fleet of bicycles, scooters, and electric vehicles that reduce your carbon footprint.
          </li>
          <li className="features-item">
            <strong className="features-item-title">Supportive Team:</strong> Dedicated customer support to address any rental issues or concerns.
          </li>
        </ul>
      </section>

      <section className="how-it-works-section">
        <h2 className="how-it-works-title">How It Works</h2>
        <ol className="how-it-works-list">
          <li className="how-it-works-item">
            <strong className="how-it-works-step-title">Sign Up:</strong> Create an account using your university credentials.
          </li>
          <li className="how-it-works-item">
            <strong className="how-it-works-step-title">Browse Vehicles:</strong> Explore a variety of vehicles available for rent directly on campus.
          </li>
          <li className="how-it-works-item">
            <strong className="how-it-works-step-title">Book Instantly:</strong> Reserve your vehicle for a specific time and duration.
          </li>
          <li className="how-it-works-item">
            <strong className="how-it-works-step-title">Pickup & Go:</strong> Collect your vehicle from the designated Insta Go location and hit the road.
          </li>
        </ol>
      </section>

      <section className="testimonials-section">
        <h2 className="testimonials-title">What Students Say</h2>
        <blockquote className="testimonial">
          "Insta Go made my daily commute so much easier! The convenience and affordability are unmatched."
          <span className="testimonial-author">— Priya Sharma, Computer Science</span>
        </blockquote>
        <blockquote className="testimonial">
          "I love that Insta Go provides helmets. It's great to see a rental system that prioritizes safety."
          <span className="testimonial-author">— Aman Gupta, Engineering</span>
        </blockquote>
      </section>

      <section className="contact-section">
        <h2 className="contact-title">Get In Touch</h2>
        <p className="contact-description">
          Have questions or feedback? We'd love to hear from you! Email us at{" "}
          <a className="contact-email" href="mailto:Mayankbansal51351.com">Mayankbansal51351.com</a> or visit our office on campus.
        </p>
      </section>
    </div>
  );
};

export default AboutUs;
