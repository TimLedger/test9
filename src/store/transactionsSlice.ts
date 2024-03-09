import { Transaction, Transactions } from "../types";
import { createSlice } from "@reduxjs/toolkit";
import { transactionAdd, transactionOne, transactionEdit, transactionList, transactionDelete } from "./transactionsThunk";

interface TransactionsState {
  transactions: Transactions[] | [];
  transaction: Transaction | null;
  postLoading: boolean;
  getLoading: boolean;
  editLoading: boolean;
  deleteLoading: boolean;
}

const initialState: TransactionsState = {
  transactions: [],
  transaction: null,
  postLoading: false,
  getLoading: false,
  editLoading: false,
  deleteLoading: false,
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

        builder.addCase(transactionList.pending, state => {
            state.getLoading = true;
        });
        builder.addCase(transactionList.fulfilled, (state, {payload}) => {
            state.getLoading = false;
            state.transactions = payload;
        });
        builder.addCase(transactionList.rejected, state => {
            state.getLoading = false;
        });

        builder.addCase(transactionDelete.pending, state => {
            state.deleteLoading = true;
        });
        builder.addCase(transactionDelete.fulfilled, (state) => {
            state.deleteLoading = false;
        });
        builder.addCase(transactionDelete.rejected, state => {
            state.deleteLoading = false;
        });
    },
});

export const transactionsReducers = transactionsSlice.reducer;
