import { configureStore } from '@reduxjs/toolkit'
import customerSlice from './customerSlice'
import regionSlice from './regionSlice'
export const store = configureStore({
  reducer: {
      customer: customerSlice,
      region: regionSlice
  },
})