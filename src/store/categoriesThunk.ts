import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../axiosApi";
import { Category } from "../types";

export const categoryAdd = createAsyncThunk<void, { id: string; data: Category }>(
    "category/add",
    async ({id, data}) => {
        await axiosApi.put('/categorylist/' + id + '.json', data);
    },
);