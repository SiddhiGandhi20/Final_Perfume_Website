import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Perfume.css';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


const Perfume = () => {
  const navigate = useNavigate();

  return (
    <div className="perfume-container">
      <div className="perfume-header">
        <div className="perfume-logo">AROMA BLISS</div>
        <div className="perfume-nav">
        <ul style={{ listStyle: "none", padding: "0", margin: "15px", display: "flex", gap: "35px" }}>
  <li>
    <Link
      to="/"
      style={{
        color: "black",
        textDecoration: "none",
        transition: "color 0.3s ease",
      }}
      onMouseEnter={(e) => (e.target.style.color = "#205b75")}
      onMouseLeave={(e) => (e.target.style.color = "black")}
    >
      HOME
    </Link>
  </li>
  <li>
    <Link
      to="/exclusive"
      style={{
        color: "black",
        textDecoration: "none",
        transition: "color 0.3s ease",
      }}
      onMouseEnter={(e) => (e.target.style.color = "#205b75")}
      onMouseLeave={(e) => (e.target.style.color = "black")}
    >
      EXCLUSIVE
    </Link>
  </li>
  <li>
    <Link
      to="/women"
      style={{
        color: "black",
        textDecoration: "none",
        transition: "color 0.3s ease",
      }}
      onMouseEnter={(e) => (e.target.style.color = "#205b75")}
      onMouseLeave={(e) => (e.target.style.color = "black")}
    >
      WOMEN
    </Link>
  </li>
  <li>
    <Link
      to="/men"
      style={{
        color: "black",
        textDecoration: "none",
        transition: "color 0.3s ease",
      }}
      onMouseEnter={(e) => (e.target.style.color = "#205b75")}
      onMouseLeave={(e) => (e.target.style.color = "black")}
    >
      MEN
    </Link>
  </li>
  <li>
    <Link
      to="/toptrending"
      style={{
        color: "black",
        textDecoration: "none",
        transition: "color 0.3s ease",
      }}
      onMouseEnter={(e) => (e.target.style.color = "#205b75")}
      onMouseLeave={(e) => (e.target.style.color = "black")}
    >
      SHOP
    </Link>
  </li>
</ul>

        </div>
        <div className="perfume-actions">
      <i
        className="fa fa-heart"
        onClick={() => navigate("/wishlist")}
        style={{ cursor: "pointer" }}
      />
      <i
        className="fa fa-shopping-cart"
        onClick={() => navigate("/cart")}
        style={{ cursor: "pointer" }}
      />
      <i
        className="fa fa-user"
        onClick={() => navigate("/account")}
        style={{ cursor: "pointer" }}
      />
    </div>
      </div>
    </div>
  );
};

export default Perfume;