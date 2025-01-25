import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import 'font-awesome/css/font-awesome.min.css';
import './MenProductDetails.css';

const MenProductDetails = ({ cartItems, setCart, wishlistItems, setWishlistItems }) => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [popupMessage, setPopupMessage] = useState("");
  const [product, setProduct] = useState(null);  // For storing the product data
  const [relatedmenProducts, setRelatedMenProducts] = useState([]); // For storing related products
  const navigate = useNavigate();

  // Fetch product details by id from the backend API
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const productResponse = await axios.get(`http://localhost:5000/perfumes/${id}`);
        setProduct(productResponse.data);  // Store product data
        
        // Fetch related products if available
        const relatedResponse = await axios.get('http://localhost:5000/perfumes'); // Modify endpoint as per your backend
        setRelatedMenProducts(relatedResponse.data); // Store related products
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [id]);

  // Handle increase and decrease in quantity
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
    <div className="men-details-container">
      {popupMessage && <div className="popup-notification">{popupMessage}</div>}

      {/* Product Details Card */}
      <div className="men-product-details-card">
        <div className="men-image-container">
          <img src={product.image_url} alt={product.name} />
        </div>
        <div className="men-details-info">
          <h1>{product.name}</h1>
          <div className="men-rating">
            {renderStars(product.ratings || 0)}
            <span> ({product.reviews || 0} customer reviews)</span>
          </div>
          <div className="men-price">₹{product.price}</div>
          <ul className="men-description">Description:
            {product.description}
          </ul>
          <ul className="men-description">
            KeyNotes:
            {product.keynotes}
          </ul>

          {/* Quantity Control */}
          <div className="men-quantity-control">
            <button onClick={decreaseQuantity}>-</button>
            <input type="number" value={quantity} readOnly />
            <button onClick={increaseQuantity}>+</button>
          </div>

          <div className="men-actions">
            <button className="men-wishlist" onClick={() => handleAddToWishlist(product)}>
              <i className="fa fa-heart"></i> Wishlist
            </button>
            <button className="men-compare" onClick={(event) => handleAddToCart(event, product)}>
              <i className="fa fa-shopping-cart"></i> Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Related Products Section Below the Details Card */}
      <div className="men-related-products">
        <h2>Related Products</h2>
        <div className="men-products-container">
          {relatedmenProducts.map((relatedProduct) => (
            <div key={relatedProduct.id} className="men-product-card" onClick={() => navigate(`/men-product-details/${relatedProduct.id}`)}>
              <img src={relatedProduct.image_url} alt={relatedProduct.name} className="men-product-image" />
              <div className="men-action-icons">
                <i className="fas fa-heart" onClick={() => handleAddToWishlist(relatedProduct)}></i>
                <i className="fas fa-shopping-cart" onClick={(event) => handleAddToCart(event, relatedProduct)}></i>
              </div>
              <h3 className="men-product-title">{relatedProduct.name}</h3>
              <p className="men-product-price">{relatedProduct.price}</p>
              {relatedProduct.originalPrice && (
                <p className="men-original-price">{relatedProduct.originalPrice}</p>
              )}
              <div className="men-product-rating">
                {renderStars(relatedProduct.ratings)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenProductDetails;
