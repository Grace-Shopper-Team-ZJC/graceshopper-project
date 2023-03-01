import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: [],
  status: "idle",
  error: null,
};

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (product) => {
    try {
      const { data } = await axios.post("/api/products", product);
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    try {
      const { data } = await axios.get("/api/products");
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (product) => {
    try {
      const { data } = await axios.put(`/api/products/${product.id}`, product);
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id) => {
    try {
      const { data } = await axios.delete(`/api/products/${id}`);
      return data;
    } catch (error) {
      throw error;
    }
  }
);

const productListSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createProduct.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.products = [...state.products, ...action.payload];
    });
    builder.addCase(createProduct.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });

    builder.addCase(fetchProducts.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.products = [...state.products, ...action.payload];
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });

    builder.addCase(updateProduct.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.products = [...state.products, ...action.payload];
    });
    builder.addCase(updateProduct.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });

    builder.addCase(deleteProduct.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.products = state.products.filter(
        (product) => product.id !== action.payload.id
      );
    });
    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export default productListSlice.reducer;
