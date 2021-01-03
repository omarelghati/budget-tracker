import client from "../client";
import { apply, put, takeEvery } from "redux-saga/effects";
import {
  GET_MONTHLY_STATISTICS,
  GET_TRANSACTIONS,
  EDIT_TRANSACTION,
} from "./../constants";

function* getMonthlyStatistics(action) {
  const { url, data, onError, onSuccess } = action.payload;
  const response = yield apply(client, client.get, [url, "", data]);
  if (!response.error) {
    yield put({ type: onSuccess, payload: response });
  } else {
    yield put({
      type: onError,
      payload: response.error,
    });
  }
  return;
}

function* getTransactions(action) {
  const { url, data, onError, onSuccess } = action.payload;
  const response = yield apply(client, client.get, [
    url,
    action.payload.params,
    data,
  ]);
  if (!response.error) {
    yield put({ type: onSuccess, payload: response });
  } else {
    yield put({
      type: onError,
      payload: response.error,
    });
  }
  return;
}

function* editTransaction(action) {
  const { url, data, onError, onSuccess } = action.payload;
  const response = yield apply(client, client.update, [url, "", data]);
  if (!response.error) {
    yield put({ type: onSuccess, payload: response });
  } else {
    yield put({
      type: onError,
      payload: response.error,
    });
  }
  return;
}

export function* apiSaga() {
  yield takeEvery(GET_MONTHLY_STATISTICS, getMonthlyStatistics);
  yield takeEvery(GET_TRANSACTIONS, getTransactions);
  yield takeEvery(EDIT_TRANSACTION, editTransaction);
}
