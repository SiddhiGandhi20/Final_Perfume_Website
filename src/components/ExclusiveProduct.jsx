import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ExclusiveProduct.css";

const ExclusiveProducts = ({ cartItems, setCart, wishlistItems, setWishlistItems }) => {
  const [minPrice, setMinPrice] = useState(500);
  const [maxPrice, setMaxPrice] = useState(3500);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [popupMessage, setPopupMessage] = useState("");
  const [showCartDropdown, setShowCartDropdown] = useState(false); // State for showing/hiding the cart dropdown
  const [showWishlistDropdown, setShowWishlistDropdown] = useState(false); // State for showing/hiding the wishlist dropdown
  const navigate = useNavigate();

  // Define state for storing fetched products
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch the products from the backend
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/exclusive_perfumes', {
          method: 'GET', // We are using GET as per your curl command
        });
        
        if (response.ok) {
          const data = await response.json();
          setProducts(data); // Set fetched data as products
          setFilteredProducts(data); // Set initial filtered products
        } else {
          console.error('Failed to fetch products');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array so this runs once when the component is mounted

  const handleAddToCart = (event, product) => {
    event.stopPropagation();

    const existingProduct = cartItems.find((item) => item._id === product._id);

    const updatedCart = existingProduct
      ? cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      : [...cartItems, { ...product, quantity: 1 }];

    setCart(updatedCart);
    setPopupMessage(`${product.name} added to your cart!`);
    setTimeout(() => setPopupMessage(""), 3000);
  };

  const handleAddToWishlist = (event, product) => {
    event.stopPropagation();

    const existingProduct = wishlistItems.find((item) => item._id === product._id);

    if (!existingProduct) {
      setWishlistItems([...wishlistItems, product]);
      setPopupMessage(`${product.name} added to your wishlist!`);
    } else {
      setPopupMessage(`${product.name} is already in your wishlist!`);
    }
    setTimeout(() => setPopupMessage(""), 3000);
  };

  const renderStars = (rating) => {
    const totalStars = 5;
    return [...Array(totalStars)].map((_, index) => (
      <i key={index} className={`fa-star ${index < rating ? "fas" : "far"}`}></i>
    ));
  };

  const handlePriceChange = (event) => {
    setMaxPrice(event.target.value);
  };

  const handleFilterClick = () => {
    const filtered = products.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice
    );
    setFilteredProducts(filtered);
  };

  useEffect(() => {
    // Automatically re-filter products whenever the price range changes
    const filtered = products.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice
    );
    setFilteredProducts(filtered);
  }, [minPrice, maxPrice, products]); // Re-filter when minPrice, maxPrice or products change

  const handleImageClick = (id) => {
    navigate(`/exclusive-product-details/${id}`);
  };

  // Handle the toggle visibility of the cart dropdown
  const toggleCartDropdown = () => {
    setShowCartDropdown((prev) => !prev);
  };

  // Handle the toggle visibility of the wishlist dropdown
  const toggleWishlistDropdown = () => {
    setShowWishlistDropdown((prev) => !prev);
  };

  return (
    <div className="exclusive-product-container">
      {popupMessage && <div className="popup-notification">{popupMessage}</div>}

      {/* Sidebar Section */}
      <div className="exclusive-sidebar">
        <div className="exclusive-categories">
          <h3>CATEGORIES</h3>
          <ul>
            <li>Men's Perfumes</li>
            <li>Exclusive Perfumes</li>
            <li>Women's Perfumes</li>
          </ul>
        </div>
        <div className="exclusive-price-filter">
          <h3>PRICE</h3>
          <div className="exclusive-range-slider">
            <input
              type="range"
              min="500"
              max="10000"
              value={maxPrice}
              onChange={handlePriceChange}
            />
            <div className="exclusive-price-range">
              <span>
                Price: ₹{minPrice} - ₹{maxPrice}
              </span>
              <button
                className="exclusive-filter-button"
                onClick={handleFilterClick}
              >
                Filter
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="exclusive-products">
        {filteredProducts.map((product) => (
          <div className="exclusive-card" key={product._id}>
            <img
              src={product.image_url}
              alt={product.name}
              onClick={() => handleImageClick(product._id)}
            />
            <div className="exclusive-action-icons">
              <i
                className="fas fa-heart"
                onClick={(event) => handleAddToWishlist(event, product)}
              ></i>
              <i
                className="fas fa-cart-plus"
                onClick={(event) => handleAddToCart(event, product)}
              ></i>
            </div>
            <div className="exclusive-rating">{renderStars(product.ratings)}</div>
            <h4>{product.name}</h4>
            <p>₹{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExclusiveProducts;
