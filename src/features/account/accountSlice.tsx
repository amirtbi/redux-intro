/* eslint-disable @typescript-eslint/no-unused-vars */
import { Dispatch, UnknownAction } from "redux";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState: initialState,
  reducers: {
    deposit(state, action) {
      state.balance = state.balance + action.payload;
    },
    withdraw(state, action) {
      state.balance = state.balance - action.payload;
    },
    requestLoan: {
      prepare(amount:number, purpose:string) {
        return {
          payload: {
            amount,
            purpose,
          },
        };
      },
      reducer(state, action) {
        if (state.loan > 0) return;
        state.loan = action.payload.amount;
        state.balance = state.balance + action.payload.amount;
        state.loanPurpose = action.payload.purpose;
      },
    },
    payLoan(state,_action) {
      state.balance = state.balance - state.loan;
      state.loanPurpose = "";
      state.loan = 0;
    },
    convertingCurrency(state, action) {
      state.isLoading = true;
    },
  },
});

export const { deposit, withdraw, requestLoan, payLoan } = accountSlice.actions;
export default accountSlice.reducer;