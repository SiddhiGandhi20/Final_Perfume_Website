import React from 'react';
import './Women.css';

const Women = () => {
  return (
    <div className="women-container">
      <div className="women-content">
        <h1 className="women-title">Women Perfume</h1>
        <p className="women-breadcrumb">
          <a href="/" className="breadcrumb-link" style={{
        color: "white",
        textDecoration: "none",
        transition: "color 0.3s ease",
      }}>Home</a> &gt; Women Perfumes
        </p>
      </div>
    </div>
  );
};

export default Women;
