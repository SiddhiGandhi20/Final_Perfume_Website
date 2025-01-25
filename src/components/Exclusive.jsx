import React from 'react';
import './Exclusive.css';

const Exclusive = () => {
  return (
    <div className="exclusive-container">
      <div className="exclusive-content">
        <h1 className="exclusive-title">Exclusive Perfume</h1>
        <p className="exclusive-breadcrumb">
          <a href="/" className="breadcrumb-link" style={{
        color: "white",
        textDecoration: "none",
        transition: "color 0.3s ease",
      }}>Home</a> &gt; Exclusive Perfumes
        </p>
      </div>
    </div>
  );
};

export default Exclusive;
