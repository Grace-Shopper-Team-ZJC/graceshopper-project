import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      // check if item exists in state
      const itemInCart = state.items.find(
        (item) => item.id === action.payload.id
      );
      // if item exists, add 1 to quantity
      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        // if not, add it to state
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    incrementQuantity: (state, action) => {
      // find item in state by id
      const item = state.items.find((item) => item.id === action.payload);
      // add 1
      item.quantity++;
    },
    decrementQuantity: (state, action) => {
      // find item in state by id
      const item = state.items.find((item) => item.id === action.payload);
      // can't decrement if quantity is one, must use remove item
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        // if quantity is greater than one, remove 1
        item.quantity--;
      }
    },
    removeItem: (state, action) => {
      // filter item out of state by id
      const removeItem = state.items.filter(
        (item) => item.id !== action.payload
      );
      // new state
      state.items = removeItem;
    },
    clearCart: (state) => {
      // remove all items from state
      state.items = [];
    },
  },
});

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeItem,
  clearCart,
} = cartSlice.actions;

// select all items from cart state
export const selectCartItems = (state) => state.cart.items;

export default cartSlice.reducer;
