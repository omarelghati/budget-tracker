import { createSlice } from "@reduxjs/toolkit";
import { FormError } from "./ui";
import {
  GET_MONTHLY_STATISTICS,
  GET_TRANSACTIONS,
  EDIT_TRANSACTION,
} from "../constants";

const initialState = {
  statistics: {
    current: localStorage.current
      ? JSON.parse(localStorage.current)
      : {
          paidTransactions: [],
          unpaidTransactions: [],
          paidDebts: [],
          unpaidDebts: [],
          allTransactions: [],
        },
    history: {},
  },
  salary: undefined,
  transactions: [],
  months: localStorage.months ? JSON.parse(localStorage.months) : [],
};

const slice = createSlice({
  name: "api",
  initialState: initialState,
  reducers: {
    GetMonthlyStatisticsSuccess: (state, action) => {
      state.statistics.current.remainingBalance =
        action.payload.remainingBalance;
      state.statistics.current.allTransactions = action.payload.allTransactions;
      state.salary = action.payload.salary;
      state.statistics.current.paidTransactions = action.payload.allTransactions.filter(
        (a) => a.isPaid === false
      );
      state.statistics.current.unpaidTransactions = action.payload.allTransactions.filter(
        (a) => a.isPaid === true
      );
      state.statistics.current.paidDebts = action.payload.paidDebts;
      state.statistics.current.unpaidDebts = action.payload.unpaidDebts;
      localStorage.setItem("current", JSON.stringify(state.statistics.current));
    },
    GetYearlyStatistics: (state, action) => {
      state.snackbar.open = true;
      state.snackbar.message = action.payload.message;
    },
    GetTransactionsSuccess: (state, action) => {
      state.transactions = action.payload.allTransactions;
      if (action.payload.months) {
        state.months = action.payload.months;
        localStorage.setItem("months", JSON.stringify(state.months));
      }
    },
    EditTransactionsSuccess: (state, action) => {},
  },
});

export const GetMonthlyStatisticsAction = () => {
  return {
    type: GET_MONTHLY_STATISTICS,
    payload: {
      url: "/statistics/monthly",
      method: "GET",
      onSuccess: GetMonthlyStatisticsSuccess.type,
      onError: FormError.type,
    },
  };
};

export const GetTransactionsAction = (month) => {
  return {
    type: GET_TRANSACTIONS,
    payload: {
      url: "/transactions",
      method: "GET",
      onSuccess: GetTransactionsSuccess.type,
      onError: FormError.type,
      params: month ? month : "",
    },
  };
};

export const EditTransactionAction = (transaction) => {
  return {
    type: EDIT_TRANSACTION,
    payload: {
      url: "/transactions",
      method: "PUT",
      onSuccess: EditTransactionsSuccess.type,
      onError: FormError.type,
      data: transaction,
    },
  };
};

export default slice.reducer;
export const {
  GetMonthlyStatisticsSuccess,
  GetTransactionsSuccess,
  EditTransactionsSuccess,
} = slice.actions;
