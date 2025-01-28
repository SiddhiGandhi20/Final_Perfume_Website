import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './WomenProduct.css';
import axios from 'axios';

const WomenProducts = ({ cartItems, setCart, wishlistItems, setWishlistItems }) => {
  // States for price filter, filtered products, popup message, etc.
  const [minPrice, setMinPrice] = useState(500);
  const [maxPrice, setMaxPrice] = useState(3500);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]); // To store the unfiltered products
  const [popupMessage, setPopupMessage] = useState("");
  const navigate = useNavigate();

  // Fetch products from the API when the component is mounted
  useEffect(() => {
    axios.get('http://localhost:5000/women_perfumes')
      .then(response => {
        setAllProducts(response.data); // Store all products for reference
        setFilteredProducts(response.data); // Initially show all products
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []); // Empty dependency array means this runs once on component mount

  // Function to handle adding products to the cart
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




  // Function to handle adding products to the wishlist
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

  // Function to render the rating stars based on product rating
  const renderStars = (rating) => {
    const totalStars = 5;
    return [...Array(totalStars)].map((_, index) => (
      <i key={index} className={`fa-star ${index < rating ? 'fas' : 'far'}`}></i>
    ));
  };

  // Function to handle price filter changes
  const handlePriceChange = (event) => {
    const value = event.target.value;
    setMaxPrice(value); // Update max price based on slider value
  };

  // Function to apply the price filter
  const handleFilterClick = () => {
    const filtered = allProducts.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice
    );
    setFilteredProducts(filtered); // Update the filtered products state
    console.log(`Filtering products between ₹${minPrice} and ₹${maxPrice}`);
  };

  // Function to handle image click and navigate to product details page
  const handleImageClick = (id) => {
    navigate(`/women-product-details/${id}`);
  };

  return (
    <div className="women-product-container">
      {/* Display popup notification if any */}
      {popupMessage && <div className="popup-notification">{popupMessage}</div>}

      {/* Sidebar Section with categories and price filter */}
      <div className="women-sidebar">
        <div className="women-categories">
          <h3>CATEGORIES</h3>
          <ul>
            <li>Men Perfumes</li>
            <li>Exclusive Perfumes</li>
            <li>Women Perfumes</li>
          </ul>
        </div>
        <div className="women-price-filter">
          <h3>PRICE</h3>
          <div className="women-range-slider">
            <input
              type="range"
              min="500"
              max="10000"
              value={maxPrice}
              onChange={handlePriceChange}
            />
            <div className="women-price-range">
              <span>Price: ₹{minPrice} - ₹{maxPrice}</span>
              <button className="women-filter-button" onClick={handleFilterClick}>
                Filter
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section to display the list of filtered products */}
      <div className="women-products">
        {filteredProducts.map((product) => (
          <div className="women-card" key={product._id}>
            <img
              src={product.image_url}
              alt={product.name}
              onClick={() => handleImageClick(product._id)}
            />
            <div className="women-action-icons">
              <i
                className="fas fa-heart"
                onClick={(e) => handleAddToWishlist(e, product)}
              ></i>
              <i
                className="fas fa-cart-plus"
                onClick={(event) => handleAddToCart(event, product)}
              ></i>
            </div>
            <div className="women-rating">{renderStars(product.ratings)}</div>
            <h4>{product.name}</h4>
            <p>₹{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WomenProducts;
