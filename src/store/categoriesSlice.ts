import { Category, Categories } from "../types";
import { createSlice } from "@reduxjs/toolkit";
import { categoryAdd, categoryOne, categoryEdit, categoryList, categoryDelete } from "./categoriesThunk";

interface CategoriesState {
    categories: Categories[] | [];
    category: Category | null;
    postLoading: boolean;
    getLoading: boolean;
    editLoading: boolean;
    deleteLoading: boolean;
}

const initialState: CategoriesState = {
    categories: [],
    category: null,
    postLoading: false,
    getLoading: false,
    editLoading: false,
    deleteLoading: false,
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

        builder.addCase(categoryOne.pending, state => {
            state.getLoading = true;
        });
        builder.addCase(categoryOne.fulfilled, (state, {payload}) => {
            state.getLoading = false;
            state.category = payload;
        });
        builder.addCase(categoryOne.rejected, state => {
            state.getLoading = false;
        });

        builder.addCase(categoryEdit.pending, state => {
            state.editLoading = true;
        });
        builder.addCase(categoryEdit.fulfilled, (state) => {
            state.editLoading = false;
        });
        builder.addCase(categoryEdit.rejected, state => {
            state.editLoading = false;
        });

        builder.addCase(categoryList.pending, state => {
            state.getLoading = true;
        });
        builder.addCase(categoryList.fulfilled, (state, {payload}) => {
            state.getLoading = false;
            state.categories = payload;
        });
        builder.addCase(categoryList.rejected, state => {
            state.getLoading = false;
        });

        builder.addCase(categoryDelete.pending, state => {
            state.deleteLoading = true;
        });
        builder.addCase(categoryDelete.fulfilled, (state) => {
            state.deleteLoading = false;
        });
        builder.addCase(categoryDelete.rejected, state => {
            state.deleteLoading = false;
        });
    },
});

export const categoriesReducers = categoriesSlice.reducer;
