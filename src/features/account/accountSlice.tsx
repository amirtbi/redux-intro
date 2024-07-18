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
      state.isLoading = false;
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
      reducer(state, action:{payload:{amount:number,purpose:string}}) {
        if (state.loan > 0) return;
        state.loan = action.payload.amount;
        state.balance = state.balance + action.payload.amount;
        state.loanPurpose = action.payload.purpose;
      },
    },
    payLoan(state) {
      state.balance = state.balance - state.loan;
      state.loanPurpose = "";
      state.loan = 0;
    },
    convertingCurrency(state) {
      state.isLoading = true;
    },
  },
});

export const {  withdraw, requestLoan, payLoan,convertingCurrency } = accountSlice.actions;

export const deposit = (depositvalue:string,currency:string)=>{
  if (currency === "USD")
    return { type: "account/deposit", payload: depositvalue };
  return async function (dispatch:Dispatch<UnknownAction>){
    dispatch(convertingCurrency());
    const res = await fetch(`https://api.frankfurter.app/latest?amount=${depositvalue}&from=${currency}&to=USD`);
    const data = await res.json();
    const convertedData = await data.rates.USD;
    dispatch({type:"account/deposit",payload:convertedData})

  }
}
export default accountSlice.reducer;