import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import 'font-awesome/css/font-awesome.min.css';

import './Details.css';

const Details = ({ cartItems, setCart, wishlistItems, setWishlistItems }) => {
const { id } = useParams();
const [quantity, setQuantity] = useState(1);
const [popupMessage, setPopupMessage] = useState("");
const [product, setProduct] = useState(null);  // For storing the product data
const navigate = useNavigate();
const [relatedProducts, setRelatedProducts] = useState([]); // For storing related products
  
useEffect(() => {
  const fetchProductDetails = async () => {
    try {
      const productResponse = await axios.get(`http://localhost:5000/bestseller/${id}`);
      setProduct(productResponse.data);  // Store product data
      
      // Fetch related products if available
      const relatedResponse = await axios.get('http://localhost:5000/bestseller'); // Modify endpoint as per your backend
      setRelatedProducts(relatedResponse.data); // Store related products
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };
  fetchProductDetails();
}, [id]);


const increaseQuantity = () => setQuantity(prevQuantity => prevQuantity + 1);
const decreaseQuantity = () => setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));

// Handle add to cart functionality
const handleAddToCart = (event, product) => {
  event.stopPropagation(); // Prevent triggering parent events

  // Find if the product already exists in the cart
  const existingProduct = cartItems.find((item) => item._id === product._id);

  if (existingProduct) {
    // Update the quantity of the existing product
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === product._id ? { ...item, quantity: item.quantity + quantity } : item
      )
    );
  } else {
    // Add the new product to the cart
    setCart((prevCart) => [...prevCart, { ...product, quantity }]);
  }

  setPopupMessage(`${product.name} added to your cart!`);

  // Clear the popup message after 3 seconds
  setTimeout(() => setPopupMessage(""), 3000);
};

// Handle add to wishlist functionality
const handleAddToWishlist = (product) => {
  setWishlistItems((prevWishlist) => {
    const isInWishlist = prevWishlist.some((item) => item._id === product._id);

    if (isInWishlist) {
      // Remove the specific item from the wishlist
      setPopupMessage(`${product.name} removed from your wishlist!`);
      return prevWishlist.filter((item) => item._id !== product._id);
    } else {
      // Add the product to the wishlist
      setPopupMessage(`${product.name} added to your wishlist!`);
      return [...prevWishlist, product];
    }
  });
}

// Render stars for ratings
const renderStars = (rating) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <i key={i} className={`fa ${i < rating ? 'fa-star' : 'fa-star-o'}`}></i>
    );
  }
  return stars;
};

// Handle product not found scenario
if (!product) {
  return <div>Product not found!</div>;
}
  return (
    <div className="details-container">
      {/* Product Details Card */}
      <div className="product-details-card">
        <div className="image-container">
          <img src={product.image_url} alt={product.name} />
        </div>
        <div className="details-info">
          <h1>{product.name}</h1>
          <div className="rating">
            {renderStars(product.ratings || 0)}
            <span> ({product.reviews || 0} customer reviews)</span>
          </div>
          <div className="price">${product.price}</div>
          <ul className="description">
          Description:
          {product.description}
          </ul>
          <ul className="description">
          KeyNotes:
          {product.description}
          </ul>
          {/* Quantity Control */}
          <div className="quantity-control">
          <button
    onClick={decreaseQuantity}
    style={{
      padding: '0.5rem 1rem',
      width: '60px',
      height: '35px',
      border: '1px solid black',
      color: 'black',
      backgroundColor: 'transparent',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
      fontSize: '1.2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    -
  </button>
  <input
    type="number"
    value={quantity}
    readOnly
    style={{
      width: '60px',
      height: '35px',
      textAlign: 'center',
      border: '1px solid black',
      fontSize: '1.2rem',
      margin: '0 0.5rem',
      padding: '0 5px',
      boxSizing: 'border-box',
      marginTop: '5px', // Added margin-top here
    }}
  />
  <button
    onClick={increaseQuantity}
    style={{
      padding: '1rem 0.5rem',
      width: '60px',
      height: '35px',
      border: '1px solid black',
      color: 'black',
      backgroundColor: 'transparent',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
      fontSize: '1.2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    +
  </button>
          </div>
          <div className="actions">
            <button className="wishlist"  onClick={() => handleAddToWishlist(product)}>
              <i className="fa fa-heart"></i> Wishlist
            </button>
            <button className="compare" onClick={(event) => handleAddToCart(event, product)}>
              <i className="fa fa-shopping-cart"></i> Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Related Products Section Below the Details Card */}
      <div className="related-products">
    <h2>Related Products</h2>
    <div className="products-container">
      {relatedProducts.map((product) => (
        <div key={product.id} className="product-card" onClick={() => navigate(`/details/${product._id}`)}>         
         <img src={product.image_url} alt={product.name} className="product-image" />
         <div className="action-icons">
              <i className="fas fa-heart"></i> {/* Wishlist icon */}
              <i className="fas fa-shopping-cart"></i> {/* Cart icon */}
            </div>
          <h3 className="product-title">{product.name}</h3>
          <p className="product-price">{product.price}</p>
          {product.originalPrice && (
            <p className="original-price">{product.originalPrice}</p>
          )}
          <div className="product-rating">
            {renderStars(product.ratings)}
          </div>
        </div>
      ))}
    </div>
  </div>

    </div>
  );
};

export default Details;
