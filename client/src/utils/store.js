import { configureStore } from '@reduxjs/toolkit';
import storeReducer from './reducers';

export const store = configureStore({
  reducer: {
    store: storeReducer,
  },
});

export default store;