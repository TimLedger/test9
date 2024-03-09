import { Category } from "../types";
import { createSlice } from "@reduxjs/toolkit";
import { categoryAdd } from "./categoriesThunk";

interface CategoriesState {
    category: Category | null;
    postLoading: boolean;
}

const initialState: CategoriesState = {
    category: null,
    postLoading: false,
};

const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(categoryAdd.pending, state => {
            state.postLoading = true;
        });
        builder.addCase(categoryAdd.fulfilled, state => {
            state.postLoading = false;
        });
        builder.addCase(categoryAdd.rejected, state => {
            state.postLoading = false;
        });
    },
});

export const categoriesReducers = categoriesSlice.reducer;
