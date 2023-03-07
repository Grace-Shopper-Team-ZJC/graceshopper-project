import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeItem } from "../cart/CartSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const handleRemoveFromCart = () => {
    dispatch(removeItem(product.id));
  };

  return (
    <div className="main-card-wrapper">
      <div className="card">
        <img className="product-image" src={product.image} alt={product.name} />
        <div>
          <Link to={`/products/${product.id}`} className="card-details">
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">${product.price}</p>
          </Link>
        </div>
      </div>
      <div>
        <button className="add-button" onClick={handleAddToCart}>
          Add to Cart
        </button>
        <button className="remove-button" onClick={handleRemoveFromCart}>
          Remove from Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
