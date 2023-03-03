import React from "react";

const CartItem = ({ item, onRemove, onIncrease, onDecrease }) => {
  const { id, name, price, imageUrl, quantity } = item;


  const handleIncrease = () => {
    onIncrease(id);
  };

  const handleDecrease = () => {
    onDecrease(id);
  };

  const handleRemove = () => {
    onRemove(id);
  };

  return (
    <div>
      <img src={imageUrl} alt={name} />
      <div>
        <h3>{name}</h3>
        <p>${price}</p>
        <p>Quantity: {quantity}</p>
        <button onClick={handleIncrease}>+</button>
        <button onClick={handleDecrease}>-</button>
        <button onClick={handleRemove}>Remove</button>
      </div>
    </div>
  );
};

export default CartItem;
