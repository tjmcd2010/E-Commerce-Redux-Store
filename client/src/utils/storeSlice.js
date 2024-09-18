import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    products: [],
    cart: [],
    cartOpen: false,
    categories: [],
    currentCategory: '',
};

export const storeSlice = createSlice({
    name: 'store',
    initialState,
    reducers: {
        updateProducts: (state, action) => {
            state.products = action.payload;
        },
        addToCart: (state, action) => {
            state.cartOpen = true;
            const index = state.cart.findIndex(product => product._id === action.payload._id);
            if (index >= 0) {
                state.cart[index].purchaseQuantity += 1;
            } else {
                state.cart.push({ ...action.payload, purchaseQuantity: 1 });
            }
        },
        addMultipleToCart: (state, action) => {
            // Assuming action.payload is an array of products to add
            action.payload.forEach(product => {
                const index = state.cart.findIndex(p => p._id === product._id);
                if (index >= 0) {
                    state.cart[index].purchaseQuantity += product.purchaseQuantity || 1;
                } else {
                    state.cart.push({ ...product, purchaseQuantity: product.purchaseQuantity || 1 });
                }
            });
        },
        removeFromCart: (state, action) => {
            state.cart = state.cart.filter(product => product._id !== action.payload._id);
        },
        updateCartQuantity: (state, action) => {
            const index = state.cart.findIndex(product => product._id === action.payload._id);
            if (index >= 0) {
                state.cart[index].purchaseQuantity = action.payload.purchaseQuantity;
            }
        },

        updateCategories: (state, action) => {
            state.categories = action.payload;
        },
        updateCurrentCategory: (state, action) => {
            state.currentCategory = action.payload;
        },
        clearCart: (state) => {
            state.cart = [];
            state.cartOpen = false;
        },
        toggleCart: (state) => {
            state.cartOpen = !state.cartOpen;
        },
    },
});

export const { updateProducts, addToCart, addMultipleToCart, removeFromCart, updateCartQuantity, clearCart, toggleCart, updateCategories, updateCurrentCategory } = storeSlice.actions;

export default storeSlice.reducer;