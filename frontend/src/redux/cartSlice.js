import { createSlice } from "@reduxjs/toolkit";

const loadCartFromLocalStorage = () => {
  const cartData = localStorage.getItem("cart");
  return cartData ? JSON.parse(cartData) : [];
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: loadCartFromLocalStorage(),  
  },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.cartItems.find(item => item._id === product._id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({ ...product, quantity: 1 });
      }
      localStorage.setItem("cart", JSON.stringify(state.cartItems)); 
    },
    decreaseQuantity: (state, action) => {
      const item = state.cartItems.find(item => item._id === action.payload);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.cartItems = state.cartItems.filter(item => item._id !== action.payload);
        }
      }
      localStorage.setItem("cart", JSON.stringify(state.cartItems)); 
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(item => item._id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.cartItems)); 
    },
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem("cart"); 
    },
    loadCart: (state) => {
      state.cartItems = loadCartFromLocalStorage();
    },
  },
});

export const { addToCart, decreaseQuantity, removeFromCart, clearCart, loadCart } = cartSlice.actions;
export default cartSlice.reducer;
