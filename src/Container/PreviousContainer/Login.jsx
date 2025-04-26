import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import instance from "../../component/axiosInstance";
import { updateData, clearData, setError } from "../../Redux/FormReducer";
// import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import usevalidate from "../commonContainer";
import loginDesc from "../../Description/loginDesc";
export default function Login() {
  const dispatch = useDispatch();

  const data = useSelector((state) => state.formReducer.login.data);
  const error = useSelector((state) => state.formReducer.login.error);

  const navigate = useNavigate();
  const validate = (name, value) => {
    const field = formArray.find((item) => item.name === name);
    const errors = {};
    if (field && field.validation) {
      for (const check of field.validation) {
        if (check.regex && !check.regex.test(value)) {
          errors[name] = check.errormsg;
          break;
        } else {
          errors[name] = "";
        }
        if (check.validlength && value.length < check.validlength) {
          errors[name] = check.errormsg;
          break;
        }
        if (field.type === "select" && value === "") {
          errors[name] = check.errormsg;
          break;
        }
      }
    }
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateData({ type: "login", name: name, value: value }));
    const error = validate(name, value, loginDesc);
    dispatch(setError({ type: "login", error: error }));
  };
  const submitData = async (data) => {
    try {
      const response = await instance({
        url: "users/Login",
        method: "POST",
        data,
      });
      if (response.status === 200) {
        // toast(response.data.message, {
        //   position: "top-center",
        //   autoClose: 1000,
        // });
        // localStorage.setItem("token", response.data.data.token);
        navigate("/dashboard");
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const newSubmit = {};
    Object.entries(data).forEach(([name, value]) => {
      const submitError = validate(name, value, loginDesc);
      Object.assign(newSubmit, submitError);
    });
    dispatch(setError({ type: "login", error: newSubmit }));
    const hasError = Object.values(newSubmit).some((element) => element !== "");
    if (hasError) {
      e.preventDefault();
    } else {
      submitData(data);
      dispatch(clearData({ type: "login" }));
    }
  };
  return { data, error, handleChange, handleSubmit };
}
