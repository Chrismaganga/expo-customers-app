import { configureStore } from '@reduxjs/toolkit';
import regionReducer from './slices/regionSlice';
import customerReducer from './slices/customerSlice';

const store = configureStore({
    reducer: {
        region: regionReducer,
        customer: customerReducer,
    },
});

export default store;