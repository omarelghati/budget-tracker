import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import userReducer from "./slices/user";
import uiReducer from "./slices/ui";
import apiReducer from "./slices/api";
export default (history) =>
  combineReducers({
    ui: uiReducer,
    user: userReducer,
    api: apiReducer,
    router: connectRouter(history),
  });
