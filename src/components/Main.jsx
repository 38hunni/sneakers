import React, { useState } from "react";

import avatar from "../assets/images/image-avatar.png";
import img1 from "../assets/images/image-product-1.jpg";
import img2 from "../assets/images/image-product-2.jpg";
import img3 from "../assets/images/image-product-3.jpg";
import img4 from "../assets/images/image-product-4.jpg";

import thumb1 from "../assets/images/image-product-1-thumbnail.jpg";
import thumb2 from "../assets/images/image-product-2-thumbnail.jpg";
import thumb3 from "../assets/images/image-product-3-thumbnail.jpg";
import thumb4 from "../assets/images/image-product-4-thumbnail.jpg";

const Main = () => {
  const [quantity, setQuantity] = useState(0);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartQty, setCartQty] = useState(0);
  const [selectedImg, setSelectedImg] = useState(img1);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const pricePerUnit = 125;
  const images = [img1, img2, img3, img4];
  const thumbs = [thumb1, thumb2, thumb3, thumb4];
  const currentIndex = images.indexOf(selectedImg);

  // Quantity
  const handleQuantityChange = (delta) => {
    setQuantity((prev) => Math.max(0, prev + delta));
  };

  // Add to cart
  const handleAddToCart = () => {
    if (quantity > 0) {
      setCartQty((prev) => prev + quantity);
      setQuantity(0);
      setCartOpen(true);
    }
  };

  // Lightbox navigation
  const handlePrev = () => {
    setSelectedImg(images[(currentIndex - 1 + images.length) % images.length]);
  };
  const handleNext = () => {
    setSelectedImg(images[(currentIndex + 1) % images.length]);
  };

  return (
    <div className="body">
      {/* Navbar */}
      <div className="navbar">
        <div className="nav-left">
          <div className="hamburger" onClick={() => setMenuOpen(true)}>
            ☰
          </div>
          <h1 className="logo">Sneakers</h1>
          <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
            <li><a href="#">collections</a></li>
            <li><a href="#">men</a></li>
            <li><a href="#">women</a></li>
            <li><a href="#">about</a></li>
            <li><a href="#">contact</a></li>
            {/* Close button inside drawer */}
            <li className="close-menu" onClick={() => setMenuOpen(false)}>✕ Close</li>
          </ul>
        </div>
        <div className="nav-right">
          <div className="cart-icon" onClick={() => setCartOpen(!cartOpen)}>
            🛒 {cartQty > 0 && <span className="cart-badge">{cartQty}</span>}
          </div>
          <img src={avatar} alt="avatar" className="avatar" />
        </div>
      </div>

      {/* Backdrop for mobile menu */}
      {menuOpen && (
        <div className="nav-backdrop show" onClick={() => setMenuOpen(false)}></div>
      )}

      {/* Main Section */}
      <div className="main">
        {/* Display Section */}
        <div className="display">
          <div className="display-show" onClick={() => setLightboxOpen(true)}>
            <img src={selectedImg} alt="product" />
          </div>
          <div className="display-item">
            {thumbs.map((thumb, idx) => (
              <img
                key={idx}
                src={thumb}
                alt={`thumb-${idx}`}
                className={selectedImg === images[idx] ? "active" : ""}
                onClick={() => setSelectedImg(images[idx])}
              />
            ))}
          </div>
        </div>

        {/* Content Section */}
        <div className="content">
          <h3>sneaker company</h3>
          <h1>fall limited edition sneakers</h1>
          <p>
            These low-profile sneakers are your perfect casual wear companion.
            Featuring a durable rubber outer sole, they'll withstand everything
            the weather can offer.
          </p>

          <div className="price">
            <strong>${pricePerUnit.toFixed(2)}</strong>
            <span className="discount">50%</span>
            <span className="original">$250.00</span>
          </div>

          <div className="buttons">
            <div className="quantity">
              <button onClick={() => handleQuantityChange(-1)}>-</button>
              <span>{quantity}</span>
              <button onClick={() => handleQuantityChange(1)}>+</button>
            </div>
            <button className="add-to-cart" onClick={handleAddToCart}>
              🛒 Add to cart
            </button>
          </div>

          {cartOpen && (
            <div className="cart-dropdown">
              <div className="cart-header">
                <h4>Cart</h4>
                <button className="cart-close" onClick={() => setCartOpen(false)}>✕</button>
              </div>
              <hr />
              {cartQty > 0 ? (
                <>
                  <div className="cart-item">
                    <img src={thumb1} alt="thumb" />
                    <div>
                      <p>Fall Limited Edition Sneakers</p>
                      <p>
                        ${pricePerUnit.toFixed(2)} × {cartQty}{" "}
                        <strong>${(pricePerUnit * cartQty).toFixed(2)}</strong>
                      </p>
                    </div>
                  </div>
                  <button className="checkout">Checkout</button>
                </>
              ) : (
                <p className="empty">Your cart is empty.</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="lightbox">
          <span className="close-btn" onClick={() => setLightboxOpen(false)}>×</span>
          <span className="arrow left" onClick={handlePrev}>‹</span>
          <img src={selectedImg} alt="zoomed product" />
          <span className="arrow right" onClick={handleNext}>›</span>
        </div>
      )}
    </div>
  );
  
};


export default Main;
