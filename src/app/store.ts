import { configureStore } from "@reduxjs/toolkit";
import {categoriesReducers} from "../store/categoriesSlice";
import {transactionsReducers} from "../store/transactionsSlice";

export const store = configureStore({
  reducer: {
    categories: categoriesReducers,
    transactions: transactionsReducers,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
