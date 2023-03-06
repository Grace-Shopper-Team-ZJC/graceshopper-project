import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialState = [];


//trying something new. index.js is set to /api/admin/ for product management

export const fetchProductsAsync = createAsyncThunk("admin-products", async()=>{
    try{
        const {data} = await axios.get(`/api/admin/`);
        return data;
    }
    catch(err){
        console.log(`oh no. ${err}`);
    }
});

export const addProductsAsync = createAsyncThunk("admin-products/add", async({pName, pDesc, pPrice, pImage, pQuantity})=>{
    try{
        const {data} = await axios.post(`/api/admin/`,{
            name: pName,
            description: pDesc,
            price: pPrice,
            image: pImage,
            quantity: pQuantity, 
        });
        return data;
    }
    catch(err){
        console.log(`oh no. ${err}`);
    }
});

export const deleteProductsAsync = createAsyncThunk("admin-products/delete", async(id)=>{
    const {data} = await axios.delete(`api/admin/${id}`);
    return data;
});

const productManageSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(fetchProductsAsync.fulfilled,(state, action)=>{
            return action.payload;
        });
        builder.addCase(addProductsAsync.fulfilled,(state, action)=>{
            state.push(action.payload);
        });
        builder.addCase(deleteProductsAsync.fulfilled, (state, action)=>{
            return {};
        });
    },
});

export const selectProducts = (state)=>{
    return state.products;
}

export default productManageSlice.reducer;