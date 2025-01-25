import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import 'font-awesome/css/font-awesome.min.css';

import './Details.css';

const Details = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();
  

  const increaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };
  const handleImageClick = (id) => {
    navigate(`/details/${id}`); // Navigate to the Details page with product ID
  };

  const productDetails = {
    1: {
      name: 'Police Police To Be Rebel Eau De Toilette',
      price: '49.00',
      image: '/women2.jpg',
      rating: 5,
      description: [
        'Refreshing and bold scent.',
        'Perfect for daily use.',
        'Elegant and long-lasting fragrance.',
      ],
    },
    2: {
      name: 'Majesty Oud Perfume Spray for Men',
      price: '59.00',
      image: '/women1.jpg',
      rating: 4,
      description: [
        'Luxury Oud fragrance.',
        'Perfect for special occasions.',
        'Intense and captivating aroma.',
      ],
    },
    3: {
        name: 'Police To Be Tattoo Art Women Edp 100 ml',
        price: '59.00',
        image: '/exe3.jpg',
        rating: 4,
        description: [
          'Luxury Oud fragrance.',
          'Perfect for special occasions.',
          'Intense and captivating aroma.',
        ],
      },
      6: {
        name: 'Giorgio Armani Si Eau de Parfum Spray for Men',
        price: '59.00',
        image: '/exe5.jpg',
        rating: 4,
        description: [
          'Luxury Oud fragrance.',
          'Perfect for special occasions.',
          'Intense and captivating aroma.',
        ],
      },
      4: {
        name: 'Police Police To Be Rebel Eau De Toilette',
        price: '49.00',
        image: '/women2.jpg',
        rating: 5,
        description: [
          'Refreshing and bold scent.',
          'Perfect for daily use.',
          'Elegant and long-lasting fragrance.',
        ],
      },
  };
  const relatedProducts = [
    {
      id: 1,
      name: 'Police Police To Be Rebel Eau De Toilette',
      image: '/women2.jpg',
      price: '$20.00',
      originalPrice: null,
      rating: 5,
    },
    {
      id: 2,
      name: 'Majesty Oud Perfume Spray for Men',
      image: '/women1.jpg',
      price: '$85.00',
      originalPrice: '$115.00',
      rating: 5,
    },
    {
      id: 3,
      name: 'Police To Be Tattoo Art Women Edp 100 ml',
      image: '/exe3.jpg',
      price: '$29.00',
      originalPrice: null,
      rating: 4,
    },
    {
      id: 6,
      name: 'Giorgio Armani Si Eau de Parfum Spray for Women',
      image: '/exe5.jpg',
      price: '$85.50',
      originalPrice: null,
      rating: 5,
    },
  ];

  const product = productDetails[id];

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <i key={i} className={`fa ${i < rating ? 'fa-star' : 'fa-star-o'}`}></i>
      );
    }
    return stars;
  };

  if (!product) {
    return <div>Product not found!</div>;
  }

  return (
    <div className="details-container">
      {/* Product Details Card */}
      <div className="product-details-card">
        <div className="image-container">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="details-info">
          <h1>{product.name}</h1>
          <div className="rating">
            {renderStars(product.rating || 0)}
            <span> ({product.reviews || 0} customer reviews)</span>
          </div>
          <div className="price">${product.price}</div>
          <ul className="description">
            {product.description?.map((item, index) => (
              <li key={index}>{item}</li>
            )) || <li>No description available.</li>}
          </ul>
          {/* Quantity Control */}
          <div className="quantity-control">
            <button onClick={decreaseQuantity}>-</button>
            <input type="number" value={quantity} readOnly />
            <button onClick={increaseQuantity}>+</button>
          </div>
          <div className="actions">
            <button className="wishlist">
              <i className="fa fa-heart"></i> Wishlist
            </button>
            <button className="compare">
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
        <div key={product.id} className="product-card" onClick={() => handleImageClick(product.id)}>         
         <img src={product.image} alt={product.name} className="product-image" />
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
            {renderStars(product.rating)}
          </div>
        </div>
      ))}
    </div>
  </div>

    </div>
  );
};

export default Details;
