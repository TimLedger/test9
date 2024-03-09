import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../axiosApi";
import { Transaction, Transactions, ApiTransaction } from "../types";

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

export const transactionList = createAsyncThunk<Transactions[], undefined>(
    "transaction/list",
    async () => {
        const response = await axiosApi.get<ApiTransaction | null>('/transactions.json');
        const responseData = response.data;
        let newTransaction: Transactions[] = [];

        if (responseData) {
            newTransaction = Object.keys(responseData).map((key) => {
                return {
                    ...responseData[key],
                    id: key,
                };
            });
        newTransaction.sort((a, b) => {
          const dateA = new Date(a.time).getTime();
          const dateB = new Date(b.time).getTime();
          return dateB - dateA;
        });
        }

        return newTransaction;
    },
);

export const transactionDelete = createAsyncThunk(
    "transaction/delete",
    async (id: string) => {
        await axiosApi.delete('/transactions/' + id + '.json');
    },
);