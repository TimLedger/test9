import { configureStore } from "@reduxjs/toolkit";
import {categoriesReducers} from "../store/categoriesSlice";

export const store = configureStore({
  reducer: {
    categories: categoriesReducers,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
