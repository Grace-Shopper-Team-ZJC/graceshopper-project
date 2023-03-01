import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  product: {},
  status: "idle",
  error: null,
};

export const fetchSingleProduct = createAsyncThunk(
  "singleProduct/fetchSingleProduct",
  async (id) => {
    try {
      const { data } = await axios.get(`/api/products/${id}`);
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const updateSingleProduct = createAsyncThunk(
  "singleProduct/updateSingleProduct",
  async (product) => {
    try {
      const { data } = await axios.put(`/api/products/${product.id}`, product);
      return data;
    } catch (error) {
      throw error;
    }
  }
);

const productSlice = createSlice({
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSingleProduct.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchSingleProduct.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.product = { ...state.product, ...action.payload };
    });
    builder.addCase(fetchSingleProduct.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });

    builder.addCase(updateSingleProduct.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(updateSingleProduct.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.product = { ...state.product, ...action.payload };
    });
    builder.addCase(updateSingleProduct.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export default productSlice.reducer;
