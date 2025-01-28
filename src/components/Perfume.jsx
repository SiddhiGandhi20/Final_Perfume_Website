import React, { useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Perfume.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Perfume = ({ cartItems = [], wishlistItems = [] }) => {
  const navigate = useNavigate();
  
  // State for cart and wishlist counters
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  // Function to calculate the total number of items in the cart
  const getTotalCartQuantity = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Function to calculate the total number of items in the wishlist
  const getTotalWishlistQuantity = () => {
    return wishlistItems.length; // Assuming wishlistItems is an array of items
  };

  // Update the state with calculated values
  useEffect(() => {
    setCartCount(getTotalCartQuantity());
    setWishlistCount(getTotalWishlistQuantity());
  }, [cartItems, wishlistItems]);  // Recalculate when cartItems or wishlistItems change

  return (
    <div className="perfume-container">
      <div className="perfume-header">
        <div className="perfume-logo">
          <a
            href='/'
            style={{
              color: "#205b75",
              textDecoration: "none",
              transition: "color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#66a8b8")}
            onMouseLeave={(e) => (e.target.style.color = "#205b75")}
          >
            AROMA BLISS
          </a>
        </div>
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
          {/* Wishlist icon with counter */}
          <i
            className="fa fa-heart"
            onClick={() => navigate("/wishlist")}
            style={{ cursor: "pointer", position: "relative" }}
          >
            <span
              className="wishlist-count"
              style={{
                position: "absolute",
                top: "-10px",
                right: "-25px",
                backgroundColor: "#ff4d4d",
                borderRadius: "50%",
                padding: "5px 10px",
                fontSize: "12px",
                color: "white",
              }}
            >
              {wishlistCount}
            </span>
          </i>

          {/* Cart icon with counter */}
          <i
            className="fa fa-shopping-cart"
            onClick={() => navigate("/cart")}
            style={{ cursor: "pointer", position: "relative" }}
          >
            <span
              className="cart-count"
              style={{
                position: "absolute",
                top: "-10px",
                right: "-25px",
                backgroundColor: "#ff4d4d",
                borderRadius: "50%",
                padding: "5px 10px",
                fontSize: "12px",
                color: "white",
              }}
            >
              {cartCount}
            </span>
          </i>

          {/* User icon */}
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
