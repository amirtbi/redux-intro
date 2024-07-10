import { Dispatch, UnknownAction } from "redux";
import { RootState } from "../../store";
const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

export default function accountReducer(
  state = initialStateAccount,
  action: { payload?: any; type: string }
) {
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoading: false,
      };
    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLoan":
      if (state.loan > 0) return state;
      // LATER
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };
    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };
    case "account/convertingCurrency":
      return { ...state, isLoading: true };

    default:
      return state;
  }
}

// Action createtors
export function deposit(depositValue: number | string, currency: string) {
  if (currency === "USD")
    return { type: "account/deposit", payload: depositValue };

  return async function (
    dispatch: Dispatch<UnknownAction>,
    getState: RootState
  ) {
    dispatch({ type: "account/convertingCurrency" });
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${depositValue}&from=${currency}&to=USD`
    );
    const data = await res.json();
    const convertedData = await data.rates.USD;
    dispatch({ type: "account/deposit", payload: convertedData });
  };
}

export function withdraw(amount: number | string) {
  return { type: "account/withdraw", payload: amount };
}

export function requestLoan(amount: number | string, purpose: string) {
  return { type: "account/requestLoan", payload: { amount, purpose: purpose } };
}

export function payLoan() {
  return { type: "account/payLoan" };
}
