
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-column">
          <h4>For Business</h4>
          <ul>
            <li>Employer</li>
            <li>Health Plan</li>
            <li>Individual</li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Resources</h4>
          <ul>
            <li>Resource Center</li>
            <li>Testimonials</li>
            <li>STV</li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Partners</h4>
          <ul>
            <li>Swing Tech</li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Company</h4>
          <ul>
            <li>About</li>
            <li>Press</li>
            <li>Career</li>
            <li>Contact</li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Coming soon on</h4>
          <div className="social-icons">
            <i className="fab fa-facebook"></i>
            <i className="fab fa-twitter"></i>
            <i className="fab fa-linkedin"></i>
            <i className="fab fa-instagram"></i>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>©2023 CodeInn. All rights reserved.</p>
        <ul>
          <li>Terms & Conditions</li>
          <li>Privacy</li>
          <li>Security</li>
          <li>Cookie Declaration</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
