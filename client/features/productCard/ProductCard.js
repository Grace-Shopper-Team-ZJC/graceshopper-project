import React, { useState } from "react";
import { useDispatch, Link } from "react-redux";

const ProductCard = ({ product, addToCart, deleteFromCart }) => {
  const handleAddToCart = () => {
    dispatch(addToCart(product.id));
  };

  const handleDeleteFromCart = () => {
    dispatch(deleteFromCart(product.id));
  };

  return (
    <div className="main-card-wrapper">
      <div className="card">
        <img
          className="product-image"
          src={product.imageURL}
          alt={product.name}
        />
        <div>
          <Link to={`/products/${product.id}`} className="card-details">
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">{product.price}</p>
          </Link>
        </div>
      </div>

      <div>
        <button className="add-button" onClick={handleAddToCart}>
          Add to Cart
        </button>
        <button className="delete-button" onClick={handleDeleteFromCart}>
          x
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
