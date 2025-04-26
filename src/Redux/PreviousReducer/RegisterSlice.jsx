import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {
    name: "",
    email: "",
    password: "",
    role: "",
  },

  error: {
    name: "",
    email: "",
    password: "",
    role: "",
  },
};
const RegisterSlice = createSlice({
  name: "register",
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
        name: "",
        email: "",
        role: "",
      };
    },
  },
});
export const { updateData, setError, clearData } = RegisterSlice.actions;
export default RegisterSlice.reducer;
