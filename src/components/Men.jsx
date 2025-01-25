import React from 'react';
import './Men.css';

const Men = () => {
  return (
    <div className="men-container">
      <div className="men-content">
        <h1 className="men-title">Men Perfume</h1>
        <p className="men-breadcrumb">
          <a href="/" className="breadcrumb-link" style={{
        color: "white",
        textDecoration: "none",
        transition: "color 0.3s ease",
      }}>Home</a> &gt; Men Perfumes
        </p>
      </div>
    </div>
  );
};

export default Men;
