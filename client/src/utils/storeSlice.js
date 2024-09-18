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
            state.cart.push(action.payload);
        },
        addMultipleToCart: (state, action) => {
            state.cart = [...state.cart, ...action.payload];
        },
        removeFromCart: (state, action) => {
            state.cart = state.cart.filter((product) => {
                return product._id !== action.payload._id;
            });
        },
        updateCartQuantity: (state, action) => {
            state.cart = state.cart.map((product) => {
                if (action.payload._id === product._id) {
                    product.purchaseQuantity = action.payload.purchaseQuantity;
                }
                return product;
            });
        },
        clearCart: (state) => {
            state.cart = [];
            state.cartOpen = false;
        },
        toggleCart: (state) => {
            state.cartOpen = !state.cartOpen;
        },
        updateCategories: (state, action) => {
            state.categories = action.payload;
        },
        updateCurrentCategory: (state, action) => {
            state.currentCategory = action.payload;
        },
    },
});


export const {
    updateProducts,
    addToCart,
    addMultipleToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    toggleCart,
    updateCategories,
    updateCurrentCategory,
} = storeSlice.actions;


export default storeSlice.reducer;
