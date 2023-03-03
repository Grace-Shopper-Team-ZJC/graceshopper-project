import React, { useState } from "react";
import CartItem from "./CartItem";

const Cart = () => {
  const [cartItems, setCartItems] = useState();

  // increase item in cart by one
  const handleIncrease = (id) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCartItems);
  };

  // decrease item in cart by one
  const handleDecrease = (id) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity - 1 } : item
    );
    setCartItems(updatedCartItems);
  };

  // remove item from cart
  const handleRemove = (id) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCartItems);
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cartItems.map((item) => (
        // pass props
        <CartItem
          key={item.id}
          item={item}
          onIncrease={handleIncrease}
          onDecrease={handleDecrease}
          onRemove={handleRemove}
        />
      ))}
      <h3>
        Total:{" "}
        {cartItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        )}
      </h3>
    </div>
  );
};

export default Cart;
