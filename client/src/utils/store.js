import { configureStore } from '@reduxjs/toolkit';
import { storeSlice } from './storeSlice';

export const store = configureStore({
  reducer: {
    // Add your reducers here

    store: storeSlice.reducer,


  },
});

export default store;