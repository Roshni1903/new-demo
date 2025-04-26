import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {
    email: "",
    password: "",
  },

  error: {
    email: "",
    password: "",
  },
};
const LoginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    updateData: (state, action) => {
      state.data = {
        ...state.data,
        [action.payload.name]: action.payload.value,
      };
    },
    setError: (state, action) => {
      state.error = {
        ...state.error,
        ...action.payload,
      };
    },
    clearData: (state) => {
      state.data = {
        password: "",
        email: "",
      };
    },
  },
});
export const { updateData, setError, clearData } = LoginSlice.actions;
export default LoginSlice.reducer;
