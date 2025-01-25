import React from "react";
import "./Slider.css";

const Slider = () => {
  return (
    <div className="slider-container">
      <h2 style={{
  fontSize: '2rem',
  color: 'black',
  margin: '1rem 0',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.05em'
}}>Famous Brands</h2>
      <div className="slider">
        <div className="slide">
          <img src="brand-1.png" alt="Brand 1" />
        </div>
        <div className="slide">
          <img src="brand-2.png" alt="Brand 2" />
        </div>
        <div className="slide">
          <img src="brand-3.png" alt="Brand 3" />
        </div>
        <div className="slide">
          <img src="brand-4.png" alt="Brand 4" />
        </div>
        <div className="slide">
          <img src="brand-5.png" alt="Brand 5" />
        </div>

        {/* Duplicate slides for seamless looping */}
        <div className="slide">
          <img src="brand-1.png" alt="Brand 1" />
        </div>
        <div className="slide">
          <img src="brand-2.png" alt="Brand 2" />
        </div>
        <div className="slide">
          <img src="brand-3.png" alt="Brand 3" />
        </div>
        <div className="slide">
          <img src="brand-4.png" alt="Brand 4" />
        </div>
        <div className="slide">
          <img src="brand-5.png" alt="Brand 5" />
        </div>
      </div>
    </div>
  );
};

export default Slider;
