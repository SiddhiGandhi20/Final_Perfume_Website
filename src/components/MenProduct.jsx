import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MenProduct.css';
import axios from 'axios';

const MenProduct = ({ cartItems, setCart, wishlistItems, setWishlistItems }) => {
  const [minPrice, setMinPrice] = useState(500);
  const [maxPrice, setMaxPrice] = useState(3500);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [popupMessage, setPopupMessage] = useState('');
  const navigate = useNavigate();

  // Fetch products from the API
  useEffect(() => {
    axios.get('http://localhost:5000/perfumes')
      .then(response => {
        setProducts(response.data);
        setFilteredProducts(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the product data!', error);
      });
  }, []);

  // Load cart from localStorage on component mount
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart); // Set cart from localStorage
  }, [setCart]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Function to render the rating stars
  const renderStars = (rating) => {
    const totalStars = 5;
    return [...Array(totalStars)].map((_, index) => (
      <i key={index} className={`fa-star ${index < rating ? 'fas' : 'far'}`}></i>
    ));
  };

  // Handle range input change (for max price)
  const handlePriceChange = (event) => {
    const value = event.target.value;
    setMaxPrice(value);
  };

  // Filter button logic
  const handleFilterClick = () => {
    const filtered = products.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice
    );
    setFilteredProducts(filtered);
    console.log(`Filtering products between ₹${minPrice} and ₹${maxPrice}`);
  };

  // Handle image click to navigate to product details page
  const handleImageClick = (id) => {
    navigate(`/men-product-details/${id}`);
  };

  // Handle Add to Cart logic
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

  // Handle Add to Wishlist logic
  const handleAddToWishlist = (event, product) => {
    event.stopPropagation();

    const existingProduct = wishlistItems.find((item) => item._id === product._id);

    if (!existingProduct) {
      setWishlistItems([...wishlistItems, product]);
      setPopupMessage(`${product.name} added to your wishlist!`);
    } else {
      setPopupMessage(`${product.name} is already in your wishlist!`);
    }

    setTimeout(() => setPopupMessage(''), 3000);
  };

  return (
    <div className="men-product-container">
      {popupMessage && <div className="popup-notification">{popupMessage}</div>}

      {/* Sidebar Section */}
      <div className="men-sidebar">
        <div className="men-categories">
          <h3>CATEGORIES</h3>
          <ul>
            <li>Men Perfumes</li>
            <li>Exclusive Perfumes</li>
            <li>Women Perfumes</li>
          </ul>
        </div>
        <div className="men-price-filter">
          <h3>PRICE</h3>
          <div className="men-range-slider">
            <input
              type="range"
              min="500"
              max="10000"
              value={maxPrice}
              onChange={handlePriceChange}
            />
            <div className="men-price-range">
              <span>Price: ₹{minPrice} - ₹{maxPrice}</span>
              <button className="men-filter-button" onClick={handleFilterClick}>
                Filter
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="men-products">
        {filteredProducts.map((product) => (
          <div className="men-card" key={product._id}>
            <img 
              src={product.image_url} 
              alt={product.name} 
              onClick={() => handleImageClick(product._id)}
            />
            <div className="men-action-icons">
              <i className="fas fa-heart" onClick={(e) => handleAddToWishlist(e, product)}></i>
              <i className="fas fa-cart-plus" onClick={(e) => handleAddToCart(e, product)}></i>
            </div>
            <div className="men-rating">{renderStars(product.ratings)}</div>
            <h4>{product.name}</h4>
            <p>₹{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenProduct;
