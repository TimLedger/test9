import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../axiosApi";
import { Transaction } from "../types";

export const transactionAdd = createAsyncThunk<void, Transaction >(
    "transaction/add",
    async (data) => {
        await axiosApi.post('/transactions/.json', data);
    },
);

export const transactionOne = createAsyncThunk<Transaction | null, string>(
    "transaction/one",
    async (id) => {
        const response = await axiosApi.get('/transactions/' + id + '.json');
        if (response.data) {
            return response.data;
        }

        return null;
    },
);

export const transactionEdit = createAsyncThunk<void, { id: string; data: Transaction }>(
    "transaction/edit",
    async ({ id, data }) => {
        await axiosApi.put('/transactions/' + id + '.json', data);
    },
);