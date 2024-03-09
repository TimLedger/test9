import { Transaction } from "../types";
import { createSlice } from "@reduxjs/toolkit";
import { transactionAdd, transactionOne, transactionEdit } from "./transactionsThunks";

interface TransactionsState {
  transaction: Transaction | null;
  postLoading: boolean;
  getLoading: boolean;
  editLoading: boolean;
}

const initialState: TransactionsState = {
  transaction: null,
  postLoading: false,
  getLoading: false,
  editLoading: false,
};

const transactionsSlice = createSlice({
    name: "transactions",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(transactionAdd.pending, state => {
            state.postLoading = true;
        });
        builder.addCase(transactionAdd.fulfilled, state => {
            state.postLoading = false;
        });
        builder.addCase(transactionAdd.rejected, state => {
            state.postLoading = false;
        });

        builder.addCase(transactionOne.pending, state => {
            state.getLoading = true;
        });
        builder.addCase(transactionOne.fulfilled, (state, {payload}) => {
            state.getLoading = false;
            state.transaction = payload;
        });
        builder.addCase(transactionOne.rejected, state => {
            state.getLoading = false;
        });

        builder.addCase(transactionEdit.pending, state => {
            state.editLoading = true;
        });
        builder.addCase(transactionEdit.fulfilled, (state) => {
            state.editLoading = false;
        });
        builder.addCase(transactionEdit.rejected, state => {
            state.editLoading = false;
        });
    },
});

export const transactionsReducers = transactionsSlice.reducer;
