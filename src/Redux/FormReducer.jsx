import { createSlice } from "@reduxjs/toolkit";
import registerDesc from "../Description/registerDesc";
import loginDesc from "../Description/loginDesc";
import ForgetDesc from "../Description/ForgetDesc";
import newPassDesc from "../Description/newPassDesc";
// console.log(registerDesc);
// console.log(loginDesc);

const forms = {
  register: registerDesc,
  login: loginDesc,
  forget: ForgetDesc,
  newPass: newPassDesc,
};
// const initialState = {
//   login: {
//     data: {
//       email: "",
//       password: "",
//     },
//     error: {
//       email: "",
//       password: "",
//     },
//   },
//   register: {
//     data: {
//       name: "",
//       email: "",
//       password: "",
//       role: "",
//     },

//     error: {
//       name: "",
//       email: "",
//       password: "",
//       role: "",
//     },
//   },
// };

const getForm = (forms) => {
  const initialstate = {};

  Object.entries(forms).map(([form, formfields]) => {
    const data = {};
    const error = {};
    Object.entries(formfields).forEach(([key, value]) => {
      data[value.name] = "";
    });
    Object.entries(formfields).forEach(([key, value]) => {
      error[value.name] = "";
    });
    initialstate[form] = { data, error };


  });
  initialstate['token'] = "";
  return initialstate;
};
const initialState = getForm(forms);
console.log(initialState)
const FormReducer = createSlice({
  name: "formReducer",
  initialState,
  reducers: {
    updateData: (state, action) => {
      state[action.payload.type].data = {
        ...state?.[action.payload.type].data,
        [action.payload.name]: action.payload.value,
      };
    },
    setError: (state, action) => {
      state[action.payload.type].error = {
        ...state?.[action.payload.type].error,
        ...action.payload.error,
      };
    },

    clearData: (state, action) => {
      Object.entries(state[action.payload.type].data).forEach(([key]) => {
        state[action.payload.type].data[key] = "";
      });
    },

  },
});
export const { updateData, setError, clearData } =
  FormReducer.actions;
export default FormReducer.reducer;
