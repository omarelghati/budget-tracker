import client from "../client";
import { ClearFormErrors, CloseModal } from "../slices/ui";
import { apply, put, takeEvery } from "redux-saga/effects";
import {
  GET_MONTHLY_STATISTICS,
  GET_TRANSACTIONS,
  LOCATION_CHANGE,
  EDIT_TRANSACTION,
  GET_DEBTS,
  ADD_CATEGORY,
  GET_CATEGORIES,
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

function* getDebts(action) {
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

function* getCategories(action) {
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

function* addCategory(action) {
  const { url, data, onError, onSuccess } = action.payload;
  const response = yield apply(client, client.post, [url, "", data]);
  if (!response.error) {
    yield put({ type: onSuccess, payload: response });
    yield put({ type: CloseModal.type });
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

  yield takeEvery(GET_DEBTS, getDebts);

  yield takeEvery(GET_CATEGORIES, getCategories);
  yield takeEvery(ADD_CATEGORY, addCategory);
}
