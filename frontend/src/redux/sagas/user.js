import client from "../client";
import {
  SET_AUTH_TOKEN,
  LOG_IN,
  LOCATION_CHANGE,
  CLEAR_FORM_ERROR,
} from "../constants";
import { push } from "connected-react-router";
import { apply, put, takeEvery } from "redux-saga/effects";
import { ClearFormErrors, FormError, FormSuccess } from "../slices/ui";

function* setAuthToken({ token, user: { id, email } }) {
  const currentUser = {
    secret: token,
    userId: id,
    email,
  };
}

function* login(action) {
  const { url, data, onError, onSuccess } = action.payload;
  const response = yield apply(client, client.post, [url, "", data]);
  if (!response.error) {
    yield put({ type: onSuccess, payload: response });
    client.setCustomHeaders(response.token.id, response.token);
    yield put(push("/dashboard"));
  } else {
    yield put({
      type: onError,
      payload: response.error,
    });
  }
  return;
}

export function* userSaga() {
  yield takeEvery(SET_AUTH_TOKEN, setAuthToken);
  yield takeEvery(LOG_IN, login);
  yield takeEvery(LOCATION_CHANGE, function* () {
    yield put({ type: ClearFormErrors.type });
  });
}
