import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  form: {},
  snackbar: {
    open: false,
    message: "",
  },
  closeModal: false,
  preview: "",
  previewError: "",
  showAddPost: false,
  loading: false,
};
const slice = createSlice({
  name: "ui",
  initialState: initialState,
  reducers: {
    FormError: (state, action) => {
      console.log(action.payload);
      state.form.error = action.payload;
    },
    OpenSnackbar: (state, action) => {
      state.snackbar.open = true;
      state.snackbar.message = action.payload;
    },
    ClearFormErrors: (state, action) => {
      state.form.error = undefined;
    },
    CloseSnackbar: (state) => {
      state.snackbar.open = false;
      state.snackbar.message = "";
    },
    OpenAddPost: (state) => {
      state.showAddPost = true;
    },
    CloseAddPost: (state) => {
      state.showAddPost = false;
    },
    ResetValue: (state, action) => {
      state.preview = action.payload;
      state.imagePreviewError = action.payload;
    },
    GetPreview: (state, action) => {
      if (action.payload.message) {
        state.imagePreviewError = action.payload.message;
      }
      state.preview = action.payload.preview;
    },
    CloseModal: (state, action) => {
      state.closeModal = true;
    },
  },
});

export default slice.reducer;
export const {
  FormError,
  OpenSnackbar,
  ClearFormErrors,
  CloseModal,
} = slice.actions;
