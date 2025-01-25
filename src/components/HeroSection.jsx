import React from "react"
import "./HeroSection.css"

const HeroSection = () => {
  return (
    <div className="perfume-hero-container">
      <div className="perfume-hero-content">
        <div className="perfume-hero-text">
          <p className="perfume-subtitle">The Art of Perfumery</p>
          <h1 className="perfume-title">
            Perfumes that affect your
            <span className="perfume-title-second-line">
              <span className="perfume-and"> and</span>  our emotions
            </span>
          </h1>
          <p className="perfume-description">
            Welcome aboard our perfume adventure. We're setting sail to the vast sea of scents, taking the waves of innovation and trend-setting.
          </p>
          <button className="perfume-discover-btn">Discover {">"}</button>
          <div className="perfume-social-icons">
              <a href="#" aria-label="Facebook" style={{ textDecoration: "none" }}>
                <div className="perfume-icon">
                  <i className="fab fa-facebook-f"></i>
                </div>
              </a>
              <a href="#" aria-label="Instagram" style={{ textDecoration: "none" }}>
                <div className="perfume-icon">
                  <i className="fab fa-instagram"></i>
                </div>
              </a>
              <a href="#" aria-label="Twitter" style={{ textDecoration: "none" }}>
                <div className="perfume-icon">
                  <i className="fab fa-twitter"></i>
                </div>
              </a>
            </div>
        </div>
        <div className="perfume-hero-image">
          <img
            src="hero8.png"
            alt="Elegant perfume bottle with roses"
            className="perfume-image"
          />
        </div>
      </div>
    </div>
  )
}

export default HeroSection
