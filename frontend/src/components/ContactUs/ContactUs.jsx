import React from 'react';
import './ContactUs.css';

const ContactUs = () => {
  return (
    <div className="contact-page-container">
      <header className="contact-header">
        <h1 className="contact-title">Contact Us</h1>
        <p className="contact-description">
          We'd love to hear from you! Whether you have a question or just want to say hello, feel free to reach out.
        </p>
      </header>
      <div className="contact-content">
        <div className="contact-info">
          <div className="contact-info-item" data-aos="fade-right">
            <i className="fas fa-map-marker-alt contact-info-icon"></i>
            <h3 className="contact-info-title">Address</h3>
            <p className="contact-info-text">Chitkar university, rajpura, punjab</p>
          </div>
          <div className="contact-info-item" data-aos="fade-right" data-aos-delay="200">
            <i className="fas fa-phone contact-info-icon"></i>
            <h3 className="contact-info-title">Phone</h3>
            <p className="contact-info-text">981-765-1351</p>
          </div>
          <div className="contact-info-item" data-aos="fade-right" data-aos-delay="400">
            <i className="fas fa-envelope contact-info-icon"></i>
            <h3 className="contact-info-title">Email</h3>
            <p className="contact-info-text">Mayankbansal51351.gmail.com</p>
          </div>
        </div>
        <div className="contact-form-container" data-aos="fade-left">
          <h2 className="contact-form-title">Send Message</h2>
          <form className="contact-form">
            <label htmlFor="name" className="contact-form-label">Full Name</label>
            <input type="text" id="name" className="contact-form-input" placeholder="Your Name" required />

            <label htmlFor="email" className="contact-form-label">Email</label>
            <input type="email" id="email" className="contact-form-input" placeholder="Your Email" required />

            <label htmlFor="message" className="contact-form-label">Message</label>
            <textarea id="message" className="contact-form-textarea" placeholder="Your Message..." rows="5" required></textarea>

            <button type="submit" className="contact-form-button">Send</button>
          </form>
        </div>
      </div>
      <footer className="contact-footer">
        <h3 className="contact-footer-title">Connect with Us</h3>
        <div className="contact-social-icons">
          <i className="fab fa-facebook-f contact-social-icon"></i>
          <i className="fab fa-twitter contact-social-icon"></i>
          <i className="fab fa-instagram contact-social-icon"></i>
          <i className="fab fa-linkedin-in contact-social-icon"></i>
        </div>
      </footer>
    </div>
  );
};

export default ContactUs;

