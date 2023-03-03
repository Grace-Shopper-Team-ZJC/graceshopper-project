import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: {},
  status: "idle",
  error: null,
};

export const fetchSingleUser = createAsyncThunk(
  "singleUser/fetchSingleUser",
  async (id) => {
    try {
      const { data } = await axios.get(`/api/users/${id}`);
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const updateUser = createAsyncThunk(
  "singleUser/updateUser",
  async (user) => {
    try {
      const { data } = await axios.put(`/api/users/${user.id}`, user);
      return data;
    } catch (error) {
      throw error;
    }
  }
);

const userSlice = createSlice({
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSingleUser.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchSingleUser.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.user = { ...state.user, ...action.payload };
    });
    builder.addCase(fetchSingleUser.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });

    builder.addCase(updateUser.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.user = { ...state.user, ...action.payload };
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export default userSlice.reducer;
