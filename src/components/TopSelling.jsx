import React, { useState, useEffect } from 'react';
import './TopSelling.css'; // Import the CSS file

const TopSelling = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: 'best1.png',
      title: 'Police Police To Be Rebel Eau De Toilette 100ml',
      price: '$49.00',
    },
    {
      image: 'exe3.jpg',
      title: 'Viktor & Rolf Flowerbomb Eau de Parfum Spray, Perfume for Women',
      price: '$85.00',
    },
    {
      image: 'exe1.jpg',
      title: 'Product 3',
      price: '$70.00',
    },
    {
      image: 'exe2.jpg',
      title: 'Product 4',
      price: '$99.00',
    },
    // Add more slides as needed
  ];

  const totalSlides = slides.length;

  // Use an effect to trigger automatic slide change every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [totalSlides]);

  // To make the continuous loop, we will just set the `currentSlide` within bounds
  const slidesWithLoop = slides;

  return (
    <div className="top-selling-container">
      <h2 className="top-selling-title">Top Selling Products</h2>
      <div
        className="top-selling-wrapper"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`, // Slide transition effect
          transition: 'transform 0.5s ease-in-out', // Smooth transition for continuous sliding
        }}
      >
        {slidesWithLoop.map((slide, index) => (
          <div key={index} className="top-selling-slide">
            <div className="image-container">
              <img src={slide.image} alt={slide.title} />
            </div>
            <div className="text-container">
              <h3>{slide.title}</h3>
              <p>{slide.price}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="dots">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default TopSelling;
