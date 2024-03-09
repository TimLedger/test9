import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../axiosApi";
import { Category } from "../types";

export const categoryAdd = createAsyncThunk<void, { id: string; data: Category }>(
    "category/add",
    async ({id, data}) => {
        await axiosApi.put('/categorylist/' + id + '.json', data);
    },
);

export const categoryOne = createAsyncThunk<Category | null, string>(
    "category/one",
    async (id) => {
        const response = await axiosApi.get('/categorylist/' + id + '.json');
        if (response.data) {
            return response.data;
        }

        return null;
    },
);

export const categoryEdit = createAsyncThunk<void, { id: string; data: Category }>(
    "category/edit",
    async ({ id, data }) => {
        await axiosApi.put('/categorylist/' + id + '.json', data);
    },
);