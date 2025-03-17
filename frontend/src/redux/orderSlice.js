import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const placeOrder = createAsyncThunk("order/place", async (orderData) => {
    const { data } = await axios.post("http://localhost:5000/api/orders", orderData);
    return data;
});

const orderSlice = createSlice({
    name: "order",
    initialState: { orders: [], loading: false },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(placeOrder.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(placeOrder.fulfilled, (state, action) => {
            state.orders.push(action.payload);
            state.loading = false;
        });
    }
});

export default orderSlice.reducer;
