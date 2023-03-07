import React from "react";

// CartItem component is responsible for displaying information about an individual item in the cart
// allows user to modify the item's quantity or remove it

const CartItem = ({ item, onRemove, onIncrease, onDecrease }) => {
  const { id, name, price, image, quantity } = item;

  // function to handle increasing the quantity of an item
  const handleIncrease = () => {
    onIncrease(id);
  };

  // function to handle decreasing the quantity of an item
  const handleDecrease = () => {
    onDecrease(id);
  };

  // function to handle removing an item from the cart
  const handleRemove = () => {
    onRemove(id);
  };

  return (
    <div className="main-cart-wrapper">
      <div className="cart-item">
        <img className="product-image" src={image} alt={name} />
        <div>
          <h3 className="product-name">{name}</h3>
          <p className="product-price">${price}</p>
          <p className="product-quantity">Quantity: {quantity}</p>
          <button className="add-button" onClick={handleIncrease}>
            +
          </button>
          <button className="remove-button-minus" onClick={handleDecrease}>
            -
          </button>
          <button className="remove-button" onClick={handleRemove}>
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
