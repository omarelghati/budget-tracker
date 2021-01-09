import { createSlice } from "@reduxjs/toolkit";
import { LOG_IN, SIGN_UP, LOGOUT } from "../constants";
import { FormError } from "./ui";

const initialState = {
  loggedIn: false,
  user: localStorage.user ? JSON.parse(localStorage.user) : {},
  token: localStorage.token ? localStorage.token : "",
};

const slice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    UserLoginSuccess: (state, action) => {
      state.loggedIn = true;
      state.user = action.payload.userInfo;
      state.token = action.payload.token;
      localStorage.setItem("user", JSON.stringify(action.payload.userInfo));
      localStorage.setItem("token", action.payload.token);
    },
    UserRegisterSucess: (state, action) => {
      state.snackbar.open = true;
      state.snackbar.message = action.payload.message;
    },
    UserLogout: (state, action) => {
      localStorage.clear();
      state.loggedIn = false;
      state.user = {};
    },
  },
});

export const LoginAction = (data) => {
  return {
    type: LOG_IN,
    payload: {
      url: "/users/login",
      method: "POST",
      onSuccess: UserLoginSuccess.type,
      onError: FormError.type,
      data: data,
    },
  };
};
export const RegisterAction = (data) => {
  return {
    type: SIGN_UP,
    payload: {
      url: "/users/register",
      method: "POST",
      onSuccess: UserRegisterSuccess.type,
      onError: FormError.type,
      data: data,
    },
  };
};

export const LogoutAction = () => {
  return {
    type: LOGOUT,
  };
};

export default slice.reducer;
export const {
  UserLoginSuccess,
  UserRegisterSuccess,
  UserLogout,
} = slice.actions;
