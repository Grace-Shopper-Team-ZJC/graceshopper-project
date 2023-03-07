import React from "react";
import { useSelector, useDispatch } from "react-redux";

// Import actions and selectors from cartSlice
import {
  selectCartItems,
  clearCart,
  removeItem,
  incrementQuantity,
  decrementQuantity,
} from "./cartSlice";

// Import the CartItem component
import CartItem from "./CartItem";

// Cart component is responsible for displaying the entire cart
const Cart = () => {
  // Use the useSelector hook to get the cart items from the store
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  // function to handle clearing the cart
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  // function for removing an item from the cart
  const handleRemoveFromCart = (itemId) => {
    dispatch(removeItem(itemId));
  };

  // function for increasing an item's quantity
  const handleIncrementQuantity = (itemId) => {
    dispatch(incrementQuantity(itemId));
  };

  // function for decreasing an item's quantity
  const handleDecrementQuantity = (itemId) => {
    dispatch(decrementQuantity(itemId));
  };

  // render the cart items using the CartItem component
  return (
    <div>
      <h2>Shopping Cart</h2>
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          onRemove={handleRemoveFromCart}
          onIncrease={handleIncrementQuantity}
          onDecrease={handleDecrementQuantity}
        />
      ))}
      <h3>
        Total:{" "}
        {cartItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        )}
      </h3>
      <button onClick={handleClearCart}>Clear Cart</button>
    </div>
  );
};

export default Cart;
