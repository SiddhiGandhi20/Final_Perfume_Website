import React, { useState } from "react";
import "./Wishlist.css";

const DEFAULT_IMAGE = "/placeholder.svg";

const PopupNotification = ({ message }) => (
  message ? <div className="popup-notification">{message}</div> : null
);

const WishList = ({ wishlistItems, setWishlist, cartItems, setCart }) => {
  const [popupMessage, setPopupMessage] = useState("");

  const handleAddToCart = (item) => {
    const existingCartItem = cartItems.find((cartItem) => cartItem._id === item._id);

    const updatedCart = existingCartItem
      ? cartItems.map((cartItem) =>
          cartItem._id === item._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      : [...cartItems, { ...item, quantity: 1 }];

    setCart(updatedCart);
    setPopupMessage(`${item.name} added to your cart!`);

    setTimeout(() => setPopupMessage(""), 3000);

    const updatedWishlist = wishlistItems.filter((wishlistItem) => wishlistItem._id !== item._id);
    setWishlist(updatedWishlist);
  };

  const handleRemoveFromWishlist = (itemId) => {
    const itemToRemove = wishlistItems.find((item) => item._id === itemId);

    const updatedWishlist = wishlistItems.filter((item) => item._id !== itemId);
    setWishlist(updatedWishlist);

    setPopupMessage(`${itemToRemove?.name || "Item"} removed from your wishlist!`);

    setTimeout(() => setPopupMessage(""), 3000);
  };

  return (
    <div className="wishlist-container">
      <PopupNotification message={popupMessage} />

      <div className="wishlist-header">
        <h1>My Wishlist</h1>
      </div>

      {wishlistItems.length > 0 ? (
        <table className="wishlist-table">
          <thead>
            <tr>
              <th>Product name</th>
              <th>Unit price</th>
              <th className="actions-header">Actions</th>
            </tr>
          </thead>
          <tbody>
            {wishlistItems.map((item) => (
              <tr key={item._id}>
                <td>
                  <div className="product-info">
                    <img
                      src={item.image_url || DEFAULT_IMAGE}
                      alt={item.name}
                      className="product-image"
                      onError={(e) => {
                        e.target.src = DEFAULT_IMAGE;
                      }}
                    />
                    <span className="product-name">{item.name}</span>
                  </div>
                </td>
                <td className="price-cell">
                  {item.price ? `₹${parseFloat(item.price).toFixed(2)}` : "N/A"}
                </td>
                <td className="actions-cell">
                  <div className="actions-container">
                    <button
                      className="add-to-cart-btn"
                      onClick={() => handleAddToCart(item)}
                    >
                      Add to cart
                    </button>
                    <button
                      className="remove-btn"
                      onClick={() => handleRemoveFromWishlist(item._id)}
                    >
                      Remove
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="empty-wishlist">
          <img src="/empty-wishlist.svg" alt="Empty Wishlist" className="empty-image" />
          <p>Your wishlist is empty. Start adding your favorite products!</p>
        </div>
      )}
    </div>
  );
};

export default WishList;
