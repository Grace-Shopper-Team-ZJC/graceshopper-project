import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authReducer from "../features/auth/authSlice";
import userManageSlice from "../features/userManagement/userManageSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userManageSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
export default store;
export * from "../features/auth/authSlice";
export * from "../features/userManagement/userManageSlice";
