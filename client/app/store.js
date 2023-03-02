import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authReducer from "../features/auth/authSlice";
import userReducer from "../features/user/userSlice";
import userManageSlice from "../features/UserManage/userManageSlice";

const store = configureStore({
  reducer: { 
    auth: authReducer, 
    user: userReducer,
    users: userManageSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from "../features/auth/authSlice";
export * from "../features/user/userSlice";
export * from "../features/userManage/userManageSlice";
