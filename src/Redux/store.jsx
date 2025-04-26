import { configureStore } from "@reduxjs/toolkit";
// import RegisterSlice from "./RegisterSlice";
// import LoginSlice from "./LoginSlice";
import FormReducer from "./FormReducer";

const store = configureStore({
  reducer: {
    // register: RegisterSlice,
    // login: LoginSlice,
    formReducer: FormReducer,
  },
});
export default store;
