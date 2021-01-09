import { createSlice } from "@reduxjs/toolkit";
import { FormError } from "./ui";
import {
  GET_CATEGORIES,
  ADD_CATEGORY,
  GET_MONTHLY_STATISTICS,
  GET_TRANSACTIONS,
  EDIT_TRANSACTION,
  GET_DEBTS,
  ADD_DEBT,
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
  debts: [],
  categories: [],
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
    GetDebtsSuccess: (state, action) => {
      state.debts = action.payload.debts;
    },
    GetCategoriesSuccess: (state, action) => {
      state.categories = action.payload.categories;
    },
    AddCategorySuccess: (state, action) => {
      state.categories.push(action.payload.category);
    },
    AddDebtSuccess: (state, action) => {
      //TODO
      state.debts.push(action.payload.debt);
    },
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

export const GetDebtsAction = (month) => {
  return {
    type: GET_DEBTS,
    payload: {
      url: "/debts",
      method: "GET",
      onSuccess: GetDebtsSuccess.type,
      onError: FormError.type,
      params: month ? month : "",
    },
  };
};

export const GetCategoriesAction = (month) => {
  return {
    type: GET_CATEGORIES,
    payload: {
      url: "/categories",
      method: "GET",
      onSuccess: GetCategoriesSuccess.type,
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

export const AddCategoryAction = (category) => {
  return {
    type: ADD_CATEGORY,
    payload: {
      url: "/categories",
      method: "POST",
      onSuccess: AddCategorySuccess.type,
      onError: FormError.type,
      data: category,
    },
  };
};
export default slice.reducer;
export const {
  GetMonthlyStatisticsSuccess,
  GetTransactionsSuccess,
  EditTransactionsSuccess,
  GetDebtsSuccess,
  AddDebtSuccess,
  GetCategoriesSuccess,
  AddCategorySuccess,
} = slice.actions;
