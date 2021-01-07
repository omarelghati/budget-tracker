import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import rootReducer from "./reducer";
import logger from "redux-logger";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();
export const history = createBrowserHistory();

export default configureStore({
  reducer: rootReducer(history),
  middleware: [
    ...getDefaultMiddleware({ thunk: false }),
    logger,
    sagaMiddleware,
    routerMiddleware(history),
  ],
});

sagaMiddleware.run(rootSaga);
