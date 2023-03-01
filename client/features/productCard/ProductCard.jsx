import React from "react";
import { useDispatch } from "react-redux";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleDeleteProduct = () => {
    dispatch(deleteProduct(product.id));
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
          <h3 onClick={() => (window.location = `/products/${product.id}`)}>
            {product.name}
          </h3>
          <p>{product.description}</p>
        </div>
      </div>

      <div>
        <button className="delete-button" onClick={handleDeleteproduct}>
          x
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
