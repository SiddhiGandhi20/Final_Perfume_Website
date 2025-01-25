import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import './ExclusiveProductDetails.css';

const ExclusiveProductDetails = ({ cartItems, setCart, wishlistItems, setWishlistItems }) => {
  const { id } = useParams(); // Get the product id from URL
  const [quantity, setQuantity] = useState(1);
  const [popupMessage, setPopupMessage] = useState("");
  const [product, setProduct] = useState(null); // State to hold product details
  const [relatedProducts, setRelatedProducts] = useState([]); // State for related products
  const [loading, setLoading] = useState(true); // State to show loading indicator
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the product details from API
    fetch(`http://localhost:5000/exclusive_perfumes/${id}`)
      .then(response => response.json())
      .then(data => {
        setProduct(data); // Set the product data from API response
        setLoading(false); // Set loading to false when the product is fetched
      })
      .catch(error => {
        console.error('Error fetching product details:', error);
        setLoading(false);
      });

    // Fetch related products
    fetch('http://localhost:5000/exclusive_perfumes')
      .then(response => response.json())
      .then(data => setRelatedProducts(data))
      .catch(error => console.error('Error fetching related products:', error));
  }, [id]);

  const increaseQuantity = () => setQuantity(prevQuantity => prevQuantity + 1);
  const decreaseQuantity = () => setQuantity(prevQuantity => Math.max(prevQuantity - 1, 1));

  const handleImageClick = (id) => navigate(`/exclusive-product-details/${id}`);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <i key={i} className={`fa ${i < rating ? 'fa-star' : 'fa-star-o'}`}></i>
      );
    }
    return stars;
  };

  // Add to Cart functionality
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
  
    // Clear the popup message after 3 seconds
    setTimeout(() => setPopupMessage(""), 3000);
  };
  

  const isProductInWishlist = wishlistItems.some((item) => item._id === product?._id);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found!</div>;
  }

  return (
    <div className="exclusive-details-container">
      {popupMessage && <div className="popup-notification">{popupMessage}</div>}
      <div className="exclusive-product-details-card">
        <div className="exclusive-image-container">
          <img src={product.image_url} alt={product.name} />
        </div>
        <div className="exclusive-details-info">
          <h1>{product.name}</h1>
          <div className="exclusive-rating">
            {renderStars(product.ratings)}
            <span> ({product.reviews || 0} customer reviews)</span>
          </div>
          <div className="exclusive-price">₹{product.price}</div>
          <ul className="exclusive-description">Description: {product.description}</ul>
          <ul className="exclusive-description">KeyNotes: {product.keynotes}</ul>
          {product.reviews && (
            <div className="exclusive-reviews">
              <h3>Customer Reviews</h3>
              <p>{product.reviews}</p>
            </div>
          )}
          <div className="exclusive-quantity-control">
            <button onClick={decreaseQuantity}>-</button>
            <input type="number" value={quantity} readOnly />
            <button onClick={increaseQuantity}>+</button>
          </div>
          <div className="exclusive-actions">
            <button
              className={`exclusive-wishlist ${isProductInWishlist ? 'in-wishlist' : ''}`}
              onClick={() => handleAddToWishlist(product)}
            >
              <i className={`fa ${isProductInWishlist ? 'fa-heart' : 'fa-heart-o'}`}></i> 
              {isProductInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
            </button>
            <button className="exclusive-compare" onClick={(event) => handleAddToCart(event, product)}>
              <i className="fa fa-shopping-cart" ></i> Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="exclusive-related-products">
        <h2>Related Products</h2>
        <div className="exclusive-products-container">
          {relatedProducts.map((relatedProduct) => (
            <div key={relatedProduct.id} className="exclusive-product-card" onClick={() => handleImageClick(relatedProduct.id)}>
              <img src={relatedProduct.image_url} alt={relatedProduct.name} className="exclusive-product-image" />
              <div className="exclusive-action-icons">
                <i className="fas fa-heart" onClick={() => handleAddToWishlist(relatedProduct)}></i>
                <i className="fas fa-shopping-cart" onClick={(event) => handleAddToCart(event, relatedProduct)}></i>
              </div>
              <h3 className="exclusive-product-title">{relatedProduct.name}</h3>
              <p className="exclusive-product-price">₹{relatedProduct.price}</p>
              {relatedProduct.originalPrice && (
                <p className="exclusive-original-price">₹{relatedProduct.originalPrice}</p>
              )}
              <div className="exclusive-product-rating">
                {renderStars(relatedProduct.ratings)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExclusiveProductDetails;
