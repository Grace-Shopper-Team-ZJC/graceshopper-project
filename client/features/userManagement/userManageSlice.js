import axios from "axios"
import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";


const initialState = [];

export const fetchUsersAsync = createAsyncThunk("users", async ()=>{
    try{
        const {data} = await axios.get(`api/users`);
        return data;
    }
    catch(err){
        console.log(`oh no. ${err}`);
    }
});

const userManageSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(fetchUsersAsync.fulfilled, (state, action)=>{
            return action.payload;
        });
    },
});

export const selectUsers = (state)=>{
    return state.users;
}

export default userManageSlice.reducer;