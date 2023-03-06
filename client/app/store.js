import { configureStore, createReducer } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authReducer from "../features/auth/authSlice";

// import userManageSlice from "../features/userManagement/userManageSlice";
import productManageSlice from "../features/productManagement/productManageSlice";
import userManageSlice from "../features/userManagement/userManageSlice";
import cartReducer from "../features/cart/CartSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userManageSlice,
    products: productManageSlice,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
export default store;
export * from "../features/auth/authSlice";
export * from "../features/productManagement/productManageSlice";
export * from "../features/userManagement/userManageSlice";
export * from "../features/cart/CartSlice";
