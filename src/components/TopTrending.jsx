import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './TopTrending.css';
import axios from 'axios';

const TopTrending = ({ cartItems, setCart, wishlistItems = [], setWishlistItems }) => { // Default empty array for wishlistItems

  // const [activeTab, setActiveTab] = useState('Latest Products');
  const [products, setProducts] = useState([]); // State to store products data
  const navigate = useNavigate();
  // const [minPrice, setMinPrice] = useState(500);
  // const [maxPrice, setMaxPrice] = useState(3500);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]); // To store the unfiltered products
  const [popupMessage, setPopupMessage] = useState("");

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

  // Fetch bestseller data on component mount using Axios
  useEffect(() => {
    axios.get('http://localhost:5000/bestseller')
      .then(response => {
        const fetchedProducts = response.data;
        setAllProducts(fetchedProducts); // Store all products for reference
        setProducts(fetchedProducts); // Set products to display
        setFilteredProducts(fetchedProducts); // Initially show all products
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []); // Empty dependency array means this runs once on component mount

  const handleAddToCart = (event, product) => {
    event.stopPropagation();

    const existingProduct = cartItems.find((item) => item._id === product._id);

    const updatedCart = existingProduct
      ? cartItems.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      : [...cartItems, { ...product, quantity: 1 }];

    setCart(updatedCart);
    setPopupMessage(`${product.name} added to your cart!`);
    setTimeout(() => setPopupMessage(''), 3000);
  };

  const handleAddToWishlist = (event, product) => {
    event.stopPropagation();

    // Check if the product already exists in the wishlist
    const existingProduct = wishlistItems.find((item) => item._id === product._id);

    if (!existingProduct) {
      setWishlistItems([...wishlistItems, product]);
      setPopupMessage(`${product.name} added to your wishlist!`);
    } else {
      setPopupMessage(`${product.name} is already in your wishlist!`);
    }

    setTimeout(() => setPopupMessage(''), 3000); // Hide popup after 3 seconds
  };

  return (
    <div className="top-trending-container">
      <h2
        style={{
          fontSize: '2rem',
          color: 'black',
          margin: '1rem 0',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}
      >
        Top Trending
      </h2>

      <div className="top-trending-tabs">
        {/* Add more tabs if needed */}
      </div>

      <div className="top-trending-products">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              className="product-card"
              onClick={() => handleImageClick(product._id)}
              style={{
                padding: '10px',
                textAlign: 'center',
                width: '85%',
                height: '85%',
              }}
            >
              <img src={product.image_url} alt={product.name} />
              <div className="action-icons">
                <i className="fas fa-heart" onClick={(e) => handleAddToWishlist(e, product)}></i> {/* Wishlist icon */}
                <i className="fas fa-shopping-cart" onClick={(event) => handleAddToCart(event, product)}></i> {/* Cart icon */}
              </div>
              <h3>{product.name}</h3>
              <p>{product.size}</p>
              <p>{product.price}</p>
              <div className="rating" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {renderStars(product.ratings)}
              </div>
            </div>
          ))
        ) : (
          <p>Loading products...</p>
        )}
      </div>

      <div className="center-button-container">
        <button className="center-button">Shop Now</button>
      </div>
    </div>
  );
};

export default TopTrending;
