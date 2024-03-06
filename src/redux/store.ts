import { configureStore } from '@reduxjs/toolkit';
import orderSlice from './orderSlice';
import dishSlice from './dishSlice';
import categorySlice from './categorySlice';

export const store = () => {
  return configureStore({
    reducer: {
      orderStore: orderSlice,
      dishStore: dishSlice,
      categoryStore: categorySlice,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof store>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
