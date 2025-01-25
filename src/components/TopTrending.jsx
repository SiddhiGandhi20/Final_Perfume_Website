import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TopTrending.css';

const TopTrending = () => {
  const [activeTab, setActiveTab] = useState('Latest Products');
  const navigate = useNavigate();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleImageClick = (id) => {
    navigate(`/details/${id}`); // Navigate to the Details page with product ID
  };

  // Function to render stars based on the rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <i
          key={i}
          className={`fa ${i < rating ? 'fa-star' : 'fa-star-o'} star`}
        ></i>
      );
    }
    return stars;
  };

  const products = [
    {
      id: 1,
      image: '/women2.jpg',
      name: 'Police Police To Be Rebel Eau De Toilette',
      size: '100ml',
      price: '$49.00',
      rating: 5,
    },
    {
      id: 2,
      image: 'women1.jpg',
      name: 'Majesty Oud Perfume Spray for Men',
      size: '100ml',
      price: '$59.00',
      rating: 4,
    },
    {
      id: 6,
      image: 'exe5.jpg',
      name: 'Police Police To Be Rebel Eau De Toilette',
      size: '100ml',
      price: '$49.00',
      rating: 5,
    },
    {
      id: 3,
      image: 'exe3.jpg',
      name: 'Police Police To Be Rebel Eau De Toilette',
      size: '100ml',
      price: '$49.00',
      rating: 5,
    },
    {
      id: 4,
      image: 'women2.jpg',
      name: 'Police Police To Be Rebel Eau De Toilette',
      size: '100ml',
      price: '$49.00',
      rating: 5,
    }
    // Add more products as needed
  ];

  return (
    <div className="top-trending-container">
    <h2 style={{
  fontSize: '2rem',
  color: 'black',
  margin: '1rem 0',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.05em'
}}>
  Top Trending
</h2>


      <div className="top-trending-tabs">
        <div
          className={`tab-button ${activeTab === 'Latest Products' ? 'active' : ''}`}
          onClick={() => handleTabClick('Latest Products')}
        >
          Latest Products
        </div>
        {/* Add more tabs if needed */}
      </div>
      <div className="top-trending-products">
        {products.map((product) => (
          <div key={product.id} className="product-card" onClick={() => handleImageClick(product.id)}>
            <img src={product.image} alt={product.name} />
            <div className="action-icons">
              <i className="fas fa-heart"></i> {/* Wishlist icon */}
              <i className="fas fa-shopping-cart"></i> {/* Cart icon */}
            </div>
            <h3>{product.name}</h3>
            <p>{product.size}</p>
            <p>{product.price}</p>
            <div className="rating" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
  {renderStars(product.rating)}
</div>

          </div>
        ))}
      </div>
      <div className="center-button-container">
        <button className="center-button">Shop Now</button>
      </div>
    </div>
  );
};

export default TopTrending;
