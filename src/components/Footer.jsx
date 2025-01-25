import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section contact-info">
          <h3>Call To Order</h3>
          <p className="phone-number">+084 859-481-3614</p>
          <p className="description">
            There are many variations passages of available, but the
            majority have suffered alteration injected.
          </p>
          <p className="address">Address: 139 Brook Drive South Richmond Hill, NY</p>
          <p className="email">Email: perfume@support.com</p>
        </div>
        <div className="footer-section useful-links">
          <h3>Useful Links</h3>
          <ul className="links-list">
            <li>
              <a href="#" className="footer-link">About us</a>
            </li>
            <li>
              <a href="#" className="footer-link">Contact us</a>
            </li>
            <li>
              <a href="#" className="footer-link">Blogs</a>
            </li>
            <li>
              <a href="#" className="footer-link">Business With Us</a>
            </li>
            <li>
              <a href="#" className="footer-link">Find a Store</a>
            </li>
          </ul>
        </div>
        <div className="footer-section quick-links">
          <h3>Quick Links</h3>
          <ul className="links-list">
            <li>
              <a href="#" className="footer-link">Men's Perfume</a>
            </li>
            <li>
              <a href="#" className="footer-link">Women Perfume</a>
            </li>
            <li>
              <a href="#" className="footer-link">Unisex Perfume</a>
            </li>
            <li>
              <a href="#" className="footer-link">Gift Sets</a>
            </li>
            <li>
              <a href="#" className="footer-link">Brands</a>
            </li>
          </ul>
        </div>
        <div className="footer-section newsletter-section">
          <h3>Newsletter</h3>
          <p className="newsletter-description">
            Subscribe to the weekly newsletter for all the latest updates and get
            a 10% off bill offers.
          </p>
          <form className="newsletter-form">
            <input type="email" placeholder="Enter your email" required className="newsletter-input" />
            <button type="submit" className="newsletter-button">Subscribe</button>
          </form>
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="#" className="social-icon facebook">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="social-icon twitter">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="social-icon instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="social-icon linkedin">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
