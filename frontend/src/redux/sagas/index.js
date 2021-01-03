import { fork } from "redux-saga/effects";
import { userSaga } from "./user";
import { apiSaga } from "./api";

export default function* () {
  yield fork(userSaga);
  yield fork(apiSaga);
}
