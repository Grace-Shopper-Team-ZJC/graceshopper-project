import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/*
  THUNKS
*/

// create account
export const createAccount = createAsyncThunk(
  "user/createAccount",
  async ({ username, password }) => {
    const response = await axios.post("/users", { username, password });
    return response.data;
  }
);

/*
  SLICE
*/
export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createAccount.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(createAccount.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

/*
  ACTIONS
*/

/*
  REDUCER
*/
export default userSlice.reducer;
