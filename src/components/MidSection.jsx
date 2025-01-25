import React from 'react';
import './MidSection.css'; // Importing the CSS file

export default function MidSection() {
  const cards = [
    {
      title: "Perfume for Her",
      description: "Discover the finest collection of perfumes for women.",
      buttonText: "Shop Now",
      imageUrl: "blue1.jpg" // Replace with actual image URL
    },
    {
      title: "Perfume for Him",
      description: "Indulge in luxury fragrances crafted for the modern woman.",
      buttonText: "Shop Now",
      imageUrl: "blue2.jpg" // Replace with actual image URL
    },
    {
      title: "Elegant Scents",
      description: "Explore elegant, timeless and soothing fragrances.",
      buttonText: "Shop Now",
      imageUrl: "blue5.jpg" // Replace with actual image URL
    }
  ];

  return (
    <section className="mid-section-container">
      <div className="mid-card-container">
        {cards.map((card, index) => (
          <div
            key={index}
            className="mid-unique-card"
            style={{
              backgroundImage: `url(${card.imageUrl})`
            }}
          >
            <div className="mid-unique-overlay">
              <div className="mid-card-content-left">
                <h2 className="mid-card-title">{card.title}</h2>
                <p className="mid-card-description">{card.description}</p>
                <button className="mid-shop-now-button">{card.buttonText}</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
